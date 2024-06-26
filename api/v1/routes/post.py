#!/usr/bin/python3
""" Pense Post """
from models import storage
from api.v1.routes import request, abort, jsonify, current_app
from flask import Blueprint, jsonify, request, abort
from models.post import Post, post_category
from models.category import Category
from math import ceil
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required
import os


post_bp = Blueprint('post_bp', __name__, url_prefix='/posts')


allowed_extension = {'jpg', 'jpeg', 'png'}
def allowed_file(filename):
    """a function that check for allowed file"""
    if '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extension:
        return True
    return False

@post_bp.route('/', methods=['POST'], strict_slashes=False)
@jwt_required()
def create_post():
    try:
        if request.headers['Content-Type'].startswith('application/json'):
            data = request.get_json()
        elif request.headers['Content-Type'].startswith('multipart/form-data'):
            data = request.form.to_dict()
            post_cover = request.files['post_cover']
            if post_cover and not allowed_file(post_cover.filename):
                abort(400, 'Invalid Format')
            filename = secure_filename(post_cover.filename)
            data['post_cover'] = filename
            post_cover.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        else:
            abort(415, 'Invalid Content-Type header')
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        required_fields = ['title', 'content', 'user_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing {field}'}), 400
        data['slug'] = data['title'].lower().replace(' ', '-')
        data['summary'] = data['content'][:150]
        data['read_time'] = ceil(len(data['content']) / 183)
        catList = [storage.get(Category, id) for id in data['category_id'].split(',')]
        if None in catList:
            return jsonify({'error': 'One or more category IDs are invalid'}), 400
        new_post = Post(**data)
        new_post.save() 
        for category in catList:
            new_post.categories.append(category)
        new_post.save()
        return jsonify(new_post.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    

@post_bp.route('/<int:id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_post(id):
    # Get the JSON data from the request
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    post = storage.get(Post, id)
    data['slug'] = data['title'].lower().replace(' ', '-')
    data['summary'] = data['content'][:150]
    data['read_time'] = ceil(len(data['content']) / 183)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    for key, value in data.items():
        if key not in ['id', 'created_at', 'updated_at']:
            setattr(post, key, value)
    post.save()
    return jsonify(post.to_dict()), 200

@post_bp.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
def delete_post(id):
    """ Get the post object from the database by its id """
    post = storage.get(Post, id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    storage.delete(post.to_dict())
    storage.save()
    return jsonify({'success': 'Post deleted'}), 200

@post_bp.route('/<int:user_id>', methods=['GET'], strict_slashes=False)
def show_all_posts(user_id):
    posts = storage.all(Post)
    if posts:
        post_user = []
        post_user = [val.to_dict() for val in posts.values() if val.user_id == user_id]
        return jsonify(post_user), 200
    return jsonify({'success': "Empty post"}), 200

@post_bp.route('/search/<params>', methods=['GET'], strict_slashes=False)
def filter_posts(params):
    posts = storage.all(Post)
    if params != 'all':
        filter_post = []
        for val in posts.values():
            if any(params == category.name for category in val.categories):
                post_dict = val.to_dict()
                user_dict = {
                    'firstname': val.user.firstname,
                    'lastname': val.user.lastname,
                    'email': val.user.email
                }
                post_dict['user'] = user_dict
                comments_dict= [
                    {
                        'id': comment.id,
                        'comment': comment.comment,
                        'fullname': comment.users.firstname + ' ' + comment.users.lastname,
                        'created_at': comment.created_at,
                        'updated_at': comment.updated_at
                    }
                    for comment in val.comments]
                post_dict['comments'] = comments_dict
                filter_post.append(post_dict)
        return jsonify(filter_post), 200
    
    all_post = []
    for val in posts.values():
        post_dict = val.to_dict()
        user_dict = {
            'firstname': val.user.firstname,
            'lastname': val.user.lastname,
            'email': val.user.email
        }
        post_dict['user'] = user_dict
        comments_dict= [
                    {
                        'id': comment.id,
                        'comment': comment.comment,
                        'fullname': comment.users.firstname + ' ' + comment.users.lastname,
                        'created_at': comment.created_at,
                        'updated_at': comment.updated_at
                    }
                    for comment in val.comments]
        post_dict['comments'] = comments_dict
        all_post.append(post_dict)
    return jsonify(all_post), 200


@post_bp.route('/read/<name>/<title>', methods=['GET'], strict_slashes=False)
def read_post(name, title):
    posts = storage.all(Post)
    if name and title:
        username = name[1:]
        filter_post = []
        for val in posts.values():
            if val.slug == title and val.user.firstname.lower() == username:
                post_dict = val.to_dict()
                user_dict = {
                    'firstname': val.user.firstname,
                    'lastname': val.user.lastname,
                    'email': val.user.email
                }
                post_dict['user'] = user_dict
                comments_dict= [
                    {
                        'id': comment.id,
                        'comment': comment.comment,
                        'fullname': comment.users.firstname + ' ' + comment.users.lastname,
                        'created_at': comment.created_at,
                        'updated_at': comment.updated_at
                    }
                    for comment in val.comments]
                post_dict['comments'] = comments_dict
                filter_post.append(post_dict)
        return jsonify(filter_post), 200
    abort(400, 'No posts')


@post_bp.route('/<int:user_id>/<int:post_id>', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_post_by_post_id(user_id, post_id):
    post = storage.get(Post, (Post.user_id == user_id) & (Post.id == post_id))
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify(post.to_dict()), 200

@post_bp.route('/keyword/<param>', methods=['GET'], strict_slashes=False)
def searchkeywords(param):
    if not param:
        abort(400, 'Missing search term')
    posts = storage.all(Post)
    results = []
    for post in posts.values():
        if param in post.title.lower() or param in post.content.lower():
            results.append(post.to_dict())
    if results:
        return jsonify(results), 200
    abort(404, "No matching posts found")
