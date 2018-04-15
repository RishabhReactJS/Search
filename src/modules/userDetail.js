const initialState = {
  items: [],
  user: {},
  repo: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        items: action.users
      };

    case RECEIVE_USER:
      return {
        ...state,
        user: action.user
      };

    case RECEIVE_REPO:
      return {
        ...state,
        repo: action.repo
      };

    default:
      return state;
  }
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(json) {
  console.log('json');
  console.log(json);
  return {
    type: RECEIVE_POSTS,
    users: json
  };
}

export const RECEIVE_USER = 'RECEIVE_USER';
function receiveUser(userDet) {
  console.log('RECEIVE_USER');
  console.log(userDet);
  return {
    type: RECEIVE_USER,
    user: userDet
  };
}

export const RECEIVE_REPO = 'RECEIVE_REPO';
function receiveRepo(json) {
  console.log('RECEIVE_REPO');
  console.log(json);
  return {
    type: RECEIVE_REPO,
    repo: json
  };
}

function requestRepo(userName) {
  return dispatch => {
    return fetch(`https://api.github.com/users/${userName}/repos`)
      .then(response => response.json())
      .then(response => dispatch(receiveRepo(response)));
  };
}

export function searchFor(searchText) {
  return dispatch => {
    return fetch(`https://api.github.com/search/users?q=${searchText}`)
      .then(response => response.json())
      .then(response => dispatch(receivePosts(response.items)));
  };
}

export function selectUser(userName) {
  return dispatch => {
    dispatch(requestRepo(userName));
    return fetch(`https://api.github.com/users/${userName}`)
      .then(response => response.json())
      .then(response => dispatch(receiveUser(response)));
  };
}
