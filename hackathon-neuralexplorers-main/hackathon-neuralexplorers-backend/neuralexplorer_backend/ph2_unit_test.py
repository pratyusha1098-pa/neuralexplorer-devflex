import unittest
from flask import Flask, json
from flask_testing import TestCase
import datetime

app = Flask(__name__)

@app.route('/')
def index():
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

class TestMyApp(TestCase):
    def create_app(self):
        return app

    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'hello': 'world'})

    def test_hello(self):
        response = self.client.get('/hello')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'hello': 'world'})

    def test_time(self):
        response = self.client.get('/time')
        self.assertEqual(response.status_code, 200)
        response_time = response.json['time']
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        # Allow for possible small time differences
        self.assertTrue(now[:-2] in response_time)

    def test_greet(self):
        response = self.client.get('/greet/John')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'greeting': 'Hello, John!'})

    def test_items(self):
        response = self.client.get('/items')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, ['item1', 'item2', 'item3'])

if __name__ == '__main__':
    unittest.main()