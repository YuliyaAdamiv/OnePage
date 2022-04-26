import React from 'react';
import Input from '../Form/Input/Input';
import Button from '../Button/Button';
import RadioButton from '../Form/RadioButton/RadioButton';
import './Form.scss';

class Form extends React.Component {
  handleFileUpload = (event) => {
    console.log(event.target.files[0].name);
  };
  render() {
    return (
      <div>
        <h1 className="title-waiting">Working with POST request</h1>
        <div>
          <Input placeholder="Your name" />
          <Input placeholder="Email" />
          <Input placeholder="Phone" />
          <p className="text-center">+38 (XXX) XXX - XX - XX</p>
        </div>
        <p className="text-center">Select your position</p>
        <div className="radio-btns">
          <div className="radio">
            <RadioButton value="Frontend developer" />
            Frontend developer
          </div>
          <div className="radio">
            <RadioButton value="Backend developer" />
            Backend developer
          </div>
          <div className="radio">
            <RadioButton value="Designer" />
            Designer
          </div>
          <div className="radio">
            <RadioButton value="QA" />
            QA
          </div>
        </div>
        <input
          ref="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={{display: 'none'}}
        />
        <button onClick={() => this.refs.fileInput.click()}>Upload</button>
        <input className="" placeholder="Upload your photo "></input>
        <Button name="Sing up" />
      </div>
    );
  }
}

export default Form;
