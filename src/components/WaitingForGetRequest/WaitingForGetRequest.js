import React from 'react';
import Button from '../Button/Button';
import Card from './Card/Card';
import './WaitingForGetRequest.scss';

class WaitingForGetRequest extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title-waiting">Working with GET request</h1>
        <div className="waitingForGetRequest">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <Button className="main" name="Show more" />
      </div>
    );
  }
}

export default WaitingForGetRequest;
