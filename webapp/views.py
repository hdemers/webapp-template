from webapp import app
from flask import render_template, jsonify


@app.route('/')
def index():
    return render_template('index.html')


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
