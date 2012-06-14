import os
import logging

logfile = "webapp.log"

log_levels = {
    "DEBUG": logging.DEBUG,
    "INFO": logging.INFO,
    "WARNING": logging.WARNING,
}
log_level_str = os.environ.get("WEBAPP_LOG_LEVEL", "DEBUG")
log_level = log_levels.get(log_level_str, logging.WARNING)
