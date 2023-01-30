from flask import Blueprint, render_template

#setting up gen blueprint for the app
views = Blueprint('views', __name__)


@views.route('/')
def index():
    return render_template("home.html")


