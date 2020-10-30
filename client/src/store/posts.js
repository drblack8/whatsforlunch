const SET_POSTED = "posts/posted/SET_POSTED";

export const setPosted = (value) => {
  return {
    type: SET_POSTED,
    posted: value
  }
}

export const changePosted = (val) => dispatch => {
    dispatch(setPosted(val))
}

const intialState = {
  posts: {
      posted: false
  }
}

export default function reducer(state=intialState, action) {
    const newState = {...state};
    switch (action.type) {
        case SET_POSTED: 
        return {
            ...newState,
            posts: {
                posted: action.posted
            }
        }
        default: 
        return state;
    
  }
}