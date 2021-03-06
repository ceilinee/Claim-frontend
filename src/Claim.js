import React from "react";
import moment from "moment";
import "./App.css";
import "./Modal.css";
import "./Claim.css";
import "./index.css";
import "./newClaim.css";
import axios from "axios";
import danger from "./danger.png";
import up from "./up.png";
import down from "./down.png";
import icon from "./icon.png";
import App from "./App";
import Chat from "./Chat";
import ChatFr from "./ChatFr";
import Chart from "./Chart";
import { ResponsiveBar } from "@nivo/bar";

export default class Claim extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      claim: [],
      idNumber: "",
      open: false,
      language: true,
			chatlist: [],
			number: 20,
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
	renderModal = () => {
    var time = moment().format('L');
		var e1 = this.props.claim.visual[0].class;
		var colorarray = ["#667EEA","#6778E2","#6972DA","#6B6DD2","#6D67CA","#6E61C2","#705CBA","#705CBA","#7450AA","#764BA2"];
		var colorarray2 = ["#56A4E4","#579FE4","#599BE5","#5B97E6","#5D93E6","#5E8EE7","#608AE8","#6286E8","#6482E9","#667EEA"];
		var colorarray3 = ["#36D1DC","#3AC8DD","#3EC0DE","#42B8DF","#46AFE0","#4AA7E1","#4AA7E1","#5296E3","#568EE4","#5B86E5"];
		var colorarray4 = ["#5b86e5","#547DD5","#4E75C5","#486DB5","#4264A5","#3C5C95","#365485","#304b75","#2a4365","#243b55"];
		return(
      <div id="modal">
        <div id="modal-background">
            <div className="left">
              <div className="box5">
                <div className="title">
                  Chat Log
                </div>
                <div className="french" onClick = {() => {if(this.state.language){this.setState({ language: false})} else{this.setState({ language: true})}}}>
                  FR/EN
                </div>
              </div>
              {this.state.language ? this.renderChat() : this.renderFrChat()}
            </div>
            <div className="right">
                <div className="box5">
                  <div className="title">
                    Claim Details (0000416789)
                    <div className="close" onClick = {() => {this.setState({ open: false})}}>
                    x
                    </div>
                  </div>
                </div>
                  <div className="claim-answer">
                    <table id="policy">
                      <tbody>
                      <tr>
                        <td className="bold">Policy No.:</td>
                        <td>AD983JF803</td>
                        <td></td>
												<td></td>
                        <td className="bold">Accident Date:</td>
                        <td>{time}</td>
												<td></td>
												<td></td>
												<td className="bold">Severity:</td>
                        <td>1 - Severe</td>
                      </tr>
                      <tr>
                        <td className="bold">Claim No.:</td>
                        <td>0000416789</td>
                        <td></td>
												<td></td>
                        <td className="bold">Filing Date:</td>
                        <td>{time}</td>
												<td></td>
												<td></td>
												<td className="bold">Address:</td>
                        <td>Toronto, ON</td>
                      </tr>
											<tr>
                        <td className="bold">Damage:</td>
                        <td>{this.props.damage}</td>
                        <td></td>
												<td></td>
                        <td className="bold">Fault:</td>
                        <td>{this.props.fault}</td>
												<td></td>
												<td></td>
												<td className="bold">Involved:</td>
                        <td>{this.props.multiple}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                <div className="box5">
                  <div className="title">
                    Accident Context
                  </div>
                </div>
                  <div className="answer1">
										<div className="context-left">
										  <div className="context-title">
												Client Attachment
											</div>
											<img src={this.props.claim.imgURL} alt="car" className="carpic"/>
										</div>
										<div className="context-right">
												<div className="context-title">
													Vehicle Characterics
												</div>
												<Chart value={this.props.claim.visual[0].accuracy/10} length="short" label={this.props.claim.visual[0].class} color={colorarray4}/>
												<Chart value={this.props.claim.visual[1].accuracy/10} length="short" label={this.props.claim.visual[1].class} color={colorarray2}/>
												<Chart value={this.props.claim.visual[2].accuracy/10} length="short" label={this.props.claim.visual[2].class} color={colorarray3}/>
												<Chart value={this.props.claim.visual[3].accuracy/10} length="short" label={this.props.claim.visual[3].class} color={colorarray}/>
										</div>
                  </div>
                <div className="box6">
                  <div className="title">
                    Conversation Sentiment
                  </div>
                </div>
                <div className="answer1">
											<div className="sentiment-chart">
												<Chart value={this.props.claim.tone_sentiment[0].accuracy/10} length="long" label={this.props.claim.tone_sentiment[0].tone} color={colorarray4}/>
												<Chart value={this.props.claim.tone_sentiment[1].accuracy/10} length="long" label={this.props.claim.tone_sentiment[1].tone} color={colorarray2}/>
												<Chart value={this.props.claim.tone_sentiment[2].accuracy/10} length="long" label={this.props.claim.tone_sentiment[2].tone} color={colorarray3}/>
												<Chart value={this.props.claim.tone_sentiment[3].accuracy/10} length="long" label={this.props.claim.tone_sentiment[3].tone} color={colorarray}/>
											</div>
                </div>
            </div>
        </div>
      </div>
    )
  }
	renderChat = () => {
		console.log(this.props.claim.chatlist);
    return(
      <div className="chat">
				{this.props.claim.chatlist.map(chat =>
						<Chat
						key={chat.id}
						chat={chat}
					/>
				)}
      </div>
    )
  }
	deleteClaim = () => {
		axios.delete('/users/deleteClaim', { params: { idClaims: this.props.claim.idClaims } })
				.then(this.setState({open: false})).then(() => {this.props.refresh()});
	}
  renderFrChat = () => {
		console.log(this.props.claim.translation);
    return(
      <div className="chat">
				{this.props.claim.translation.map(chat =>
						<ChatFr
						key={chat.id}
						chat={chat}
					/>
				)}
      </div>
    )
  }
	deleteClaim = () => {
		axios.delete("/users/deleteClaim", { params: { idClaims: this.props.claim.idClaims } })
				.then(this.setState({open: false})).then(() => {this.props.refresh()});
	}
  render(){
		var date = moment().format('L');
    // var time = date.substring(0,10);
		console.log(this.props.damage);
		return(
        <tr>
					<td bgcolor="#ffb3b3">Pending Review</td>
          <td><a className="car" onClick = {() => {this.setState({open: true})}}>0000416789</a></td>
          <td>1 - Severe <img className="danger" src={danger} alt="danger"/></td>
          <td>{date}</td>
          <td>{date}</td>
          <td>Toronto, ON {this.state.open ? this.renderModal() : ""}</td>
        </tr>
		    );
    }
  }

	// <ResponsiveBar
	// 			data={[{
	// 					"Emotion": "Grey",
	// 					"Grey": this.props.claim.visual[0].accuracy,
	// 				},
	// 				{
	// 					"Emotion": "Vehicle",
	// 					"Vehicle": this.props.claim.visual[1].accuracy,
	// 				},
	// 				{
	// 					"Emotion": "Car",
	// 					"Car": this.props.claim.visual[2].accuracy,
	// 				},
	// 				{
	// 					"Emotion": "Sports",
	// 					"Sports": this.props.claim.visual[3].accuracy,
	// 				},
	// 				{
	// 					"Emotion": "Roadster",
	// 					"Roadster": this.props.claim.visual[4].accuracy,
	// 				}
	// 				]}
	// 			keys={[
	// 					"Grey",
	// 					"Vehicle",
	// 					"Car",
	// 					"Sports",
	// 					"Roadster"
	// 			]}
	// 			indexBy="Emotion"
	// 			margin={{
	// 					"top": 30,
	// 					"right": 30,
	// 					"bottom": 50,
	// 					"left": 60
	// 			}}
	// 			padding={0.3}
	// 			colors={["#5DADE2","#283747","#EAECEE","#1B4F72","#7FB3D5"]}
	// 			colorBy="id"
	// 			defs={[
	// 					{
	// 							"id": "dots",
	// 							"type": "patternLines",
	// 							"background": "inherit",
	// 							"color": "#ff605d",
	// 							"size": 4,
	// 							"padding": 1,
	// 							"stagger": true
	// 					},
	// 					{
	// 							"id": "lines",
	// 							"type": "patternLines",
	// 							"background": "inherit",
	// 							"color": "#eed312",
	// 							"rotation": -45,
	// 							"lineWidth": 6,
	// 							"spacing": 10
	// 					}
	// 			]}
	// 			fill={[
	// 					{
	// 							"match": {
	// 									"id": "Percentage Certain"
	// 							},
	// 							"id": "dots"
	// 					}
	// 			]}
	// 			layout="horizontal"
	// 			borderColor="inherit:darker(1.6)"
	// 			labelSkipWidth={12}
	// 			labelSkipHeight={12}
	// 			labelTextColor="inherit:darker(1.6)"
	// 			animate={true}
	// 			motionStiffness={90}
	// 			motionDamping={13}
	// 	/>
	// <ResponsiveBar
	// 			data={[{
	// 					"Emotion": "Anger",
	// 					"Anger": this.props.claim.tone_sentiment[0].accuracy,
	// 				},
	// 				{
	// 					"Emotion": "Fear",
	// 					"Fear": this.props.claim.tone_sentiment[2].accuracy,
	// 				},
	// 				{
	// 					"Emotion": "Joy",
	// 					"Joy": this.props.claim.tone_sentiment[3].accuracy,
	// 				},
	// 				{
	// 					"Emotion": "Sadness",
	// 					"Sadness": this.props.claim.tone_sentiment[4].accuracy,
	// 				}
	// 				]}
	// 			keys={[
	// 					"Anger",
	// 					"Joy",
	// 					"Sadness",
	// 					"Fear"
	// 			]}
	// 			indexBy="Emotion"
	// 			margin={{
	// 					"top": 50,
	// 					"right": 50,
	// 					"bottom": 50,
	// 					"left": 60
	// 			}}
	// 			padding={0.3}
	// 			colors={["#5DADE2","#283747","#EAECEE","#1B4F72","#7FB3D5"]}
	// 			colorBy="id"
	// 			defs={[
	// 					{
	// 							"id": "dots",
	// 							"type": "patternLines",
	// 							"background": "inherit",
	// 							"color": "#ff605d",
	// 							"size": 4,
	// 							"padding": 1,
	// 							"stagger": true
	// 					},
	// 					{
	// 							"id": "lines",
	// 							"type": "patternLines",
	// 							"background": "inherit",
	// 							"color": "#eee",
	// 							"rotation": -45,
	// 							"lineWidth": 6,
	// 							"spacing": 10
	// 					},
	// 			]}
	// 			fill={[
	// 					{
	// 							"match": {
	// 									"id": "Happiness"
	// 							},
	// 							"id": "lines"
	// 					},
	// 					{
	// 							"match": {
	// 									"id": "Joy"
	// 							},
	// 							"id": "happy"
	// 					}
	// 			]}
	// 			borderColor="inherit:darker(1.6)"
	// 			labelSkipWidth={12}
	// 			layout="horizontal"
	// 			labelSkipHeight={12}
	// 			labelTextColor="inherit:darker(1.6)"
	// 			animate={true}
	// 			motionStiffness={90}
	// 			motionDamping={15}
	// 	/>
