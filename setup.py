#!/usr/bin/python3
"""Setup script for the package."""
from setuptools import setup, find_packages

setup(
    name='pense_app',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'Flask',
        'flask_cors',
    ],
    entry_points={
        'console_scripts': [
            'pense_app = pense_app:api:v1:app.run'
        ],
    },
)