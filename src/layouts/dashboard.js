import { Grid, Box, Avatar, Typography, Divider, IconButton, Hidden } from "@mui/material";
import logo from '../assets/img/logotype.svg';
import logomin from '../assets/icons/logo-min.svg';
import ItemMenu from "../components/item-menu";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logout } from "../utils/logout";
import { Link } from 'react-router-dom';
import ShoppingIcon from '../assets/icons/shopping.svg';
import BasketWhiteIcon from '../assets/icons/basket-white.svg';
import DropIcon from '../assets/icons/drop.svg';
import ExtensionIcon from '../assets/icons/extension.svg';
// import IconButton from '../assets/icons/icon-button.svg';
import HelpIcon from '../assets/icons/help.svg';
import UserIcon from '../assets/icons/user.svg';
import BannerIcon from '../assets/icons/banner.svg';
import ClockIcon from '../assets/icons/clock.svg';
import { useEffect, useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ChatSmileIcon from '../assets/icons/chat-smile.svg';

const menu = [
    {
        'label': 'Produtos',
        'whiteIcon': BasketWhiteIcon,
        'icon': BasketWhiteIcon,
        'path': '/produtos'
    },
    {
        'label': 'Drop Reels',
        'whiteIcon': DropIcon,
        'icon': DropIcon,
        'path': '/drop-reels'
    },
    {
        'label': 'Extensão',
        'whiteIcon': ExtensionIcon,
        'icon': ExtensionIcon,
        'path': '/extensao'
    }
];

const adminMenu = [
    {
        'label': 'Usuários',
        'whiteIcon': UserIcon,
        'icon': UserIcon,
        'path': '/users'
    },
    {
        'label': 'Banners',
        'whiteIcon': BannerIcon,
        'icon': BannerIcon,
        'path': '/banners'
    },
    {
        'label': 'Histórico Drops',
        'whiteIcon': ClockIcon,
        'icon': ClockIcon,
        'path': '/history'
    }
]

const DashboardLayout = props => {

    const [list, setList] = useState([]);
    const [sidebarFull, setSidebarFull] = useState(true);

    useEffect(() => {
        if (props?.infoUser?.level == 'admin') {
            setList(adminMenu);
        }else{
            setList(menu);
        }
    }, [props.infoUser])

    return(
        <>
            <Grid 
                container
                sx={{
                    height: '100vh',
                    position: 'relative',
                    backgroundColor: '#1F002E'
                }}
            >
                <Grid 
                    md={sidebarFull ? 2 : 1}
                    xs={12}
                    sx={{
                        backgroundColor: '#1F002E',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: sidebarFull ? 'flex' : 'grid',
                                justifyContent: sidebarFull ? 'space-between' : 'center',
                                alignItems: 'center',
                                marginBottom: '20px',
                                gap: !sidebarFull && '10px'
                            }}
                        >
                            <img
                                src={sidebarFull ? logo : logomin}
                                style={{
                                    width: sidebarFull ? '120px' : '34px'
                                }}
                            />
                            <Hidden smDown>
                                <IconButton style={{ backgroundColor: sidebarFull && '#5C299C' }} onClick={() => {setSidebarFull(!sidebarFull)}}>
                                    <MenuRoundedIcon style={{ color: '#FFF' }} />
                                </IconButton>
                            </Hidden>
                        </Box>
                        {list.map((data) => (
                            <ItemMenu sidebarFull={sidebarFull} data={data} />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            '@media (max-width: 900px)': {
                                borderTop: '1px solid #FFF',
                                paddingTop: '10px'
                            }
                        }}
                    >
                        {props?.infoUser?.level != 'admin' && (
                            <>
                                <Link to="/minhas-lojas">
                                    <Box
                                        sx={{
                                            backgroundColor: 'transparent',
                                            padding: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderRadius: '8px',
                                            color: '#FFF',
                                            cursor: 'pointer',
                                            marginBottom: '10px',
                                            justifyContent: !sidebarFull && 'center'
                                        }}
                                    >
                                        <img src={ShoppingIcon} />
                                        {sidebarFull && (
                                            <>
                                                &nbsp;&nbsp;
                                                <Typography>Voltar p/Lojas</Typography>
                                            </>
                                        )}
                                    </Box>
                                </Link>
                                <img 
                                    src={sidebarFull ? HelpIcon : ChatSmileIcon} 
                                    style={{ 
                                        marginTop: '10px', 
                                        cursor: 'pointer', 
                                        margin: !sidebarFull && 'auto', 
                                        display: 'block',
                                        '@media (min-width: 601px)': { 
                                            width: sidebarFull ? '100%' : '50%', 
                                        }
                                    }} 
                                />
                            </>
                        )}
                        <Divider color="#475467" sx={{ marginTop: '20px', marginBottom: '10px' }} />
                        <Box
                            onClick={() => {logout()}}
                            sx={{
                                backgroundColor: 'transparent',
                                padding: '10px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                marginBottom: '10px',
                                borderRadius: '8px',
                                color: '#FFF',
                                cursor: 'pointer',
                                justifyContent: sidebarFull ? 'space-between' : 'center'
                            }}
                        >
                            <Avatar src={props?.infoUser?.avatar} />
                            {sidebarFull && (
                                <>
                                    <Box>
                                        <Typography>{props?.infoUser?.name}</Typography>
                                        <Typography sx={{ fontSize: '10px' }}>{props?.infoUser?.email}</Typography>
                                    </Box>
                                    <LogoutRoundedIcon style={{ color: '#FF599F' }} />
                                </>
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid 
                    md={sidebarFull ? 10 : 11}
                    xs={12}
                >
                    <Box
                        sx={{
                            backgroundColor: '#FFF',
                            borderRadius: '40px 0px 0px 0px',
                            marginTop: '10px',
                            padding: '40px',
                            '@media (min-width: 901px)': {
                                overflowY: 'auto',
                                height: '88vh'
                            },
                            '@media (max-width: 900px)': {
                                paddingLeft: '20px',
                                paddingRight: '20px',
                            }
                        }}
                    >
                        {props.children}
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default DashboardLayout;