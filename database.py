from dotenv import load_dotenv
load_dotenv()

from starter_app import app, db
from starter_app.models import User

with app.app_context():
  db.drop_all()
  db.create_all()

  ian = User(username = 'Ian', username = something1, email = 'ian@aa.io')
  javier = User(username = 'Javier', username = something2, email = 'javier@aa.io')
  dean = User(username = 'Dean', username = something3, email = 'dean@aa.io')
  angela = User(username = 'Angela', username = something4, email = 'angela@aa.io')
  soonmi = User(username = 'Soon-Mi', username = something5, email = 'soonmi@aa.io')
  alissa = User(username = 'Alissa', username = something6, email = 'alissa@aa.io')

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)

  db.session.commit()
