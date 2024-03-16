import DashboardLayout from "../../layouts/dashboard";
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Checkbox, Modal, Divider, Switch } from "@mui/material";
import BagPurple from '../../assets/icons/bag-purple.svg';
import GroupUser from '../../assets/icons/group-user.svg';
import styles from './users.module.css';
import ImageItem from './image21.svg';
import User from "./user";
import Button from "../../components/button";
import { Add, SearchRounded, Close } from "@mui/icons-material";
import Input from "../../components/input";
import ExportIcon from '../../assets/icons/export.svg';
import { useState } from "react";
import Coins from '../../assets/icons/coins.svg';

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

const users = [
    {
        'name': 'Olivia Rhye',
        'status': 'active',
        'stores': [
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'active'
            },
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'inactive'
            }
        ],
        'indications': 155,
        'coins': 55,
        'email': 'olivia@untitledui.com'
    },
    {
        'name': 'Olivia Rhye',
        'status': 'active',
        'stores': [
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'active'
            },
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'inactive'
            }
        ],
        'indications': 155,
        'coins': 55,
        'email': 'olivia@untitledui.com'
    },
    {
        'name': 'Olivia Rhye',
        'status': 'active',
        'stores': [
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'active'
            },
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'inactive'
            }
        ],
        'indications': 155,
        'coins': 55,
        'email': 'olivia@untitledui.com'
    },
    {
        'name': 'Olivia Rhye',
        'status': 'active',
        'stores': [
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'active'
            },
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'inactive'
            }
        ],
        'indications': 155,
        'coins': 55,
        'email': 'olivia@untitledui.com'
    },
    {
        'name': 'Olivia Rhye',
        'status': 'active',
        'stores': [
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'active'
            },
            {
                'logotipo': ImageItem,
                'name': 'Vision Slogan',
                'site': 'www.visionlogan.com.br',
                'status': 'inactive'
            }
        ],
        'indications': 155,
        'coins': 55,
        'email': 'olivia@untitledui.com'
    }
]

const Users = props => {

    const [openModalNewUser, setOpenModalNewUser] = useState(false);

    return(
        <DashboardLayout infoUser={props?.infoUser}>
            <Box className={styles.boxHeader}>
                <Box>
                    <Typography variant="h4">Bem-vindo(a), {props?.infoUser?.name}</Typography>
                    <Typography variant="h6" className={styles.subtitle}>Selecione uma loja ou crie uma nova.</Typography>
                </Box>
            </Box>
            <Grid spacing={3} container>
                <Grid item md={6} xs={12}>
                    <Box className={styles.boxInfos}>
                        <img src={GroupUser} />
                        <Box className={styles.infos}>
                            <Box>
                                <Typography variant="h5">Usuários</Typography>
                                <Typography variant="body1" className={styles.subtitle}>Ativos e inativos.</Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.active}><b>67</b> Ativos</Typography>
                                <Typography className={styles.inactive}><b>05</b> Inativos</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box className={styles.boxInfos}>
                        <img src={BagPurple} />
                        <Box className={styles.infos}>
                            <Box>
                                <Typography variant="h5">Lojas</Typography>
                                <Typography variant="body1" className={styles.subtitle}>Ativos e inativos.</Typography>
                            </Box>
                            <Box>
                                <Typography className={styles.active}><b>06</b> Ativos</Typography>
                                <Typography className={styles.inactive}><b>0</b> Inativos</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box 
                sx={{ 
                    marginTop: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    '@media (max-width: 600px)': {
                        display: 'grid'
                    }
                }}
            >
                <Typography variant="h5">Usuários</Typography>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        '@media (max-width: 600px)': {
                            display: 'grid'
                        }
                    }}
                >
                    <Typography className={styles.inactive} style={{ cursor: 'pointer' }}>Excluir selecionados</Typography>
                    <Button color="white" variant="outlined"><img src={ExportIcon} /> &nbsp; Exportar usuários</Button>
                    <Button onClick={() => {setOpenModalNewUser(true)}}><Add /> Novo usuário</Button>
                </Box>
            </Box>
            <Box style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Input 
                    size="small" 
                    placeholder="Procurar" 
                    sx={{ width: '80%' }} 
                    startAdornment={true}
                    startAdornmentIcon={<SearchRounded />}
                    handleClickStartAdornment={() => {}}
                />
                <Box sx={{ width: '20%' }} >
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
            <Box className={styles.boxTable}>
                <Box className={styles.boxTitleTable}>
                    <Typography variant="h6">Lista de usuários</Typography>
                    <Chip size="small" label={`${users.length} usuários`} className="chip" />
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="users table">
                        <TableHead className={styles.tableHead}>
                            <TableRow>
                                <TableCell>
                                    <Checkbox />
                                    NOME
                                </TableCell>
                                <TableCell align="center">STATUS</TableCell>
                                <TableCell align="center">LOJAS</TableCell>
                                <TableCell align="center">N° DE INDICAÇÕES</TableCell>
                                <TableCell align="center">DROPARCOINS</TableCell>
                                <TableCell>E-MAIL</TableCell>
                                <TableCell>AÇÕES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <User user={user} key={index} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Modal
                open={openModalNewUser}
                onClose={() => {setOpenModalNewUser(false)}}
            >
                <Box sx={style}>
                    <Box className={styles.modalStoreHeader}>
                        <Typography variant="h6">Adicionar novo usuário</Typography>
                        <Close sx={{ cursor: 'pointer' }} onClick={() => {setOpenModalNewUser(false)}} />
                    </Box>
                    <Divider className={styles.divider} />
                    <Box>
                        <Typography>Nome</Typography>
                        <Input size="small" fullWidth disabled />
                    </Box>
                    <br />
                    <Box>
                        <Typography>E-mail</Typography>
                        <Input size="small" fullWidth disabled />
                    </Box>
                    <br />
                    <Box>
                        <Typography>Percentual de ganhos por indicação:</Typography>
                        <Input 
                            size="small" 
                            fullWidth  
                            startAdornment={true}
                            startAdornmentIcon={<img src={Coins} style={{ width: '24px' }} />}
                            handleClickStartAdornment={() => {}}
                        />
                    </Box>
                    <br />
                    <Box>
                        <Typography>Quantidade de DroparCoins</Typography>
                        <Input size="small" fullWidth />
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
                            <Button onClick={() => {setOpenModalNewUser(false)}} size="large" fullWidth color="white" variant="outlined">Cancelar</Button>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Button size="large" fullWidth>Adicionar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </DashboardLayout>
    )
}

export default Users;