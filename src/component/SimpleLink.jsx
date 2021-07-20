import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    text: {
        textDecoration: 'none',
        color: theme.palette.common.black
    }
}))

export default function SimpleLink({ to = '/', children }) {
    const classes = useStyles();

    return (
        <Link to={to}>
            <div className={classes.text}>{children}</div>
        </Link>
    )
}
