from flask import Blueprint

#setting up gen blueprint for the app
views = Blueprint('views', __name__)


@views.route('/')
def index():
    return '<h1>Hello World</h1>'


