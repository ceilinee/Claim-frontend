import React, { Component } from 'react';
import './App.css';
import './Home.css';
import { BrowserRouter, Redirect, Switch, Router, Route, Link } from 'react-router-dom';
import logo from './logo.png';
import up from './up.png';
import down from './down.png';
import icon from './icon.png';
import danger from './danger.png';
import university from './university.png';
import card from './coverage card.jpg';
import location from './location.JPG';
import summary from './claim summary card.png';
import car from './car.png';
import senti from './senti.png';
import Claim from './Claim.js';
var moment = require('moment');

class Home extends Component {
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
    setTimeout(() => this.setState({ loading: false }), 1000);
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
              <Link to={`/home`} className="selected">
                  Home
              </Link>
              <Link to={`/events`} className="selection">
                  Claims Portal
              </Link>
              <Link to={`/newClaim`} className="selection">
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
  renderBanner = () => {
    return(
      <div className="banner">
        <h1 className="home-h1">Welcome to the agent portal</h1>
        <p className= "paragraph">
          October 12th is our firm wide event on insurance do not forget to attend
        </p>
      </div>
    )
  }
  renderBoxes = () => {
    return(
      <div>
        <div className="home-box">
          <Link to={`/`} className="home-box-inner">
            <div className="home-box-liner"/>
            <img src="https://image.flaticon.com/icons/svg/68/68587.svg" alt="icon" className="home-icon"/>
            <div className="home-box-title">
            Bruce Wayne Claim
            <p className="home-text">Process this claim by Nov 30th this is a very urgent claim</p>
            </div>
          </Link>
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
        <div className="home-box">
          <Link to={`/`} className="home-box-inner">
            <div className="home-box-liner"/>
            <img src="https://image.flaticon.com/icons/svg/68/68587.svg" alt="icon" className="home-icon"/>
            <div className="home-box-title">
            Bruce Wayne Claim
            <p className="home-text">Process this claim by Nov 30th this is a very urgent claim</p>
            </div>
          </Link>
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
        </div>
        <div className="home-sort">
          Sort By: Recent
          <img className="home-chevron" src={down} alt="img"/>
        </div>
      </div>
    )
  }
  render() {
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
}
export default Home;
