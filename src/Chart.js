import React from 'react';
import moment from 'moment';
import './Chart.css';
import axios from 'axios';

export default class Chart extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
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
  renderBar = () => {
    var items = [];
    if(this.props.length == "short"){
      for (var i = 0; i < this.props.value; i++) {
          var style = {
            'backgroundColor': this.props.color[i]
          };
          items.push(<div style={style} className="Chart-bar-section"/>);
      }
      for (var i = 0; i < 10-this.props.value; i++){
        items.push(<div className="Chart-bar-section-grey"/>);
      }
    }
    else{
      for (var i = 0; i < this.props.value; i++) {
          var style = {
            'backgroundColor': this.props.color[i]
          };
          items.push(<div style={style} className="Chart-bar-section-long"/>);
      }
      for (var i = 0; i < 10-this.props.value; i++){
        items.push(<div className="Chart-bar-section-grey-long"/>);
      }
    }
    return(
      <span className="Chart-Span">
      {items}
      </span>
    );
  }
  render(){
			return(
	       <div className="Chart">
	        <span className="Chart-Label">{this.props.label}</span>
          <div className="Chart-bar">{this.renderBar()}</div>
	       </div>
			);
  }
}
