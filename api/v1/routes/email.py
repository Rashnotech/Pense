#!/usr/bin/python3
"""a module that sends email"""
from flask_mail import Message, Mail
from api.v1.routes import jsonify, current_app, app_views


@app_views.route('/mail', strict_slashes=False)
def send_mail(receiver, body):
    """a function that send verfication"""
    mail = Mail(current_app)
    with mail.connect() as conn:
        msg = Message(
                subject='Pense Verification',
                sender='pense.blogpost@gmail.com',
                recipients=[receiver],
                html=body)
        try:
            mail.send(msg)
            return jsonify({'message': 'Email sent successfully'}), 200
        except Exception as e:
            return jsonify({'message': f'Error sending email: {str(e)}'}), 500