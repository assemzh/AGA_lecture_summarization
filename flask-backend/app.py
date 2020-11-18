from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/hello')
def say_hello_world():
    return {'result': "Hello My Friend :)"}

@app.route("/")
def my_index():
    return render_template("index.html", token="Here is my token")
# NLP PROJECT TEMPLATE

from flask import render_template,request,url_for
from flask_bootstrap import Bootstrap


# NLP Packages
from textblob import TextBlob,Word
import random
import time

Bootstrap(app)

@app.route('/api')
def index():
	return render_template('index.html')


@app.route('/analyse',methods=['POST'])
def analyse():
	start = time.time()
	if request.method == 'POST':
		rawtext = request.form['rawtext']
		#NLP Stuff
		blob = TextBlob(rawtext)
		received_text2 = blob
		blob_sentiment,blob_subjectivity = blob.sentiment.polarity ,blob.sentiment.subjectivity
		number_of_tokens = len(list(blob.words))
		# Extracting Main Points
		nouns = list()
		for word, tag in blob.tags:
		    if tag == 'NN':
		        nouns.append(word.lemmatize())
		        len_of_words = len(nouns)
		        rand_words = random.sample(nouns,len(nouns))
		        final_word = list()
		        for item in rand_words:
		        	word = Word(item).pluralize()
		        	final_word.append(word)
		        	summary = final_word
		        	end = time.time()
		        	final_time = end-start


	return render_template('index.html',received_text = received_text2,number_of_tokens=number_of_tokens,blob_sentiment=blob_sentiment,blob_subjectivity=blob_subjectivity,summary=summary,final_time=final_time)






if __name__ == '__main__':
	app.run(debug=True)
