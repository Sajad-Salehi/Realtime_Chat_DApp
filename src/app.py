from flask import Flask, render_template


app = Flask(__name__)
app.debug = True
app._static_folder = 'templates/static'


@app.route("/")
def login():
    
    return render_template("login.html")


if __name__ == '__main__':
    app.run()
    