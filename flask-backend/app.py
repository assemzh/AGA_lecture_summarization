# from textblob import TextBlob
from flask_cors import CORS
from summarizer import Summarizer
import wikipedia
# TextBlob(sentence).sentiment

from flask import Flask, jsonify, request
app = Flask(__name__)
CORS(app)

@app.route('/flask-backend/summary', methods=['POST'])
def summarize():
    data = request.get_json()
    body = data["fullText"]
    model = Summarizer()
    result = model(body, ratio=data['detail_level'])  # Specified with ratio
    return jsonify({"result":result})


#Search Wikipedia
@app.route('/flask-backend/wiki', methods=['POST'])
def find_wiki():
    data = request.get_json()
    keyword = data["selectedWord"]
    try:
        result = wikipedia.summary(keyword, sentences=1)
        page = wikipedia.page(keyword)
        return jsonify({"result": result, "url": page.url, "keyword": page.title})
    except:
        return jsonify({"result": None, "url": None, "keyword": None})

@app.route('/', methods=['GET'])
def hello():
    return jsonify({"response":"This is Sentiment Application"})


if __name__ == '__main__':
    app.run(host="localhost", threaded=True, port=5000)
