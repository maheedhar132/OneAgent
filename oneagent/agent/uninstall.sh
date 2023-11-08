#!/bin/sh

# External dependencies: toLog, commandErrorWrapper

readonly SIF_AGENT_SHORT_NAME="Dynatrace"
readonly SIF_BRANDING_PRODUCTSHORTNAME="OneAgent"
readonly SIF_AGENT_PRODUCT_NAME="${SIF_AGENT_SHORT_NAME} ${SIF_BRANDING_PRODUCTSHORTNAME}"
readonly SIF_BRANDING_PRODUCTNAME_LOWER="dynatrace"
readonly SIF_BRANDING_PRODUCTSHORTNAME_LOWER="oneagent"
readonly SIF_AGENT_DEFAULT_USER_AND_GROUP_NAME="dtuser"
readonly SIF_AGENT_WATCHDOG=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}watchdog
readonly SIF_AGENT_HELPER=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}helper

readonly SIF_INSTALL_BASE=/opt
readonly SIF_INSTALL_FOLDER=${SIF_BRANDING_PRODUCTNAME_LOWER}/${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}
readonly SIF_INSTALL_PATH=${SIF_INSTALL_BASE}/${SIF_INSTALL_FOLDER}
readonly SIF_AGENT_INSTALL_PATH=${SIF_INSTALL_PATH}/agent
readonly SIF_AGENT_CONF_PATH=${SIF_AGENT_INSTALL_PATH}/conf
readonly SIF_PARTIAL_INSTALL_PATH=${SIF_INSTALL_BASE}/${SIF_BRANDING_PRODUCTNAME_LOWER}

readonly SIF_INITD_FILE="${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}"
readonly SIF_AGENT_INIT_SCRIPTS_FOLDER="${SIF_AGENT_INSTALL_PATH}/initscripts"

readonly SIF_RUNTIME_ROOT=/var
readonly SIF_RUNTIME_BASE=${SIF_RUNTIME_ROOT}/lib
readonly SIF_PARTIAL_RUNTIME_DIR=${SIF_RUNTIME_BASE}/${SIF_BRANDING_PRODUCTNAME_LOWER}
readonly SIF_RUNTIME_DIR=${SIF_PARTIAL_RUNTIME_DIR}/${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}
readonly SIF_ENRICHMENT_DIR="${SIF_PARTIAL_RUNTIME_DIR}/enrichment"
readonly SIF_AGENT_RUNTIME_DIR=${SIF_RUNTIME_DIR}/agent
readonly SIF_DATA_STORAGE_DIR=${SIF_RUNTIME_DIR}/datastorage
readonly SIF_AGENT_PERSISTENT_CONFIG_PATH=${SIF_AGENT_RUNTIME_DIR}/config
readonly SIF_LOG_BASE=${SIF_RUNTIME_ROOT}/log
readonly SIF_PARTIAL_LOG_DIR=${SIF_LOG_BASE}/${SIF_BRANDING_PRODUCTNAME_LOWER}
readonly SIF_LOG_PATH="${SIF_PARTIAL_LOG_DIR}/${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}"
readonly SIF_INSTALLER_LOG_SUBDIR="installer"

readonly SIF_AGENT_TOOLS_PATH=${SIF_AGENT_INSTALL_PATH}/tools
readonly SIF_AGENT_CTL_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}ctl

readonly SIF_INSTALLATION_CONF_FILE_NAME="installation.conf"

readonly SIF_CONTAINER_DEPLOYMENT_CONF_FILE_NAME="dockerdeployment.conf"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_FILE="${SIF_AGENT_CONF_PATH}/${SIF_CONTAINER_DEPLOYMENT_CONF_FILE_NAME}"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_DISABLE_CONTAINER_INJECTION_ENTRY="DisableContainerInjection"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_STATE_ENTRY="DeployedInsideDockerContainer"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_LOG_DIR_ENTRY="LogDir"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_ENRICHMENT_DIR_ENTRY="EnrichmentDir"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_SELINUX_FCONTEXT_INSTALL_PATH="SELinuxFilecontextInstallationPath"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_SELINUX_FCONTEXT_RUNTIME_DIR="SELinuxFilecontextRuntimeDir"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_SELINUX_FCONTEXT_LOG_DIR="SELinuxFilecontextLogDir"
readonly SIF_CONTAINER_DEPLOYMENT_CONF_SELINUX_FCONTEXT_ENRICHMENT_DIR="SELinuxFilecontextEnrichmentDir"

readonly SIF_CONTAINER_INSTALLER_SCRIPT_NAME="Dynatrace-OneAgent-Linux.sh"
readonly SIF_CONTAINER_INSTALLER_PATH_ON_HOST="${SIF_INSTALL_PATH}/${SIF_CONTAINER_INSTALLER_SCRIPT_NAME}"

readonly SIF_HELP_URL="https://www.dynatrace.com/support/help/shortlink"

sif_toConsoleOnly() {
	local level="${1}"
	shift

	local logFormat="%s %s\n"
	if [ "${level}" ]; then
		logFormat="%s ${level} %s\n"
	fi
	# this subshell is required to not override IFS value
	(
		IFS="
"
		#shellcheck disable=SC2068,SC2059
		for line in $@; do
			printf "${logFormat}" "$(date +"%H:%M:%S")" "${line}" 2>/dev/null
		done
	)
}

sif_toLogInfo() {
	toLog "[INFO]" "$@"
}

sif_toLogWarning() {
	toLog "[WARN]" "$@"
}

sif_toLogError() {
	toLog "[ERROR]" "$@"
}

sif_toLogAdaptive() {
	local success="${1}"
	shift
	if [ "${success}" -eq 0 ]; then
		sif_toLogInfo "$@"
	else
		sif_toLogError "$@"
	fi
}

sif_toConsoleInfo() {
	sif_toConsoleOnly "" "$@"
	sif_toLogInfo "$@"
}

sif_toConsoleWarning() {
	sif_toConsoleOnly "Warning:" "$@"
	sif_toLogWarning "$@"
} >&2

sif_toConsoleError() {
	sif_toConsoleOnly "Error:" "$@"
	sif_toLogError "$@"
} >&2

sif_doSleep() {
	local waitTime=$1
	sif_toLogInfo "Sleeping for ${waitTime} seconds..."
	sleep "${waitTime}"
}

sif_createFileIfNotExistAndSetRights() {
	local file="${1}"
	local rights="${2}"
	local ownership="${3}"

	if [ ! -f "${file}" ]; then
		sif_toLogInfo "Creating file ${file} with rights ${rights}"
		if ! commandErrorWrapper touch "${file}"; then
			sif_toConsoleWarning "Cannot create ${file} file"
			return 1
		fi

		if [ "${ownership}" ]; then
			if ! commandErrorWrapper chown "${ownership}" "${file}"; then
				sif_toConsoleWarning "Cannot change ownership of ${file} file to ${ownership}."
				return 1
			fi
		fi
	fi

	if ! commandErrorWrapper chmod "${rights}" "${file}"; then
		sif_toConsoleWarning "Cannot change permissions of ${file} file to ${rights}."
		return 1
	fi

	return 0
}

sif_createDirIfNotExistAndSetRights() {
	local dir="${1}"
	local rights="${2}"
	local ownership="${3}"

	if [ ! -d "${dir}" ]; then
		sif_toLogInfo "Creating directory ${dir} with rights ${rights}"
		if ! commandErrorWrapper mkdir -p "${dir}"; then
			sif_toConsoleWarning "Cannot create ${dir} directory."
			return 1
		fi

		if [ "${ownership}" ]; then
			if ! commandErrorWrapper chown "${ownership}" "${dir}"; then
				sif_toConsoleWarning "Cannot change ownership of ${dir} directory to ${ownership}."
				return 1
			fi
		fi
	fi

	if ! commandErrorWrapper chmod "${rights}" "${dir}"; then
		sif_toConsoleWarning "Cannot change permissions of ${dir} directory to ${rights}."
		return 1
	fi

	return 0
}

sif_isDirEmpty() {
	[ ! "$(ls -A "${1}" 2>/dev/null)" ]
}

sif_isDirNotEmpty() {
	! sif_isDirEmpty "${1}"
}

sif_isNamespaceIsolated() {
	local pid="${1}"
	local namespace="${2}"
	local initial_host_root="${3}"
	local initNamespaceId="$(readlink "${initial_host_root}/proc/1/ns/${namespace}" 2>/dev/null | tr -dc '0-9')"
	local processNamespaceId="$(readlink "/proc/${pid}/ns/${namespace}" 2>/dev/null | tr -dc '0-9')"

	if [ ! "${initNamespaceId}" ] || [ ! "${processNamespaceId}" ]; then
		sif_toLogInfo "Link to /proc/*/ns/${namespace} does not exist"
		printf 'error'
		return
	fi

	if [ "${initNamespaceId}" != "${processNamespaceId}" ]; then
		printf 'true'
	else
		printf 'false'
	fi
}

sif_setPATH() {
	local prependToPATH="/usr/sbin:/usr/bin:/sbin:/bin"
	if [ "${PATH}" ]; then
		PATH=${prependToPATH}:${PATH}
	else
		PATH=${prependToPATH}
	fi
}

sif_getValueFromConfigFile() {
	local key="${1}"
	local separator="${2}"
	local configFile="${3}"
	local defaultValue="${4}"

	local value="$(sed -n "s|^${key}${separator}||p" "${configFile}" 2>/dev/null)"

	if [ "${value}" ]; then
		printf '%s' "${value}"
	else
		printf '%s' "${defaultValue}"
	fi
}

