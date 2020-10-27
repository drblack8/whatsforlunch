const SET_POSTED = "posts/posted/SET_POSTED";

export const setPosted = (value) => {
  return {
    type: SET_POSTED,
    posted: value
  }
}

// export const getBig = () => async dispatch => {
//     const data = await fetch('/api/dashboard/big');
//     if (data.ok) {
//         const bigJackpot = await data.json();
//         // debugger
//         dispatch(setBig(bigJackpot))
//     }
// }

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