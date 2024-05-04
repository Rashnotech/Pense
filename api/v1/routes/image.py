#!/usr/bin/python3
""" a model for file upload"""
from models import storage
from models.image import Image
from api.v1.routes import request, abort, jsonify, current_app, app_views
import os
from werkzeug.utils import secure_filename


allowed_extension = {'jpg', 'jpeg', 'png'}
def allowed_file(filename):
    """a function that check for allowed file"""
    if '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extension:
        return True
    return False

@app_views.route('/', methods=['POST'], strict_slashes=False)
def uploadfile():
    try:
        if request.headers['Content-Type'].startswith('application/json'):
            data = request.get_json()
        elif request.headers['Content-Type'].startswith('multipart/form-data'):
            data = request.form.to_dict()
            file = request.files['image']
            if file and not allowed_file(file.filename):
                abort(400, 'Invalid Format')
            filename = secure_filename(file.filename)
            data['filename'] = file
            filename.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        else:
            abort(415, 'Invalid Content-Type header')
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        new_post = Image(**data)
        new_post.save()
        return jsonify(new_post.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400  