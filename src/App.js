import React, { Component } from 'react';
import './App.css';
import './Home.css';
import { BrowserRouter, Redirect, Switch, Router, Route, Link } from 'react-router-dom';
import logo from './logo.png';
import axios from "axios";
import up from './up.png';
import down from './down.png';
import icon from './icon.png';
import danger from './danger.png';
import card from './coverage card.jpg';
import location from './location.JPG';
import summary from './claim summary card.png';
import senti from './senti.png';
import Claim from './Claim.js';
var moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      width: 0,
      height: 0,
      page: "Information",
      claimant: true,
      issued: true,
      open: false,
      claim: true,
      language: true,
      claimlist: [],
      loading: true,
      home: true,
      claimLoad: false,
      chatlist: [],
      imgURL: '',
      damage: '',
      fault: '',
      multiple: '',
      how: '',
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
    this.fetchChat();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    //set timeout of 8 seconds for loading state
    setTimeout(() => this.setState({ loading: false }), 8000);
  }
  fetchChat = () => {
    fetch("https://claims-backend.herokuapp.com/users/chat", {
      accept: "application/json",
    }).then((response) => response.json()).then(response => {
      this.setChat(response);
    }).then(() => {this.flaskCall()});
  }
  setChat = (data) => {
    var newdata = [];
    console.log(data);
    for(var i = 0; i<data.length; i++){
      var newObject = {"id": data[i].idchatlog,"user": data[i].side, "message": data[i].content, "type": data[i].type}
      if(newObject.type == "link"){
        this.setState({
          imgURL : newObject.message
        })
      }
      if(newObject.type == "damage"){
        this.setState({
          damage : newObject.message
        })
      }
      if(newObject.type == "fault"){
        this.setState({
          fault : newObject.message
        })
      }
      if(newObject.type == "multiple"){
        this.setState({
          multiple : newObject.message
        })
      }
      if(newObject.type == "how"){
        this.setState({
          how : newObject.message
        })
      }
      newdata.push(newObject);
    }
    this.setState({
      chatlist : newdata,
    })
    console.log(this.state.chatlist);
  }
  flaskCall = () => {
    this.setState({img_URL: "https://i.imgur.com/UieUlMQ.jpg"})
    let data = JSON.stringify({
      "image_url": this.state.imgURL,
      "chat_body": this.state.chatlist
    })
    axios.post("https://flaskendpoint.herokuapp.com/api/watson_helper", data, {
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(response => this.setClaims(response));
  }
  setClaims = (data) => {
    var newdata = data.data;
    var translation = newdata.translation;
    var translation_array = [];
    var array = [];
    var claims = {};
    for(var i = 0; i<translation.length; i++) {
      var user = translation[i].user;
      var message = translation[i].message;
      var new_translation = {"id": i, "user": user, "message": message};
      translation_array.push(new_translation);
    }
    console.log(translation_array);
    claims.chatlist = this.state.chatlist;
    claims.imgURL = this.state.imgURL;
    claims.tone_sentiment = newdata.tone_sentiment;
    claims.translation = translation_array;
    claims.visual = newdata.visual;
    array.push(claims);
    this.setState({
      claimlist : array,
      claimLoad : true,
    })
    console.log(this.state.claimlist);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  renderClaims = () => {
    var time = moment().format("MM/DD/YYYY");
    return(
      <div>
        <div className="box3">
          <div className="title">
          {this.state.claim ? <img className="chevron" src={up} alt="img" onClick = {() => {this.clickClaim()}}/> : <img className="chevron" src={down} alt="img" onClick = {() => {this.clickClaim()}}/> }
            Claims
          </div>
        </div>
        {this.state.claim?
        <div className="box2">
          <div className="answer">
            <table id = "issued">
              <tbody>
                <tr>
                  <th>Status</th>
                  <th>Claim Number</th>
                  <th>Severity</th>
                  <th>Accident Date</th>
                  <th>Filing Date</th>
                  <th>Location</th>
                </tr>
                {this.state.claimlist.map(claim =>
                    <Claim
                    key={claim.imgURL}
                    claim={claim}
                    how={this.state.how}
                    multiple={this.state.multiple}
                    damage={this.state.damage}
                    fault={this.state.fault}
                    refresh={() => {this.fetchClaims()}}
                  />
                )}
                <tr>
                  <td bgcolor="#9ee69d">Completed</td>
                  <td><a className="car" onClick = {() => {this.setState({page: "Detail"})}}>0000382934</a></td>
                  <td>4 - Low</td>
                  <td>08/03/2017</td>
                  <td>08/03/2017</td>
                  <td>Toronto, ON</td>
                </tr>
                <tr>
                  <td bgcolor="#9ee69d">Completed</td>
                  <td><a className="car" onClick = {() => {this.setState({page: "Detail"})}}>0000234987</a></td>
                  <td>4 - Low</td>
                  <td>07/09/2015</td>
                  <td>07/09/2015</td>
                  <td>Toronto, ON</td>
                </tr>
              </tbody>
            </table>
            <br/>
          </div>
        </div>
        : ""}
      </div>
    )
  }
  // <tr>
  //   <div className="red"><td>Pending Review</td></div>
  //   <td><a className="car" onClick = {() => {this.setState({open: true})}}>0000416756</a></td>
  //   <td>1 - Severe <img className="danger" src={danger} alt="danger"/></td>
  //   <td>{time}</td>
  //   <td>{time}</td>
  //   <td>Toronto, ON</td>
  // </tr>

  clickClaim = () => {
    console.log("CLicked");
    if(this.state.claim){
    this.setState({
      claim:false,
    });
    }
    else{
      this.setState({
        claim:true,
      });
    }
    console.log(this.state.claim);
  }
  clickClaimant = () => {
    console.log("CLicked");
    if(this.state.claimant){
    this.setState({
      claimant:false,
    });
    }
    else{
      this.setState({
        claimant:true,
      });
    }
    console.log(this.state.claimant);
  }
  clickIssued = () => {
    if(this.state.issued){
      this.setState({
        issued:false,
      });
    }
    else{
      this.setState({
        issued:true,
      });
    }
  }
  renderClaimant = () => {
    return(
      <div>
        <div className="box3">
          {this.state.claimant ? <img className="chevron" src={up} alt="img" onClick = {() => {this.clickClaimant()}}/> : <img className="chevron" src={down} alt="img" onClick = {() => {this.clickClaimant()}}/> }
          <div className="title">
            Claimant Overview
          </div>
        </div>
        {this.state.claimant ?
        <div className="box2">
          <div className="answer">
            <table id="policy">
              <tbody>
                <tr>
                  <th>Occupation:</th>
                  <th>CEO</th>
                  <th></th>
                  <th>Open Claims:</th>
                  <th>1</th>
                </tr>
                <tr>
                  <th>Marital Status:</th>
                  <th>Single</th>
                  <th></th>
                  <th>Open Quotes:</th>
                  <th>0</th>
                </tr>
                <tr>
                  <th>Total Monthly Premiums:</th>
                  <th>$2,142.78</th>
                  <th></th>
                  <th>Open Transactions:</th>
                  <th>3</th>
                </tr>
              </tbody>
            </table>
            <br/>
          </div>
        </div>
        : ""}
      </div>
    )
  }
  renderIssued = () => {
    return(
      <div>
        <div className="box3">
          <div className="title">
          {this.state.issued ? <img className="chevron" src={up} alt="img" onClick = {() => {this.clickIssued()}}/> : <img className="chevron" src={down} alt="img" onClick = {() => {this.clickIssued()}}/> }
            Issued Policies
          </div>
        </div>
        {this.state.issued ?
        <div className="box2">
          <div className="answer">
            <table id = "issued">
              <tbody>
                <tr>
                  <th>Car Type</th>
                  <th>Status</th>
                  <th>Open Claim(s)</th>
                  <th>Policy #</th>
                  <th>Inception</th>
                  <th>Expiry</th>
                </tr>
                <tr>
                  <td><a className="car" onClick = {() => {this.changePage()}}>Lamborgini</a></td>
                  <td>Active</td>
                  <td>1</td>
                  <td>AD983JF803</td>
                  <td>03/12/2013</td>
                  <td>03/12/2023</td>
                </tr>
              </tbody>
            </table>
            <br/>
          </div>
        </div>
        : ""}
      </div>
    )
  }
  // {this.state.users.map(user =>
  //   <div key={user.idUsers}>{user.email}</div>
  // )}
  renderInformation = () => {
    return(
      <div className="innerBox">
        <div className="box4">
          <div className="title">
            Bruce Wayne (42938472) - Active
          </div>
        </div>
        {this.renderClaimant()}
        {this.renderIssued()}
        {this.renderClaims()}
      </div>
    )
  }
  changePage = () => {
    this.setState({
      page: "Car",
    })
    console.log("HIIII");
  }
  renderHeader = () => {
    if(this.state.home){
      return(
        <div>
          <div className="links">
            <img src={icon} alt="university " className="university"/>
            Gotham Insurance Portal
            <div className="profile">
              Sally Joseph (Agent: 07456)
            </div>
            <div className="powered">
              Powered by
              <img src={logo} alt="picture" className="logo"/>
            </div>
            <div className="align">
              <p className="selected" onClick = {() => {this.setState({home: true})}}>
                Home
              </p>
              <a href="https://claims-app-master.herokuapp.com/" className="selection">
                Claims Portal
              </a>
              <Link to={`/newClaim`} className="selection">
                Forms
              </Link>
            </div>
          </div>
       </div>
      )
    }
    else{
        return(
          <div>
            <div className="links">
              <img src={icon} alt="university " className="university"/>
              Gotham Insurance Portal
              <div className="profile">
                Sally Joseph (Agent: 07456)
              </div>
              <div className="powered">
                Powered by
              <img src={logo} alt="picture" className="logo"/>
            </div>
            <div className="align">
              <p className="selection" onClick = {() => {this.setState({home: true})}}>
                Home
              </p>
              <p className="selection" onClick = {() => {this.setState({home: false})}}>
                Claims Portal
              </p>
              <Link to={`/newClaim`} className="selection">
                Forms
              </Link>
            </div>
          </div>
        </div>
        )
    }
  }
  renderBanner = () => {
    return(
      <div className="banner">
        <h1 className="home-h1">Welcome to the agent portal</h1>
        <p className= "paragraph">
          October 12th is our firm wide event on insurance do not forget to attend!
        </p>
      </div>
    )
  }
  renderBoxes = () => {
    return(
      <div>
        <div className="home-box">
          <div className="home-box-inner" onClick={() => {this.setState({home:false})}}>
            <div className="home-box-liner"/>
            <img src="https://image.flaticon.com/icons/svg/68/68587.svg" alt="icon" className="home-icon"/>
            <div className="home-box-title">
            Bruce Wayne Claim
            <p className="home-text">Process this claim by Nov 30th this is a very urgent claim</p>
            </div>
          </div>
          <div className="home-box-inner">
            <div className="home-box-liner"/>
            <img src="https://image.flaticon.com/icons/svg/1179/1179257.svg" alt="icon" className="home-icon"/>
            <div className="home-box-title">
            Mike Smith Claim
            <p className="home-text">Process this claim by Nov 30th this is a very urgent claim</p>
            </div>
          </div>
          <div className="home-box-inner">
            <div className="home-box-liner"/>
            <img src="https://image.flaticon.com/icons/svg/846/846325.svg" alt="icon" className="home-icon"/>
            <div className="home-box-title">
            Martin Jaimes Claim
            <p className="home-text">Process this claim by Nov 30th this is a very urgent claim</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderBar = () => {
    return(
      <div className="home-bar">
        <div className="home-status">
          Active Tasks
          {this.state.claimLoad ? '' : <img src="https://i.imgur.com/PLCCxII.gif" className="load-blue"/>}
        </div>
        <div className="home-sort">
          Sort By: Recent
          <img className="home-chevron" src={down} alt="img"/>
        </div>
      </div>
    )
  }
  render() {
    if(this.state.home){
      return (
        <div>
          {this.renderHeader()}
            <div className="two-home">
              {this.renderBanner()}
              {this.renderBar()}
              {this.renderBoxes()}
            </div>
        </div>
      );
    }
    else{
        return (
          <div>
            {this.renderHeader()}
            <div className="two">
              {this.renderInformation()}
              {this.state.open ? this.renderModal() : ""}
            </div>
          </div>
        );
    }
  }
}
export default App;
