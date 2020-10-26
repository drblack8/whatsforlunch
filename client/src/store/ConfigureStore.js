import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import Posts from './posts'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    Posts
});

const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
};

export default configureStore;