sif_removeSecretsFromString() {
	local replaceString="***"
	local apiTokenPattern="dt0c01\.[A-Z2-7]\{24\}\.[A-Z2-7]\{64\}"
	local oldApiTokenPattern="[[:alnum:]_-]\{21\}"
	local tenantTokenPattern="dt0a02\.[[:alnum:]]\{24\}"
	local oldTenantTokenPattern="[[:alnum:]]\{16\}"
	local proxyPattern="[^[:space:]]*"

	printf "%s" "$*" | sed "s#\(Api-Token[= ]\)${oldApiTokenPattern}#\1${replaceString}#" |
		sed "s#\(Api-Token[= ]\)${apiTokenPattern}#\1${replaceString}#" |
		sed "s#\(TENANT_TOKEN=\)${tenantTokenPattern}#\1${replaceString}#" |
		sed "s#\(TENANT_TOKEN=\)${oldTenantTokenPattern}#\1${replaceString}#" |
		sed "s#\(--set-tenant-token=\)${tenantTokenPattern}#\1${replaceString}#" |
		sed "s#\(--set-tenant-token=\)${oldTenantTokenPattern}#\1${replaceString}#" |
		sed "s#\(latest/\)${tenantTokenPattern}#\1${replaceString}#" |
		sed "s#\(PROXY=\)${proxyPattern}#\1${replaceString}#" |
		sed "s#\(--set-proxy=\)${proxyPattern}#\1${replaceString}#"
}

sif_getAgentCtlBinPath() {
	printf "%s" "${SIF_AGENT_TOOLS_PATH}/lib64/${SIF_AGENT_CTL_BIN}"
}

#!/bin/sh

readonly SELINUXPOLICY_BASEFILENAME=${SIF_BRANDING_PRODUCTNAME_LOWER}_${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}
readonly SELINUXPOLICY_BASE_COMPILE_VERSION=24
readonly SELINUXPOLICY_FILENAME_DEFAULT="${SELINUXPOLICY_BASEFILENAME}_${SELINUXPOLICY_BASE_COMPILE_VERSION}.pp"
readonly SELINUXPOLICY_FILENAME_VERSION_31="${SELINUXPOLICY_BASEFILENAME}_31.pp"

readonly AGENT_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}os
readonly AGENT_LOG_ANALYTICS=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}loganalytics
readonly AGENT_NETWORK=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}network
readonly AGENT_PLUGIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}plugin
readonly AGENT_EXTENSIONS=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}extensions
readonly AGENT_PROC=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}proc
readonly AGENT_INSTALL_ACTION_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}installaction
readonly AGENT_OS_CONFIG_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}osconfig
readonly DUMP_PROC_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}dumpproc
readonly AGENT_PROC_LIB=lib${AGENT_PROC}.so
readonly INGEST_BIN=${SIF_BRANDING_PRODUCTNAME_LOWER}_ingest
readonly AGENT_LOADER_LIB=lib${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}loader.so
readonly AGENT_EVENTSTRACER_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}eventstracer
readonly AGENT_PLUGINSDOCKERUTIL_BIN=pluginsdockerutil
readonly AGENT_DYNAMIZER_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}dynamizer
readonly AGENT_PREINJECT_CHECK_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}preinjectcheck
readonly AGENT_DMIDECODE_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}dmidecode
readonly AGENT_NETTRACER_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}nettracer
readonly AGENT_MNTCONSTAT_BIN=${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}mntconstat

readonly AGENT_BIN_PATH=${SIF_AGENT_INSTALL_PATH}/bin

readonly LEGACY_LOG_PATH="${SIF_INSTALL_PATH}/log"
readonly INSTALLATION_LOG_DIR="${SIF_LOG_PATH}/${SIF_INSTALLER_LOG_SUBDIR}"

readonly HOOKING_STATUS_UNKNOWN="unknown"
readonly HOOKING_STATUS_ENABLED="enabled"
readonly HOOKING_STATUS_DISABLED_SANITY="disabled_sanity_check"
readonly HOOKING_STATUS_INSTALLATION_FAILED="installation_failed"

readonly AGENT_CONF_RUNTIME_PATH=${SIF_AGENT_RUNTIME_DIR}/runtime
readonly AGENT_CONF_WATCHDOG_PATH=${SIF_AGENT_RUNTIME_DIR}/watchdog
readonly TMP_FOLDER=${SIF_AGENT_RUNTIME_DIR}/installer_tmp
readonly AGENT_LOG_MODULE=logmodule

readonly AGENT_PROC_RUNTIME_CONF_FILE_NAME="ruxitagentproc.conf"
readonly DEPLOYMENT_CONF_FILE_NAME="deployment.conf"
readonly HOST_AUTOTAG_CONF_FILE_NAME="hostautotag.conf"
readonly HOST_ID_FILE_NAME="ruxithost.id"
readonly MONITORINGMODE_CONF_FILE_NAME="monitoringmode.conf"
readonly LOG_ANALYTICS_CONF_FILE_NAME="ruxitagentloganalytics.conf"
readonly WATCHDOG_CONF_FILE_NAME="watchdog.conf"
readonly WATCHDOG_RUNTIME_CONF_FILE_NAME="watchdogruntime.conf"
readonly WATCHDOG_USER_CONF_FILE_NAME="watchdoguserconfig.conf"
readonly EXTENSIONS_USER_CONF_FILE_NAME="extensionsuser.conf"
readonly PLUGIN_USER_CONF_FILE_NAME="pluginuser.conf"
readonly CONTAINER_CONF_FILE_NAME="container.conf"

readonly INSTALLATION_CONF_FILE="${SIF_AGENT_PERSISTENT_CONFIG_PATH}/${SIF_INSTALLATION_CONF_FILE_NAME}"
readonly DEPLOYMENT_CONF_FILE="${SIF_AGENT_PERSISTENT_CONFIG_PATH}/${DEPLOYMENT_CONF_FILE_NAME}"
readonly MONITORINGMODE_CONF_FILE="${SIF_AGENT_PERSISTENT_CONFIG_PATH}/monitoringmode.conf"

# This constant is shared with oneagentosconfig set-core-pattern
readonly DUMP_PROC_SYMLINK_PATH="${SIF_AGENT_INSTALL_PATH}/rdp"

readonly CORE_PATTERN_PATH="/proc/sys/kernel/core_pattern"
readonly BACKUP_CORE_PATTERN_PATH="${SIF_AGENT_INSTALL_PATH}/conf/original_core_pattern"
readonly BACKUP_SYSCTL_CORE_PATTERN_ENTRY_PATH="${SIF_AGENT_INSTALL_PATH}/conf/original.sysctl.corepattern"
readonly BACKUP_UBUNTU_APPORT_CONFIG="${SIF_AGENT_INSTALL_PATH}/conf/backup_apport_config"
readonly UBUNTU_APPORT_CONFIG_PATH="/etc/default/apport"
readonly REDHAT_ABRT_SERVICE_NAME="abrt-ccpp"
readonly REDHAT_ABRT_SCRIPT_PATH="/etc/init.d/${REDHAT_ABRT_SERVICE_NAME}"
readonly SYSCTL_PATH="/etc/sysctl.conf"
readonly SYSCTL_CORE_PATTERN_OPTION="kernel.core_pattern"

readonly UNINSTALL_INFO_FILE_LEGACY_PATH="${SIF_AGENT_CONF_PATH}/uninstall.info"
readonly AGENT_CRIO_HOOK_BASEFILENAME="${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}_crio_injection"
readonly INSTALLATION_LOCK_FILE="/tmp/${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}.lock"
readonly PA_FALLBACK_INSTALLATION_PATH="${SIF_AGENT_INSTALL_PATH}/processagent"
readonly AGENT_STATE_FILE_PATH="${SIF_AGENT_PERSISTENT_CONFIG_PATH}/agent.state"
readonly AGENT_STATE_FILE_LEGACY_PATH="${SIF_AGENT_INSTALL_PATH}/agent.state"
readonly DOWNLOADS_DIRECTORY="${SIF_AGENT_RUNTIME_DIR}/downloads"
readonly SERVICE_LOG_FILE="service.log"

readonly INIT_SYSTEM_SYSV="SysV"
readonly INIT_SYSTEM_SYSTEMD="systemd"
readonly SYSTEMD_UNIT_FILE_AGENT="${SIF_INITD_FILE}.service"
readonly SYSTEMD_UNIT_FILES_FOLDER="/etc/systemd/system/"
readonly SYSTEMD_RUNTIME_UNIT_FILES_FOLDER="/run/systemd/system"

readonly EXIT_CODE_OK=0
readonly EXIT_CODE_GENERIC_ERROR=1
readonly EXIT_CODE_WATCHDOG_NOT_RUNNING_LOCKED=2
readonly EXIT_CODE_WATCHDOG_NOT_RUNNING=3
readonly EXIT_CODE_NOT_ENOUGH_SPACE=6
readonly EXIT_CODE_NOT_ENOUGH_MEMORY=7
readonly EXIT_CODE_INVALID_PARAM=8
readonly EXIT_CODE_INSUFFICIENT_PERMISSIONS=9
readonly EXIT_CODE_SEMANAGE_NOT_FOUND=10
readonly EXIT_CODE_SIGNAL_RECEIVED=12
readonly EXIT_CODE_ANOTHER_INSTALLER_RUNNING=13
readonly EXIT_CODE_AGENT_CONTAINER_RUNNING=14
readonly EXIT_CODE_GLIBC_VERSION_TOO_LOW=15
readonly EXIT_CODE_CORRUPTED_PACKAGE=16
readonly EXIT_CODE_MISCONFIGURED_ENVIRONMENT=17
readonly EXIT_CODE_UNSUPPORTED_DOWNGRADE=18
readonly EXIT_CODE_OS_NOT_SUPPORTED=19
readonly EXIT_CODE_SELINUX_MODULE_INSTALLATION_FAILED=20

toLog() {
	if [ -e "${LOG_FILE}" ]; then
		local level="${1}"
		shift

		(
			IFS="
"
			#shellcheck disable=SC2068
			for line in $@; do
				printf "%s UTC %s %s\n" "$(date -u +"%Y-%m-%d %H:%M:%S")" "${level}" "${line}" >>"${LOG_FILE}" 2>/dev/null
			done
		)
	fi
}

