import { Box, Typography, Modal, Grid, Divider } from "@mui/material";
import styles from './banners.module.css';
import TrashIcon from '../../assets/icons/trash.svg';
import EditICon from '../../assets/icons/edit.svg';
import { useState } from "react";
import ExclamationIcon from '../../assets/icons/exclamation.svg';
import { Close } from "@mui/icons-material";
import Button from "../../components/button";
import PhotoIcon from '../../assets/icons/photo.svg';
import Input from "../../components/input";
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

const Item = props => {

    const [modalDeleteBanner, setModalDeleteBanner] = useState(false);
    const [openModalEditBanner, setOpenModalEditBanner] = useState(false);

    const handleChangeStatusImages = ({ meta, file, remove }, status) => {
        if (status === 'preparing') {}
        if (status === 'headers_received') {}
        if (status === 'done') {
            console.log("Avatar: ", file)
            // setNewBanner(file);
        }
        if (status === 'removed') {
            // setNewBanner('');
        }
    }

    return(
        <>
            <Box className={styles.banner}>
                <Box className={styles.bannerContent}>
                    <img className={styles.bannerContentImage} src={props.data.image} />
                    <Box>
                        <Typography>Título: {props.data?.title}</Typography>
                        <Typography>Link: {props.data?.link}</Typography>
                    </Box>
                </Box>
                <Box>
                    <img className={styles.bannerContentIcon} src={TrashIcon} onClick={() => {setModalDeleteBanner(true)}} />
                    <img className={styles.bannerContentIcon} src={EditICon} onClick={() => {setOpenModalEditBanner(true)}} />
                </Box>
            </Box>
            <Modal
                open={modalDeleteBanner}
                onClose={() => {setModalDeleteBanner(false)}}
            >
                <Box sx={style}>
                    <Box className={styles.modalStoreHeader}>
                        <Typography variant="h6">Deletar banner</Typography>
                        <Close sx={{ cursor: 'pointer' }} onClick={() => {setModalDeleteBanner(false)}} />
                    </Box>
                    <Divider className={styles.divider} />
                    <Box className={styles.contentDelete}>
                        <img src={ExclamationIcon} />
                        <Typography variant="h6">Atenção!</Typography>
                    </Box>
                    <Typography align="center">Esta ação não pode ser desfeita. Ao clicar em deletar você deletará o banner.</Typography>
                    <Divider className={styles.divider} />
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Button fullWidth color="gray">Cancelar</Button>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Button fullWidth color="red">Deletar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Modal
                open={openModalEditBanner}
                onClose={() => {setOpenModalEditBanner(false)}}
            >
                <Box sx={style} className="custom-scrollbar">
                    <Close 
                        onClick={() => {
                            setOpenModalEditBanner(false);
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
                        <Typography className={styles.headerNewStoreTitle}>Editar Banner</Typography>
                    </Box>
                    <br />
                    <Typography>Título</Typography>
                    <Input label="Digite o ttulo" size="small" fullWidth value={props?.data?.title} />
                    <br /><br />
                    <Typography>Link</Typography>
                    <Input label="Cole aqui o link do banner" size="small" fullWidth value={props?.data?.link} />
                    <br /><br />
                    <Typography>Faça o upload do banner</Typography>
                    <Dropzone
                        value={props?.data?.image}
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
        </>
    )
}

export default Item;