from flask import Flask


def create_app():
    app = Flask(__name__)
    #encrypts cookies/session data.  Change when moving to prod
    app.config['SECRET_KEY'] = 'laksjfkljnxc,mvowe2309uj'
    
    #importing blueprints
    from .views import views
    from .auth import auth

    #registering the blueprints
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')


    return app

