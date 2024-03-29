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
    roster = db.relationship('Roster')

#template for how announcements look
class Announcement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    authorName = db.Column(db.String(150))
    #creates a foriegn key relationship to associate all announcements with the Player Team attribute
    team = db.Column(db.Integer, db.ForeignKey('user.playerTeam'))
    author = db.Column(db.Integer)

#template for rosters
class Roster(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    member1 = db.Column(db.Integer)
    member2 = db.Column(db.Integer)
    member3 = db.Column(db.Integer)
    member4 = db.Column(db.Integer)
    member5 = db.Column(db.Integer)
    coach = db.Column(db.Integer, db.ForeignKey('user.id'))