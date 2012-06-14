import logging

from flask import Flask
#from flask_debugtoolbar import DebugToolbarExtension

FORMAT = "%(asctime)s] %(levelname)s %(module)s %(funcName)s: %(message)s"

# The application
app = Flask(__name__)

# Debugging
app.debug = True
app.debug_log_format = FORMAT
logger = app.logger

# Console handler
formatter = logging.Formatter(FORMAT)
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# Set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = 'oftg09jW2FtbXfcud9OS'

# Flask debug toolbar
#toolbar = DebugToolbarExtension(app)

import webapp.views
