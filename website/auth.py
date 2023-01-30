from flask import Blueprint

#setting up auth blueprint for the app
auth = Blueprint('auth', __name__)


#route for logging in
@auth.route('/login')
def login():
    return 'login'

#route for logging out
@auth.route('/logout')
def logout():
    return 'logout'

#route for logging out
@auth.route('/sign-up')
def sign_up():
    return 'sign-up'
