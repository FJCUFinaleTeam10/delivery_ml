
import { SET_THEME } from '../actions/types';

export default (state = 'dark', action) => {
    switch (action.type) {
        case SET_THEME:
            return action.payload;
        default:
            return state;
    }
}
