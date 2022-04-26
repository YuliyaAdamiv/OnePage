import React from 'react';
import Input from '../Form/Input/Input';
import Button from '../Button/Button';
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
          <label>
            <input type="radio" checked={true} />
            Frontend developer
          </label>
          <label>
            <input type="radio" />
            Backend developer
          </label>
          <label>
            <input type="radio" />
            Designer
          </label>
          <label>
            <input type="radio" />
            QA
          </label>
        </div>
        <label>
          <input
            ref="fileInput"
            onChange={this.handleFileUpload}
            type="file"
            style={{display: 'none'}}
          />
          <button
            className="upload"
            onClick={() => this.refs.fileInput.click()}
          >
            Upload
          </button>
          <input className="file" placeholder="Upload your photo " />
        </label>

        <Button name="Sing up" />
      </div>
    );
  }
}

export default Form;