createLogDirsIfMissing() {
	local logDir="${1}"
	if [ ! "${logDir}" ]; then
		sif_toConsoleError "Log directory value is empty"
		return
	fi

	sif_createDirIfNotExistAndSetRights "${logDir}" 1777
	sif_createDirIfNotExistAndSetRights "${logDir}/process" 1777

	if [ "${ARCH_HAS_DUMPPROC}" ]; then
		sif_createDirIfNotExistAndSetRights "${logDir}/dumpproc" 1777
	fi

	local agentLogDirs="${SIF_INSTALLER_LOG_SUBDIR} os watchdog"
	if [ "${ARCH_HAS_NETWORKAGENT}" ]; then
		agentLogDirs="${agentLogDirs} network"
	fi
	if [ "${ARCH_HAS_PLUGINAGENT}" ]; then
		agentLogDirs="${agentLogDirs} plugin"
	fi
	if [ "${ARCH_HAS_LOGANALYTICS_AGENT}" ]; then
		agentLogDirs="${agentLogDirs} loganalytics"
	fi
	if [ "${ARCH_HAS_EXTENSIONS}" ]; then
		agentLogDirs="${agentLogDirs} extensions"
	fi

	for subdir in ${agentLogDirs}; do
		sif_createDirIfNotExistAndSetRights "${logDir}/${subdir}" 775
	done
}

################################################################################
#	Platform characteristics detection
################################################################################
getOsReleasePath() {
	local osReleasePath="/etc/os-release"
	if [ ! -f "${osReleasePath}" ]; then
		osReleasePath="/usr/lib/os-release"
	fi

	printf '%s' "${osReleasePath}"
}

parseOsReleaseFile() {
	local osReleasePath="$(getOsReleasePath)"

	#shellcheck disable=SC1090
	. "${osReleasePath}"
	local distrib="${NAME-}"
	if [ -z "${distrib}" ]; then
		distrib="${ID-}"
	fi

	local version="${VERSION_ID-}"
	if printf '%s' "${distrib}" | grep -iq "debian"; then
		version="$(cat /etc/debian_version)"
	elif printf '%s' "${distrib}" | grep -iq "fedora" && [ "${VARIANT_ID-}" = "coreos" ]; then
		distrib="${distrib} CoreOS"
	fi

	printf '%s %s' "${distrib}" "${version}"
}

