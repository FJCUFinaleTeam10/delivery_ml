import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose,  applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

export default ({ children }) => {
    // lang: 'cn' | 'en'
    let lang = localStorage.getItem('lang') || 'cn';
    // lang: 'dark' | 'light'
    let theme = localStorage.getItem('theme') || 'dark';
    // const token = localStorage.getItem('token');
    const initialState = {
        // auth: {
        //     authenticated: token
        // },
        lang,
        theme
    };
    // https://github.com/jhen0409/react-native-debugger/issues/280
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        reducers,
        initialState,
        composeEnhancer(applyMiddleware(reduxThunk)),
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
