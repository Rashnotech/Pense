#!/usr/bin/python3
""" Pense Post """
from models import storage
from api.v1.routes import request, abort, jsonify
from flask import Blueprint, jsonify, request, abort
from models.post import Post, post_category
from models.category import Category

post_bp = Blueprint('post_bp', __name__, url_prefix='/posts')

@post_bp.route('/', methods=['POST'], strict_slashes=False)
def create_post():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    required_fields = ['title', 'content', 'user_id']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing {field}'}), 400
    post = Post()
    data['slug'] = post.slug(data['title'])
    data['summary'] = post.summary(data['content'])
    data['read_time'] = post.read_time(data['content'])
    catList = [storage.get(Category, id) for id in data['category_id']]
    if None in catList:
        return jsonify({'error': 'One or more category IDs are invalid'}), 400
    new_post = Post(**data)
    new_post.save() 
    for category in catList:
        new_post.categories.append(category)
    new_post.save()
    return jsonify(new_post.to_dict()), 201



@post_bp.route('/<int:id>', methods=['PUT'], strict_slashes=False)
def update_post(id):
    # Get the JSON data from the request
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    post = storage.get(Post, id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    for key, value in data.items():
        if key not in ['id', 'created_at', 'updated_at']:
            setattr(post, key, value)
    post.save()
    return jsonify(post.to_dict()), 200

@post_bp.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_post(id):
    """ Get the post object from the database by its id """
    post = storage.get(Post, id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    storage.delete(post)
    return jsonify({'success': 'Post deleted'}), 200

@post_bp.route('/<int:user_id>', methods=['GET'], strict_slashes=False)
def show_all_posts(user_id):
    posts = storage.get(Post, user_id)
    if posts:
        return jsonify(posts.to_dict()), 200
    return jsonify({'success': "Empty post"}), 200

@post_bp.route('/search', methods=['GET'], strict_slashes=False)
def search_posts():
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'search' not in data:
        abort(400, 'Missing search term')
    search_term = data['search'].lower()
    posts = storage.all(Post)
    results = []
    for post in posts.values():
        if search_term in post.title.lower() or search_term in post.content.lower():
            results.append(post.to_dict())
    if results:
        return jsonify(results), 200
    abort(404, "No matching posts found")

@post_bp.route('/<int:user_id>/<int:post_id>', methods=['GET'], strict_slashes=False)
def get_post_by_post_id(user_id, post_id):
    post = storage.get(Post, (Post.user_id == user_id) & (Post.id == post_id))
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify(post.to_dict()), 200