detectLinuxDistribution() {
	if [ -f /etc/oracle-release ]; then
		cat /etc/oracle-release
	elif [ -f /etc/fedora-release ]; then
		if [ -f "$(getOsReleasePath)" ]; then
			(
				parseOsReleaseFile
			)
		else
			cat /etc/fedora-release
		fi
	elif [ -f /etc/redhat-release ]; then
		cat /etc/redhat-release
	elif [ -f "$(getOsReleasePath)" ]; then
		(
			parseOsReleaseFile
		)
	elif [ -f /etc/SuSE-release ]; then
		head -1 /etc/SuSE-release
	elif [ -f /etc/lsb-release ]; then
		(
			. /etc/lsb-release
			printf "%s %s" "${DISTRIB_ID-}" "${DISTRIB_RELEASE-}"
		)
	elif ls /etc/*release* >/dev/null 2>&1; then
		# Generic fallback
		cat /etc/*release*
	else
		printf "AIX %s" "$(oslevel -s 2>&1)"
	fi
}

checkInitSystem() {
	local version
	if version="$(systemctl --version 2>&1)"; then
		if [ -d "${SYSTEMD_RUNTIME_UNIT_FILES_FOLDER}" ]; then
			readonly INIT_SYSTEM=${INIT_SYSTEM_SYSTEMD}
		else
			readonly INIT_SYSTEM=${INIT_SYSTEM_SYSV}
			sif_toLogWarning "${INIT_SYSTEM_SYSTEMD} was detected but ${SYSTEMD_UNIT_FILES_FOLDER} does not exist, using ${INIT_SYSTEM_SYSV} handling as a fallback"
		fi
	else
		readonly INIT_SYSTEM=${INIT_SYSTEM_SYSV}
		if ! version="$(init --version 2>&1)"; then
			if [ "${ARCH_ARCH}" = "AIX" ] || ! version="$(chkconfig --version 2>&1)"; then
				version="$(head -n1 /etc/inittab 2>&1)"
			fi
		fi
	fi

	readonly INIT_SYSTEM_VERSION="$(printf '%s' "${version}" 2>/dev/null | head -n1)"
}

setLocationOfInitScripts() {
	sif_toLogInfo "Determining location of init scripts..."

	if [ "${INIT_SYSTEM}" = "${INIT_SYSTEM_SYSTEMD}" ] || [ "${ARCH_ARCH}" = "AIX" ]; then
		readonly INIT_FOLDER="${SIF_AGENT_INIT_SCRIPTS_FOLDER}"
	else
		if [ -d "/etc/init.d" ]; then
			readonly INIT_FOLDER="/etc/init.d"
		elif [ -d "/sbin/init.d" ]; then
			readonly INIT_FOLDER="/sbin/init.d"
		elif [ -d "/etc/rc.d" ]; then
			readonly INIT_FOLDER="/etc/rc.d"
		else
			return 1
		fi
	fi

	sif_toLogInfo "Location of init scripts ${INIT_FOLDER}"
	return 0
}

detectArchitecture() {
	local detected_arch=
	if isAvailable arch; then
		detected_arch="$(arch | tr '[:lower:]' '[:upper:]')"
	fi

	if [ -z "${detected_arch}" ]; then
		detected_arch="$(uname -m | tr '[:lower:]' '[:upper:]')"
	fi

	printf '%s' "${detected_arch}"
}

################################################################################
#	Misc functions
################################################################################
getTmpFolderPath() {
	if [ -e "${TMP_FOLDER}" ]; then
		printf '%s' "${TMP_FOLDER}"
	else
		printf '/tmp'
	fi
}

getBinariesFolderByBitness() {
	local bitness="${1}"
	if [ "${bitness}" -eq 32 ]; then
		bitness=""
	fi
	printf 'lib%s' "${bitness}"
}

getAgentInstallActionPath() {
	getAgentInstallActionPathByBitness "64"
}

getAgentInstallActionPathByBitness() {
	local bitness="${1}"
	local binFolder="$(getBinariesFolderByBitness "${bitness}")"
	printf "%s" "${SIF_AGENT_INSTALL_PATH}/${binFolder}/${AGENT_INSTALL_ACTION_BIN}"
}

getPreinjectCheckBinaryPath() {
	local bitness="${1}"
	local binFolder="$(getBinariesFolderByBitness "${bitness}")"
	printf "%s" "${SIF_AGENT_INSTALL_PATH}/${binFolder}/${AGENT_PREINJECT_CHECK_BIN}"
}

setProcessAgentEnabled() {
	local enabled="${1}"
	sif_toLogInfo "Setting process agent enabled: ${enabled}..."
	local changeStatus=
	changeStatus=$("$(getAgentInstallActionPath)" --set-process-agent-enabled "${enabled}" 2>&1)
	sif_toLogAdaptive $? "Process agent enable(${enabled}) status: ${changeStatus}"
}

commandErrorWrapper() {
	local errorOutput
	{
		errorOutput="$("${@}" 3>&2 2>&1 1>&3)"
	} 2>&1

	local returnCode=$?

	if [ ${returnCode} -ne 0 ]; then
		sif_toLogWarning "Command '${*}' failed, return code: ${returnCode}, message: ${errorOutput}"
	fi

	return ${returnCode}
}

redirectOutputTo() {
	local logFile="${1}"
	shift
	if [ -w "${logFile}" ]; then
		"${@}" >>"${logFile}" 2>&1
	else
		"${@}"
	fi
}

getWatchdogPid() {
	listProcesses "watchdog PID" "${SIF_AGENT_WATCHDOG}" "sudo"
}

isProcessRunningInContainer() {
	if [ "${ARCH_ARCH}" = "AIX" ]; then
		return 1
	fi

	local pid="${1}"
	[ "$(sif_isNamespaceIsolated "${pid}" mnt)" = "true" ] || [ -f /.dockerenv ] || [ -f /run/.containerenv ]
}

isImmutableContainerBuild() {
	[ "${PARAM_INTERNAL_CONTAINER_BUILD}" = "true" ]
}

isDeployedViaContainer() {
	isImmutableContainerBuild || grep -q "${SIF_CONTAINER_DEPLOYMENT_CONF_STATE_ENTRY}=true" "${SIF_CONTAINER_DEPLOYMENT_CONF_FILE}" 2>/dev/null
}

checkRootAccess() {
	sif_toConsoleInfo "Checking root privileges..."
	sif_toConsoleInfo "Process real user: $(id -unr), real ID: $(id -ur)"
	sif_toConsoleInfo "Process effective user: $(id -un), effective ID: $(id -u)"

	if [ "$(id -u)" != "0" ]; then
		sif_toConsoleError "NOT OK"
		return 1
	fi

	sif_toConsoleInfo "OK"
	return 0
}

removeIfExists() {
	local pathToRemove="${1}"
	if [ ! -e "${pathToRemove}" ]; then
		sif_toLogInfo "${pathToRemove} does not exist, skipping removal"
		return
	fi

	if ! commandErrorWrapper rm -rf "${pathToRemove}"; then
		sif_toLogWarning "Failed to remove ${pathToRemove}"
	fi
}

prepareTempFolder() {
	if [ ! -e "${TMP_FOLDER}" ]; then
		sif_toLogInfo "Creating temporary folder ${TMP_FOLDER}"
		sif_createDirIfNotExistAndSetRights "${TMP_FOLDER}" 775
	fi
}

################################################################################
#	SELinux related functions
################################################################################
seLinuxGetInstalledPolicyInfo() {
	local output
	if ! output="$(semodule -l 2>&1)"; then
		sif_toLogWarning "Failed to list SELinux modules, error: ${output}"
		return 1
	fi
	printf '%s' "${output}" | grep "${SELINUXPOLICY_BASEFILENAME}"
}

seLinuxGetInstalledPolicyName() {
	local output
	if output="$(seLinuxGetInstalledPolicyInfo)"; then
		printf '%s' "${output}" | awk '{print $1}'
		return 0
	fi
	return 1
}

cleanUpOldPolicies() {
	local policyName
	if ! policyName="$(seLinuxGetInstalledPolicyName)"; then
		return
	fi

	sif_toLogInfo "Removing ${policyName} module"

	local errorMessage
	if ! errorMessage="$(semodule -vr "${policyName}" 2>&1)"; then
		sif_toConsoleError "Failed to remove ${policyName} module."
		sif_toLogError "[semodule error]: ${errorMessage}"
		return
	fi

	sif_toConsoleInfo "${policyName} module removed."
}

removeSELinuxFilecontextPath() {
	local path="${1}"
	sif_toLogInfo "Searching for custom file contexts matching \"${path}\""

	local contexts="$("$(getOsConfigBinPath)" semanage-fcontext-list-local-equivalences 2>>"${LOG_FILE}" | grep "${path}" | awk '{print $1}')"
	for c in ${contexts}; do
		sif_toLogInfo "Removing custom file context from: ${c}"

		local output
		output="$("$(getOsConfigBinPath)" semanage-fcontext-delete-context "${c}" 2>&1)"
		local exitCode=$?
		if [ ${exitCode} -ne 0 ]; then
			sif_toLogError "exit code: ${exitCode}, output: ${output}"
		fi
	done
}

removeSELinuxFilecontextForCustomPaths() {
	if ! isAvailable semanage; then
		sif_toLogInfo "semanage not found, skipping SELinux file contexts removal"
		return
	fi

	sif_toLogInfo "Removing SELinux file contexts for custom paths"
	removeSELinuxFilecontextPath "${SIF_INSTALL_PATH}"
	removeSELinuxFilecontextPath "${SIF_DATA_STORAGE_DIR}"
	removeSELinuxFilecontextPath "${SIF_RUNTIME_DIR}"
	removeSELinuxFilecontextPath "${SIF_LOG_PATH}"
	removeSELinuxFilecontextPath "${SIF_ENRICHMENT_DIR}"

	removeLegacyFilecontextDefinitions
}

removeLegacyFilecontextDefinitions() {
	sif_toLogInfo "Searching for legacy SELinux file context definitions"
	local installDir="$(readLink -f "${SIF_INSTALL_PATH}")"
	if [ "${installDir}" != "${SIF_INSTALL_PATH}" ]; then
		removeSELinuxFilecontextPath "${installDir}"
	fi

	local runtimeDir="$(readLink -f "${SIF_RUNTIME_DIR}")"
	if [ "${runtimeDir}" != "${SIF_RUNTIME_DIR}" ]; then
		removeSELinuxFilecontextPath "${runtimeDir}"
	fi

	local dataStorageDir="$(readLink -f "$(readDataStorageDirFromConfig)")"
	if [ "${dataStorageDir}" != "${SIF_DATA_STORAGE_DIR}" ]; then
		removeSELinuxFilecontextPath "${dataStorageDir}"
	fi

	local logDir="$(readLink -f "$(readLogDirFromConfig)")"
	if [ "${logDir}" != "${SIF_LOG_PATH}" ]; then
		removeSELinuxFilecontextPath "${logDir}"
	fi

	local enrichmentDir="$(readLink -f "${SIF_ENRICHMENT_DIR}")"
	if [ "${enrichmentDir}" != "${SIF_ENRICHMENT_DIR}" ]; then
		removeSELinuxFilecontextPath "${enrichmentDir}"
	fi
}

executeUsingOsConfigBin() {
	local command="${1}"
	local unit="${2}"
	if [ "${unit}" ]; then
		command="${command}-${unit}"
		unit=""
	fi

	local output=
	output="$("$(getOsConfigBinPath)" "${command}" 2>&1)"
	local exitCode=$?
	sif_toLogAdaptive ${exitCode} "Executed $(getOsConfigBinPath) ${command} ${unit}, exitCode = ${exitCode}, output: ${output}"
	return ${exitCode}
}

executeSystemctlCommand() {
	local command="${1}"
	local unit="${2}"

	if [ "$(id -u)" != 0 ]; then
		executeUsingOsConfigBin "${command}" "${unit}"
		return $?
	fi

	local output=
	#shellcheck disable=SC2086
	output="$(systemctl "${command}" ${unit} 2>&1)"
	local exitCode=$?

	if [ ${exitCode} -eq 0 ]; then
		sif_toLogInfo "Successfully executed: systemctl ${command} ${unit}"
	else
		sif_toLogError "Failed to execute: systemctl ${command} ${unit}"
		sif_toLogError "Command output: ${output}"
		if [ -n "${unit}" ]; then
			local reachBackNumSeconds=360
			sif_toLogError "journalctl output: $(journalctl -u "${unit}" --since=-${reachBackNumSeconds} 2>&1)"
		fi
	fi

	return ${exitCode}
} 2>>"${LOG_FILE}"

executeInitScriptCommand() {
	local command=
	local parameters="$*"
	local output=
	local exitCode=

	if [ "${ARCH_ARCH}" = "AIX" ] || ! isAvailable service; then
		command="${INIT_FOLDER}/${SIF_INITD_FILE}"
	else
		command="service"
		parameters="${SIF_INITD_FILE} ${parameters}"
	fi
	#shellcheck disable=SC2086
	output="$("${command}" ${parameters} 2>&1)"
	exitCode=$?
	sif_toLogAdaptive ${exitCode} "Executed command: \"${command} ${parameters}\", exitCode = ${exitCode}, output: ${output}"
	return ${exitCode}
}

signalHandler() {
	local signal="${1}"
	local callback="${2}"
	sif_toLogWarning "process received signal: ${signal}"
	${callback}
	exit ${EXIT_CODE_SIGNAL_RECEIVED}
}

configureSignalHandling() {
	local callback="${1}"
	for signal in HUP INT QUIT ABRT ALRM TERM; do
		#shellcheck disable=SC2064
		trap "signalHandler ${signal} ${callback}" ${signal}
	done

	trap "" PIPE
}

checkIfWatchdogWithPidExists() {
	local pattern="${1}"
	getWatchdogPid | grep -qw "${pattern}"
}

# waitTime must be divisible by 10
sendSignalToProcessAndWaitForStop() {
	local pidCheckingFunction="${1}"
	local signal="${2}"
	local action="${3}"
	local waitTime="${4}"
	local pidToStop="${5}"

	if ! ${pidCheckingFunction} "${pidToStop}"; then
		sif_toLogInfo "Process with pid ${pidToStop} doesn't exist"
		return
	fi

	sif_toConsoleInfo "Waiting ${waitTime} seconds for process with pid ${pidToStop} to ${action}."
	while [ "${waitTime}" -gt 0 ]; do
		if [ "$((waitTime % 10))" -eq 0 ]; then
			sif_toLogInfo "Sending signal: ${signal} to ${pidToStop}"
			local output
			if ! output="$(kill -s "${signal}" "${pidToStop}" 2>&1)"; then
				sif_toLogInfo "Sending signal error: ${output}"
			fi
		fi

		if ! ${pidCheckingFunction} "${pidToStop}"; then
			return 0
		fi
		sleep 1
		waitTime=$((waitTime - 1))
	done
	return 1
}

stopWatchdogIfRunning() {
	local signal="${1}"
	local watchdogPid
	if ! watchdogPid="$(getWatchdogPid)"; then
		return
	fi

	local watchdogPidToStop
	for watchdogPidToStop in ${watchdogPid}; do
		sif_toConsoleInfo "Stopping ${SIF_AGENT_PRODUCT_NAME}. Watchdog pid: ${watchdogPidToStop}."

		if sendSignalToProcessAndWaitForStop "checkIfWatchdogWithPidExists" "${signal}" "stop" 90 "${watchdogPidToStop}"; then
			sif_toConsoleInfo "Watchdog process ${watchdogPidToStop} stopped."
		else
			sif_toConsoleWarning "Watchdog is still running. Killing watchdog process ${watchdogPidToStop}."
			sendSignalToProcessAndWaitForStop "checkIfWatchdogWithPidExists" "9" "be killed" 10 "${watchdogPidToStop}"
		fi
	done
}

testWriteAccessToDir() {
	local errorFile="$(getTmpFolderPath)/oneagent_commandError_$$"
	local dir="${1}"
	local tmpfilename
	if [ "${ARCH_ARCH}" = "AIX" ]; then
		#shellcheck disable=SC3028
		tmpfilename="${dir}/.tmp_${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}.$$${RANDOM}"
		touch "${tmpfilename}" 2>"${errorFile}"
	else
		tmpfilename="$(mktemp -p "${dir}" ".tmp_${SIF_BRANDING_PRODUCTSHORTNAME_LOWER}.XXXXXXXXXXXXXX" 2>"${errorFile}")"
	fi

	#shellcheck disable=SC2181
	if [ $? -ne 0 ]; then
		sif_toLogInfo "$(cat "${errorFile}")"
		rm -f "${errorFile}"
		return 1
	fi

	rm -f "${tmpfilename}" "${errorFile}"
	return 0
}

systemLibDirSanityCheck() {
	local dir="${1}"
	if [ ! -d "${dir}" ]; then
		sif_toLogWarning "Directory: ${dir} does not exist"
		printf ""
		return
	fi

	if ! testWriteAccessToDir "${dir}"; then
		sif_toLogWarning "Detected that ${dir} is not writable"
		dir="${PA_FALLBACK_INSTALLATION_PATH}${dir}"
		sif_createDirIfNotExistAndSetRights "${dir}" 755
	fi

	printf "%s" "${dir}"
}

isNonRootModeEnabled() {
	local output="$(commandErrorWrapper "$(getAgentInstallActionPath)" "--get-drop-root-privileges")"
	printf '%s' "${output}" | grep -qE "(true|no_ambient)"
}

runAutostartAddingTool() {
	local prefix="${1}"
	local file="${2}"
	local suffix="${3}"
	local output

	if isNonRootModeEnabled && printf '%s' "${prefix}" | grep -q "chkconfig"; then
		local action="chkconfig-add"
		if printf '%s' "${prefix}" | grep -q -- "--del"; then
			action="chkconfig-del"
		fi
		sif_toLogInfo "Using ${AGENT_OS_CONFIG_BIN} ${action}-${file} to modify autostart"
		output="$("$(getOsConfigBinPath)" "${action}-${file}" 2>&1)"
	else
		local command="${prefix}${file} ${suffix}"
		sif_toLogInfo "Executing ${command}"
		output="$(${command} 2>&1)"
	fi
	local status=$?

	if [ "${output}" ]; then
		sif_toLogAdaptive ${status} "${output}"
	fi

	return ${status}
}

readLinkFromLs() {
	local path="${1}"
	local result="${path}"
	local lsOutput="$(ls -dl "${path}" 2>/dev/null)"
	if printf '%s' "${lsOutput}" | grep -q " -> "; then
		local parsedLinkTarget="$(printf '%s' "${lsOutput}" | sed 's|^.* -> ||')"
		if [ "${parsedLinkTarget}" ]; then
			result="${parsedLinkTarget}"
		else
			sif_toLogWarning "Failed to parse ls output '${lsOutput}'"
		fi
	fi
	printf '%s' "${result}"
}

readLink() {
	local args=-e
	local path="${1}"
	if [ "${2}" ]; then
		args="${1}"
		path="${2}"
	fi

	(
		if [ "${ARCH_ARCH}" = "AIX" ]; then
			# shellcheck disable=SC2030
			PATH="${PATH}:/opt/freeware/bin"
		fi

		if isAvailable readlink; then
			#shellcheck disable=SC2086
			readlink ${args} "${path}"
		else
			sif_toLogInfo "readlink command not found, falling back to parsing ls output"
			readLinkFromLs "${path}"
		fi
	)
}

listProcesses() {
	local errorMessage="${1}"
	local includeRegex="${2}"

	local excludeRegex=" grep "
	if [ "${3}" ]; then
		excludeRegex=" grep |${3}"
	fi

	local output
	if ! output="$(ps -e -o "pid,args" 2>&1 | awk '{{ print $1,$2 }}')"; then
		sif_toLogError "Failed to get ${errorMessage}, output: ${output}"
		return 1
	fi

	local foundProcesses="$(printf '%s' "${output}" | grep -E "${includeRegex}" | grep -vE "${excludeRegex}")"
	if [ ! "${foundProcesses}" ]; then
		return 1
	fi

	printf '%s' "${foundProcesses}" | awk '{{ print $1 }}'
	return 0
}

isAvailable() {
	command -v "${1}" >/dev/null 2>&1
}

isAnotherInstallationRunning() {
	if [ ! -f "${INSTALLATION_LOCK_FILE}" ]; then
		return 1
	fi

	local pidFromLockFile="$(head -n 1 "${INSTALLATION_LOCK_FILE}")"
	local nameFromLockFile="$(tail -n 1 "${INSTALLATION_LOCK_FILE}")"
	if [ "$(wc -l <"${INSTALLATION_LOCK_FILE}")" -ne 2 ] || [ -z "${pidFromLockFile}" ] || [ -z "${nameFromLockFile}" ]; then
		sif_toConsoleWarning "Installation lock file ${INSTALLATION_LOCK_FILE} is damaged, skipping uniqueness check."
		sif_toConsoleWarning "Lock file contents: '$(cat "${INSTALLATION_LOCK_FILE}")'"
		return 1
	fi

	#shellcheck disable=SC2009
	local foundProcesses="$(ps -e -o "pid,args" 2>&1 | grep -w "${nameFromLockFile}" | grep -v " grep ")"
	if printf '%s' "${foundProcesses}" | awk '{ print $1 }' | grep -wq "${pidFromLockFile}"; then
		local errorMessage="Another ${SIF_BRANDING_PRODUCTSHORTNAME} installer or uninstaller is already running"
		if printf '%s' "${foundProcesses}" | grep -q "${DOWNLOADS_DIRECTORY}"; then
			errorMessage="${errorMessage} (AutoUpdate is in progress)"
		fi

		sif_toConsoleError "${errorMessage}, PID ${pidFromLockFile}. Exiting."
		return 0
	fi

	sif_toConsoleInfo "Lock file exists but corresponding installation process does not run, contents of lock file: ${pidFromLockFile}, ${nameFromLockFile}."
	return 1
}

createInstallationLockFile() {
	printf '%s\n%s\n' "$$" "$0" >"${INSTALLATION_LOCK_FILE}" 2>/dev/null
}

removeInstallationLockFile() {
	sif_toLogInfo "Removing installation lock file."
	rm -f "${INSTALLATION_LOCK_FILE}"
}

readHostname() {
	if isAvailable hostname; then
		hostname
	elif [ -f "/etc/hostname" ]; then
		cat /etc/hostname
	fi
}

logBasicStartupInformation() {
	sif_toLogInfo "Command line: $(sif_removeSecretsFromString "${@}")"
	sif_toLogInfo "Shell options: $-"
	sif_toLogInfo "Working dir: $(pwd)"
	sif_toLogInfo "PID: $$"
	sif_toLogInfo "Parent process: $(
		printf '\n'
		ps -o user,pid,ppid,comm -p ${PPID} 2>&1
	)"
	sif_toLogInfo "User id: $(id -u)"
	sif_toLogInfo "Hostname: $(readHostname)"
}

getAllAgentsPids() {
	listProcesses "all agents PIDs" "${AGENT_BIN}|${AGENT_LOG_ANALYTICS}|${AGENT_NETWORK}|${AGENT_PLUGIN}|${AGENT_EXTENSIONS}|${AGENT_EVENTSTRACER_BIN}|${SIF_AGENT_HELPER}" "${SIF_AGENT_WATCHDOG}|${AGENT_OS_CONFIG_BIN}"
}

checkIfAgentWithPidExists() {
	local pidToCheck="${1}"
	getAllAgentsPids | grep -qw "${pidToCheck}"
}

mapPidsToName() {
	local pids="${1}"
	local output
	for pid in ${pids}; do
		local name="$(grep 'Name:' "/proc/${pid}/status" 2>/dev/null | awk '{print $2}')"
		output="${output}, ${pid} (${name})"
	done

	printf '%s' "${output}" | cut -c 3-
}

stopAgentLeftovers() {
	local signal="${1}"

	local allAgentsPids="$(getAllAgentsPids)"
	if [ ! "${allAgentsPids}" ]; then
		return
	fi

	sif_toConsoleInfo "Agent is running. Stopping ${SIF_AGENT_PRODUCT_NAME}. Agent pid(s): $(mapPidsToName "${allAgentsPids}")."
	for agentPidToStop in ${allAgentsPids}; do
		sif_toConsoleInfo "Stopping agent process with pid: ${agentPidToStop}."

		if sendSignalToProcessAndWaitForStop "checkIfAgentWithPidExists" "${signal}" "stop" 30 "${agentPidToStop}"; then
			sif_toLogInfo "Agent with pid ${agentPidToStop} stopped"
		else
			sif_toConsoleWarning "Agent still running. Killing agent process."
			sendSignalToProcessAndWaitForStop "checkIfAgentWithPidExists" "9" "be killed" 10 "${agentPidToStop}"
		fi
	done

	allAgentsPids="$(getAllAgentsPids)"

	if [ "${allAgentsPids}" ]; then
		sif_toConsoleError "Failed to stop all agent leftovers. Still exiting pids: $(mapPidsToName "${allAgentsPids}")."
	fi
}

stopAllLeftoverProcesses() {
	local signal="${1}"
	stopWatchdogIfRunning "${signal}"
	stopAgentLeftovers "${signal}"
}

wasHookingDisabledByPreinjectCheck() {
	local hookingStatus="$(commandErrorWrapper "$(getAgentInstallActionPath)" "--get-hooking-status")"
	[ "${hookingStatus}" = "${HOOKING_STATUS_DISABLED_SANITY}" ] || [ "${hookingStatus}" = "${HOOKING_STATUS_INSTALLATION_FAILED}" ]
}

getSystemEntityInfo() {
	local database="${1}"
	local valueToCheck="${2}"

	if ! isAvailable "getent"; then
		sif_toLogInfo "Command getent is not available"
		return 2
	fi

	local output
	output="$(getent "${database}" "${valueToCheck}" 2>&1)"
	local returnCode=$?

	if [ "${returnCode}" != 0 ]; then
		if [ "${returnCode}" != 2 ]; then
			sif_toLogWarning "Failed to check ${valueToCheck} in ${database} database, message: ${output}, code: ${returnCode}"
		fi
		return 1
	elif [ ! "${output}" ]; then
		sif_toLogWarning "Failed to get user information: getent returned no output"
	fi

	printf '%s' "${output}"
	return 0
}

userExistsInSystem() {
	local user="${1}"

	getSystemEntityInfo "passwd" "${user}" >/dev/null
	local returnCode=$?

	if [ ${returnCode} -ne 2 ]; then
		return ${returnCode}
	fi

	sif_toLogInfo "Trying to determine user existence using 'id' command"
	id "${user}" >/dev/null 2>&1
}

readonly GLIBC_SUPPORTED_VERSION=2.12
readonly UNPACK_BINARY=base64
readonly UNPACK_BINARY_ARGS="-di"
readonly ARCH_HAS_DUMPPROC=true
readonly ARCH_HAS_LOGANALYTICS_AGENT=true
readonly ARCH_HAS_NETWORKAGENT=true
readonly ARCH_HAS_PLUGINAGENT=true
readonly ARCH_HAS_NETTRACER=true
readonly ARCH_HAS_LD_SO_PRELOAD=true
readonly ARCH_HAS_SELINUX=true
readonly ARCH_HAS_EXTENSIONS=true
readonly ARCH_ARCH="X86"
readonly ARCH_VERSIONED_LIB_DIR_PREFIX="linux-x86"
readonly ARCH_ROOT_GROUP="root"

arch_checkArchitectureCompatibility() {
	local arch="$(detectArchitecture)"
	if [ "${arch}" = "X86_64" ] || [ "${arch}" = "IA64" ]; then
		arch="X86_64"
	else
		arch="$(uname -m | sed -e 's/i.86/x86/' | sed -e 's/i86pc/x86/' | tr '[:lower:]' '[:upper:]')"
	fi

	printf '%s' "${arch}"
	[ "${arch}" = "X86_64" ]
}

arch_local_getLibraryPathFromLdd() {
	local binary="${1}"
	ldd "${binary}" 2>/dev/null | grep libc.so | awk '{ print $3 }'
}

arch_local_detectProcessAgentDirectoriesBasedOnLdd() {
	local testBinaryPath32="$(getPreinjectCheckBinaryPath 32)"
	sif_toLogInfo "Using \"ldd ${testBinaryPath32}\" output to detect system directories for dynamic libraries"
	local lddResult32="$(arch_local_getLibraryPathFromLdd "${testBinaryPath32}")"

	#case for 64bit system without 32bit libraries installed
	if [ "${lddResult32}" ]; then
		lddResult32="$(dirname "${lddResult32}")"
		readonly SYSTEM_LIB32="$(systemLibDirSanityCheck "${lddResult32}")"
	else
		sif_toLogInfo "Unable to get 32-bit library path based on ldd on 64-bit system"
	fi

	local testBinaryPath64="$(getPreinjectCheckBinaryPath 64)"
	sif_toLogInfo "Using \"ldd ${testBinaryPath64}\" output to detect system directories for dynamic libraries"
	local lddResult64="$(arch_local_getLibraryPathFromLdd "${testBinaryPath64}")"
	if [ "${lddResult64}" ]; then
		lddResult64="$(dirname "${lddResult64}")"
		readonly SYSTEM_LIB64="$(systemLibDirSanityCheck "${lddResult64}")"
	else
		sif_toConsoleError "Installer was not able to detect 64-bit libraries path. For details, see: ${LOG_FILE}"
		return 1
	fi

	return 0
}

arch_local_getSystemLibraryPath() {
	local bitness="${1}"
	local sampleBinary="$(getAgentInstallActionPathByBitness "${bitness}")"

	local systemLibPrefix
	systemLibPrefix="$(arch_runCommandWithTimeout 5 "${sampleBinary}" "--get-system-library-dir" 2>/dev/null)"
	local exitCode=$?
	sif_toLogInfo "System ${bitness}-bit libraries prefix returned by ${AGENT_INSTALL_ACTION_BIN}: '${systemLibPrefix}', exit code = ${exitCode}"

	printf "%s" "${systemLibPrefix}"
	return ${exitCode}
}

arch_local_detectProcessAgentInstallationDirectories() {
	local useLddOutput="false"

	local systemLib32Prefix
	systemLib32Prefix="$(arch_local_getSystemLibraryPath 32)"
	local exitCode=$?

	if [ ! "${systemLib32Prefix}" ]; then
		if [ "${exitCode}" -eq 0 ]; then
			sif_toLogWarning "This is a 64-bit platform with 32-bit libraries installed, but ${AGENT_INSTALL_ACTION_BIN} failed to determine their location"
			useLddOutput="true"
		else
			sif_toLogInfo "This is a 64-bit platform and 32-bit libraries were not detected"
		fi
	else
		systemLib32Prefix="$(systemLibDirSanityCheck "/${systemLib32Prefix}")"
		if [ ! "${systemLib32Prefix}" ]; then
			useLddOutput="true"
		fi
	fi

	local systemLib64Prefix="$(arch_local_getSystemLibraryPath 64)"
	if [ ! "${systemLib64Prefix}" ]; then
		sif_toLogWarning "This is a 64-bit platform, but ${AGENT_INSTALL_ACTION_BIN} failed to determine location of 64-bit libraries"
		useLddOutput="true"
	else
		systemLib64Prefix="$(systemLibDirSanityCheck "/${systemLib64Prefix}")"
		if [ ! "${systemLib64Prefix}" ]; then
			useLddOutput="true"
		fi
	fi

	if [ "${useLddOutput}" = "true" ]; then
		arch_local_detectProcessAgentDirectoriesBasedOnLdd
	else
		readonly SYSTEM_LIB32="${systemLib32Prefix}"
		readonly SYSTEM_LIB64="${systemLib64Prefix}"
	fi
} 2>>"${LOG_FILE}"

arch_detectProcessAgentInstallationDirectories() {
	if isDeployedViaContainer; then
		readonly SYSTEM_LIB32="${PA_FALLBACK_INSTALLATION_PATH}/lib32"
		readonly SYSTEM_LIB64="${PA_FALLBACK_INSTALLATION_PATH}/lib64"
		sif_createDirIfNotExistAndSetRights "${SYSTEM_LIB32}" 755
		sif_createDirIfNotExistAndSetRights "${SYSTEM_LIB64}" 755
		return 0
	fi

	arch_local_detectProcessAgentInstallationDirectories
}

arch_getLibMacro() {
	local libMacro=""
	if [ "${SYSTEM_LIB32}" ]; then
		#shellcheck disable=SC2016
		libMacro='/$LIB'
	fi
	printf "%s" "${libMacro}"
}

arch_checkGlibc() {
	local glibcVersion="$(ldd --version | awk 'NR==1{ print $NF }')"

	sif_toLogInfo "Detected glibc version: ${glibcVersion}"

	if [ "$(format_version "${glibcVersion}")" -gt "$(format_version "${GLIBC_SUPPORTED_VERSION}")" ]; then
		return
	elif [ "$(format_version "${glibcVersion}")" -lt "$(format_version "${GLIBC_SUPPORTED_VERSION}")" ]; then
		sif_toConsoleError "We can't continue setup. The glibc version: ${glibcVersion} detected on your system isn't supported."
		sif_toConsoleError "To install ${SIF_AGENT_PRODUCT_NAME} you need at least glibc ${GLIBC_SUPPORTED_VERSION}."
		sif_toConsoleError "Stopping installation process..."
		finishInstallation "${EXIT_CODE_GLIBC_VERSION_TOO_LOW}"
	fi
}

arch_runCommandWithTimeout() {
	timeout -s KILL "${@}"
}

arch_getAccessRights() {
	stat -L --format='%A' "${1}"
}

arch_executePreinjectBinary() {
	local bitness="${1}"
	local preloadLib="${2}"
	LD_PRELOAD="${preloadLib}" "$(getAgentInstallActionPathByBitness "${bitness}")" --execute-preinject-check
}

arch_preloadTest() {
	if [ "${SYSTEM_LIB32}" ]; then
		performLdPreloadPreinjectCheck 32 "arch_executePreinjectBinary"
		local returnCode=$?
		if [ ${returnCode} -ne 0 ]; then
			return ${returnCode}
		fi
	fi

	if [ "${SYSTEM_LIB64}" ]; then
		performLdPreloadPreinjectCheck 64 "arch_executePreinjectBinary"
	fi
}

arch_checkEnvironmentConfiguration() {
	if ! stat --format='%t,%T' /dev/null | grep -q "1,3"; then
		sif_toLogInfo "$(stat /dev/null)"
		sif_toConsoleError "Installer detected corruption of '/dev/null': Not a character device"
		return "${EXIT_CODE_MISCONFIGURED_ENVIRONMENT}"
	fi

	return 0
}

arch_moveReplaceTarget() {
	local source="${1}"
	local target="${2}"
	mv -fT "${source}" "${target}"
}

#!/bin/sh

isAgentRunning() {
	local running="false"

	if getWatchdogPid >/dev/null; then
		running="true"
	fi

	sif_toLogInfo "Agent is running: ${running}"

	if isDeployedViaContainer; then
		local agentRunningInContainer="false"
		if isAgentRunningInContainer; then
			agentRunningInContainer="true"
		fi
		sif_toLogInfo "Agent is running inside a container: ${agentRunningInContainer}"
	fi
}

initLog() {
	if ! isDeployedInVolumeStorage; then
		createLogDirsIfMissing "$(getLogPath)"
	fi

	touch "${LOG_FILE}"
	sif_toConsoleInfo "Uninstallation started, PID $$."
	sif_toLogInfo "Distribution: $(detectLinuxDistribution)"
	logBasicStartupInformation "${@}"
	isAgentRunning
}

finishUninstallation() {
	removeInstallationLockFile
	sif_toConsoleInfo "Uninstallation finished successfully"
	exit "${EXIT_CODE_OK}"
}

turnOffProcessAgent() {
	if [ "${ARCH_HAS_LD_SO_PRELOAD}" ]; then
		sif_toConsoleInfo "Removing entries for preloading"
		setProcessAgentEnabled "false"

		if ! grep -Eq "[[:alnum:]]" "/etc/ld.so.preload" 2>/dev/null; then
			rm -f "/etc/ld.so.preload"
		fi
	fi
}

getLogPath() {
	if isDeployedInVolumeStorage; then
		local installDir="$(getVolumeStorageAgentInstallDir)"
		sif_getValueFromConfigFile "${SIF_CONTAINER_DEPLOYMENT_CONF_SELINUX_FCONTEXT_LOG_DIR}" "=" "${installDir}/conf/${SIF_CONTAINER_DEPLOYMENT_CONF_FILE_NAME}" "${installDir}/../log"
	else
		"$(getAgentInstallActionPathForUninstall)" "--get-log-dir"
	fi
}

setLogFilePath() {
	#Obtain PID of calling process, should be set only when the script is called from shellinstall.sh
	local installerPID="${1}"
	local logDirPath="$(getLogPath)/${SIF_INSTALLER_LOG_SUBDIR}"
	if printf '%s' "${installerPID}" | grep -Eq '^[0-9]+$'; then
		readonly LOG_FILE="${logDirPath}/installation_${installerPID}.log"
	else
		readonly LOG_FILE="${logDirPath}/uninstall_$$.log"
	fi
}

dumpproc_enableApport() {
	if [ ! -e "${UBUNTU_APPORT_CONFIG_PATH}" ] || [ ! -e "${BACKUP_UBUNTU_APPORT_CONFIG}" ]; then
		return
	fi

	sif_toConsoleInfo "Restoring original apport config file to ${UBUNTU_APPORT_CONFIG_PATH}"
	cp -p "${BACKUP_UBUNTU_APPORT_CONFIG}" "${UBUNTU_APPORT_CONFIG_PATH}" 2>>"${LOG_FILE}"
	rm -f "${BACKUP_UBUNTU_APPORT_CONFIG}" 2>>"${LOG_FILE}"
}

dumpproc_enableABRT() {
	if [ "${INIT_SYSTEM}" = "${INIT_SYSTEM_SYSTEMD}" ]; then
		systemctl status "${REDHAT_ABRT_SERVICE_NAME}" >/dev/null 2>&1
		local statusExitCode=$?
		if [ ${statusExitCode} -eq 0 ]; then
			executeSystemctlCommand enable "${REDHAT_ABRT_SERVICE_NAME}" >/dev/null 2>&1
			local enableExitCode=$?

			executeSystemctlCommand start "${REDHAT_ABRT_SERVICE_NAME}" >/dev/null 2>&1
			local startExitCode=$?

			if [ ${enableExitCode} -eq 0 ] || [ ${startExitCode} -eq 0 ]; then
				sif_toConsoleInfo "Red Hat ABRT service enabled"
			fi
		fi
	elif [ -e "${REDHAT_ABRT_SCRIPT_PATH}" ]; then
		sif_toConsoleInfo "Enabling Red Hat ABRT service"
		${REDHAT_ABRT_SCRIPT_PATH} start >>"${LOG_FILE}" 2>&1
		chkconfig abrt-ccpp on >>"${LOG_FILE}" 2>&1
	fi
}

dumpproc_isOriginalCorePatternModified() {
	grep -q "${DUMP_PROC_SYMLINK_PATH}" "${BACKUP_CORE_PATTERN_PATH}"
}

dumpproc_isSysctlCorePatternModified() {
	[ "$(commandErrorWrapper "$(sif_getAgentCtlBinPath)" --internal-invoked-by-installer --get-dump-capture-enabled)" = "true" ] && grep -q "${DUMP_PROC_SYMLINK_PATH}" "${SYSCTL_PATH}"
}

dumpproc_restoreCorePatternFile() {
	if [ ! -e "${BACKUP_CORE_PATTERN_PATH}" ]; then
		return
	fi

	if dumpproc_isOriginalCorePatternModified; then
		sif_toConsoleWarning "${BACKUP_CORE_PATTERN_PATH} file has been externally modified, the previous value cannot be restored, manual action is required"
		return
	fi

	sif_toConsoleInfo "Restoring original core_pattern file"
	sif_toLogInfo "$("$(getOsConfigBinPath)" restore-core-pattern 2>&1)"
	rm -f "${BACKUP_CORE_PATTERN_PATH}" 2>>"${LOG_FILE}"
}

dumpproc_restoreCorePatternSysctl() {
	if [ -e "${BACKUP_SYSCTL_CORE_PATTERN_ENTRY_PATH}" ] || dumpproc_isSysctlCorePatternModified; then
		if grep -q "${SYSCTL_CORE_PATTERN_OPTION}" "${SYSCTL_PATH}" 2>/dev/null; then
			sif_toLogInfo "Removing ${SYSCTL_PATH} '${SYSCTL_CORE_PATTERN_OPTION}' option"
			sed -i "/${SYSCTL_CORE_PATTERN_OPTION}.*/d" "${SYSCTL_PATH}" 2>>"${LOG_FILE}"
		else
			sif_toLogInfo "${SYSCTL_CORE_PATTERN_OPTION} already removed"
		fi
	fi

	if [ -e "${BACKUP_SYSCTL_CORE_PATTERN_ENTRY_PATH}" ]; then
		sif_toConsoleInfo "Restoring user-defined ${SYSCTL_CORE_PATTERN_OPTION} from backup"
		cat "${BACKUP_SYSCTL_CORE_PATTERN_ENTRY_PATH}" >>"${SYSCTL_PATH}" 2>>"${LOG_FILE}"
		sif_toLogInfo "Removing backup of user-defined '${SYSCTL_CORE_PATTERN_OPTION}' entry for ${SYSCTL_PATH}"
		rm -f "${BACKUP_SYSCTL_CORE_PATTERN_ENTRY_PATH}" 2>>"${LOG_FILE}"
	fi
}

