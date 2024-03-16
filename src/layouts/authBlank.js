import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Instagram from '../assets/icons/instagram.svg';
import Youtube from '../assets/icons/youtube.svg';
import backgroundAuth from '../assets/img/background-auth.svg';
import CountrySelect from "../components/country-select";

const useStyles = makeStyles((theme) => ({
    root: { 
        backgroundColor: '#0D0013',
        backgroundImage: `url(${backgroundAuth})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        '@media (min-width: 901px)': {
            // height: '100vh',
            minHeight: '100vh'
        },
        '@media (max-width: 900px)': {
            minHeight: '100vh',
        }
    },
    content: {
        backgroundColor: '#FFF',
        borderRadius: '10px',
        padding: '32px',
        width: '40vw',
        '@media (max-width: 900px)': {
            width: '70vw',
        },
        maxWidth: '448px',
        '@media (min-width: 901px)': {
            // maxHeight: '80vh',
            // overflow: 'auto'
        }
    },
    icon: {
        color: '#9643FF',
        display: 'flex',
        alignItems: 'center'
    },
    social: {
        marginTop: '20px',
        display: 'flex',
        gap: 5,
        alignItems: 'center'
    },
    boxSocial: {
        display: 'table',
        margin: 'auto'
    },
    boxContent: {
        margin: 40
    }
}));

const AuthBlankLayout = props => {

    const classes = useStyles();

    return(
        <Box className={classes.root}>
            <Box className={classes.boxContent}>
                <CountrySelect 
                    sx={{ 
                        right: '20px', 
                        borderRadius: '4px',
                        '@media (max-width: 900px)': {
                            marginBottom: '20px',
                            width: 'fit-content',
                            marginLeft: 'auto'
                        },
                        '@media (min-width: 901px)': {
                            position: 'fixed', 
                            top: '20px', 
                        }
                    }} 
                />
                <Box className={classes.content}>
                    {props.children}
                </Box>
                <Box className={classes.boxSocial}>
                    <Box className={classes.social}>
                        <Typography sx={{ color: '#F0F0F0', fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Acompanhe nas redes: </Typography>
                        &nbsp;
                        <a href="http://instagram.com.br/" target="_blank">
                            <img src={Instagram} className={classes.icon} />
                        </a>
                        <a href="https://www.youtube.com/" target="_blank">
                            <img src={Youtube} className={classes.icon} />
                        </a>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AuthBlankLayout;