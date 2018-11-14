import React from 'react';
import moment from 'moment';
import './App.css';
import './Modal.css';
import './index.css';
import './newClaim.css';
import axios from 'axios';
import danger from './danger.png';
import up from './up.png';
import down from './down.png';
import icon from './icon.png';
import card from './coverage card.jpg';
import location from './location.JPG';
import summary from './claim summary card.png';
import App from './App';

export default class ChatFr extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            claim: [],
            idNumber: '',
            open: false,
            language: true,
        }
  }
  componentWillMount() {
    this.generateID();
	}
  generateID = () => {
    var num = Math.floor((Math.random() * 90) + 10);
    this.setState({
      idNumber : num
    })
  }

  renderChat = () => {
    return(
      <div className="chat">
        <p className="chat-right">Hello</p>
        <p>Hello! How can we help you today?</p>
        <p className="chat-right">Check Coverage</p>
        <p><img src={card} alt="card" className="card"/></p>
        <p className="chat-right">I just got in an accident!</p>
        <p>It sounds like you’ve had quite an adventurous day. </p>
        <p>Lets start a new auto claim for you! Where did the accident occur?</p>
        <p className="chat-right"><img src={location} alt="card" className="card"/></p>
        <p>Was there another car or person involved in the accident?</p>
        <p className="chat-right">yes</p>
        <p>Oh no! That sounds bad.</p>
        <p>Do you want to submit a picture to attach to the claim?</p>
        <p className="chat-right">yes</p>
        <p>Okay. Please use your camera to take a photo or select an existing photo.</p>
        <p className="chat-right">yes</p>
        <p>I have submitted a claim on your behalf. You can review the submitted information below. </p>
        <p><img src={summary} alt="card" className="card"/></p>
      </div>
    )
  }
  render(){
    var content = this.props.chat.message;
    console.log(this.props.chat.message);
		return(
        <div>
        {this.props.chat.user == "client" ? <p className="chat-right">{content}</p> : <p>{content}</p>}
        </div>
		);
    }
  }
  // renderFrChat = () => {
  //   return(
  //     <div className="chat">
  //       <p className="chat-right">Bonjour</p>
  //       <p>Salut! Que peut-on faire pour vous aider aujourd'hui?</p>
  //       <p className="chat-right">Vérifier la couverture</p>
  //       <p><img src={card} alt="card" className="card"/></p>
  //       <p className="chat-right">Je viens d'avoir un accident!</p>
  //       <p>On dirait que vous avez passé une journée aventureuse. </p>
  //       <p>Commençons une nouvelle réclamation automatique pour vous! Où l'accident s'est-il produit?</p>
  //       <p className="chat-right"><img src={location} alt="card" className="card"/></p>
  //       <p>Y avait-il une autre voiture ou une personne impliquée dans l'accident?</p>
  //       <p className="chat-right">Oui</p>
  //       <p>Oh non! Cela sonne mal.</p>
  //       <p>Voulez-vous soumettre une photo à joindre à la demande?</p>
  //       <p className="chat-right">yes</p>
  //       <p>D'accord. Veuillez utiliser votre appareil photo pour prendre une photo ou sélectionner une photo existante.</p>
  //       <p className="chat-right">Oui</p>
  //       <p>Jai soumis une demande en votre nom. Vous pouvez consulter les informations soumises ci-dessous.</p>
  //       <p><img src={summary} alt="card" className="card"/></p>
  //     </div>
  //   )
  // }
