from flask import Blueprint, render_template, request, flash

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
        #getting email/password data from the request
        email = request.form.get('email')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        print(password1,password2,email)
        
        #basic password length/sanity checks
        if len(password1) < 7:
            flash('password must be 8 characters or longer', category='error')
        elif password1 != password2:
            flash('passwords don\'t match', category='error')
        else:
            #add to db
            flash('Account created successfully', category='success')
    return render_template('sign_up.html')
