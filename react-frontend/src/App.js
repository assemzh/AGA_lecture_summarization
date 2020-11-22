import React from 'react';
import './App.css';
import Input from './Input.js';
import Main from './Main.js';
import Edit from './Edit.js';
import { trackPromise } from 'react-promise-tracker';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "input", // input, main, edit
      url: null,
      fullText: "",
      summary: null,
      sentSummary: null,
      wordSummary: null,
      detail_level: 0.4, // default is Medium
    }

    this.setVideo = this.setVideo.bind(this);
    this.setPage = this.setPage.bind(this);
    this.editSummary = this.editSummary.bind(this);
    this.editFullText = this.editFullText.bind(this);
    this.createSpanSummary = this.createSpanSummary.bind(this);
    this.setDetail = this.setDetail.bind(this);
  }

  createSpanSummary() {

    console.log(" Input to summarizer:");
    console.log(this.state);
    const data = this.state;

    trackPromise(
      fetch('/flask-backend/summary', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data["result"]);
        var wordSpan = data["result"].split(" ").map((word) => "<span>" + word + "</span>").join(" ");
        var sentSpan = data["result"].split(".").map((sent) => "<span>" + sent + "</span>").join(".");
        this.setState({wordSpan: wordSpan});
        this.setState({sentSpan: sentSpan});
        this.setState({summary: data["result"]});
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    );
  }


  editSummary(event) {
    this.setState({summary: event.target.value});
    var wordSpan = event.target.value.split(" ").map((word) => "<span>" + word + "</span>").join(" ");
    var sentSpan = event.target.value.split(".").map((sent) => "<span>" + sent + "</span>").join(".");
    this.setState({wordSpan: wordSpan});
    this.setState({sentSpan: sentSpan});

  }

  setDetail(value) {
    var tmp = 0.4;
    if (value === 'Low'){
      tmp = 0.1
    }else if (value === 'High') {
      tmp = 0.7
    }
    this.setState({detail_level: tmp});
  }

  editFullText(event) {
    this.setState({fullText: event.target.value});
  }

  setVideo(url) {
    // check if url is valid
    // get summary, set state
    this.setState({url: url, page: "main"});

  }

  setPage(page) {
    this.setState({page: page});
  }

  render() {
    let content;
    // console.log(this.state.url)
    if (this.state.page === "input") {
      content = <Input setVideo={this.setVideo}/>
    } else if (this.state.page === "main") {
      content = <Main url = {this.state.url} detail_level={this.state.detail_level} wordSpan={this.state.wordSpan} setPage={this.setPage} editSummary={this.editSummary} setDetail={this.setDetail} createSpanSummary={this.createSpanSummary}/>
    } else if (this.state.page === "edit") {
      content = <Edit url = {this.state.url}
      summary={this.state.summary} sentSpan={this.state.sentSpan} setPage={this.setPage} editSummary={this.editSummary}
      fullText={this.state.fullText} editFullText={this.editFullText} createSpanSummary={this.createSpanSummary}/>
    }

    return (
      <div className="App">
        {content}
      </div>
    )
  }
}


export default App;
