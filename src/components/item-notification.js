import YampiIcon from '../assets/icons/yampi.svg';
import FailedIcon from '../assets/icons/failed.svg';
import SuccessIcon from '../assets/icons/success.svg';
import NotificationIcon from '../assets/icons/notifications-purple.svg';
import { useState } from "react";
import NotificationImage from '../assets/img/notification.png';
import { makeStyles } from "@mui/styles";
import { Box, Typography, Modal, Checkbox } from "@mui/material";
import Button from './button';
import TrashIcon from '../assets/icons/trash-pink.svg';
import { Close } from '@mui/icons-material';
import Image30 from '../assets/img/image30.png';
import ShopfyImage from '../assets/img/shopify.svg';
import AliexpressImage from '../assets/img/aliexpress.svg';

const useStyles = makeStyles((theme) => ({
    subtitle: {
        fontSize: '20px',
        color: '#707070'
    },
    boxHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        marginLeft: 10
    },
    notifications: {
        marginTop: '40px'
    },
    item: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '8px',
        marginBottom: '15px',
        '@media (max-width: 600px)': { 
            display: 'grid'
        }
    },
    itemTitle: {
        fontSize: '16px'
    },
    itemTitleAction: {
        color: '#5C299C',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    itemDate: {
        fontSize: '14px',
        color: '#595959'
    },
    itemLeftSide: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
    },
    headerNotifications: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px'
    },
    headerNotificationsTitle: {
        fontSize: '24px',
        fontWeight: 500
    },
    itemUser: {
        color: '#5C299C'
    }
}));

const styleModal = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    maxHeight: '80vh',
    maxWidth: '512px',
    overflowY: 'auto',
    '@media (max-width: 600px)': { 
        width: '80vw' 
    }
};

const getBackground = (status) => {
    if(status == 'news'){
        return  "#F5ECFF"
    }else if(status == 'failed'){
        return  "#FEE2E2"
    }else if(status == 'success'){
        return  "#D1FAE5"
    }
}

const getIcon = (status) => {
    if(status == 'news'){
        return YampiIcon;
    }else if(status == 'failed'){
        return FailedIcon;
    }else if(status == 'success'){
        return SuccessIcon;
    }
}

