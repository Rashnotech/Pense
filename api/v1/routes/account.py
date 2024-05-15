#!/usr/bin/python3
"""Account routes"""
from flask import jsonify, request
from api.v1.routes import app_views, current_app
from models import storage
from models.user import User
from models.image import Image
from werkzeug.utils import secure_filename
import os
from .post import allowed_file


@app_views.route('/account/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_user(id):
    """Delete a user from database"""
    user = storage.get(User, id)
    storage.delete(user.to_dict())
    storage.save()
    return jsonify({'success': 'User deleted'}), 200


@app_views.route('/account/<int:user_id>', methods=['PUT'], strict_slashes=False)
def update_user(user_id):
    """Updates a User object"""
    if request.headers['Content-Type'].startswith('multipart/form-data'):
        data = request.form.to_dict()
        user_img = request.files['profile_image']
        if user_img and not allowed_file(user_img.filename):
            return jsonify({'error': 'Invalid file format'}), 400
        filename = secure_filename(user_img.filename)
        data['filename'] = filename
        data['user_id'] = user_id
        user_img.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        new_img = Image(**data)
        image = storage.get(Image, user_id)
        storage.delete(image.to_dict())
        storage.save()
        new_img.save()
        user = storage.get(User, user_id)
        user.set_password('')
        return jsonify({'success': 'profile uploaded', 'data': user.to_dict()}), 200
    else:
        data = request.get_json()
        user = storage.get(User, user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 400
        for key, value in data.items():
            if key not in ['id', 'email', 'created_at', 'updated_at']:
                setattr(user, key, value)
        user.save()
        user.set_password('')
        return jsonify({'data': user.to_dict()}), 200