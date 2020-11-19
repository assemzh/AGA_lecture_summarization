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
    result = model(body, ratio=0.2)  # Specified with ratio
    return jsonify({"result":result})


# @app.route('/summary', methods=['POST'])
# def say_hello_world():
#     data = request.get_json()
#     body = data["fullText"]
#     return jsonify({"result":body})

@app.route('/', methods=['GET'])
def hello():
    return jsonify({"response":"This is Sentiment Application"})

@app.route('/summarize', methods=['POST'])
def predict_sentiment():
    data = request.get_json()
    sentence = data['fullText']
    sentiment = TextBlob(sentence).sentiment
    score = sum(sentiment)/len(sentiment)
    if score > 0.5:
        res = "Positive"
    else:
        res = "Negative"
    return jsonify({res})

if __name__ == '__main__':
    app.run(host="localhost", threaded=True, port=5000)
