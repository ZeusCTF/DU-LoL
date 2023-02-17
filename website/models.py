from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

#creates new db model, inheriting from db, and Usermixin
#this basically creates a template for how all User objects will look like
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    userName = db.Column(db.String(150))
    firstName = db.Column(db.String(150))
    lastName = db.Column(db.String(150))
    ign = db.Column(db.String(150))
    password = db.Column(db.String(150))
    isAdmin = db.Column(db.Boolean())
    playerTeam = db.Column(db.String(150))
    announcement = db.relationship('Announcement')

class Announcement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    #creates a foriegn key relationship to associate all announcements with the Player Team attribute
    team = db.Column(db.Integer, db.ForeignKey('user.playerTeam'))