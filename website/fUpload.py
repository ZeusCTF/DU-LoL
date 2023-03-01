from flask import Blueprint, render_template, request, session, redirect, url_for, jsonify
from flask_login import login_required, current_user

fUpload = Blueprint('fUpload', __name__)


@fUpload.route('/vods')
@login_required
def vods():
    return render_template("vods.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin)
