import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Button from '../Button/Button';
import './Form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      error: null,
      isLoaded: false,
      token: '',
    };
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
      },
    });
  }

  componentDidMount() {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            token: result,
          });
          console.log(result);
          console.log(this.state);
        },
        (error) => {
          this.setState({
            isLoaded: true,
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
        console.log(position);
        console.log(this.state);
      });
  }
  handleFileUpload = (event) => {
    const {photo} = event.target.files[0].name;
    const {type} = event.target;
    this.setState({
      [photo]: '',
      [type]: type,
    });
    console.log(event.target.files[0].name);
  };
  handleChange = (e) => {
    const {id, name, value} = e.target;

    this.setState({
      [name]: value,
      [id]: id,
    });
    console.log(id, value);
  };
  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      // body: this.state,
      // headers: {Token: token},
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.success) {
          console.log(data.success);
        } else {
          console.log(data.error);
        }
      })
      .catch(function (error) {
        // error;
      });
  };
  render() {
    const {name, email, phone} = this.state;
    const {error, isLoaded} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
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

            <Button type="submit" name="Sing up" />
          </form>
        </div>
      );
    }
  }
}
export default Form;
