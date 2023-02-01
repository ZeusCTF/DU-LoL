from flask import Blueprint, render_template, request

#setting up auth blueprint for the app
auth = Blueprint('auth', __name__)


#route for logging in
@auth.route('/login', methods=['GET','POST'])
def login():
    #request has information about the http request that was sent to access this route
    #in this case, we are accessing the form that is being sent
    data = request.form
    return render_template("login.html", text="testing")

#route for logging out
@auth.route('/logout')
def logout():
    return 'logout'

#route for logging out
@auth.route('/sign-up', methods=['GET','POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        
    return render_template('sign_up.html')
