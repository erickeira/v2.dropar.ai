import DashboardLayout from "../../layouts/dashboard";
import { Box, Typography, Modal } from "@mui/material";
import styles from './banners.module.css';
import Banner from '../../assets/img/banner.png';
import Item from "./item";
import { Add, SearchRounded, Close } from "@mui/icons-material";
import Button from "../../components/button";
import Input from "../../components/input";
import { useState } from "react";
import PhotoIcon from '../../assets/icons/photo.svg';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    maxWidth: 1200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
    '@media (max-width: 600px)': { 
        width: '80vw' 
    }
};

const dropzoneStyles = {
    border: '2px dashed #9643FF',
    borderRadius: '12px',
    padding: '0px',
    textAlign: 'center',
    backgroundColor: '#FAFAFA'
};

const inputStyles = {
    outline: 'none',
    padding: '10px', 
    fontSize: '14px',
    color: '#707A75'
};

const Banners = props => {

    const banners = [
        {
            'image': Banner,
            'link': 'http://google.com.br',
            'title': 'shopify.com.br'
        },
        {
            'image': Banner,
            'link': 'http://google.com.br',
            'title': 'shopify.com.br'
        },
        {
            'image': Banner,
            'link': 'http://google.com.br',
            'title': 'shopify.com.br'
        },
        {
            'image': Banner,
            'link': 'http://google.com.br',
            'title': 'shopify.com.br'
        },
        {
            'image': Banner,
            'link': 'http://google.com.br',
            'title': 'shopify.com.br'
        },
        {
            'image': Banner,
            'link': 'http://google.com.br',
            'title': 'shopify.com.br'
        }
    ]

    const [openModalNewBanner, setOpenModalNewBanner] = useState(false);
    const [newBanner, setNewBanner] = useState();

    const handleChangeStatusImages = ({ meta, file, remove }, status) => {
        if (status === 'preparing') {}
        if (status === 'headers_received') {}
        if (status === 'done') {
            console.log("Avatar: ", file)
            setNewBanner(file);
        }
        if (status === 'removed') {
            setNewBanner('');
        }
    }

    return(
        <DashboardLayout history={props?.history} infoUser={props?.infoUser}>
            <Box className={styles.boxHeader}>
                <Box>
                    <Typography variant="h5">Banners do Dashboard</Typography>
                    <Typography variant="body1" className={styles.subtitle}>Crie e gerencie os banners que aparecem para os seus usuários.</Typography>
                </Box>
            </Box>
            <Box 
                sx={{ 
                    marginTop: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h5">Lista de banners</Typography>
                <Button onClick={() => {setOpenModalNewBanner(true)}}><Add /> Novo banner</Button>
            </Box>
            <Box 
                sx={{ 
                    marginTop: '20px', 
                    marginBottom: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    '@media (max-width: 600px)': {
                        display: 'grid'
                    }
                }}
            >
                <Input 
                    size="small" 
                    placeholder="Procurar" 
                    sx={{ width: '80%', '@media (max-width: 600px)': { width: '100%' } }} 
                    startAdornment={true}
                    startAdornmentIcon={<SearchRounded />}
                    handleClickStartAdornment={() => {}}
                />
                <Box sx={{ width: '20%', '@media (max-width: 600px)': { width: '100%' } }} >
                    <Input 
                        size="small"
                        type="select"
                        fullWidth
                        options={[
                            {
                                label: 'Todos',
                                value: ''
                            },
                            {
                                label: 'Usuário ativos',
                                value: 'user_active'
                            },
                            {
                                label: 'Usuários inativos',
                                value: 'user_inactive'
                            }
                        ]}
                    />
                </Box>
            </Box>
            {banners.map((banner, index) => (
                <Item key={index} data={banner} />
            ))}
            <Modal
                open={openModalNewBanner}
                onClose={() => {setOpenModalNewBanner(false)}}
            >
                <Box sx={style} className="custom-scrollbar">
                    <Close 
                        onClick={() => {
                            setOpenModalNewBanner(false);
                        }} 
                        sx={{ 
                            color: '#A863FF', 
                            position: 'absolute', 
                            top: '20px', 
                            right: '20px', 
                            cursor: 'pointer' 
                        }} 
                    />
                    <Box className={styles.headerNewStore}>
                        <img src={PhotoIcon} />
                        <Typography className={styles.headerNewStoreTitle}>Novo Banner</Typography>
                    </Box>
                    <br />
                    <Typography>Título</Typography>
                    <Input label="Digite o ttulo" size="small" fullWidth />
                    <br /><br />
                    <Typography>Link</Typography>
                    <Input label="Cole aqui o link do banner" size="small" fullWidth />
                    <br /><br />
                    <Typography>Faça o upload do banner</Typography>
                    <Dropzone
                        maxFiles={1}
                        onChangeStatus={handleChangeStatusImages}
                        styles={{
                            dropzone: dropzoneStyles,
                            inputLabel: inputStyles,
                        }}
                        inputContent={
                            <>
                                <Typography style={{ fontSize: '14px', fontWeight: 400 }}>
                                    <span style={{ color: '#5C299C', fontWeight: 'bold' }}>Clique para carregar</span> ou arraste e solte o arquivo <br /> PNG, SVG ou JPG (max. 1040x305px/4mb)
                                </Typography>
                            </>
                        }
                    />
                    <br />
                    <Button onClick={() => {}} variant="outlined" color="white" sx={{ float: 'right', width: '200px' }}>Ok</Button>
                </Box>
            </Modal>
        </DashboardLayout>
    )
}

export default Banners;