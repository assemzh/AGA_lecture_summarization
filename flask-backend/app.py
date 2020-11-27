# from textblob import TextBlob
from flask_cors import CORS
from summarizer import Summarizer
from youtube_transcript_api import YouTubeTranscriptApi
import wikipedia
import sys
# TextBlob(sentence).sentiment

from flask import Flask, jsonify, request,url_for,render_template,abort
app = Flask(__name__)
CORS(app)

import urllib.request
import json
import urllib
import pprint

@app.route('/')
def index():
    try:
        raise Exception("Exception")
    except Exception,e:
        track= get_current_traceback(skip=1, show_hidden_frames=True,
            ignore_system_exceptions=False)
        track.log()
        abort(500)
    return "index"

@app.errorhandler(500)
def internal_error(error):

    return "500 error"

@app.errorhandler(404)
def not_found(error):
    return "404 error",404

@app.route('/flask-backend/title', methods=['POST'])
def get_title():
    data = request.get_json()
    VideoID = data["vid"]

    params = {"format": "json", "url": "https://www.youtube.com/watch?v=%s" % VideoID}
    url = "https://www.youtube.com/oembed"
    query_string = urllib.parse.urlencode(params)
    url = url + "?" + query_string

    with urllib.request.urlopen(url) as response:
        response_text = response.read()
        data = json.loads(response_text.decode())
        # pprint.pprint(data)
        print(data['title'])
    return jsonify({"title":data['title']})

@app.route('/flask-backend/get-script', methods=['POST'])
def get_script():
    data = request.get_json()
    url = data["url"]
    vid = url.split('v=')[1]
    ampersandPosition = vid.find('&')
    if(ampersandPosition != -1):
        vid = vid[:ampersandPosition]
    textlist = YouTubeTranscriptApi.get_transcript(vid)
    print(textlist, file=sys.stderr)
    text = ""
    for t in textlist:
        text += t['text']
        break
    return jsonify({"text":text, "vid": vid})

@app.route('/flask-backend/summary', methods=['POST'])
def summarize():
    data = request.get_json()
    body = " ".join(data["fullText"])
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



if __name__ == '__main__':
    # app.run(host="localhost", threaded=True, port=5000)
    from waitress import serve
    serve(app, host="localhost", port=5000)
