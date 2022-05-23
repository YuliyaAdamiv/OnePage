import React from 'react';
import {Button} from 'react-bootstrap';
// import Button from '../Button/Button';
import Card from './Card/Card';
import {connect} from 'react-redux';
import {personsFetchData} from '../action/persons';
import './WaitingForGetRequest.scss';

class WaitingForGetRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      pages: null,
    };
  }

  showMore = () => {
    alert('Show More');
    this.setState({
      pages: this.state.pages + 3,
    });
    this.props.fetchData(
      'https://frontend-test-assignment-api.abz.agency/api/v1/users?next_link&count=36'
    );
  };
  componentDidMount() {
    this.props.fetchData(
      'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'
    );
  }

  render() {
    const {pages} = this.state;
    return (
      <div>
        <h1 className="title-waiting">Working with GET request</h1>
        <div className="waitingForGetRequest">
          {this.props.data.map((data) => (
            <Card key={data.id} item={data} />
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

const mapStateToProps = (state) => {
  return {data: state.users};
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(personsFetchData(url)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingForGetRequest);
