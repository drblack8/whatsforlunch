from starter_app.models import User, Post, Comment, Social
from starter_app import app, db
from dotenv import load_dotenv
load_dotenv()
import datetime


with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(username='Ian', email='ian@aa.io', password='password')
    javier = User(username='Javier', email='javier@aa.io', password='password')
    dean = User(username='Dean', email='dean@aa.io', password='password')
    angela = User(username='Angela', email='angela@aa.io', password='password')
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io',
                  password='password')
    alissa = User(username='Alissa', email='alissa@aa.io', password='password')

<<<<<<< HEAD
    post1 = Post(
        image_url='https://i.pinimg.com/originals/58/44/28/5844285eddc375e333bc5e02227e893f.jpg',
        user_id=1, desc='this is a test bud')

    comment1 = Comment(
        content="This must be a joke, totally repulsive.",
        user_id=3, post_id=1)
=======
    post1 = Post(image_url='https://i.pinimg.com/originals/58/44/28/5844285eddc375e333bc5e02227e893f.jpg',
                 user_id=1, desc='this is a test bud', date=datetime.datetime.now())
>>>>>>> eaea57ed55b30f705760752c8a7c5275fb88f60d

    social1 = Social(user=1, following=5)
    social2 = Social(user=1, following=4)
    social3 = Social(user=1, following=3)
    social4 = Social(user=1, following=2)

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)
    db.session.commit()

    db.session.add(post1)

    db.session.commit()

    db.session.add(social1)
    db.session.add(social2)
<<<<<<< HEAD
=======

>>>>>>> eaea57ed55b30f705760752c8a7c5275fb88f60d
    db.session.add(social3)
    db.session.add(social4)

    db.session.add(comment1)

    db.session.commit()