removeScriptsFromAutostart() {
	local prefix="${1}"
	local suffix="${2}"

	if ! runAutostartAddingTool "${prefix}" "${SIF_INITD_FILE}" "${suffix}"; then
		sif_toConsoleError "Failed to remove ${SIF_INITD_FILE} from autostart. For details, see ${LOG_FILE}"
	fi
}

removeUnitFromSystemd() {
	local unit=${1}
	if [ ! -e "${SYSTEMD_UNIT_FILES_FOLDER}/${unit}" ]; then
		sif_toLogInfo "${unit} does not exist and will not be removed from ${INIT_SYSTEM_SYSTEMD} autostart"
		return
	fi

	executeSystemctlCommand disable "${unit}"
	rm -f "${SYSTEMD_UNIT_FILES_FOLDER}/${unit}"
}

removeSystemvAutostart() {
	sif_toConsoleInfo "Removing ${SIF_AGENT_PRODUCT_NAME} from autostart"

	#Order of checking is important
	if [ -x /usr/bin/update-rc.d ]; then #Ubuntu
		removeScriptsFromAutostart "/usr/bin/update-rc.d -f " "remove"
	elif [ -x /usr/sbin/update-rc.d ]; then #Ubuntu
		removeScriptsFromAutostart "/usr/sbin/update-rc.d -f " "remove"
	elif [ -x /sbin/chkconfig ]; then #RedHat
		removeScriptsFromAutostart "/sbin/chkconfig --del "
	elif [ -x /usr/lib/lsb/install_initd ]; then #Suse
		removeScriptsFromAutostart "/usr/lib/lsb/install_initd ${INIT_FOLDER}/"
	elif [ "${ARCH_ARCH}" = "AIX" ]; then
		arch_removeAutostart
	else
		sif_toConsoleError "Couldn't remove ${SIF_AGENT_PRODUCT_NAME} from autostart."
	fi
}

