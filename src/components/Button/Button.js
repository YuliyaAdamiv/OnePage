import React from 'react';
import './Button.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      type: props.type,
    };
  }
  render() {
    return (
      <div>
        <button
          type={this.state.type}
          onClick={this.state.onClick}
          className="button"
        >
          {this.state.name}
        </button>
      </div>
    );
  }
}

export default Button;
