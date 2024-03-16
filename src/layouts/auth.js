import { Box, Grid } from "@mui/material";
import login from '../assets/img/login.svg';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        margin: 0,
        padding: 0,
    },
    leftGrid: {
        backgroundColor: '#1F002E',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
        maxHeight: '100%',
    },
    box: {
        width: '60%',
        maxHeight: '100%',
        '@media (max-width: 900px)': {
            width: '90%',
        },
        margin: 0,
        padding: 0,
        maxWidth: '384px'
    },
    rightGrid: {
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        '@media (max-width: 900px)': {
            display: 'none',
        },
        margin: 0,
        padding: 0,
    },
}));

const AuthLayout = props => {

    const classes = useStyles();

    return(
        <Grid container className={classes.root}>
            <Grid item xs={12} md={6} className={classes.leftGrid}>
                <Box className={classes.box} style={{ maxWidth: props?.maxWidth && props?.maxWidth }}>
                    {props.children}
                </Box>
            </Grid>
            <Grid item xs={12} md={6} className={classes.rightGrid} />
        </Grid>
    )
}

export default AuthLayout;