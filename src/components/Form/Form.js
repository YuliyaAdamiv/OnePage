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
    };
    this.ref = createRef();
    this.validator = new SimpleReactValidator({
      validators: {
        phone: {
          message:
            'User phone number. Number should start with code of Ukraine +380.',
          rule: (value, params, validator) => {
            return (
              validator.helpers.testRegex(value, /^[\+]{0,1}380([0-9]{9})$/i) &&
              params.indexOf(value) === -1
            );
          },
          messageReplace: (message, params) =>
            message.replace(':values', this.helpers.toSentence(params)),
          required: true,
        },
        files: {
          message: 'User photo is not required.',
          rule: (value, params, validator) => {
            return (
              validator.helpers.testRegex(value, /^[\+]{0,1}380([0-9]{9})$/i) &&
              params.indexOf(value) === -1
            );
          },
          messageReplace: (message, params) =>
            message.replace(':values', this.helpers.toSentence(params)),
          required: true,
        },
      },
    });
  }

  componentDidMount() {
    console.log(this.ref.current);
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type':
          'application/x-www-form-urlencoded; charset=UTF-8;application/json',
        token: this.state.token,
      },
    })
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
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type':
          'application/x-www-form-urlencoded; charset=UTF-8;application/json',
        token: this.state.token,
      },
    })
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
    let form = new FormData();
    this.setState({
      photo: photo,
    });
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
      .then(function (formData) {
        console.log(formData);
        if (formData.success) {
          console.log(formData.success);
        } else {
          console.log(formData.error);
        }
      })
      .catch(function (error) {
        // error;
      });
  };

  render() {
    const {name, email, phone, error, isLoaded} = this.state;
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
              className="input"
              placeholder="Your name"
              name="name"
              value={name}
              onChange={this.changeHandler}
              onBlur={() => this.validator.showMessageFor('name')}
            />
            <div className="message-error">
              {this.validator.message(
                'name',
                this.state.email,
                'required|min:2|max:60'
              )}
            </div>
            <input
              className="input"
              placeholder="Email"
              name="email"
              value={email}
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
                accept="image/*"
                name="photo"
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
                {this.validator.message(
                  'files',
                  this.state.photo,
                  'required|files'
                )}
              </div>
            </label>

            <Button type="submit" name="Sing up" />
          </form>
        </div>
      );
    }
  }
}
export default Form;
