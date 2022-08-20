import json
from flask import Flask, render_template, request, session, url_for, redirect


app = Flask(__name__)
app.debug = True
app._static_folder = 'templates/static'
app.config['SECRET_KEY'] = 'mysecret'
usersWallet = {}



@app.route("/login", methods=["GET", "POST"])
def login():

    if 'value' in session:
        return redirect(url_for('home'))
    return render_template("login.html")


@app.route('/processUserLogin/<string:userInfo>', methods=["GET","POST"])
def processUserLogin(userInfo):

    user_info = json.loads(userInfo)
    wallet_address = user_info['user_address']
    session['value'] = wallet_address
    return "User Info recieved"


@app.route("/processNewUser")
def processNewUser():
    
    info = session.get('value')

    if info not in usersWallet:
        usersWallet[info] = True
        return 'New User'

    else:
        return redirect(url_for('home'))
    


@app.route("/NewUserProfile")
def NewUserProfile():
    pass



@app.route("/home")
def home():

    if 'value' in session:
        print(session.get('value'))
        return "hey how are you"

    else:
        return redirect(url_for('login'))




if __name__ == '__main__':
    app.run()
    