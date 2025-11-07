from flask import Blueprint, render_template, url_for
from .models import User
from . import db
from .__init__ import create_checkout_session
import stripe
from flask import request
views = Blueprint('views', __name__)
@views.route('/', methods=['GET', 'POST'])
def home():
    tag_id = request.args.get('tag_id')
    customer_email = request.args.get('email','user@example.com')

    session = create_checkout_session()
    

    # total_amount = User.query.with_entities(db.func.sum(User.amount)).scalar() or 0
    # goal_amount = 1000  # Set your goal amount here
    # percentage = (total_amount / goal_amount) * 100
    return render_template('home.html', checkout_session_id=session['id'], checkout_public_key = 'pk_test_51RtO0LBlRMs7hY1PU5QaXrPlF9mLZtjXGBDJdv9vpxg1kM8wm0nZ4VBF0KWtRnvjSsI833eo3Jy6AHVx31a9rVrO003r8QSpuq')
    