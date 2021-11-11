import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Root from "./Root";
import Snackbar from './Snackbar';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
require('dotenv').config();
ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Root>
                <Snackbar>
                    <App />
                </Snackbar>
            </Root>
    </MuiPickersUtilsProvider>
,
  document.getElementById('root')
);
