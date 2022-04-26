import React from 'react';
import './Card.scss';

class Card extends React.Component {
  render() {
    return (
      <div className="card-inner">
        <img alt="profile"></img>
        <p>Name</p>
        <p>Position</p>
        <p>e-mail</p>
        <p>phone</p>
      </div>
    );
  }
}

export default Card;
