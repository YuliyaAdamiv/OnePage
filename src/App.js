import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import './components/WaitingForGetRequest/WaitingForGetRequest.scss';
import WaitingForGetRequest from './components/WaitingForGetRequest/WaitingForGetRequest';
import Form from './components/Form/Form';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainSection name="Sign up" />
        <WaitingForGetRequest />
        <Form />
      </div>
    );
  }
}

export default App;
