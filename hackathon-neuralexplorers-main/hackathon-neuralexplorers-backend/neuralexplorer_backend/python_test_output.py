from flask import Flask, render_template, jsonify
from flask_restx import Api, Resource
import datetime

app = Flask(__name__)

@app.route('/')
def index():
    # return render_template('index.html')
    print("hello")
    return {'hello': 'world'}

@app.route('/hello')
def get():
    return {'hello': 'world'}

@app.route('/time')
def get_time():
    now = datetime.datetime.now()
    return {'time': now.strftime("%Y-%m-%d %H:%M:%S")}

@app.route('/greet/<name>')
def greet(name):
    return {'greeting': f'Hello, {name}!'}

@app.route('/items')
def get_items():
    items = ['item1', 'item2', 'item3']
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')