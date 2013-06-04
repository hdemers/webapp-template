"""
URL routes declarations.

All views are currently declared here.

"""
import os

from webapp import app, make_json_error, config
from flask import render_template

from cloudly import logger

log = logger.init(__name__)


@app.errorhandler(Exception)
def error_handler(error):
    return make_json_error(error)


@app.route('/')
def index():
    """The webapp entry point.
    Configuration options are set here and available to the client via the
    global variable `appConfig`, see templates/base.html.
    """
    webapp_config = {
        'subscribeKey': os.environ.get("PUSHER_KEY"),
        'channel': config.pubsub_channel,
    }
    return render_template('index.html', config=webapp_config)


def in_production():
    return os.environ.get("IS_PRODUCTION", "").lower() in ['true', 'yes']
