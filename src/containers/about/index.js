import React, { Component } from 'react';
import { connect } from 'react-redux';
import './about.css';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userD: {},
      userR: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData != undefined) {
      this.setState({
        userD: nextProps.userData
      });
    }

    if (nextProps.userRepo != undefined) {
      this.setState({
        userR: nextProps.userRepo
      });
    }
  }

  listItems() {
    return this.state.userR.map(userRops => (
      <li>
        <h3>{userRops.name}</h3>
        <p>{userRops.description}</p>
        <p>{userRops.language}</p>
      </li>
    ));
  }

  render() {
    return (
      <div className="AboutDiv">
        <div className="userDataDiv">
          <img className="usrImg" src={this.state.userD.avatar_url} />
          <h3>{this.state.userD.login}</h3>
          <span>{this.state.userD.followers}</span>
          <span>{this.state.userD.location}</span>
          <br />
          <span>{this.state.userD.email}</span>
        </div>
        <div className="userRepos">
          <ul>{this.listItems()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userDetail.user,
  userRepo: state.userDetail.repo
});

export default connect(mapStateToProps, '')(About);
