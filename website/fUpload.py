from flask import Blueprint, render_template, request, session, redirect, url_for, jsonify
from flask_login import login_required, current_user
import os
from werkzeug.utils import secure_filename
from .YouTubeAPI import gatherVideos

fUpload = Blueprint('fUpload', __name__)

UPLOAD_FOLDER = '/tmp/uploads'
ALLOWED_EXTENSIONS = {'txt', 'mp4'}

"""
@fUpload.route('/vods')
@login_required
def vods():
    def allowed_file(filename):
        return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':        
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return redirect(url_for('download_file', name=filename))
    return render_template("vods.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin)
"""

@fUpload.route('/vods')
@login_required
def vods():
    for video in gatherVideos():
        print(video)
    return render_template("vods.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin, videos=gatherVideos())

