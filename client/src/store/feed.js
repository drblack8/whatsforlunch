
const SET_FEED = "feed/SET_FEED";
const SET_COMMENTS = "feed/SET_COMMENTS";
const SET_FREINDS = "feed/SET_FRIENDS";

export const setFeed = (value) => {
  return {
    type: SET_FEED,
    feed: value
  }
}

export const setFriends = (value) => {
  return {
    type: SET_FEED,
    friends: value
  }
}

export const setComments = (value) => {
  return {
    type: SET_COMMENTS,
    comments: value
  }
}

export const getFeed = (userId) => async dispatch => {
    const data = await fetch(`/api/feed/${userId}`);
    if (data.ok) {
        const  { posts, comments, friends } = await data.json();

        dispatch(setFeed(posts))
        dispatch(setComments(comments))
        // dispatch(setFriends(friends))
    }
}

const intialState = {
  feed: [],
  comments: [],
  friends: [],
}

export default function reducer(state=intialState, action) {
    const newState = {...state};
    switch (action.type) {
        case SET_FEED: 
        return {
            ...newState,
            feed: action.feed
        }
        case SET_COMMENTS:
          return {
            ...newState,
            comments: action.comments
          }
        case SET_FREINDS:
          return {
            ...newState,
            friends: action.friends
          }
        default: 
        return state;
    
  }
}