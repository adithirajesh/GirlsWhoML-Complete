from flask import Blueprint
from flask import render_template, request, flash, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
from flask import current_app
from sqlalchemy.sql import func
from flask_cors import cross_origin
import stripe
auth = Blueprint('auth', __name__)

total_user_count = 0
@auth.route('/', methods=['GET', 'POST'])
def root():
    global total_user_count
    if request.method == 'POST':
        # Handle sign-up logic here
        # email = request.form.get('email')
        # first_name = request.form.get('firstName')
        # new_user = User()
        # db.session.add(new_user)
        # db.session.commit()
        total_user_count += 1
    return render_template('home.html')




# @auth.route('/sign-up', methods=['GET', 'POST'])

# def sign_up():
#     global total_user_count
#     if request.method == 'POST':
#         # Handle sign-up logic here
#         # email = request.form.get('email')
#         # first_name = request.form.get('firstName')
#         # new_user = User()
#         # db.session.add(new_user)
#         # db.session.commit()
#         total_user_count += 1
#     return render_template('sign-up.html')

@auth.route('/api/total_users', methods=['GET'])
@cross_origin()
def total_users():

    return jsonify({'total_users': total_user_count})