import React from 'react';
import './App.css';
import Input from './Input.js';
import Main from './Main.js';
import Edit from './Edit.js';
import { trackPromise } from 'react-promise-tracker';
import $ from 'jquery'
import axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "input", // input, main, edit
      url: null,
      fullText: null,
      summary: null,
      sentSummary: null,
      wordSummary: null,
      detail_level: 0.4, // default is Medium
      timestamps: null,
      wordSpan: null,
      title: null,
    }


    this.setVideo = this.setVideo.bind(this);
    this.setPage = this.setPage.bind(this);
    this.editSummary = this.editSummary.bind(this);
    this.editFullText = this.editFullText.bind(this);
    this.createSpanSummary = this.createSpanSummary.bind(this);
    this.setDetail = this.setDetail.bind(this);
    // this.setFullText = this.setFullText.bind(this);

    this.getScript = this.getScript.bind(this);
    // this.checkSent = this.checkSent.bind(this);
  }


  getScript(vid) {
    var txt = []
    var newUrl = "http://www.youtube.com/watch?v=" + vid
    const data = {'url': newUrl};
    axios.post('http://localhost:5000/flask-backend/get-script', data)
    // fetch('/flask-backend/get-script', {
    //     method: 'POST', // or 'PUT'
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //     })
        .then(response => response["data"])
        .then(data => {
        console.log(data);
        var script = data["text"]
        this.setState({timestamps: data["timestamps"]})
        var len = script.length
        for (var i = 0; i<len; i++) {
          var texti = script[i]
          // console.log(texti)
          while (texti.includes('&amp;#39;')) {
              texti = texti.replace('&amp;#39;', "'")
          }
          while (texti.includes('&amp;quot;')) {
              texti = texti.replace('&amp;quot;', '"')
          }
          txt.push(texti)
        }
        this.setState({fullText: txt})
        this.createSpanSummary();
        })


  }

  setVideo(vid) {
    // check if url is valid
    // Support different types of urls
    var newUrl = "http://www.youtube.com/watch?v=" + vid
    this.setState({url: newUrl, page: "main"});
    const data = {'vid': vid}
    axios.post('http://localhost:5000/flask-backend/title', data)
    // fetch('/flask-backend/title', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    .then(response => response["data"])
    .then(data => {
      // console.log('title', data["title"]);
      this.setState({title: data["title"]});
    })
  }




  createSpanSummary() {
    console.log(" Input to summarizer:");
    // console.log(this.state);
    const data = {'fullText': this.state.fullText, 'detail_level': this.state.detail_level};

    trackPromise(
      axios.post('http://localhost:5000/flask-backend/summary', data)
      // fetch('/flask-backend/summary', {
      //   method: 'POST', // or 'PUT'
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      .then(response => response["data"])
      .then(data => {
        // console.log(data["result"]);
        // var wordSpan = data["result"].split(" ").map((word) => "<span>" + word + "</span>").join(" ");
        var sentSpan = data["result"].split(".").map((sent) =>
        sent.split(" ").map((word) => "<span style='cursor:pointer' class=" +
        this.state.timestamps[this.state.fullText.findIndex(element => (sent.includes(element)))] +
        ">" + word + "</span>").join(" ") + ".").join("");
        // this.setState({wordSpan: wordSpan});
        this.setState({sentSpan: sentSpan});
        this.setState({summary: data["result"]});
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    );
  }


  editSummary(event) {
    // this.setState({summary: event.target.value});
    // var wordSpan = event.target.value.split(" ").map((word) => "<span>" + word + "</span>").join(" ");
    // var sentSpan = event.target.value.split(".").map((sent) => "<span>" + sent + "</span>").join(".");
    // this.setState({wordSpan: wordSpan});
    this.setState({sentSpan: event.target.value});

  }

  setDetail(value) {
    var tmp = 0.4;
    if (value === 'Low'){
      tmp = 0.1
    }else if (value === 'High') {
      tmp = 0.7
    } else if (value === "Medium") {
      tmp = 0.4;
    }
    this.setState({detail_level: tmp});
    this.createSpanSummary();
  }

  editFullText(event) {
    this.setState({fullText: event.target.value});
  }

  setPage(page) {
    this.setState({page: page});
  }

  render() {
    let content;
    // console.log(this.state.url)
    if (this.state.page === "input") {
      content = <Input getScript = {this.getScript} setVideo={this.setVideo}/>
    } else if (this.state.page === "main") {
      content = <Main title = {this.state.title} url = {this.state.url} summary={this.state.summary} fullText = {this.getScript}
      detail_level={this.state.detail_level} sentSpan={this.state.sentSpan}
        wordSpan={this.state.wordSpan} setPage={this.setPage} editSummary={this.editSummary}
        setDetail={this.setDetail} createSpanSummary={this.createSpanSummary}/>
    } else if (this.state.page === "edit") {
      content = <Edit title = {this.state.title} url = {this.state.url}
      summary={this.state.summary} editSummary={this.editSummary}
      sentSpan={this.state.sentSpan} createSpanSummary={this.createSpanSummary}
      setPage={this.setPage} fullText={this.state.fullText}
      timestamps={this.state.timestamps}
       editFullText={this.editFullText}
      />
    }

    return (
      <div className="App">
        {content}
      </div>
    )
  }
}


export default App;
