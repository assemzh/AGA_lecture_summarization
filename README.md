<!-- ## To run the application:

1. Run the backend:
    * cd /flask-backend
    * In a new conda environment:
	    * pip install flask-cors
	    * pip install waitress
	    * pip install youtube_transcript_api
	    * pip install wikipedia
	    * pip install bert-extractive-summarizer
	    * install pytorch - depends on OS and CUDA/CPU - https://pytorch.org/
    * python app.py
2. Run the frontend:
    * cd ../react-frontend
    * npm start 
    
3. Video must have captions  -->

## Automatic Video Summarization

### AGA - Aitolkyn Baigutanova, Gabriel Lima, Assem Zhunis


Automatic Video Summarization is an interactive platform for automatic summarization of lectures.

This project was generated with React 17.0.1.

Prototype link: https://bit.ly/3waOHcd

### Instructions
 1. Run the back end:
	* cd /flash-backend
	* In a new Anaconda environment:
		- pip install flask-cors
	    - pip install waitress
	    - pip install youtube_transcript_api
	    - pip install wikipedia
	    - pip install bert-extractive-summarizer
	    - install PyTorch - depends on OS and CUDA/CPU - https://pytorch.org/

	* python app.py
2. Run the front end:
    * cd /react-frontend
    * npm start 
3. Choose a video with subtitles
	- Examples: https://www.youtube.com/watch?v=cUS_22_lDiM
		    https://www.youtube.com/watch?v=R9OCA6UFE-0

### Classes/Pages/Scripts

* flash-backend/app.py - Flask server that receives all requests, and returns summaries and Wikipedia information.
* react-frontend/src/App.js - Controls which page is shown.
* react-frontend/src/Main.js - Main page with video on the left and summary on the right.
* react-frontend/src/Edit.js - Page where full transcription is shown and users can navigate through the text.
* react-frontend/src/Input.js - Initial page.



### Dependencies
1) Python
	* Anaconda, flask-cors, waitress, youtube_transcript_api, wikipedia, bert-extractive-summarizer, pytorch
2) React
	* React, Bootstrap, jQuery, react-loader-spinner, react-youtube, react-promise-tracker, react-native-yt-player, react-player, react-contenteditable

