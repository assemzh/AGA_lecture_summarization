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
    // var tmp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet viverra velit fringilla condimentum. Vestibulum convallis ipsum non nunc laoreet venenatis. Morbi lacus turpis, ullamcorper et imperdiet ut, convallis sed ante. Sed vestibulum in arcu id varius. Duis dapibus aliquet pretium. Maecenas tristique, sem in interdum pharetra, quam tellus blandit lacus, ut imperdiet nisi metus vel ex. Maecenas sit amet risus eget justo pretium mollis. Sed ac tempor nibh. Suspendisse nec lectus lacus.            In hac habitasse platea dictumst. Nunc eu mi luctus metus commodo elementum nec at ipsum. Morbi nec sapien dapibus, pulvinar lacus nec, ullamcorper turpis. Maecenas venenatis hendrerit ante ut pretium. Donec tristique iaculis justo. Sed et dapibus turpis, sed sodales arcu. Vestibulum nisl ante, luctus in ex vel, maximus viverra risus. Donec at nisi eu felis suscipit tincidunt sed at orci. Etiam porta, leo quis vulputate pellentesque, lectus libero luctus tellus, vel molestie nulla magna in velit. Morbi mattis tincidunt semper. Morbi a dolor quis felis fringilla auctor. Donec rhoncus urna vitae arcu faucibus gravida. Nullam euismod lorem ac ligula vestibulum, non consectetur mauris vestibulum.";
    // var tmp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ante a magna eleifend vulputate. Nam a molestie purus. Pellentesque sed lacus vitae dui faucibus maximus. Mauris id neque eu nulla molestie tristique. Praesent ultrices posuere arcu ac elementum. Aenean pulvinar sed mauris quis consequat. Mauris vitae tincidunt lorem, non aliquam purus. Nunc interdum, massa ut vestibulum ornare, dolor turpis dictum urna, vel pharetra risus libero a leo. Vivamus volutpat diam et leo convallis elementum. Sed et eros sit amet diam porta vestibulum. Aliquam iaculis, dolor nec cursus viverra, eros nulla lobortis orci, id sollicitudin est nunc sit amet massa. Nam posuere id erat quis tristique. Sed rutrum augue nec enim venenatis accumsan. Curabitur iaculis convallis mi, eu volutpat ex sollicitudin eu. Donec feugiat, lorem vitae mattis convallis, nunc nunc accumsan purus, nec sollicitudin nisi lectus non risus. Curabitur vel tortor enim. Praesent mollis rhoncus lacus, sed tincidunt justo vehicula et. Duis euismod, libero feugiat auctor luctus, metus risus pellentesque diam, id fringilla ante sapien eu nunc. In mollis dolor vitae nulla dapibus finibus. Praesent fringilla purus quis nisi tristique dignissim. Integer ut metus mauris. Cras tincidunt vitae nulla et efficitur. Vivamus egestas, lacus quis dapibus porta, neque urna sagittis velit, vel dictum est ante id eros. Proin orci nisi, faucibus nec imperdiet non, mattis vel tellus. Maecenas egestas nisl ut eros faucibus, eu interdum dui faucibus. Donec condimentum aliquet enim, eget tincidunt lacus sodales sit amet. Curabitur eleifend dolor et neque semper, eu efficitur nisi rhoncus. Suspendisse potenti. Proin laoreet et elit at porttitor. In pharetra odio elit, a consequat nibh finibus sed. Suspendisse quis nunc condimentum sem dignissim rutrum ut et libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras eget posuere diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent eget euismod quam. Morbi commodo ligula sed arcu suscipit, sed volutpat nulla pretium. Donec commodo molestie varius. Maecenas vulputate magna leo, at vestibulum lacus tincidunt vel. Pellentesque vulputate maximus mi et ultricies."
    // tmp = tmp + tmp + tmp;

    // var tmp = value.split(" ").map((word) => "<span>" + word + "</span>").join(" ");
    console.log(" Input to summarizer:");
    console.log(this.state);
    const data = this.state;

    trackPromise(
      fetch('/summary', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data["result"]);
        this.setState({summary: data["result"]});
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    );
  }

  editSummary(event) {
    this.setState({summary: event.target.value});
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

    if (this.state.page === "input") {
      content = <Input setVideo={this.setVideo}/>
    } else if (this.state.page === "main") {
      content = <Main detail_level={this.state.detail_level} summary={this.state.summary} setPage={this.setPage} editSummary={this.editSummary} setDetail={this.setDetail} createSpanSummary={this.createSpanSummary}/>
    } else if (this.state.page === "edit") {
      content = <Edit
      summary={this.state.summary} setPage={this.setPage} editSummary={this.editSummary}
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
