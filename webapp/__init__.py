"""
This module instantiates the Flask application and declares the main error
handling function ``make_json_error``.
"""

__title__ = "Webapp template"
__version__ = "0.1.0"
__author__ = "Hugues Demers"
__copyright__ = "Copyright 2013 Hugues Demers"

import os
import traceback

from flask import Flask, jsonify, request
from werkzeug.exceptions import default_exceptions
from werkzeug.exceptions import HTTPException

from cloudly import logger
from cloudly.notify import notify
from webapp.metric import evt

FORMAT = "%(asctime)s] %(levelname)s %(module)s %(funcName)s: %(message)s"

# The application
app = Flask(__name__)

# Debugging
app.debug = True
app.debug_log_format = FORMAT
log = logger.init(__name__)

# Set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = os.environ.get("WEBAPP_SESSION_SECRET_KEY",
                                          'oftg09jW2FtbXfcud9OS')


# Make this app a JSON app.
# Inspired from cf. http://flask.pocoo.org/snippets/83/
def make_json_error(ex):
    log.error(ex)
    log.error(traceback.format_exc())
    message = ex.description if isinstance(ex, HTTPException) else str(ex)
    message = message.replace("<p>", "").replace("</p>", "") if message else ""
    code = ex.code if isinstance(ex, HTTPException) else 500
    response = jsonify(message=message, status_code=code)
    response.status_code = code

    if code in [500]:
        notify("Webapp exception: {}".format(code),
               "{}\n\n{}".format(ex, traceback.format_exc(ex)))

    evt("error", {'code': code}, request=request)
    return response

for code in default_exceptions.iterkeys():
    app.error_handler_spec[None][code] = make_json_error

import webapp.views
