import React from 'react';
import './Input.scss';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: props.placeholder,
    };
  }
  render() {
    return (
      <div>
        <input className="input" placeholder={this.state.placeholder}></input>
      </div>
    );
  }
}

export default Input;
