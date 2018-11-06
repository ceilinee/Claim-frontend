import React, { Component } from 'react';
import './App.css';
import './Claim.css';
import './newClaim.css';
import { BrowserRouter, Redirect, Switch, Router, Route, Link } from 'react-router-dom';
import logo from './logo.png';
import up from './up.png';
import axios from 'axios';
import down from './down.png';
import icon from './icon.png';
import danger from './danger.png';
import university from './university.png';
import card from './coverage card.jpg';
import location from './location.JPG';
import summary from './claim summary card.png';
import car from './car.png';
import senti from './senti.png';
import App from './App';
import { ResponsiveBar } from '@nivo/bar';
var moment = require('moment');

class newClaim extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      width: 0,
      height: 0,
      users: [],
      name: '',
      email: '',
      date: '',
      month: '',
      year: '',
      cause: '',
      yes: false,
      no: false,
      otherParty: 0,
      accident: '',
      street: '',
      city: '',
      chat:'',
      chatlog: [],
      translation: '',
      image: [],
      image1: 0,
      image2: 0,
      image3: 0,
      image4: 0,
      image5: 0,
      sentiment: [],
      sentiment1: 0,
      sentiment2: 0,
      sentiment3: 0,
      sentiment4: 0,
      selectedFile: null,
      link: '',
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  renderHeader = () => {
    return(
      <div>
              <div className="links">
                <img src={icon} alt="university " className="university"/>
                Gotham Insurance Portal
                <Link to={`/home`} className="selection">
                  Home
                </Link>
                <Link to={`/events`} className="selection">
                  Claims Portal
                </Link>
                <Link to={`/newClaim`} className="selected">
                  Forms
                </Link>
                <div className="profile">
                    Sally Joseph (Agent: 07456)
                </div>
                <div className="powered">
                    Powered by
                    <img src={logo} alt="picture" className="logo"/>
                </div>
              </div>
     </div>
    )
  }
  renderBody = () => {
    return(
      <div>
        <div className="ai">
          <div className="innerformlarge">
              <p className="formTitle">
                AI Processes
              </p>
              <div className="input">
                <div className="inputboxes1">
                  <input type="text" className="textarea" value={this.state.link} onChange={(event)=> {this.setState({link : event.target.value})}} placeholder="Image Link" />
                  <div>
                  {this.state.link == '' ? '' :<img src={this.state.link} alt="image not found" className="uploadedImage"/>}
                  </div>
                </div>
                <div className="inputboxes1">
                  <textarea rows="21" className="textarea" placeholder="Chat Transcript" value={this.state.chat} onChange={(event)=> {this.setState({chat : event.target.value})}}/>
                </div>
              </div>
              <div className="output">
                <div className="inputboxes-short">
                  <input type="text" className="textbox1" id= "color" placeholder="Color" value={this.state.image1} onChange={(event)=> {this.setState({image1 : event.target.value})}}/>
                  <input type="text" className="textbox2" id= "vehicle" placeholder="Vehicle" value={this.state.image2} onChange={(event)=> {this.setState({image2 : event.target.value})}}/>
                  <input type="text" className="textbox2" id= "car" placeholder="Car" value={this.state.image3} onChange={(event)=> {this.setState({image3 : event.target.value})}}/>
                  <input type="text" className="textbox2" id= "sports" placeholder="Sports" value={this.state.image4} onChange={(event)=> {this.setState({image4 : event.target.value})}}/>
                  <input type="text" className="textbox3" id= "roadster" placeholder="Roadster" value={this.state.image5} onChange={(event)=> {this.setState({image5 : event.target.value})}}/>
                </div>
                <div className="context-chart-new">
                <ResponsiveBar
                      data={[{
                          "Emotion": "Color",
                          "Color": this.state.image1,
                        },
                        {
                          "Emotion": "Vehicle",
                          "Vehicle": this.state.image2,
                        },
                        {
                          "Emotion": "Car",
                          "Car": this.state.image3,
                        },
                        {
                          "Emotion": "Sports",
                          "Sports": this.state.image4,
                        },
                        {
                          "Emotion": "Roadster",
                          "Roadster": this.state.image5,
                        }
                        ]}
                      keys={[
                          "Color",
                          "Vehicle",
                          "Car",
                          "Sports",
                          "Roadster"
                      ]}
                      indexBy="Emotion"
                      margin={{
                          "top": 0,
                          "right": 50,
                          "bottom": 30,
                          "left": 60
                      }}
                      gridXValues={[0,10,20,30,40,50,60,70,80,90,100]}
                      padding={0.3}
                      colors="nivo"
                      colorBy="id"
                      defs={[
                          {
                              "id": "dots",
                              "type": "patternLines",
                              "background": "inherit",
                              "color": "#ff605d",
                              "size": 4,
                              "padding": 1,
                              "stagger": true
                          },
                          {
                              "id": "lines",
                              "type": "patternLines",
                              "background": "inherit",
                              "color": "#eed312",
                              "rotation": -45,
                              "lineWidth": 6,
                              "spacing": 10
                          }
                      ]}
                      fill={[
                          {
                              "match": {
                                  "id": "Percentage Certain"
                              },
                              "id": "dots"
                          }
                      ]}
                      layout="horizontal"
                      borderColor="inherit:darker(1.6)"
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor="inherit:darker(1.6)"
                      animate={true}
                      motionStiffness={90}
                      motionDamping={13}
                  />
                  </div>
                <div className="inputboxes-short">
                  <input type="text" className="textbox1" id= "anger" placeholder="Anger" value={this.state.sentiment1} onChange={(event)=> {this.setState({sentiment1 : event.target.value})}}/>
                  <input type="text" className="textbox2" id= "fear" placeholder="Fear" value={this.state.sentiment2} onChange={(event)=> {this.setState({sentiment2 : event.target.value})}}/>
                  <input type="text" className="textbox2" id= "joy" placeholder="Joy" value={this.state.sentiment3} onChange={(event)=> {this.setState({sentiment3 : event.target.value})}}/>
                  <input type="text" className="textbox2" id= "sadness" placeholder="Sadness" value={this.state.sentiment4} onChange={(event)=> {this.setState({sentiment4 : event.target.value})}}/>
                </div>
                <div className="context-chart-new">
                <ResponsiveBar
                      data={[{
                          "Emotion": "Anger",
                          "Anger": this.state.sentiment1,
                        },
                        {
                          "Emotion": "Fear",
                          "Fear": this.state.sentiment2,
                        },
                        {
                          "Emotion": "Joy",
                          "Joy": this.state.sentiment3,
                        },
                        {
                          "Emotion": "Sadness",
                          "Sadness": this.state.sentiment4,
                        }
                        ]}
                      keys={[
                          "Anger",
                          "Fear",
                          "Joy",
                          "Sadness"
                      ]}
                      indexBy="Emotion"
                      margin={{
                          "top": 0,
                          "right": 50,
                          "bottom": 30,
                          "left": 60
                      }}
                      gridXValues={[0,10,20,30,40,50,60,70,80,90,100]}
                      padding={0.3}
                      colors="nivo"
                      colorBy="id"
                      defs={[
                          {
                              "id": "dots",
                              "type": "patternLines",
                              "background": "inherit",
                              "color": "#ff605d",
                              "size": 4,
                              "padding": 1,
                              "stagger": true
                          },
                          {
                              "id": "lines",
                              "type": "patternLines",
                              "background": "inherit",
                              "color": "#eed312",
                              "rotation": -45,
                              "lineWidth": 6,
                              "spacing": 10
                          }
                      ]}
                      fill={[
                          {
                              "match": {
                                  "id": "Percentage Certain"
                              },
                              "id": "dots"
                          }
                      ]}
                      layout="horizontal"
                      borderColor="inherit:darker(1.6)"
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor="inherit:darker(1.6)"
                      animate={true}
                      motionStiffness={90}
                      motionDamping={13}
                  />
                  </div>
                <div className="inputboxes1">
                  <textarea rows="10" className="textarea1" id= "translation" placeholder="Translation" value={this.state.translation} onChange={(event)=> {this.setState({translation : event.target.value})}}/>
                </div>
              </div>
          </div>
        </div>
        <div className="form">
          <div className="innerform">
              <p className="formTitle">
                Claim Filing Form
              </p>
              <input type="text" className="textbox" id= "name" value={this.state.name} onChange={(event)=> {this.setState({name : event.target.value})}} placeholder="Full Name" />
              <input type="text" className="textbox" id= "email" value={this.state.email} onChange={(event)=> {this.setState({email : event.target.value})}} placeholder="Email" />
              <div>
                <input type="text" className="textbox1" id= "date" value={this.state.date} onChange={(event)=> {this.setState({date : event.target.value})}} placeholder="Date" />
                <input type="text" className="textbox2" id= "month" value={this.state.month} onChange={(event)=> {this.setState({month : event.target.value})}} placeholder="Month" />
                <input type="text" className="textbox3" id= "year" value={this.state.year} onChange={(event)=> {this.setState({year : event.target.value})}} placeholder="Year" />
              </div>
              <input type="text" className="textbox" id= "cause" value={this.state.cause} onChange={(event)=> {this.setState({cause : event.target.value})}} placeholder="Cause of Accident" />
              <div className="radioset">
                  Was anyone else involved?
                  <div className="radiotitle">
                      <input className="radiobutton" type="radio" name="select" id="yes" onChange={()=> {this.setState({ otherParty: 1}); this.handleChatlog();this.handleImage(); this.handleSentiment();}}/>
                      <label className="radiolabel">Yes</label>
                      <input className="radiobutton" type="radio" name="select" id="no" onChange={()=> {this.setState({ otherParty: 0}); this.handleChatlog();this.handleImage(); this.handleSentiment();}}/>
                      <label className="radiolabel">No</label>
                  </div>
              </div>
              <textarea rows="14" className="textbox" id= "accident" value={this.state.accident} onChange={(event)=> {this.setState({accident : event.target.value})}} placeholder="Accident Description"/>
              <div>
                <input type="text" className="textbox4" id= "street" placeholder="Street" value={this.state.street} onChange={(event)=> {this.setState({street : event.target.value})}}/>
                <input type="text" className="textbox2" id= "city" placeholder="City" value={this.state.city} onChange={(event)=> {this.setState({city : event.target.value})}}/>
              </div>
          </div>
        </div>
        <div className="submit">
          <div className="submit-liner"/>
          <Link to={`/`} className="backButton">
            Back
          </Link>
          <Link to={`/`} className="submitButton" onClick={() => {this.submitForm()}}>
            Submit
          </Link>
        </div>
      </div>
    )
  }
  handleChatlog = () => {
    console.log(this.state.chat);
    console.log(this.state.translation);
    var chat = this.state.chat;
    var newchat = chat.split(", ");
    var translation = this.state.translation.split(", ");
    var array = [];
    for(var i = 0; i<newchat.length; i++){
      var separate = newchat[i].split(": ");
      var translationseparate = translation[i].split(": ");
      separate.push(translationseparate[1]);
      array.push(separate);
    }
    this.setState({chatlog : array});
  }
  handleImage = (value) => {
    var image = [];
      image.push(this.state.image1);
      image.push(this.state.image2);
      image.push(this.state.image3);
      image.push(this.state.image4);
      image.push(this.state.image5);
    this.setState({
      image: image
    })
    console.log(this.state.image);
  }
  handleSentiment = (value) => {
    var senti = [];
      senti.push(this.state.sentiment1);
      senti.push(this.state.sentiment2);
      senti.push(this.state.sentiment3);
      senti.push(this.state.sentiment4);
    this.setState({
      sentiment: senti
    })
    console.log(this.state.sentiment);
  }
  submitForm = () => {
    this.handleSubmit();
  }
  handleSubmit = () => {
    return axios.post('/users/claim/', { name: this.state.name, email: this.state.email, cause: this.state.cause, date: this.state.date, month: this.state.month, year: this.state.year, otherParty: this.state.otherParty, accident: this.state.accident, street: this.state.street, city: this.state.city, imgTrait: this.state.image, link: this.state.link, chatTrait: this.state.sentiment})
    .then(response => console.log(response)).then(this.handleSubmitChat());
  }
  handleSubmitChat = () => {
    for(var i = 0; i<this.state.chatlog.length;i++){
      this.handleSubmitChatlog(i);
    }
  }
  handleSubmitChatlog = (value) => {
    var chat = this.state.chatlog[value];
    console.log(chat);
    return axios.post('/users/submitchat/', { user: chat[0], context: chat[1], translation: chat[2]})
    .then(response => console.log(response));
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
          <div className="formbody">
            {this.renderBody()}
          </div>
      </div>
    );
  }
}
// <img src={logo} alt="picture" className="logo"/>
// fileChangedHandler = (event) => {
//   console.log(event.target.files[0]);
//   const formData = new FormData();
//   formData.append('myImage',event.target.files[0]);
//   const config = {
//       headers: {
//           'content-type': 'multipart/form-data'
//       }
//   };
//   axios.post("/users/image/",event.target.files[0])
//       .then((response) => {
//           alert("The file is successfully uploaded");
//       }).catch((error) => {
//   });
// }
// uploadHandler = (event) => {
//   this.setState({
//     selectedFile : event.target.files[0]
//   })
//   this.sendImage(event.target.files[0]);
// }
// sendImage = (event) => {
//   return axios.post('/users/image/', event)
//   .then(response => console.log(response));
// }
export default newClaim;
