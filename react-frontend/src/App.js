import React from 'react';
import './App.css';
import Input from './Input.js';
import Main from './Main.js';
import Edit from './Edit.js';
import { trackPromise } from 'react-promise-tracker';
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

    this.getScript = this.getScript.bind(this);
  }


  getScript(vid) {
    var txt = []
    var newUrl = "http://www.youtube.com/watch?v=" + vid
    const data = {'url': newUrl};
    axios.post('https://aga-sum.herokuapp.com/flask-backend/get-script', data)
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
    axios.post('https://aga-sum.herokuapp.com/flask-backend/title', data)
    .then(response => response["data"])
    .then(data => {
      // console.log('title', data["title"]);
      this.setState({title: data["title"]});
    })
  }




  createSpanSummary(value) {
    console.log(" Input to summarizer:");
    if (!value) {
      value = 0.4
    }
    const data = {'fullText': this.state.fullText, 'detail_level': value};
    trackPromise(
      axios.post('https://aga-sum.herokuapp.com/flask-backend/summary', data)
      .then(response => response["data"])
      .then(data => {
        console.log(data);
        var sentSpan = data["result"].split(".").map((sent) =>
        sent.split(" ").map((word) => "<span style='cursor:pointer' class=" +
        this.state.timestamps[this.state.fullText.findIndex(element => (sent.includes(element)))] +
        ">" + word + "</span>").join(" ") + ".").join("");
        this.setState({sentSpan: sentSpan});
        this.setState({summary: data["result"]});
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    );
  }


  editSummary(event) {
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
    console.log(tmp)
    this.createSpanSummary(tmp);
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
