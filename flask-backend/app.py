# from textblob import TextBlob
from flask_cors import CORS
from summarizer import Summarizer
# TextBlob(sentence).sentiment

from flask import Flask, jsonify, request
app = Flask(__name__)
CORS(app)

@app.route('/summary', methods=['POST'])
def say_hello_world():
    data = request.get_json()
    body = data["fullText"]
    model = Summarizer()
    result = model(body, ratio=data['detail_level'])  # Specified with ratio
    return jsonify({"result":result})


@app.route('/', methods=['GET'])
def hello():
    return jsonify({"response":"This is Sentiment Application"})


if __name__ == '__main__':
    app.run(host="localhost", threaded=True, port=5000)
