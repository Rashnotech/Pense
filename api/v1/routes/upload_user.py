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

@app_views.route('/', strict_slashes=False)
def upload_profile(user_id, link):
    data = {'filename': link, 'user_id': user_id}
    if link and user_id:    
        new_post = Image(**data)
        new_post.save()
        return jsonify(new_post.to_dict()), 201
    else:
        data['filename'] = 'https://th.bing.com/th/id/OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ?rs=1&pid=ImgDetMain'
        new_post = Image(**data)
        new_post.save()
        return jsonify(new_post.to_dict(), 201)


@app_views.route('/upload/<int:id>/image', methods=['PUT'], strict_slashes=False)
def upload(id):
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