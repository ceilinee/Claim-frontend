import React from 'react';
import './App.css';
import './newClaim.css';
import card from './coverage card.jpg';
import location from './location.JPG';
import summary from './claim summary card.png';

export default class ChatFr extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            language: true,
        }
  }
  render(){
    var content = this.props.chat.message;
		//determines what type of message it is (coverage, location, link, or plain)
		if(this.props.chat.type === "coverage"){
			//If it's a coverage message, the image of the card will appear on the left or right side depending on type of user
			return(
	       <div>
	       {this.props.chat.user === "client" ? <p className="chat-right"><img src={card} alt="card" className="card"/></p> : <p><img src={card} alt="card" className="card"/></p>}
	       </div>
			);
		}
		else if (this.props.chat.type === "location"){
			//If it's a location message, the image of the location will appear on the left or right side depending on type of user
			return(
	       <div>
	       {this.props.chat.user === "client" ? <p className="chat-right"><img src={location} alt="card" className="card"/></p> : <p><img src={location} alt="card" className="card"/></p>}
	       </div>
			);
		}
		else if (this.props.chat.type === "link"){
			//If it's a link message, the image of the card will appear on the left or right side depending on type of user
			return(
	       <div>
	       {this.props.chat.user === "client" ? <p className="chat-right"><img src={this.props.chat.message} alt="card" className="card"/></p> : <p><img src={this.props.chat.message} alt="card" className="card"/></p>}
	       </div>
			);
		}
		else{
			//If it's a normal message, the text will appear on the left or right side depending on type of user
			return(
	       <div>
	       {this.props.chat.user === "client" ? <p className="chat-right">{content}</p> : <p>{content}</p>}
	       </div>
			);
	  }
    }
  }
