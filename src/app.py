from flask import Flask, render_template, request


app = Flask(__name__)
app.debug = True


@app.route("/", methods=["GET", "POST", "PUT"])
def nft_minter():
    
    return render_template("login.html")


if __name__ == '__main__':
    app.run()
    