removeSystemdAutostart() {
	local agentUnitFile="${SYSTEMD_UNIT_FILE_AGENT}"

	removeUnitFromSystemd "${agentUnitFile}"
	executeSystemctlCommand daemon-reload
}

removeKernelExtension() {
	sif_toConsoleInfo "Removing kernel extension"

	local kmodPath="${AGENT_KMOD_DIR}/${AGENT_KMOD}"
	if [ -e "${kmodPath}" ]; then
		rm -f "${kmodPath}"
		sif_toConsoleInfo "Removing ${AGENT_KMOD} from ${kmodPath}"
	fi

	local kmodLoaderPath="${AGENT_KMOD_LOADER_DIR}/${AGENT_KMOD_LOADER}"
	if [ -e "${kmodLoaderPath}" ]; then
		rm -f "${kmodLoaderPath}"
		sif_toConsoleInfo "Removing ${AGENT_KMOD_LOADER} from ${kmodLoaderPath}"
	fi
}

removeProcessAgent() {
	if [ ! "${ARCH_HAS_LD_SO_PRELOAD}" ]; then
		return
	fi

	local systemLib32="$(commandErrorWrapper "$(getAgentInstallActionPath)" "--get-system-library-dir-32")"
	local systemLib64="$(commandErrorWrapper "$(getAgentInstallActionPath)" "--get-system-library-dir-64")"

	sif_toConsoleInfo "Removing ${AGENT_PROC} from system folders"

	for libDir in ${systemLib32} ${systemLib64}; do
		local agentProcLib="${libDir}/${AGENT_PROC_LIB}"
		if [ -e "${agentProcLib}" ]; then
			rm -f "${agentProcLib}"
			sif_toConsoleInfo "Removing ${AGENT_PROC} from ${libDir}"
		fi
	done
}

