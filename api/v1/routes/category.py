#!/usr/bin/python
"""a module that handles post categories"""
from api.v1.routes import jsonify, app_views, abort, request, current_app
from models import storage
from models.category import Category
from flask_jwt_extended import jwt_required

@app_views.route('/category', methods=['POST'], strict_slashes=False)
@jwt_required()
def create():
    """ a function that category post categories"""
    category = storage.all(Category)
    data = request.get_json()
    if not data:
        abort(400, 'Not JSON')
    if 'name' not in data:
        return jsonify({'message': 'Category not found'}), 400
    if data['name'] in [val.name for val in category.values()]:
       return jsonify({'message': 'Category already exists'}), 400
    new_category = Category(**data)
    new_category.save()
    return jsonify(new_category.to_dict()), 201


@app_views.route('/category', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_category():
    """ a function that get the list of categoris"""
    cat_list = storage.all(Category)
    if not cat_list:
          return jsonify({'data': {}}), 200
    categories = [val.to_dict() for val in cat_list.values()]
    return jsonify({'data':categories}), 200

@app_views.route('/upload/images/<filename>')
def uploaded_file(filename):
    from flask import send_from_directory
    """fetch upload"""
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)