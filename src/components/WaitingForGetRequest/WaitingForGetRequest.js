import React from 'react';
import {Button} from 'react-bootstrap';
// import Button from '../Button/Button';
import Card from './Card/Card';
import './WaitingForGetRequest.scss';

class WaitingForGetRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      token: '',
      pages: null,
    };
  }
  showMore = () => {
    alert('Show More');
    fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/users?next_link&count=36'
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            items: data.users,
            pages: data.total_pages,
          });
          console.log(data.users);
          console.log(data.total_pages);
          console.log(this.state);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };
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
    const {error, isLoaded, items, pages} = this.state;
    console.log(pages);
    console.log(this.state);
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
          {(() => {
            if (pages === 3) {
              return (
                <div>
                  <Button
                    variant="warning"
                    disabled={true}
                    onClick={this.showMore}
                    name="Show more"
                  >
                    Show more
                  </Button>
                </div>
              );
            } else {
              return (
                <div>
                  <Button
                    variant="warning"
                    onClick={this.showMore}
                    name="Show more"
                  >
                    Show more
                  </Button>
                </div>
              );
            }
          })()}
        </div>
      );
    }
  }
}

export default WaitingForGetRequest;
