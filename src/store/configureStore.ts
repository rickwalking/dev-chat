import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';

import { firebaseReducer } from 'react-redux-firebase';

import thunk from 'redux-thunk';

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default () => {
    const store = createStore(combineReducers({
        firebase: firebaseReducer,
    }),
        composeEnhancers(applyMiddleware(thunk)),
    );

    return store;
}
