import React from 'react';
import './App.css';
import Input from './Input.js';
import Main from './Main.js';
import Edit from './Edit.js';
import { trackPromise } from 'react-promise-tracker';
import $ from 'jquery'



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


  getScript(url) {
      var txt = []
      var timestamps = []
      var vid = url.split('v=')[1]
      var ampersandPosition = vid.indexOf('&')
      if(ampersandPosition !== -1) {
          vid = vid.substring(0, ampersandPosition)
      }
      // this.setState({vid: vid})
      var xml_url = "https://video.google.com/timedtext?lang=en&v=" + vid
      $.ajax({
      type: "POST",
      url: xml_url
      }).done( (response) => {
          // console.log(response);
          var xml = response.getElementsByTagName('text')
          // console.log(xml[0].getAttribute('start'))
          var len = xml.length
          for (var i = 0; i < len; i++) {
              var texti = xml[i].innerHTML
              // console.log(texti)
              while (texti.includes('&amp;#39;')) {
                  texti = texti.replace('&amp;#39;', "'")
              }
              while (texti.includes('&amp;quot;')) {
                  texti = texti.replace('&amp;quot;', '"')
              }
              var timestamp = xml[i].getAttribute('start')
              txt.push(texti)
              timestamps.push(timestamp)
          }
          this.setState({fullText: txt, timestamps: timestamps})
          this.createSpanSummary();

          // return txt
      //    console.log(timestamps)
      }).fail( (response) => {
          // console.log('here');
      });
  }

  setVideo(url) {
    // check if url is valid
    // get summary, set state
    this.setState({url: url, page: "main"});

  }




  createSpanSummary() {
    console.log(" Input to summarizer:");
    // console.log(this.state);
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
      content = <Main url = {this.state.url} summary={this.state.summary} fullText = {this.getScript}
      detail_level={this.state.detail_level} sentSpan={this.state.sentSpan}
        wordSpan={this.state.wordSpan} setPage={this.setPage} editSummary={this.editSummary}
        setDetail={this.setDetail} createSpanSummary={this.createSpanSummary}/>
    } else if (this.state.page === "edit") {
      content = <Edit url = {this.state.url}
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
