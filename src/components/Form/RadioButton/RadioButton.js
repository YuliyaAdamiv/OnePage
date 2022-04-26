import React from 'react';
import './RadioButton.scss';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  render() {
    return (
      <div>
        <input type="radio" value={this.state.value}></input>
      </div>
    );
  }
}

export default RadioButton;
