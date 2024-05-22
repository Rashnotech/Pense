#!/usr/bin/python3
""" a module that handle file upload"""
from api.v1.routes import request, abort, app_views, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from models.image import Image
from models.user import User
from models import storage


allowed_extension = {'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    """a function that check for allowed file"""
    if '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extension:
        return True
    return False


@app_views.route('/upload/<int:id>/image', methods=['POST'], strict_slashes=False)
def upload_profile(id):
    """a function that upload user profile"""
    user = storage.get(User, id)
    if user is None:
        abort(404, 'User not found')
    
    image = request.files['image']
    if not image:
        abort(400, 'Missing image')
    if not allowed_file(image.filename):
        abort(400, 'Invalid Format')
    filename = secure_filename(image.filename)
    new_image = Image(filename=filename, user_id=user.id)
    new_image.save()
    image.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
    return jsonify({'message': 'File uploaded successfully'}), 201