const ItemNotifcation = props => {

    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Box className={classes.item} sx={{ backgroundColor: getBackground(props.data.status) }}>
                <Box className={classes.itemLeftSide}>
                    <img src={getIcon(props.data.status)} />
                    <Box>
                        {props.data?.user && (
                            <Typography className={classes.itemUser}>Usuário: {props.data?.user} <span style={{ fontSize: '12px' }}> ({props.data?.user_email})</span></Typography>
                        )}
                        <Typography className={classes.itemTitle}>{props.data.title}</Typography>
                        <Typography className={classes.itemTitleAction} onClick={() => {setOpenModal(true)}}>Ver detalhes da notificação</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography className={classes.itemDate}>{props.data.created_at}</Typography>
                    <img src={TrashIcon} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                    <input type="checkbox" id="checkbox" style={{ marginLeft: '10px'  }} />
                </Box>
            </Box>
            <Modal
                open={openModal}
                onClose={() => {setOpenModal(false)}}
            >
                <Box sx={styleModal} className="custom-scrollbar">

                    <Close onClick={() => {setOpenModal(false);}} style={{ color: '#A863FF', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />

                    <Box className={classes.headerNotifications} style={{ marginBottom: '20px' }}>
                        <img src={NotificationIcon} style={{ width: '30px' }} />
                        <Typography className={classes.headerNotificationsTitle}>Detalhes da Notificação</Typography>
                    </Box>

                    {/* <ItemNotifcation data={props.data} /> */}

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', '@media (max-width: 600px)': { display: 'grid' } }}>
                            {props?.data?.status == 'failed' && (
                                <>
                                    <Box sx={{ borderRadius: '8px', padding: '8px 16px 8px 16px', display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: getBackground(props.data.status) }}>
                                        <img src={getIcon(props.data.status)} />
                                        <Typography className={classes.itemTitle}>Sem sucesso ao Dropar!</Typography>
                                    </Box>
                                </>
                            )}
                            {props?.data?.status == 'success' && (
                                <>
                                    <Box sx={{ borderRadius: '8px', padding: '8px 16px 8px 16px', display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: getBackground(props.data.status) }}>
                                        <img src={getIcon(props.data.status)} />
                                        <Typography className={classes.itemTitle}>Dropou com sucesso!</Typography>
                                    </Box>
                                </>
                            )}
                            {props?.data?.status == 'news' && (
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <img src={getIcon(props.data.status)} />
                                        <Typography className={classes.itemTitle}>{props.data.title}</Typography>
                                    </Box>
                                </>
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '42%', '@media (max-width: 600px)': { width: '100%', marginTop: '10px', marginBottom: '10px' } }}>
                                <img src={TrashIcon} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                                <Button label="Marcar como lida" />
                            </Box>
                        </Box>
                        <Typography variant='body2' colop="textSecondary" style={{ marginTop: '10px' }}>{props.data.created_at}</Typography>
                    </Box>

                    {props?.data?.status == 'failed' && (
                        <>
                            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '20px' }}>
                                <Box style={{ width: '52%' }}>
                                    <img src={Image30} style={{ width: '100%' }} />
                                </Box>
                                <Box style={{ width: '48%' }}>
                                    <Typography style={{ fontSize: '16px', fontWeight: '700', lineHeight: '19.01px' }}>{props.data.product_title}</Typography>
                                    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <Typography style={{ color: '#5C299C', textDecoration: 'underline', fontSize: '14px', fontWeight: '700' }}>Origem do produto</Typography>
                                        <img src={AliexpressImage} style={{ width: '22px' }} />
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}

                    {props?.data?.status == 'success' && (
                        <>
                            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '20px' }}>
                                <Box style={{ width: '52%' }}>
                                    <img src={Image30} style={{ width: '100%' }} />
                                </Box>
                                <Box style={{ width: '48%' }}>
                                    <Typography style={{ fontSize: '16px', fontWeight: '700', lineHeight: '19.01px' }}>{props.data.product_title}</Typography>
                                    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <Typography style={{ color: '#5C299C', textDecoration: 'underline', fontSize: '14px', fontWeight: '700' }}>Origem do produto</Typography>
                                        <img src={AliexpressImage} style={{ width: '22px' }} />
                                    </Box>
                                    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <Typography style={{ color: '#5C299C', textDecoration: 'underline', fontSize: '14px', fontWeight: '700' }}>Editar produto</Typography>
                                        <img src={ShopfyImage} style={{ width: '22px' }} />
                                    </Box>
                                    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <Typography style={{ color: '#5C299C', textDecoration: 'underline', fontSize: '14px', fontWeight: '700' }}>Encontrar fornecedores</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}

                    {props?.data?.status == 'news' && (
                        <>
                            <img src={NotificationImage} style={{ width: '100%', borderRadius: '8px', marginTop: '20px' }} />
                            <Typography style={{ marginTop: '20px' }}>Oba! Acaba de chegar mais uma integração imperdível para sua experencia ficar ainda mais completa!</Typography>
                            <Typography style={{ marginTop: '20px' }}>Aproveite e comece a integrar agora!</Typography>
                            <Typography style={{ color: '#5C299C', textDecoration: 'underline', marginTop: '20px', fontWeight: 'bold' }}>Começar a usar integração =></Typography>
                        </>
                    )}

                    <Button onClick={() => {setOpenModal(false)}} color="gray" variant="outlined" sx={{ float: 'right', marginTop: '20px', width: '226px' }}>Ok</Button>

                </Box>
            </Modal>
        </>
    )
}

export default ItemNotifcation;