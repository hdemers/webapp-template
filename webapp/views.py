"""
URL routes declarations.

All views are currently declared here.

"""
import os

from webapp import app, make_json_error, config, request, jsonify
from flask import render_template

from cloudly import logger

log = logger.init(__name__)


@app.errorhandler(Exception)
def error_handler(error):
    return make_json_error(error)


@app.route('/birdwatch')
def birdwatch():
    """A map with real-time tweets shown.
    Configuration options are set here and available to the client via the
    global variable `appConfig`, see templates/base.html.
    """
    webapp_config = {
        'subscribeKey': os.environ.get("PUSHER_KEY"),
        'channel': config.pubsub_channel,
    }
    return render_template('birdwatch.html', config=webapp_config)


@app.route('/whereami')
def whereami():
    """An OpenStreet map showing your position.
    Configuration options are set here and available to the client via the
    global variable `appConfig`, see templates/base.html.
    """
    webapp_config = {
        'cloudmadeApiKey': config.cloudmade_api_key,
        'peerserverApiKey': config.peerserver_api_key,
    }
    return render_template('whereami.html', config=webapp_config)


@app.route('/report')
def report():
    print request.args.get("sender")
    return jsonify({})


def in_production():
    return os.environ.get("IS_PRODUCTION", "").lower() in ['true', 'yes']
