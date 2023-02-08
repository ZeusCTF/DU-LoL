from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user


#setting up auth blueprint for the app
auth = Blueprint('auth', __name__)


#route for logging in
@auth.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        #grabs the first email instance of the provided email, checks if pass hash matches
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.index'))
            else:
                flash('Incorrect password', category='error')
        else:
            flash('No user exists for the email address', category='error')

    return render_template("login.html", user=current_user)

#route for logging out
@auth.route('/logout')
#makes sure this page is only accessible if the user is logged in
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

#route for logging out
@auth.route('/sign-up', methods=['GET','POST'])
def sign_up():
    if request.method == 'POST':
        #getting email/password data from the request
        email = request.form.get('email')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        team = request.form.get('team')
        
        #checks for first instance of email
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists', category='error')
        #basic password length/sanity checks
        elif len(password1) < 7:
            flash('password must be 8 characters or longer', category='error')
        elif password1 != password2:
            flash('passwords don\'t match', category='error')
        else:
            #seperates userid from email
            username = email.split('@')
            #update this with admin/coach admin usernames
            if username[0] == 'testing':
                adminStatus = True
            else:
                adminStatus = False
            #creates a db object to enter into the db
            new_user = User(email=email, userName=username[0], password=generate_password_hash(password1, method='sha256'), isAdmin=adminStatus, playerTeam=team)
            db.session.add(new_user)
            db.session.commit()
            flash('Account created successfully', category='success')
            return redirect(url_for('views.index'))
        
    return render_template('sign_up.html', user=current_user)
