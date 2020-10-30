import datetime
from starter_app.models import User, Post, Comment, Social
from starter_app import app, db
from dotenv import load_dotenv
load_dotenv()


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

    # comment1 = Comment(
    #     content="This must be a joke, totally repulsive.",
    #     user_id=3, post_id=1, date=datetime.datetime.now())

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

    for i in range(0, 5):
        lst = ['https://i.pinimg.com/originals/58/44/28/5844285eddc375e333bc5e02227e893f.jpg',
               'https://www.billeauds.com/wp-content/uploads/Andrew-Zimmerman-1080x675.jpg',
               'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
               'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
               'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
               ]
        post = Post(
            image_url=lst[i],
            user_id=i + 1, date=datetime.datetime.now(), desc='this is a test bud')
        db.session.add(post)

    db.session.commit()

    db.session.add(social1)
    db.session.add(social2)
    db.session.add(social3)
    db.session.add(social4)

    # db.session.add(comment1)

    db.session.commit()
