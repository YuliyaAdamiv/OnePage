import React from 'react';
import Button from '../Button/Button';
import Card from './Card/Card';
import './WaitingForGetRequest.scss';

class WaitingForGetRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'
    )
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.users,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const {error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1 className="title-waiting">Working with GET request</h1>
          <div className="waitingForGetRequest">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          <Button name="Show more" />
        </div>
      );
    }
  }
}

export default WaitingForGetRequest;
