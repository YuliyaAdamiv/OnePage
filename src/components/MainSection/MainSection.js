import React from 'react';
import './MainSection.scss';

class MainSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }
  render() {
    return (
      <div className="title">
        <div className="main-section">
          <h1 className="title-text">
            Test assignment for front-end developer
          </h1>
          <p className="main-text">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <button className="button main">{this.state.name}</button>
        </div>
      </div>
    );
  }
}

export default MainSection;
