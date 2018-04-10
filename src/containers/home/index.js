import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchFor } from '../../modules/userDetail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.startSearch = this.startSearch.bind(this);
  }

  componentDidMount() {
    this.props.searchFor();
  }

  startSearch() {
    const text = document.getElementById('SearchT').value;
    this.props.searchFor(text);
  }

  directUserDetails() {
    this.props.changePage();
  }

  render() {
    return (
      <div>
        <div>
          <input
            id="SearchT"
            type="text"
            placeholder="Seach Here"
            onChange={this.startSearch}
          />
        </div>
        <div>
          <MuiThemeProvider>
            <List>
              {console.log('this.props.searchList')}
              {console.log(this.props.searchList)}

              {this.props.searchList != undefined
                ? this.props.searchList.map(user => (
                    <ListItem
                      onClick={() => this.directUserDetails()}
                      key={user.id}
                      leftAvatar={<Avatar src={user.avatar_url} size={30} />}>
                      {user.login}
                    </ListItem>
                  ))
                : null}
            </List>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchList: state.userDetail.items
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchFor,
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
