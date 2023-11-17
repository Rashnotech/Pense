#!/usr/bin/python3
""" Pense Post """
from flask import Flask, render_template, request, abort
from models import storage
from models.post import Post
from api.v1.routes import app_views

app = Flask(__name__)

@app.route('/posts/<link>', methods=['GET'])
def show_post(link):
    # Get the post object from the database using the link
    post = storage.get(Post, link)
    if post:
        # Render the post template with the post object
        return render_template('post.html', post=post)
    else:
        # Return a 404 error if the post is not found
        abort(404)
