import React from 'react';
import logo from '../../img/Logo.svg';
import Button from '../Button/Button';
import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }
  render() {
    return (
      <div className="full-width">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-content">
            <Button className="App-item" name="Users" />
            <Button className="App-item" name="Sing up" />
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
