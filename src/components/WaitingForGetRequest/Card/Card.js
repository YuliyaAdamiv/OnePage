import React from 'react';
import './Card.scss';

const Card = (props) => {
  const {item} = props;
  return (
    <div className="card-inner">
      <img className="card-item" src={item.photo} alt="profile"></img>
      <p className="card-name">{item.name}</p>
      <p>{item.position}</p>
      <p>{item.email}</p>
      <p>{item.phone}</p>
    </div>
  );
};

export default Card;
