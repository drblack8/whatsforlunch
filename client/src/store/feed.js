
const SET_FEED = "feed/SET_FEED";


export const setFeed = (value) => {
  return {
    type: SET_FEED,
    feed: value
  }
}

export const getFeed = (userId) => async dispatch => {
    const data = await fetch(`/api/feed/${userId}`);
    if (data.ok) {
        const  feed = await data.json();
        // const feeds = []
        // feed.forEach(post => feeds.push(...post))
        console.log(feed)
        dispatch(setFeed(feed))
    }
}

const intialState = {
  feed: {}
}

export default function reducer(state=intialState, action) {
    const newState = {...state};
    switch (action.type) {
        case SET_FEED: 
        return {
            ...newState,
            feed: action.feed
        }
        default: 
        return state;
    
  }
}