isAgentRunningInContainer() {
	local watchdogPID
	if ! watchdogPID="$(getWatchdogPid)"; then
		return 1
	fi

	isProcessRunningInContainer "${watchdogPID}"
}

stopAgentService() {
	if [ ! -f "${INIT_FOLDER}/${SIF_INITD_FILE}" ]; then
		sif_toLogWarning "Not stopping the agent because init script was not found"
		return
	fi

	sif_toConsoleInfo "Using ${INIT_SYSTEM} to stop the agent"
	if [ "${INIT_SYSTEM}" = "${INIT_SYSTEM_SYSV}" ]; then
		executeInitScriptCommand stop "true"
	else
		executeSystemctlCommand stop "${SYSTEMD_UNIT_FILE_AGENT}"
	fi
}

removeSystemvInitScripts() {
	if [ "${ARCH_ARCH}" = "AIX" ]; then
		return
	fi

	sif_toConsoleInfo "Removing ${SIF_INITD_FILE} from ${INIT_FOLDER}"
	rm -f "${INIT_FOLDER}/${SIF_INITD_FILE}"
}

removeAutostartScripts() {
	if [ "${INIT_SYSTEM}" = "${INIT_SYSTEM_SYSV}" ]; then
		removeSystemvAutostart
		removeSystemvInitScripts
	else
		removeSystemdAutostart
	fi
}

