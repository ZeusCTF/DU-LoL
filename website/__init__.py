from flask import Flask


def create_app():
    app = Flask(__name__)
    #encrypts cookies/session data.  Change when moving to prod
    app.config['SECRET_KEY'] = 'laksjfkljnxc,mvowe2309uj'
    
    return app

