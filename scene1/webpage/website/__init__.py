from flask import Flask , request, redirect, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_mail import Mail, Message
from apscheduler.schedulers.background import BackgroundScheduler
from .models import User, db, DB_NAME
import stripe
from flask_cors import CORS
from flask import current_app

mail =Mail()



def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for the app
    # Load configuration from a config file or object
    app.config['STRIPES_PUBLIC_KEY'] = 'pk_test_51RtO0LBlRMs7hY1PU5QaXrPlF9mLZtjXGBDJdv9vpxg1kM8wm0nZ4VBF0KWtRnvjSsI833eo3Jy6AHVx31a9rVrO003r8QSpuq'
    # app.config['STRIPES_SECRET_KEY'] = '<STRIPE_SECRET>'
    app.config['SECRET_KEY'] = 'Dhummu2006143!'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'adithirajesh115@gmail.com'
    app.config['MAIL_PASSWORD'] = 'ytxs jcbn iemy jbid'
    db.init_app(app)
    mail.init_app(app)
    start_scheduler(app)


    from .auth import auth


    app.register_blueprint(auth, url_prefix='/')




    # Initialize extensions, blueprints, etc.
    # with app.app_context():
    #     from . import routes  # Import routes to register them
    #     from .extensions import db  # Import and initialize database
    #     db.init_app(app)  # Initialize the database with the app context

    return app

def create_database(app):
     db.create_all()
     print('Created Database!')

def check_threshold(app):
    with app.app_context():
        # total_amount = db.session.query(db.func.sum(User.amount)).scalar() or 0
        total_users = db.session.query(db.func.count(User.id)).scalar() or 0
        print(f"Total amount: {total_users}")
        # flag = ThresholdFlag.query.first()
        # if not flag:
        #     flag = ThresholdFlag(flag=False)

        #     db.session.add(flag)
        #     db.session.commit()
        # if total_amount >= 2000:
        #     users = User.query.all()
        #     for user in users:
        #         msg = Message('Threshold Alert',sender=current_app.config['MAIL_USERNAME'], recipients=[user.email])
        #         msg.body=f'Hello {user.first_name},\n\nYour total amount has reached the threshold of 1000. Current total: {total_amount}.'
        #         mail.send(msg)
        #     flag.flag = True
        #     db.session.commit()
        #     print("Threshold reached, emails sent.")
        
def start_scheduler(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=lambda: check_threshold(app), trigger="interval", seconds=60)
    scheduler.start()
    print("Scheduler started.")

def create_checkout_session():

    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        billing_address_collection='required',
        line_items=[{
            'price_data': {  # <-- changed from 'price' to 'price_data'
                'currency': 'usd',
                'product_data': {
                    'name': 'Donation'
                },
                'unit_amount': 1000,  # amount in cents
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url='https://flask-livid-delta.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url='https://flask-livid-delta.vercel.app/cancel',
    )
    return session
    #     success_url=url_for('logout.html', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
    #     cancel_url=url_for('login.html', _external=True)
    # )
    # return render_template('home.html',
    #     checkout_session_id=session.id,
    #     checkout_public_key='pk_test_51RtO0LBlRMs7hY1PU5QaXrPlF9mLZtjXGBDJdv9vpxg1kM8wm0nZ4VBF0KWtRnvjSsI833eo3Jy6AHVx31a9rVrO003r8QSpuq')

# def success():
#     session_id = request.args.get('session_id')
#     if not session_id:
#         return "No session ID provided", 400
#     session = stripe.checkout.Session.retrieve(session_id)
#     amount_total = session.amount_total   # Convert cents to dollars
#     customer_email = session.customer_email
#     # save the transaction details to the database or perform any other actions
#     return f'thank you for your donation of ${amount_total / 100:.2f}. A receipt has been sent to {customer_email}.'