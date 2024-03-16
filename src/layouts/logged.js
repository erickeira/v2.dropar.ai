import { Box, Container, Hidden, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';
import logo from '../assets/img/logotype.svg';
import ShoppingIcon from '../assets/icons/shopping.svg';
import CashFastCircle from '../assets/icons/cash-fast-circle.svg';
import CashBanknoteHand from '../assets/icons/cash-banknote-hand.svg';
import Notifications from '../assets/icons/notifications.svg';
import Settings from '../assets/icons/settings.svg';
import PaperTextCode from '../assets/icons/paper-text-code.svg';
import Footer from "../components/footer";
import LogoutIcon from '../assets/icons/logout.svg';
import { logout } from "../utils/logout";
import HamburgerIcon from '../assets/icons/hamburger.svg';
import { useState } from "react";
import CloseMenuIcon from '../assets/icons/close-menu.svg';
import CountrySelect from "../components/country-select";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#1F002E',
        display: 'flex',
        maxWidth: '1300px',
        padding: '36px 32px 36px 32px',
        // position: 'fixed',
        // top: 40,
        borderRadius: '8px',
        width: '90vw',
        // left: '50%',
        // transform: 'translateX(-50%)',
        justifyContent: 'space-around',
        zIndex: 2,
        // '@media (max-width: 600px)': {
        //     justifyContent: 'space-between',
        //     width: '84vw',
        // }
        marginTop: '40px',
        '@media (max-width: 900px)': {
            width: '78vw',
        }
    },
    logo: {
        width: '100px'
    },
    item: {
        cursor: 'pointer',
        borderRadius: '8px', 
        padding: '10px', 
        fontSize: '16px', 
        color: '#FFF', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '4px'
    },
    icon: {
        width: '20px'
    },
    iconMobile: {
        width: '40px',
        marginTop: '20px'
    },
    content: {
        paddingTop: '200px',
        paddingBottom: '40px'
    }
}));

const menu = [
    {
        'label': 'Minhas lojas',
        'icon': ShoppingIcon,
        'path': '/minhas-lojas'
    },
    {
        'label': 'Notificações',
        'icon': Notifications,
        'path': '/notificacoes'
    },
    {
        'label': 'Indicações',
        'icon': CashFastCircle,
        'path': '/indicacoes'
    },
    {
        'label': 'Planos',
        'icon': CashBanknoteHand,
        'path': '/planos'
    },
    {
        'label': 'Configurações',
        'icon': Settings,
        'path': '/configuracoes'
    },
    {
        'label': 'Termos de uso',
        'icon': PaperTextCode,
        'path': '/termos-uso'
    }
]

const ItemMenu = ({ data }) => {

    const classes = useStyles();

    return(
        <Link 
            to={data.path}
            style={{
                textDecoration: 'none'
            }}
        >
            <Box className={classes.item} sx={{ backgroundColor: window.location.pathname == data.path && '#9643FF' }}>
                <img src={data.icon} className={classes.icon} />
                {data.label}
                {data.label == 'Notificações' && (
                    <div style={{ backgroundColor: '#6032A9', height: '18px', width: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography style={{ fontWeight: '700', fontSize: '8.76px' }}>20</Typography>
                    </div>
                )}
            </Box>
        </Link>
    )
}

const styleFilter = {
    position: 'absolute',
    top: '0%',
    right: '0%',
    width: '60vw',
    bgcolor: '#1F002E',
    boxShadow: 24,
    p: 4,
    borderRadius: '0px 0px 0px 32px',
    maxHeight: '80vh',
    overflowY: 'auto',
    outline: 'none'
}

const LoggedLayout = props => {

    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(false);

    return(
        <>
            <Box style={{ backgroundColor: '#FFF', position: 'fixed', top: 0,  zIndex: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box 
                    container
                    className={classes.appBar}
                >
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            '@media (min-width: 901px)': {
                                gap: '48px',
                            },
                            '@media (max-width: 900px)': {
                                width: '100%',
                                justifyContent: 'space-between'
                            }
                        }}
                    >
                        <img src={logo} className={classes.logo} />
                        <Hidden smDown>
                            <Box style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {menu.map((data) => (
                                    <ItemMenu data={data} />
                                ))}
                                <CountrySelect sx={{ borderRadius: '8px' }} />
                                <Box
                                    onClick={() => {
                                        logout()
                                        props?.history?.push('/entrar')
                                    }} 
                                 className={classes.item}>
                                    <img src={LogoutIcon} className={classes.icon} />
                                </Box>
                            </Box>
                        </Hidden>
                        <Hidden smUp>
                            <img onClick={() => {setOpenMenu(true)}} src={HamburgerIcon} />
                        </Hidden>
                    </Box>
                </Box>
            </Box>
            <Container className={classes.content}>
                {props.children}
                <Footer />
            </Container>
            <Modal
                open={openMenu}
                onClose={() => {setOpenMenu(false)}}
            >
                <Box sx={styleFilter} className="custom-scrollbar">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <img src={logo} className={classes.logo} />
                        <img src={CloseMenuIcon} onClick={() => {setOpenMenu(false)}} />
                    </Box>
                    {menu.map((data) => (
                        <ItemMenu data={data} />
                    ))}
                    <img 
                        onClick={() => {
                            logout()
                            props?.history?.push('/entrar')
                        }} 
                        src={LogoutIcon} 
                        className={classes.iconMobile} 
                    />
                </Box>
            </Modal>
        </>
    )
}

export default LoggedLayout;