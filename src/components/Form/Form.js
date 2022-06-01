import React, {createRef} from 'react';
import SimpleReactValidator from 'simple-react-validator';
// import {Button} from 'react-bootstrap';
import Button from '../Button/Button';
import './Form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      isLoaded: false,
      error: null,
      token: '',
      position_id: null,
      post: '',
    };
    this.ref = createRef();
    this.validator = new SimpleReactValidator({
      validators: {
        phone: {
          message: ' Number should start with code of Ukraine +38.',
          rule: (value, params, validator) => {
            return (
              validator.helpers.testRegex(
                value,
                /((\+38)?\(?\d{3}\)?[\s-]?(\d{3}[\s-]\d{2}[\s-]\d{2}|\d{3}-\d{4}))/i
              ) && params.indexOf(value) === -1
            );
          },
          messageReplace: (message, params) =>
            message.replace(':values', this.helpers.toSentence(params)),
          required: true,
        },
        alpha: {
          message: 'The :attribute may only  letters.',
          rule: (val, params, validator) => {
            return (
              validator.helpers.testRegex(val, /^[a-z]*$/i) &&
              params.indexOf(val) === -1
            );
          },
          messageReplace: (message, params) =>
            message.replace(':values', this.helpers.toSentence(params)),
          required: true,
        },
        in: {
          message: 'The selected :attribute must be :values.',
          rule: function rule(val, options) {
            return options.indexOf(val) > -1;
          },
          messageReplace: function messageReplace(message, options) {
            return message.replace(':values', this.helpers.toSentence(options));
          },
        },
      },
      submitForm: function () {
        if (this.validator.allValid()) {
          alert('You submitted the form and stuff!');
        } else {
          this.validator.showMessages();
          this.forceUpdate();
        }
      },
    });
  }

  componentDidMount() {
    console.log(this.ref.current);
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            token: result.token,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then(function (response) {
        return response.json();
      })
      .then((position) => {
        this.setState({
          position: position,
        });
      });
  }
  handleFileUpload = (event) => {
    let photo = event.target.files[0];

    console.log(photo);
    if (!photo) {
      console.log('image is required');
      return false;
    }
    if (!photo.name.match(/\.(jpg|jpeg)$/)) {
      console.log('select valid image.');
      return false;
    }
    let form = new FormData();
    this.setState({
      photo: photo,
    });

    if (event.target.files[0].size < 5000) {
      console.log('image not valid');
    }

    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = () => {
      if (img.width === 70 && img.height === 70) {
        console.log(`Nice, image is the right size. It can be uploaded`);
      } else {
        console.log(`Sorry, this image doesn't look like the size we wanted. It's 
   ${img.width} x ${img.height} but we require 100 x 100 size image.`);
      }
    };
    console.log(photo);
    console.log(form);
  };

  handleChange = (e) => {
    const {id} = e.target;

    this.setState({
      position_id: id,
    });
    console.log(id);
  };
  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  submitHandler = (e) => {
    e.preventDefault();
    const {name, email, phone, photo, position_id} = this.state;
    let position = parseInt(position_id);
    let formData = new FormData();

    formData.append('photo', photo);
    formData.append('email', email);
    formData.append(
      'phone',
      phone
        .replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')
    );
    formData.append('position_id', position);
    formData.append('name', name);
    console.log(formData);
    console.log(this.state);
    console.log(this.state.token);
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      headers: {
        Token: this.state.token,
      },
      body: formData,
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then((formData) => {
        this.setState({
          post: formData.success,
        });
        console.log(this.state.post);
      });
  };

  render() {
    const {alpha, email, phone, error, isLoaded} = this.state;
    console.log(this.state);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="form-group">
          <h1 className="title-waiting">Working with POST request</h1>
          <form onSubmit={this.submitHandler}>
            <input
              className="input form-control"
              placeholder="Your name"
              name="name"
              value={alpha}
              onChange={this.changeHandler}
              onBlur={() => this.validator.showMessageFor('alpha')}
            />
            <div className="message-error">
              {this.validator.message(
                'alpha',
                this.state.alpha,
                'required|alpha|min:2|max:60'
              )}
            </div>
            <input
              className="input"
              placeholder="Email"
              name="email"
              value={email}
              required=""
              onChange={this.changeHandler}
              onBlur={() => this.validator.showMessageFor('email')}
            />
            <div className="message-error">
              {this.validator.message(
                'email',
                this.state.email,
                'required|email|min:2|max:100'
              )}
            </div>
            <input
              className="input"
              placeholder="Phone"
              name="phone"
              required=""
              value={phone}
              onChange={this.changeHandler}
              onBlur={() => this.validator.showMessageFor('phone')}
            />
            <div className="message-error">
              {this.validator.message(
                'phone',
                this.state.phone,
                'required|phone'
              )}
            </div>
            <p className="text-center">+38 (XXX) XXX - XX - XX</p>
            <p className="text-center">Select your position</p>
            <div className="radio-btns">
              <label>
                <input
                  id="1"
                  type="radio"
                  name="position"
                  value="Frontend developer"
                  onChange={this.handleChange}
                  checked={true}
                />
                Frontend developer
              </label>
              <label>
                <input
                  id="2"
                  type="radio"
                  name="position"
                  value="Backend developer"
                  onChange={this.handleChange}
                />
                Backend developer
              </label>
              <label>
                <input
                  id="3"
                  type="radio"
                  name="position"
                  value="Developer"
                  onChange={this.handleChange}
                />
                Designer
              </label>
              <label>
                <input
                  id="4"
                  type="radio"
                  name="position"
                  value="QA"
                  onChange={this.handleChange}
                />
                QA
              </label>
            </div>
            <label>
              <input
                ref={this.ref}
                onChange={this.handleFileUpload}
                type="file"
                required=""
                accept="image/*"
                name="photo"
                id="photoInput"
                // style={{display: 'none'}}
              />
              {/* <button
                className="upload"
                onClick={() => this.refs.fileInput.click()}
              >
                Upload
              </button>
              <input
                className="file"
                placeholder="Upload your photo "
                onBlur={() => this.validator.showMessageFor('files')}
              /> */}
              <div className="message-error">
                {/* {this.validator.message(
                  'files',
                  this.state.photo,
                  'required|files'
                )} */}
                {this.validator.message(
                  'in',
                  this.state.in,
                  'required|in:stu,stuart,stuman'
                )}
              </div>
            </label>

            <Button type="submit" name="Sing up" onClick={this.submitForm} />
          </form>
        </div>
      );
    }
  }
}
export default Form;
