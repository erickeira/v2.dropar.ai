import { TableRow, TableCell, Modal, Box, Typography, Switch, Divider, Grid  } from "@mui/material";
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { useState } from "react";
import { Close } from "@mui/icons-material";
import ExclamationIcon from '../../assets/icons/exclamation.svg';
import Button from "../../components/button";
import styles from './drop-reels.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    maxWidth: '512px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
    outline: 'none'
};

const Product = props => {

    const [modalDelete, setModalDelete] = useState(false);

    return(
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">{props?.product?.name}</TableCell>
                <TableCell align="center">{props?.product?.store}</TableCell>
                <TableCell align="center">{props?.product?.link_product}</TableCell>
                <TableCell></TableCell>
                <TableCell style={{ gap: '10px' }}>
                    <Box style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <img src={TrashIcon} style={{ cursor: 'pointer' }} onClick={() => {setModalDelete(true)}} />
                        <img src={EditIcon} style={{ cursor: 'pointer' }} />
                        <Switch defaultChecked />
                    </Box>
                </TableCell>
            </TableRow>
            <Modal
                open={modalDelete}
                onClose={() => {setModalDelete(false)}}
            >
                <Box sx={style}>
                    <Box className={styles.modalStoreHeader}>
                        <Typography variant="h6">Deletar Drop Reels</Typography>
                        <Close sx={{ cursor: 'pointer' }} onClick={() => {setModalDelete(false)}} />
                    </Box>
                    <Divider className={styles.divider} />
                    <Box className={styles.contentDelete}>
                        <img src={ExclamationIcon} />
                        <Typography variant="h6">Atenção!</Typography>
                    </Box>
                    <Typography align="center">Esta ação não pode ser desfeita. Ao clicar em deletar você deletará o Drop Reels do produto.</Typography>
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
        </>
    )
}

export default Product;