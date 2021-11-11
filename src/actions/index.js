import {
    SET_LANG,
    SET_THEME,
    AUTH_USER,
    AUTH_ERROR
} from './types';

import { createAxios } from '../services';
const axios = createAxios();
export function setLang(lang) {
    localStorage.setItem('lang', lang);
    return {
        type: SET_LANG,
        payload: lang
    }
};

export function setTheme(theme) {
    localStorage.setItem('theme', theme);
    return {
        type: SET_THEME,
        payload: theme
    }
};

// export const signUp = (formProps, callback) => async dispatch => {
//     try {
//         const response = await axios.post('/sign-up', formProps);
//         dispatch({ type: AUTH_USER, payload: response.data.token });
//         localStorage.setItem('token', response.data.token);
//         callback();
//     } catch (e) {
//         dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
//     }
// };

// export const signIn = ({email, password}, callback) => async dispatch => {
//     try {
//         const response = await axios.post('/sign-in', { email, password });
//         dispatch({ type: AUTH_USER, payload: response.data.token });
//         localStorage.setItem('token', response.data.token);
//         callback();
//     } catch (e) {
//         dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
//     }
// };

// export const signOut = () => {
//     localStorage.removeItem('token');
//     return {
//         type: AUTH_USER,
//         payload: ''
//     }
// };
