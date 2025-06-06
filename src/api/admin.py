  
import os
from flask_admin import Admin
from .models import db, User, Client, Professional, Post, Candidature, Agreement, Rating, Comment, Payment, Premium, Category
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Client, db.session))
    admin.add_view(ModelView(Professional, db.session))
    admin.add_view(ModelView(Post, db.session))
    admin.add_view(ModelView(Candidature, db.session))
    admin.add_view(ModelView(Agreement, db.session))
    admin.add_view(ModelView(Rating, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(Payment, db.session))
    admin.add_view(ModelView(Premium, db.session))
    admin.add_view(ModelView(Category, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))