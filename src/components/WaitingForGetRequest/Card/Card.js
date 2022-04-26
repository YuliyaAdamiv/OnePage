import React from 'react';
import Photo from '../../../img/photo-cover.svg';
import './Card.scss';

class Card extends React.Component {
  render() {
    return (
      <div className="card-inner">
        <img className="card-item" src={Photo} alt="profile"></img>
        <p className="card-name">Name</p>
        <p>Position</p>
        <p>e-mail</p>
        <p>phone</p>
      </div>
    );
  }
}

export default Card;
