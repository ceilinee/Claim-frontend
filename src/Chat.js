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

export default class Chat extends React.Component {
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
  render(){	
			var content = this.props.chat.message;
			console.log(this.props.chat.message);
			if(this.props.chat.type == "coverage"){
				return(
					 <div>
					 {this.props.chat.user == "client" ? <p className="chat-right"><img src={card} alt="card" className="card"/></p> : <p><img src={card} alt="card" className="card"/></p>}
					 </div>
				);
			}
			else if (this.props.chat.type == "location"){
				return(
					 <div>
					 {this.props.chat.user == "client" ? <p className="chat-right"><img src={location} alt="card" className="card"/></p> : <p><img src={location} alt="card" className="card"/></p>}
					 </div>
				);
			}
			else if (this.props.chat.type == "link"){
				return(
					 <div>
					 {this.props.chat.user == "client" ? <p className="chat-right"><img src={this.props.chat.message} alt="card" className="card"/></p> : <p><img src={this.props.chat.message} alt="card" className="card"/></p>}
					 </div>
				);
			}
			else{
				return(
					 <div>
					 {this.props.chat.user == "client" ? <p className="chat-right">{content}</p> : <p>{content}</p>}
					 </div>
				);
			}
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
