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
                recipients=[receiver],
                html=body)
        try:
            mail.send(msg)
            response = {'message': 'Email sent successfully', 'status': 200}
        except Exception as e:
            response = {'message': f'Error sending email: {str(e)}', 'status': 500}
    return jsonify(response), response['status']