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
      fullText: "After two seasons at the Everyman Theatre, Liverpool, Nighy made his London stage debut at the National Theatre in an epic staging of Ken Campbell and Chris Langham's Illuminatus!, which opened the new Cottesloe Theatre on 4 March 1977. He was cast to appear in two David Hare premieres, also at the National. During the 1980s, he appeared in several television productions, among them Hitler's SS: Portrait in Evil with John Shea and Tony Randall. Nighy has starred in many radio and television dramas, notably the BBC serial The Men's Room (1991). He claimed that the serial, an Ann Oakley novel adapted by Laura Lamson, was the job that launched his career.[8] More recently he has appeared in the thriller State of Play (2003) and the costume drama He Knew He Was Right (2004). He played Samwise Gamgee in the 1981 BBC Radio dramatisation of The Lord of the Rings (where he was credited as William Nighy), and appeared in the 1980s BBC Radio versions of Yes Minister episodes. He starred with Stephen Moore and Lesley Sharp in the acclaimed short radio drama Kerton's Story, written by James Woolf and first aired in 1996. He had a starring role in the 2002 return of Auf Wiedersehen, Pet, portraying crooked politician Jeffrey Grainger. He has also made a guest appearance in the BBC Radio 4 series Baldi. Two of Nighy's most acclaimed stage performances were in National Theatre productions. As Bernard Nightingale, an unscrupulous university don, in Tom Stoppard's Arcadia (1993), he engaged in witty exchanges with Felicity Kendal, who played the role of Hannah Jarvis, an author. He played a consultant psychiatrist in Joe Penhall's Blue/Orange (2000), for which he won an Olivier Award nomination for Best Actor, and which transferred to the West End at the Duchess Theatre the following year. In 1997, Nighy starred as Tom Sergeant, a restaurant entrepreneur, in David Hare's Skylight, which had premiered in 1995 and was moved to the Vaudeville Theatre.[9][10] Nighy at the 2011 Toronto International Film Festival Nighy received some recognition by American audiences for his acclaimed portrayal of overaged rock star Ray Simms in the 1998 film Still Crazy. In 1999 he gained further prominence in the UK with the starring role in 'The Photographer', an episode of the award-winning BBC-TV mockumentary comedy series People Like Us, playing Will Rushmore, a middle aged man who has abandoned his career and family in the deluded belief that he can achieve success as a commercial photographer.",
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
