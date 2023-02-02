from flask import Flask
from flask_sqlalchemy import SQLAlchemy

#defines database
db = SQLAlchemy()
DB_NAME = 'database.db'

def create_app():
    app = Flask(__name__)
    #encrypts cookies/session data.  Change when moving to prod
    app.config['SECRET_KEY'] = 'laksjfkljnxc,mvowe2309uj'
    #initializes db
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    
    #importing blueprints
    from .views import views
    from .auth import auth

    #registering the blueprints
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')


    return app

