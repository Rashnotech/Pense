#!/usr/bin/python3
""" Pense Post """
from models import storage
from api.v1.routes import request, abort, app_views, jsonify
from flask import Flask, Blueprint, jsonify, request, abort, render_template
from models.post import Post

post_bp = Blueprint('post_bp', __name__, url_prefix='/posts', template_folder='v1/routes/templates')

@post_bp.route('/', methods=['POST'], strict_slashes=False)
def create_post():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    required_fields = ['title', 'content', 'post_cover', 'attachment', 'category_id', 'user_id']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing {field}'}), 400
    post = Post(**data)
    post.save()

    response_data = post.to_dict()

    return jsonify(response_data), 201

@post_bp.route('/<slug>', methods=['GET'], strict_slashes=False)
def get_post_by_slug(slug):
    post = storage.get(Post, Post.slug_column == slug)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify(post.to_dict()), 200

@post_bp.route('/<int:id>/summary', methods=['GET'], strict_slashes=False)
def get_post_summary(id):
    post = storage.get(Post, id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify({'summary': post.summary_column}), 200

@post_bp.route('/<int:id>/read_time', methods=['GET'], strict_slashes=False)
def get_post_read_time(id):
    post = storage.get(Post, id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify({'read_time': post.read_time_column}), 200

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
        if key not in ['id', 'created_at', 'updated_at', 'link']:
            setattr(post, key, value)
    post.save()
    return jsonify(post.to_dict()), 200

@post_bp.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_post(id):
    # Get the post object from the database by its id
    post = storage.get(Post, id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    storage.delete()
    return jsonify({'success': 'Post deleted'}), 200

@post_bp.route('/', methods=['GET'], strict_slashes=False)
def show_all_posts():
    post = storage.all(Post)
    if post:
        posts = [val.to_dict() for val in post.values()]
        return jsonify(posts), 200
    abort(400, "Empty post")

@post_bp.route('/search', methods=['POST'], strict_slashes=False)
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