cleanUpFiles() {
	cd "${SIF_INSTALL_PATH}" || sif_toLogError "Failed to change working directory to ${SIF_INSTALL_PATH}"

	sif_toConsoleInfo "Cleaning up ${SIF_AGENT_INSTALL_PATH}. Part of configuration preserved in ${SIF_RUNTIME_DIR}"

	removeIfExists "${AGENT_CONF_RUNTIME_PATH}"

	local pathsToKeep="${AGENT_BIN_PATH}"

	if [ -e "${SIF_CONTAINER_DEPLOYMENT_CONF_FILE}" ]; then
		pathsToKeep="${pathsToKeep}|${SIF_CONTAINER_DEPLOYMENT_CONF_FILE}|${SIF_AGENT_CONF_PATH}$"
	fi

	pathsToKeep="${pathsToKeep}|${AGENT_STATE_FILE_LEGACY_PATH}"
	{
		find "${SIF_AGENT_INSTALL_PATH}"/* -depth | grep -vE "${pathsToKeep}" | xargs rm -rf
	} 2>>"${LOG_FILE}"

	removeIfExists "${SIF_AGENT_PERSISTENT_CONFIG_PATH}/extensionsuserconfig.conf"
}

createUninstallInfoFile() {
	local reason
	if [ "${IS_UPGRADING}" = "true" ]; then
		reason="upgrade"
	else
		reason="uninstall"
	fi

	sif_toLogInfo "Creating uninstall.info file: ${reason}"

	"$(getAgentInstallActionPathForUninstall)" "--set-uninstall-reason" "${reason}" >>"${LOG_FILE}" 2>&1
}

initializeUninstallation() {
	local installerPid="${1}"
	local skipRootPrivilegesCheck="${2}"

	sif_setPATH

	setLogFilePath "${installerPid}"

	if [ "${installerPid}" ]; then
		IS_UPGRADING="true"
	else
		IS_UPGRADING="false"
	fi

	if [ "${skipRootPrivilegesCheck}" = "true" ] && [ "${IS_UPGRADING}" = "true" ]; then
		sif_toConsoleInfo "Skipping root privileges check"
	else
		if ! checkRootAccess; then
			sif_toConsoleError "You must run uninstaller with root privileges"
			exit "${EXIT_CODE_GENERIC_ERROR}"
		fi
	fi

	initLog "${@}"

	sif_toLogInfo "Launched during upgrade: ${IS_UPGRADING}"

	configureSignalHandling "removeInstallationLockFile"

	if isAgentRunningInContainer && ! isProcessRunningInContainer self; then
		sif_toConsoleError "${SIF_AGENT_PRODUCT_NAME} is running inside a container, it must be stopped before proceeding with uninstallation"
		exit "${EXIT_CODE_AGENT_CONTAINER_RUNNING}"
	fi

	if [ "${IS_UPGRADING}" = "false" ] && ! isDeployedInVolumeStorage; then
		if isAnotherInstallationRunning; then
			exit "${EXIT_CODE_ANOTHER_INSTALLER_RUNNING}"
		fi
		createInstallationLockFile
	fi

	if ! isDeployedInVolumeStorage; then
		createUninstallInfoFile
	fi
}

cleanUpDumpProc() {
	if [ "${ARCH_HAS_DUMPPROC}" ]; then
		dumpproc_restoreCorePatternSysctl
		dumpproc_restoreCorePatternFile
		dumpproc_enableABRT
		dumpproc_enableApport
	fi
}

getVolumeStorageAgentInstallDir() {
	readLink "$(dirname "${0}")"
}

isDeployedInVolumeStorage() {
	local dir="$(getVolumeStorageAgentInstallDir)"
	grep -q "${SIF_CONTAINER_DEPLOYMENT_CONF_STATE_ENTRY}=true" "${dir}/conf/${SIF_CONTAINER_DEPLOYMENT_CONF_FILE_NAME}" 2>/dev/null && [ ! -e "${SIF_INSTALL_PATH}" ]
}

getOsConfigBinPath() {
	if isDeployedInVolumeStorage; then
		local installDir="$(getVolumeStorageAgentInstallDir)"
		printf "%s" "${installDir}/lib64/${AGENT_OS_CONFIG_BIN}"
	else
		printf "%s" "${SIF_AGENT_INSTALL_PATH}/lib64/${AGENT_OS_CONFIG_BIN}"
	fi
}

getConfigDir() {
	local installDir="$(getVolumeStorageAgentInstallDir)"
	local runtimeDir="$(sif_getValueFromConfigFile "${SIF_CONTAINER_DEPLOYMENT_CONF_SELINUX_FCONTEXT_RUNTIME_DIR}" "=" "${installDir}/conf/${SIF_CONTAINER_DEPLOYMENT_CONF_FILE_NAME}")"
	printf '%s' "${runtimeDir}/agent/config"
}

readDataStorageDirFromConfig() {
	if isDeployedInVolumeStorage; then
		local installationConfPath="$(getConfigDir)/${SIF_INSTALLATION_CONF_FILE_NAME}"
		printf '%s' "$(sif_getValueFromConfigFile "DataStorage" "=" "${installationConfPath}")"
	else
		commandErrorWrapper "$(getAgentInstallActionPathForUninstall)" "--get-data-storage-dir"
	fi
}

readLogDirFromConfig() {
	if isDeployedInVolumeStorage; then
		local installationConfPath="$(getConfigDir)/${SIF_INSTALLATION_CONF_FILE_NAME}"
		printf '%s' "$(sif_getValueFromConfigFile "LogDir" "=" "${installationConfPath}")"
	else
		commandErrorWrapper "$(getAgentInstallActionPathForUninstall)" "--get-log-dir"
	fi
}

cleanUpSELinux() {
	if [ ! "${ARCH_HAS_SELINUX}" ] || ! isAvailable semodule || ! seLinuxGetInstalledPolicyName >/dev/null; then
		return
	fi

	sif_toConsoleInfo "Removing ${SIF_AGENT_SHORT_NAME} SELinux policies, this may take a while..."
	removeSELinuxFilecontextForCustomPaths
	cleanUpOldPolicies
}

getAgentInstallActionPathForUninstall() {
	if ! isDeployedInVolumeStorage; then
		getAgentInstallActionPath
	else
		local volumeInstallDir="$(getVolumeStorageAgentInstallDir)"
		printf '%s' "${volumeInstallDir}/lib64/${AGENT_INSTALL_ACTION_BIN}"
	fi
}

splitString() {
	local separator="${1}"
	local input="${2}"
	printf '%s' "${input}" | awk 'BEGIN{RS="'"${separator}"'"} {print}'
}

removeCrioHooks() {
	local crioPaths="$(commandErrorWrapper "$(getAgentInstallActionPathForUninstall)" "--get-crio-hook-paths")"

	for path in $(splitString ":" "${crioPaths}"); do
		if [ -e "${path}" ]; then
			sif_toConsoleInfo "Removing ${path} file"
			rm -f "${path}"
		else
			sif_toLogWarning "File ${path} does not exist"
		fi
	done

	"$(getAgentInstallActionPathForUninstall)" "--set-crio-hook-paths=" >>"${LOG_FILE}" 2>&1
}

restoreRuncBinaries() {
	local runcPaths="$(commandErrorWrapper "$(getAgentInstallActionPathForUninstall)" "--get-runc-wrapper-paths")"

	for path in $(splitString ":" "${runcPaths}"); do
		path="$(printf "%s" "${path}" | cut -d\; -f1)"
		local copySuffix="-original"
		if [ -e "${path}${copySuffix}" ]; then
			if [ -e "${path}" ]; then
				sif_toConsoleInfo "Restoring original ${path} file"
				mv -f "${path}${copySuffix}" "${path}" 2>>"${LOG_FILE}"
			else
				sif_toLogWarning "File ${path} does not exist. Removing ${path}${copySuffix}."
				rm -f "${path}${copySuffix}"
			fi
		else
			sif_toLogWarning "File ${path}${copySuffix} does not exist"
		fi
	done

	"$(getAgentInstallActionPathForUninstall)" "--set-runc-wrapper-paths=" >>"${LOG_FILE}" 2>&1
}

cleanUpFilesDuringUninstall() {
	sif_toLogInfo "This is a full uninstallation, cleaning up rest of the files"

	removeIfExists "${SIF_AGENT_INSTALL_PATH}"
	removeIfExists "${DOWNLOADS_DIRECTORY}"
	removeIfExists "${AGENT_STATE_FILE_PATH}"
	removeIfExists "${SIF_AGENT_PERSISTENT_CONFIG_PATH}/${LOG_ANALYTICS_CONF_FILE_NAME}"
	removeIfExists "${SIF_AGENT_PERSISTENT_CONFIG_PATH}/${AGENT_PROC_RUNTIME_CONF_FILE_NAME}"
	removeIfExists "${SIF_AGENT_PERSISTENT_CONFIG_PATH}/${AGENT_LOG_MODULE}"
	removeIfExists "${SIF_CONTAINER_INSTALLER_PATH_ON_HOST}"
	removeIfExists "${DEPLOYMENT_CONF_FILE}"
}

isContainerInjectionDisabled() {
	local dir="$(getVolumeStorageAgentInstallDir)"
	grep -q "DisableContainerInjection=true" "${dir}/conf/${SIF_CONTAINER_DEPLOYMENT_CONF_FILE_NAME}" 2>/dev/null
}

handleVolumeStorageUninstallation() {
	sif_toConsoleInfo "OneAgent was deployed as a container using volume-based storage, deletion of ${SIF_BRANDING_PRODUCTSHORTNAME} files will be skipped."
	sif_toConsoleInfo "To remove ${SIF_BRANDING_PRODUCTSHORTNAME} files from your machine delete the volume. Note that this will remove all persistent settings including host identifier."

	if ! isContainerInjectionDisabled; then
		cleanUpSELinux
		restoreRuncBinaries
		removeCrioHooks
	fi
}

handleRegularUninstallation() {
	checkInitSystem
	sif_toLogInfo "Detected init system: ${INIT_SYSTEM}, version: ${INIT_SYSTEM_VERSION}"
	if ! setLocationOfInitScripts; then
		sif_toLogWarning "Cannot determine location of init scripts."
	fi

	if ! isDeployedViaContainer; then
		turnOffProcessAgent
		stopAgentService
		stopAllLeftoverProcesses "INT"
		cleanUpDumpProc
		removeAutostartScripts
	fi

	if [ "${ARCH_ARCH}" = "AIX" ]; then
		removeKernelExtension
	fi

	removeProcessAgent
	removeCrioHooks

	if [ "${IS_UPGRADING}" = "false" ]; then
		restoreRuncBinaries
		cleanUpSELinux
	fi

	cleanUpFiles

	if [ "${IS_UPGRADING}" = "false" ]; then
		cleanUpFilesDuringUninstall

		if [ "${ARCH_ARCH}" = "AIX" ]; then
			sif_toConsoleInfo "Attention! In order to complete the uninstallation process please make sure to clear the LDR_PRELOAD and the LDR_PRELOAD64 environment variables, which you might have set during the installation process. Failure to do so may lead to system instability."
		fi
	fi
}

main() {
	initializeUninstallation "$@"

	if [ "${IS_UPGRADING}" = "false" ] && isDeployedInVolumeStorage; then
		handleVolumeStorageUninstallation
	else
		handleRegularUninstallation
	fi

	finishUninstallation
}

################################################################################
#
# Script start
#
################################################################################
main "$@"
