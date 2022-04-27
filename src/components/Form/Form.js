import React from 'react';
import Input from '../Form/Input/Input';
import Button from '../Button/Button';
import './Form.scss';

class Form extends React.Component {
  handleFileUpload = (event) => {
    console.log(event.target.files[0].name);
  };
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  // componentDidMount() {
  //   fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
  //     method: 'POST',
  //     body: formData,
  //     headers: {Token: token},
  //   })
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data);
  //       if (data.success) {
  //         console.log(data.success);
  //       } else {
  //         console.log(data.error);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  render() {
    // var formData = new FormData();
    // var fileField = document.querySelector('input[type="file"]');
    // formData.append('position_id', 2);
    // formData.append('name', 'Jhon');
    // formData.append('email', 'Jhon@gmail.com');
    // formData.append('phone', '+380955388485');
    // formData.append('photo', fileField.files[0]);
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
