from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

#creates new db model, inheriting from db, and Usermixin
#this basically creates a template for how all User objects will look like
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    userName = db.Column(db.String(150))
    isAdmin = db.Column(db.Boolean())
    announcement = db.relationship('Announcement')

class Announcement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    #creates a foriegn key relationship to associate all announcements with the User ID attribute
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
