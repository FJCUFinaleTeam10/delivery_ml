import { SET_LANG } from '../actions/types';

export default (state = 'en', action) => {
    switch (action.type) {
        case SET_LANG:
            return action.payload;
        default:
            return state;
    }
}
