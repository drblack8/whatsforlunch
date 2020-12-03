from flask_wtf import FlaskForm
from wtforms.fields import (
    PasswordField, StringField
)
from wtforms.validators import DataRequired
from wtforms.fields.html5 import EmailField


class SignUpForm(FlaskForm):
    username = StringField("Username", [DataRequired()])
    email = EmailField("email", [DataRequired()])
    password = PasswordField("Password", [DataRequired()])
    confirm = PasswordField("Confirm Password", [DataRequired()])
