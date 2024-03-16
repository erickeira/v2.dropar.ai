import LoggedLayout from "../../layouts/logged";
import { Box, Typography, Divider, Avatar, Modal, Grid } from "@mui/material";
import Button from "../../components/button";
import Input from "../../components/input";
import styles from './configuracoes.module.css';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import UserBoxIcon from '../../assets/icons/user-box.svg';
import { useState } from "react";
import ExclamationIcon from '../../assets/icons/exclamation.svg';
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import UserMoreIcon from '../../assets/icons/user-more.svg';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
    maxWidth: '512px'
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

const Configuracoes = ({ history }) => {

    const handleChangeStatusImages = ({ meta, file, remove }, status) => {
        if (status === 'preparing') {}
        if (status === 'headers_received') {}
        if (status === 'done') {
            console.log("Avatar: ", file)
            setAvatar(file);
        }
        if (status === 'removed') {
            setAvatar('');
        }
    }

    const [modalDelete, setModalDelete] = useState(false);
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const [cellphone, setCellphone] = useState();
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    return(
        <LoggedLayout history={history}>
            <Box className={styles.boxHeader}>
                <Box>
                    <Typography variant="h4">Olá! Esse é o painel de configurações</Typography>
                    <Typography className={styles.subtitle}>Atualize e gerencie suas configurações.</Typography>
                </Box>
                <Input label="Procurar" size="small" />
            </Box>
            <Box className={styles.content}>
                <Box className={styles.contentHeader}>
                    <img src={UserBoxIcon} />
                    <Typography variant="h6">Informações do conta</Typography>
                </Box>
                <Divider className={styles.divider} />
                <Typography variant="h6">Foto de perfil</Typography>
                <Box className={styles.boxAvatar}>
                    <Avatar src={avatar} className={styles.avatar} />
                </Box>
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
                                <span style={{ color: '#5C299C', fontWeight: 'bold' }}>Clique para carregar</span> ou arraste e solte o arquivo <br /> PNG, SVG ou JPG (max. 800x400px/400kb)
                            </Typography>
                        </>
                    }
                />
                <Box className={styles.boxInput}>
                    <Typography>Nome</Typography>
                    <Input size="small" placeholder="Digite seu nome" fullWidth value={name} onChange={(e) => {setName(e.target.value)}} />
                </Box>
                <Box className={styles.boxInput}>
                    <Typography>Número de telefone</Typography>
                    <Input size="small" placeholder="Digite seu telefone" fullWidth value={cellphone} onChange={(e) => {setCellphone(e.target.value)}} />
                </Box>
                <Box className={styles.boxInput}>
                    <Typography>E-mail</Typography>
                    <Input size="small" placeholder="Digite seu e-mail" fullWidth value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </Box>
                <Box className={styles.boxInput}>
                    <Typography>Seu código de indicação</Typography>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            gap: '10px', 
                            alignItems: 'center'
                        }}
                    >
                        <Input style={{ sx: '80%', '@media (max-width: 600px)': { width: '70%' } }} size="small" placeholder="0324902834" fullWidth value={code} onChange={(e) => {setCode(e.target.value)}} />
                        <Button variant="outlined" color="white" sx={{ width: '20%', '@media (max-width: 600px)': { width: '30%' } }}>Copiar <img src={UserMoreIcon} style={{ marginLeft: '8px' }} /></Button>
                    </Box>
                </Box>
                <Divider className={styles.divider} />
                <Typography variant="h6">Alteração de senha</Typography>
                <Box className={styles.boxInput}>
                    <Typography>Digite a nova senha</Typography>
                    <Input
                        size="small"
                        type={!showPassword && 'password'}
                        placeholder="Digite a senha"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={true}
                        endAdornmentIcon={showPassword ? <Visibility/> : <VisibilityOff />}
                        handleClickEndAdornment={() => {setShowPassword(!showPassword)}}
                    />
                </Box>
                <Box className={styles.boxInput}>
                    <Typography>Confirme a nova senha</Typography>
                    <Input
                        size="small"
                        type={!showPassword && 'password'}
                        placeholder="Confirme a senha"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        endAdornment={true}
                        endAdornmentIcon={showPassword ? <Visibility /> : <VisibilityOff />}
                        handleClickEndAdornment={() => {setShowPassword(!showPassword)}}
                    />
                </Box>
                <Divider className={styles.divider} />
                <Box className={styles.boxInput}>
                    <Typography variant="h6">Desativação de conta</Typography>
                    <Button color="red" onClick={() => {setModalDelete(true)}}>Quero desativar</Button>
                </Box>
                <Divider className={styles.divider} />
                <Box className={styles.boxActions}>
                    <Box>
                        <Button color="white">Cancelar</Button>
                        <Button>Salvar</Button>
                    </Box>
                </Box>
            </Box>
            <Modal
                open={modalDelete}
                onClose={() => {setModalDelete(false)}}
            >
                <Box sx={style}>
                    <Box className={styles.modalHeader}>
                        <Typography variant="h6">Desativar conta</Typography>
                        <Close sx={{ cursor: 'pointer' }} onClick={() => {setModalDelete(false)}} />
                    </Box>
                    <Divider className={styles.divider} />
                    <Box className={styles.contentDelete}>
                        <img src={ExclamationIcon} />
                        <Typography variant="h6">Atenção!</Typography>
                    </Box>
                    <Typography align="center">Esta ação não pode ser desfeita. Ao clicar em desativar você desativará a sua conta da Dropar. O provedor será informado da sua decisão.</Typography>
                    <Divider className={styles.divider} />
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Button fullWidth color="gray" variant="outlined">Cancelar</Button>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Button fullWidth color="red">Desativar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </LoggedLayout>
    )
}

export default Configuracoes;