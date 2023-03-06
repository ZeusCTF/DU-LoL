from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

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
    from .fUpload import fUpload

    #registering the blueprints
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(fUpload, url_prefix='/')

    #makes sure the db models are created
    from .models import User
    from .models import Announcement
    from .models import Roster

    #https://stackoverflow.com/questions/73968584/flask-sqlalchemy-db-create-all-got-an-unexpected-keyword-argument-app
    #sql alchemy now requires an active Flask app context
    with app.app_context():
        db.create_all()

    #tells flask where to load the login page
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    #telling flask how we load a user
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

