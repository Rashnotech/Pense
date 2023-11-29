#!/usr/bin/python3
""" Pense Post """
from flask import Flask, render_template, request, abort, Blueprint, jsonify
from models import storage
from models.comment import Comment
from api.v1.routes import app_views

comment_bp = Blueprint('comment_bp', __name__, url_prefix='/comments')


@comment_bp.route('/', methods=['POST'], strict_slashes=False)
def create_comment():
    """
    Create a new comment from the request data and
    return it as JSON
    """
    try:
        data = request.get_json()
        new_comment = Comment(**data)
        new_comment.save()
        return jsonify(new_comment.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Endpoint to update an existing comment
@comment_bp.route('/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    try:
        data = request.get_json()
        comment = storage.get(Comment, comment_id)

        if not comment:
            return jsonify({'error': 'Comment not found'}), 404

        for key, value in data.items():
            if key not in ['id', 'created_at', 'updated_at', 'link']:
                setattr(comment, key, value)

        comment.save()
        return jsonify(comment.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Endpoint to delete an existing comment
@comment_bp.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    try:
        comment = storage.get(Comment, comment_id)

        if not comment:
            return jsonify({'error': 'Comment not found'}), 404

        storage.delete()
        return jsonify({'message': 'Comment deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@comment_bp.route('/<int:post_id>', methods=['GET'], strict_slashes=False)
def get_comments_for_post(post_id):
    try:
        comments = storage.all(Comment).values()
        post_comments = [comment.to_dict() for comment in comments if comment.post_id == post_id]
        if post_comments:
            return jsonify(post_comments), 200
        else:
            return jsonify({'error': 'No comments found for the specified post'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500