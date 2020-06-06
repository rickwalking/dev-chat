import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
    CombinedState,
    AnyAction,
    Store,
} from 'redux';

import { firebaseReducer } from 'react-redux-firebase';

import { RootState } from '../firebase/interfaces';

import thunk from 'redux-thunk';

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default (): Store<CombinedState<RootState>, AnyAction> => {
    const store = createStore(combineReducers<RootState>({
        firebase: firebaseReducer,
    }),
        composeEnhancers(applyMiddleware(thunk)),
    );

    return store;
};
