"""
URL routes declarations.

"""
import os

from webapp import app, make_json_error
from flask import render_template, jsonify

from cloudly import logger

log = logger.init(__name__)


@app.errorhandler(Exception)
def error_handler(error):
    return make_json_error(error)


@app.route('/')
def index():
    config = {'configOption': "configValue"}
    return render_template('index.html', config=config)


@app.route('/series')
def series():
    x = [1, 2, 3, 4, 5, 6]
    y = [1, 2, 3, 4, 5, 6]
    data = {
        'series': [
            make_serie("direct", "direct", zip(x, y)),
            make_serie("inverse", "inverse", zip(x, reversed(y))),
        ]
    }
    return jsonify(data=data)


def make_serie(name, serie_id, data):
    return {
        'name': name,
        'id': serie_id,
        'data': data
    }


def in_production():
    return os.environ.get("IS_PRODUCTION", "").lower() in ['true', 'yes']
