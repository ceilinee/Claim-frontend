import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  render() {
    return (
      <div>
          <div className = "modalTop">
            <div className = "modalBottom">
              <div className="topModal">
              <button className= "close-button" onClick = {() => {this.props.closeModal()}}>
              x
              </button>
              {this.props.title}
              </div>
              <div className="bodyModal">
              {this.props.message}
              <div className="time">
              {this.props.time}
              </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Modal
