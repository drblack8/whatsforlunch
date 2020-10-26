from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  posts = db.relationship("User", back_populates="users")

  @property
  def password(self):
      return self.hashed_password

  @password.setter
  def password(self, password):
      self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
      return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }

class Post(db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key = True)
  image_url = db.Column(db.String(40), nullable = False, unique = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

  users = db.relationship("User", back_populates="posts")
