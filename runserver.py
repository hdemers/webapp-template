from webapp import app


#os.environ["FLASK_DEV_SERVER"] = "true"
app.run(debug=True, host='0.0.0.0')
