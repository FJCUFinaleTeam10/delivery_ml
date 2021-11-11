import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
const fontWeight = 600;
const color = '#fff';
const useStyles = makeStyles({
    success: { backgroundColor: '#4caf50', color, fontWeight },
    error: { backgroundColor: '#f44336', color, fontWeight },
    warning: { backgroundColor: '#ff9800',color, fontWeight },
    info: { backgroundColor: '#2196f3', color, fontWeight },
});

export default ({children}) => {
    const classes = useStyles();
    return (
        <SnackbarProvider classes={{
            variantSuccess: classes.success,
            variantError: classes.error,
            variantWarning: classes.warning,
            variantInfo: classes.info,
        }}>
            {children}
        </SnackbarProvider>
    )
}
