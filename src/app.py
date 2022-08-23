import json
from flask import Flask, render_template, request, session, url_for, redirect


app = Flask(__name__)
app.debug = True
app._static_folder = 'templates/static'
app.config['SECRET_KEY'] = 'mysecret'
usersWallet = {}


@app.route("/login")
def login():

    if 'value' in session and checkUserAddress(session.get('value')) == True:
        return redirect(url_for('home'))

    return render_template("login.html")


@app.route("/home")
def home():

    if 'value' in session and checkUserAddress(session.get('value')):
        print(session.get('value'))
        return "hey how are you"

    else:
        return redirect(url_for('login'))


@app.route("/logout")
def logout():
    
    if 'value' in session:
        session.pop('value')
    
    return redirect(url_for('login'))


@app.route('/processUserLogin/<string:userInfo>', methods=["POST"])
def processUserLogin(userInfo):

    user_info = json.loads(userInfo)
    wallet_address = user_info['user_address']
    session['value'] = wallet_address

    if wallet_address not in usersWallet:
        return "new user"

    if wallet_address in usersWallet and usersWallet[wallet_address] == False:
        return "new user"

    else:
        return "old user"


@app.route("/processNewUser")
def processNewUser():
    
    info = session.get('value')
    print("new user", info)

    if info not in usersWallet and info != None:
        usersWallet[info] = False
        return render_template('newUser.html')

    elif checkUserAddress(info):
        return redirect(url_for('home'))
    
    else:
        return redirect(url_for("login"))


@app.route('/NewUserProfile', methods=["POST"])
def NewUserProfile():

    if request.method == "POST":

        pkey = request.form.get('c1')
        name = request.form.get('c2')
        bio = request.form.get('c3')
        avatar = request.files['c4']  
        print(pkey, name, bio)
        return "recived"


def checkUserAddress(address):

    if address in usersWallet and usersWallet[address] == True:
        return True

    return False


if __name__ == '__main__':
    app.run()
    