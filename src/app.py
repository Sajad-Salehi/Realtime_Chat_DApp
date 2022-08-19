import json
from flask import Flask, render_template, request, session, url_for, redirect


app = Flask(__name__)
app.debug = True
app._static_folder = 'templates/static'
app.config['SECRET_KEY'] = 'mysecret'



@app.route("/login", methods=["GET", "POST"])
def login():

    if 'value' in session:
        return redirect(url_for('home'))

    return render_template("login.html")



@app.route('/processUserLogin/<string:userInfo>', methods=["POST"])
def processUserLogin(userInfo):

    user_info = json.loads(userInfo)
    session['value'] = user_info['user_address']
    print(user_info['user_address'])
    return "User Info recieved"


@app.route("/home")
def home():

    if 'value' in session:
        print(session.get('value'))
        return "hey how are you"

    else:
        return redirect(url_for('login'))



if __name__ == '__main__':
    app.run()
    