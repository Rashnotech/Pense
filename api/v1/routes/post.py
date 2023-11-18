#!/usr/bin/python3
""" Pense Post """
from flask import Flask, render_template, request, abort
from models import storage
from models.post import Post
from api.v1.routes import app_views

app = Flask(__name__)

@post.route('/posts', methods=['POST'], strict_slashes=False)
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
    return jsonify(post.to_dict()), 201

@post.route('/posts/<int:id>', methods=['PUT'], strict_slashes=False)
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

@post.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    # Get the post object from the database by its id
    post = storage.get(Post, id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    post.delete()
    return jsonify({'success': 'Post deleted'}), 200

@post.route('/posts/<link>', methods=['GET'])
def show_post(link):
    post = storage.get(Post, link)
    if post:
        return render_template('post.html', post=post)
    else:
        abort(404)
