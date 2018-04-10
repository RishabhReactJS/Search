export const REQUEST_POSTS = 'REQUEST_POSTS';

const initialState = {
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        items: action.users
      };

    case RECEIVE_POSTS:
      return {};

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

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

export function searchFor(searchText) {
  return dispatch => {
    dispatch(requestPosts(searchText));
    return fetch(`https://api.github.com/search/users?q=${searchText}`)
      .then(response => response.json())
      .then(response => dispatch(receivePosts(response.items)));
  };
}
