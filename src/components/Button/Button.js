import React from 'react';
import './Button.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }
  render() {
    return (
      <div>
        <button className="button">{this.state.name}</button>
      </div>
    );
  }
}

export default Button;
