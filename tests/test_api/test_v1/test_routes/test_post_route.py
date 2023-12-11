#!/usr/bin/python3
"""Unittest for Post routes"""
import unittest
from api.v1.app import app


class TestPostRoutes(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Create a Flask test client
        cls.app = app.test_client()
        cls.app.testing = True

    def test_create_post(self):
        # Test the creation of a new post
        data = {
            "title": "Test Post",
            "content": "This is a test post content.",
            "category_ids": [1, 2],
            "user_id": 1
        }
        response = self.app.post('/posts/', json=data)

        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json)
        self.assertEqual(response.json["title"], "Test Post")

        post_id = response.json["id"]
        storage.delete(storage.get(Post, post_id))

    def test_update_post(self):
        # Test updating an existing post
        existing_post = Post(title="Existing Post", content="Original content", user_id=1)
        storage.new(existing_post)
        storage.save()

        data = {"title": "Updated Post"}
        response = self.app.put(f'/posts/{existing_post.id}', json=data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["title"], "Updated Post")

    def test_delete_post(self):
        # Test deleting an existing post
        existing_post = Post(title="Post to Delete", content="Content to delete", user_id=1)
        storage.new(existing_post)
        storage.save()

        response = self.app.delete(f'/posts/{existing_post.id}')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["success"], "Post deleted")

    def test_get_posts_for_user(self):
        # Test getting all posts for a user
        user_id = 1
        response = self.app.get(f'/posts/{user_id}')

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_search_posts(self):
        # Test searching for posts
        data = {"search": "test"}
        response = self.app.get('/posts/search', json=data)

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_get_post_by_post_id(self):
        # Test getting a post by post_id
        user_id = 1
        post_id = 1
        response = self.app.get(f'/posts/{user_id}/{post_id}')

        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json)
        self.assertEqual(response.json["user_id"], user_id)
        self.assertEqual(response.json["id"], post_id)


if __name__ == '__main__':
    unittest.main()