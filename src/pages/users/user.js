import { TableRow, TableCell, Chip, Typography, Modal, Divider, Paper, Box, Grid, Switch, Checkbox } from "@mui/material";
import styles from './users.module.css';
import { Close } from "@mui/icons-material";
import { useState } from "react";
import TrashIcon from '../../assets/icons/trash.svg';
import ExclamationIcon from '../../assets/icons/exclamation.svg';
import Button from "../../components/button";
import EditIcon from '../../assets/icons/edit.svg';
import Input from "../../components/input";
import Coins from '../../assets/icons/coins.svg';

const getStatus = status => {
    if(status == 'active'){
        return "Ativo";
    }else if(status == 'inactive'){
        return "Inativo";
    }
}

const getStatusStore = status => {
    if(status == 'active'){
        return "Loja Ativa";
    }else if(status == 'inactive'){
        return "Loja Inativa";
    }
}

const getBackgroundColorStatus = status => {
    if(status == 'active'){
        return "#D1FAE5";
    }else if(status == 'inactive'){
        return "#FEE2E2";
    }
}

const getColorStatus = status => {
    if(status == 'active'){
        return "#065F46";
    }else if(status == 'inactive'){
        return "#991B1B";
    }
}

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
};

const Store = props => {

    return(
        <Paper className={styles.store}>
            <img src={props?.store?.logotipo} />
            <Box>
                <Typography>{props?.store?.name}</Typography>
                <Typography>{props?.store?.site}</Typography>
            </Box>
            <Chip 
            label={getStatusStore(props?.store?.status)} 
                sx={{ 
                    backgroundColor: getBackgroundColorStatus(props?.store?.status), 
                    color: getColorStatus(props?.store?.status), 
                    fontWeight: 'bold' 
                }} 
            />
        </Paper>
    )
}

const User = props => {

    const [modalStores, setModalStores] = useState(false);
    const [modalDeleteStore, setModalDeleteStore] = useState(false);
    const [modalEditStore, setModalEditStore] = useState(false);

    return(
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    <Checkbox />
                    {props?.user?.name}
                </TableCell>
                <TableCell align="center">
                    <Chip 
                        size="small" 
                        label={getStatus(props?.user?.status)} 
                        sx={{ 
                            backgroundColor: getBackgroundColorStatus(props?.user?.status), 
                            color: getColorStatus(props?.user?.status), 
                            fontWeight: 'bold' 
                        }} 
                    />
                </TableCell>
                <TableCell align="center">
                    <Typography>{props?.user?.stores.length}</Typography>
                    <Typography onClick={() => {setModalStores(true)}} className={styles.viewStores}>ver todas</Typography>
                </TableCell>
                <TableCell align="center">{props?.user?.indications}</TableCell>
                <TableCell align="center">{props?.user?.coins}</TableCell>
                <TableCell>{props?.user?.email}</TableCell>
                <TableCell style={{ gap: '10px' }}>
                    <Box style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <img src={TrashIcon} style={{ cursor: 'pointer' }} onClick={() => {setModalDeleteStore(true)}} />
                        <img src={EditIcon} style={{ cursor: 'pointer' }} onClick={() => {setModalEditStore(true)}} />
                        <Switch defaultChecked />
                    </Box>
                </TableCell>
            </TableRow>
            <Modal
                open={modalStores}
                onClose={() => {setModalStores(false)}}
            >
                <Box sx={style}>
                    <Box className={styles.modalStoreHeader}>
                        <Typography variant="h6">Lojas do usuário</Typography>
                        <Close sx={{ cursor: 'pointer' }} onClick={() => {setModalStores(false)}} />
                    </Box>
                    <Divider className={styles.divider} />
                    {props?.user?.stores?.map((store, index) => (
                        <Store key={index} store={store} />
                    ))}
                    <Divider className={styles.divider} />
                    <Button onClick={() => {setModalStores(false)}} variant="outlined" color="white" sx={{ float: 'right', width: '200px' }}>Ok</Button>
                </Box>
            </Modal>
            <Modal
                open={modalDeleteStore}
                onClose={() => {setModalDeleteStore(false)}}
            >
                <Box sx={style}>
                    <Box className={styles.modalStoreHeader}>
                        <Typography variant="h6">Deletar usuário</Typography>
                        <Close sx={{ cursor: 'pointer' }} onClick={() => {setModalDeleteStore(false)}} />
                    </Box>
                    <Divider className={styles.divider} />
                    <Box className={styles.contentDelete}>
                        <img src={ExclamationIcon} />
                        <Typography variant="h6">Atenção!</Typography>
                    </Box>
                    <Typography align="center">Esta ação não pode ser desfeita. Ao clicar em deletar você deletará o usuário.</Typography>
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
                open={modalEditStore}
                onClose={() => {setModalEditStore(false)}}
            >
                <Box sx={style}>
                    <Box className={styles.modalStoreHeader}>
                        <Typography variant="h6">Editar usuário</Typography>
                        <Close sx={{ cursor: 'pointer' }} onClick={() => {setModalEditStore(false)}} />
                    </Box>
                    <Divider className={styles.divider} />
                    <Box>
                        <Typography>Nome</Typography>
                        <Input size="small" fullWidth value={props?.user?.name} disabled />
                    </Box>
                    <br />
                    <Box>
                        <Typography>E-mail</Typography>
                        <Input size="small" fullWidth value={props?.user?.email} disabled />
                    </Box>
                    <br />
                    <Box>
                        <Typography>Percentual de ganhos por indicação:</Typography>
                        <Input 
                            size="small" 
                            fullWidth 
                            value={props?.user?.indications} 
                            startAdornment={true}
                            startAdornmentIcon={<img src={Coins} style={{ width: '24px' }} />}
                            handleClickStartAdornment={() => {}}
                        />
                    </Box>
                    <br />
                    <Box>
                        <Typography>Quantidade de DroparCoins</Typography>
                        <Input size="small" fullWidth value={props?.user?.coins} />
                    </Box>
                    <br />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography>Usuário Influenciador:</Typography>
                            <Typography variant="body2" color="textSecondary">Acesso gratuito e ilimitado*</Typography>
                        </Box>
                        <Checkbox />
                    </Box>
                    <br />
                    <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography>Status do Usuário</Typography>
                        </Box>
                        <Switch size="large" />
                    </Box>
                    <Divider className={styles.divider} />
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Button onClick={() => {setModalEditStore(false)}} size="large" fullWidth color="white" variant="outlined">Cancelar</Button>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Button size="large" fullWidth>Concluir</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default User;