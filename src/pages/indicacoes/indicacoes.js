import LoggedLayout from "../../layouts/logged";
import { makeStyles } from "@mui/styles";
import { Box, Table, Typography, TableCell, TableContainer, TableBody, TableRow, Grid, Paper, TableHead, Chip, Modal, FormControl, Radio, RadioGroup, FormControlLabel, Avatar } from "@mui/material";
import Button from "../../components/button";
import Input from "../../components/input";
import BalanceIcon from '../../assets/icons/balance.svg';
import GroupIcon from '../../assets/icons/group.svg';
import { useState } from "react";
import MovimentaionIcon from '../../assets/icons/movimentaion.svg';
import MoneyBagIcon from '../../assets/icons/money-bag-coin.svg';
import BankIcon from '../../assets/icons/bank-building.svg';
import UserMoreIcon from '../../assets/icons/user-more.svg';
import HrefIcon from '../../assets/icons/href.svg';
import styles from './indicacoes.module.css';
import { SearchRounded, Close } from "@mui/icons-material";

const styleModal = {
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
    overflowY: 'auto',
    '@media (max-width: 600px)': {
        width: '80vw'
    }
};

const useStyles = makeStyles((theme) => ({
    subtitle: {
        fontSize: '20px',
        color: '#707070'
    },
    boxHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '@media (max-width: 600px)': {
            display: 'grid'
        }
    },
    button: {
        marginLeft: 10
    },
    left: {
        backgroundColor: '#F5ECFF',
        padding: '30px',
        borderRadius: '8px',
        '@media (min-width: 601px)': {
            width: '50%',
        }
    },
    right: {
        border: '1px solid #F0F0F0',
        padding: '30px',
        borderRadius: '8px',
        '@media (min-width: 601px)': {
            width: '50%',
        }
    },
    content: {
        marginTop: '40px'
    },
    headerContent: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: '20px',
        marginBottom: '20px',
        '@media (max-width: 600px)': {
            display: 'grid'
        }
    },
    headerContentAction: {
        color: '#FF599F',
        textDecoration: 'underline',
        fontWeight: 700,
        cursor: 'pointer'
    },
    headerContentActionRight: {
        color: '#9643FF',
        fontWeight: 700
    },
    headerContentSubtitle: {
        color: '#727272',
        fontSize: '14px'
    },
    headerContentTitle: {
        fontSize: '24px'
    },
    headerContentValue: {
        fontSize: '32px',
        fontWeight: 700 
    },
    headerIndicationss: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px'
    },
    headerIndicationssTitle: {
        fontSize: '24px',
        fontWeight: 500
    },
    actionsNewSaque: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px'
    },
    cancelActionNewSaque: {
        width: '50%'
    },
    continueActionNewSaque: {
        width: '50%'
    }
}));

const rows = [
    {
        'name': 'Olivia Rhye',
        'value': 'R$55,90',
        'email': 'olivia@untitledui.com',
        'status': 'active',
        'created_at': '05/10/2024'
    },
    {
        'name': 'Olivia Rhye',
        'value': 'R$55,90',
        'email': 'olivia@untitledui.com',
        'status': 'active',
        'created_at': '05/10/2024'
    },
    {
        'name': 'Olivia Rhye',
        'value': 'R$55,90',
        'email': 'olivia@untitledui.com',
        'status': 'inactive',
        'created_at': '05/10/2024'
    },
    {
        'name': 'Olivia Rhye',
        'value': 'R$55,90',
        'email': 'olivia@untitledui.com',
        'status': 'active',
        'created_at': '05/10/2024'
    },
    {
        'name': 'Olivia Rhye',
        'value': 'R$55,90',
        'email': 'olivia@untitledui.com',
        'status': 'active',
        'created_at': '05/10/2024'
    },
    {
        'name': 'Olivia Rhye',
        'value': 'R$55,90',
        'email': 'olivia@untitledui.com',
        'status': 'active',
        'created_at': '05/10/2024'
    },
    {
        'name': 'Olivia Rhye',
        'value': 'R$55,90',
        'email': 'olivia@untitledui.com',
        'status': 'active',
        'created_at': '05/10/2024'
    },
    {
        'name': 'Olivia Rhye',
        'value': 'R$55,90',
        'email': 'olivia@untitledui.com',
        'status': 'active',
        'created_at': '05/10/2024'
    }
];

const history = [
    {
        'status': 'success',
        'destiny': 'PIX',
        'title': 'Transação Realizada com Sucesso',
        'date': '20/10/2023  10:40 PM',
        'value': 55.90
    },
    {
        'status': 'success',
        'destiny': 'PIX',
        'title': 'Transação Realizada com Sucesso',
        'date': '20/10/2023  10:40 PM',
        'value': 55.90
    },
    {
        'status': 'success',
        'destiny': 'PIX',
        'title': 'Transação Realizada com Sucesso',
        'date': '20/10/2023  10:40 PM',
        'value': 55.90
    },
    {
        'status': 'wait',
        'destiny': 'PIX',
        'title': 'Transação em Aguardo',
        'date': '20/10/2023  10:40 PM',
        'value': 44.90
    },
    {
        'status': 'error',
        'destiny': 'Conta Bancária(01020)',
        'title': 'Transação com ERRO',
        'date': '20/10/2023  10:40 PM',
        'value': 22.90
    },
    {
        'status': 'error',
        'destiny': 'Conta Bancária(01020)',
        'title': 'Transação com ERRO',
        'date': '20/10/2023  10:40 PM',
        'value': 22.90
    }
    ,
    {
        'status': 'error',
        'destiny': 'Conta Bancária(01020)',
        'title': 'Transação com ERRO',
        'date': '20/10/2023  10:40 PM',
        'value': 22.90
    }
    ,
    {
        'status': 'error',
        'destiny': 'Conta Bancária(01020)',
        'title': 'Transação com ERRO',
        'date': '20/10/2023  10:40 PM',
        'value': 22.90
    }
]

const Indicacoes = () => {

    const classes = useStyles();
    const [openModalSaques, setOpenModalSaques] = useState(false);
    const [openModalBank, setOpenModalBank] = useState(false);
    const [openModalNewDataBank, setOpenModalNewDataBank] = useState(false);
    const [openModalSaque, setOpenModalSaque] = useState(false);
    const [valueSaque, setValueSaque] = useState();

    const getBackgroundColor = (status) => {
        if(status == 'success'){
            return '#D1FAE5';
        }
        if(status == 'error'){
            return '#FEE2E2';
        }
    }

    return(
        <LoggedLayout>
            <Box className={classes.boxHeader}>
                <Box>
                    <Typography variant="h4">Indique e Ganhe</Typography>
                    <Typography className={classes.subtitle}>Planos que se adequam à sua necessidade.</Typography>
                </Box>
                <Box>
                    <Button onClick={() => {setOpenModalBank(true)}} color="light">Dados bancários/PIX</Button>
                    <Button onClick={() => {setOpenModalSaque(true)}} className={classes.button}>Saque</Button>
                </Box>
            </Box>
            <Box className={classes.content}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        gap: '15px',
                        '@media (max-width: 600px)': {
                            display: 'grid'
                        } 
                    }}
                >
                    <Box className={classes.left}>
                        <img src={BalanceIcon} />
                        <Box className={classes.headerContent}>
                            <Box>
                                <Typography className={classes.headerContentTitle}>Saldo atual</Typography>
                                <Typography className={classes.headerContentSubtitle}>Receita através do seu link.</Typography>
                            </Box>
                            <Typography  className={classes.headerContentValue}>R$ 90,00</Typography>
                        </Box>
                        <Typography onClick={() => {setOpenModalSaques(true)}} className={classes.headerContentAction}>Ver histórico de saques</Typography>
                    </Box>
                    <Box className={classes.right}>
                        <img src={GroupIcon} />
                        <Box className={classes.headerContent}>
                            <Box>
                                <Typography className={classes.headerContentTitle}>Cadastros com seu link</Typography>
                                <Typography className={classes.headerContentSubtitle}>Quantidade de cadastros indicados por você.</Typography>
                            </Box>
                            <Typography  className={classes.headerContentValue}>6</Typography>
                        </Box>
                        <Typography className={classes.headerContentActionRight}>Você ganhará 15% de Comissão sobre o valor do plano indicado.</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.content}>
                <Box sx={{ display: 'flex', gap: '15px', '@media (max-width: 600px)': { display: 'grid' } }}>
                    <Box 
                        sx={{ 
                            '@media (min-width: 601px)': {
                                width: '50%' 
                            } 
                        }}
                    >
                        <Typography>Seu código de indicação:</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                            <Input size="small" value="00120020000" sx={{ width: '80%', '@media (max-width: 600px)': { width: '70%' } }} />
                            <Button variant="outlined" color="white" sx={{ width: '20%', '@media (max-width: 600px)': { width: '30%' } }}>Copiar <img src={UserMoreIcon} style={{ marginLeft: '8px' }} /></Button>
                        </Box>
                    </Box>
                    <Box 
                        sx={{ 
                            '@media (min-width: 601px)': {
                                width: '50%' 
                            } 
                        }}
                    >
                        <Typography>Seu link de afiliado</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                            <Input size="small" value="exemple.com" sx={{ width: '80%', '@media (max-width: 600px)': { width: '70%' } }} />
                            <Button variant="outlined" color="white" sx={{ width: '20%', '@media (max-width: 600px)': { width: '30%' } }}>Copiar <img src={HrefIcon} style={{ marginLeft: '8px' }} /></Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ marginTop: '40px' }}>
                <Box className={styles.boxTable}>
                    <Box className={styles.boxHeaderTable}>
                        <Box className={styles.boxTitleTable}>
                            <Typography variant="h6">Lista de usuários indicados</Typography>
                            <Chip size="small" label={`${rows.length} usuários`} className="chip" />
                        </Box>
                        <Input 
                            size="small" 
                            placeholder="Procurar" 
                            sx={{ 
                                '@media (min-width: 601px)': {
                                    width: '400px'
                                }
                            }} 
                            startAdornment={true}
                            startAdornmentIcon={<SearchRounded />}
                            handleClickStartAdornment={() => {}}
                        />
                    </Box>
                    <TableContainer 
                        component={Paper}
                        sx={{
                            boxShadow: 'none'
                        }}
                    >
                        <Table 
                            aria-label="simple table"
                        >
                            <TableHead
                                sx={{
                                    backgroundColor: '#FFEEF5'
                                }}
                            >
                                <TableRow>
                                    <TableCell sx={{color: '#6B7280'}}>NOME</TableCell>
                                    <TableCell sx={{color: '#6B7280', textAlign: 'center'}}>COMISSÃO RECEBIDA</TableCell>
                                    <TableCell sx={{color: '#6B7280'}}>E-MAIL</TableCell>
                                    <TableCell sx={{color: '#6B7280', textAlign: 'center'}}>STATUS</TableCell>
                                    <TableCell sx={{color: '#6B7280', textAlign: 'center'}}>DATA DE INGRESSO</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Avatar>{(row.name).match(/\b\w/g).join('')}</Avatar> {row.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.value}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Chip 
                                                siz="small"
                                                label={row.status == 'active' ? 'Ativo' : 'Inativo'} 
                                                sx={{
                                                    backgroundColor: row.status == 'active' ? '#D1FAE5' : '#FECACA',
                                                    color: row.status == 'active' ? '#065F46' : '#7F1D1D',
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.created_at}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box
                        sx={{
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #D1D5DB'
                        }}
                    >
                        <Button
                            label="Anterior"
                            sx={{
                                backgroundColor: 'transparent',
                                border: '1px solid #D0D5DD',
                                color: '#344054'
                            }}
                        />
                        <Button
                            label="Próximo"
                            sx={{
                                backgroundColor: 'transparent',
                                border: '1px solid #D0D5DD',
                                color: '#344054'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Modal
                open={openModalSaques}
                onClose={() => {setOpenModalSaques(false)}}
            >
                <Box sx={styleModal} className="custom-scrollbar">

                    <Close onClick={() => {setOpenModalSaques(false);}} style={{ color: '#A863FF', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />

                    <Box className={classes.headerIndicationss}>
                        <img src={MovimentaionIcon} style={{ width: '30px' }} />
                        <Typography className={classes.headerIndicationssTitle}>Histórico de saques</Typography>
                    </Box>

                    <Box id="custom-show-vertical-scroll" style={{ maxHeight: '632px', overflowY: 'auto', height: '60vh' }}>
                        {history.map((item, index) => (
                            <Box
                                style={{
                                    borderRadius: '8px',
                                    padding: '10px',
                                    fontSize: '14px',
                                    backgroundColor: getBackgroundColor(item.status),
                                    marginTop: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box>
                                    <Typography style={{ fontWe: 500 }}>{item.title}</Typography>
                                    <Typography color="textSecondary">Destino: {item.destiny}</Typography>
                                    <Typography color="textSecondary">{item.date}</Typography>
                                </Box>
                                <Box>
                                    <Typography>Valor:</Typography>
                                    <Typography>{parseFloat(item.value).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'})}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    <Button onClick={() => {setOpenModalSaques(false)}} variant="outlined" color="gray" sx={{ float: 'right', marginTop: '20px', width: '200px' }}>Ok</Button>

                </Box>
            </Modal>
            <Modal
                open={openModalSaque}
                onClose={() => {setOpenModalSaque(false)}}
            >
                <Box sx={styleModal} className="custom-scrollbar">

                    <Close onClick={() => {setOpenModalSaque(false);}} style={{ color: '#A863FF', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />

                    <Box className={classes.headerIndicationss}>
                        <img src={MoneyBagIcon} style={{ width: '20px' }} />
                        <Typography className={classes.headerIndicationssTitle}>Saque</Typography>
                    </Box>

                    <Box
                        style={{
                            marginTop: '20px'
                        }}
                    >
                        <Typography
                            style={{
                                color: '#0C0C0C',
                                marginBottom: '5px'
                            }}
                        >
                           Valor do saque
                        </Typography>
                        <Input size="small" placeholder="R$" fullWidth value={valueSaque} onChange={(e) => {setValueSaque(e.target.value)}} />
                        <Typography className={classes.headerContentAction} style={{ marginTop: '5px' }}>Sacar tudo</Typography>
                    </Box>

                    <Box
                        style={{
                            marginTop: '20px'
                        }}
                    >
                        <Typography
                            style={{
                                color: '#0C0C0C',
                                marginBottom: '5px'
                            }}
                        >
                           Destino
                        </Typography>
                        <FormControl>
                            <RadioGroup>
                                <FormControlLabel 
                                    value="Conta bancária X" 
                                    control={<Radio />} 
                                    label={
                                        <>
                                            <Typography>Conta bancária X</Typography>
                                            <Typography style={{ fontSize: '12px' }}>Banco Y, Agência 000, Conta 000, Dígito 0</Typography>
                                        </>
                                    } 
                                />
                                <FormControlLabel 
                                    value="PIX" 
                                    control={<Radio />} 
                                    label={
                                        <>
                                            <Typography>PIX</Typography>
                                            <Typography style={{ fontSize: '12px' }}>000.000.000-00</Typography>
                                        </>
                                    } 
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box className={classes.actionsNewSaque}>
                        <Button onClick={() => {setOpenModalSaque(false)}} variant="outlined" color="white" className={classes.cancelActionNewSaque}>Cancelar</Button>
                        <Button onClick={() => {}} className={classes.continueActionNewSaque}>Continuar</Button>
                    </Box>

                </Box>
            </Modal>
            <Modal
                open={openModalNewDataBank}
                onClose={() => {setOpenModalNewDataBank(false)}}
            >
                <Box sx={styleModal} className="custom-scrollbar">
                    
                    <Close onClick={() => {setOpenModalNewDataBank(false);}} style={{ color: '#A863FF', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />

                    <Box className={classes.headerIndicationss}>
                        <img src={BankIcon} style={{ width: '30px' }} />
                        <Typography className={classes.headerIndicationssTitle}>Novo dado bancário</Typography>
                    </Box>

                    <Typography sx={{ fontWeight: 700 }}>Dados bancários:</Typography>

                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel value="end" control={<Radio />} label="Conta corrente" />
                            <FormControlLabel value="end" control={<Radio />} label="Conta poupança" />
                        </RadioGroup>
                    </FormControl>

                    <Typography>Banco</Typography>

                    <Input 
                        fullWidth
                        size="small"
                        type="select"
                        options={[
                            {
                                label: 'Selecione',
                                value: ''
                            },
                            {
                                label: 'Banco 1',
                                value: 'banco_1'
                            }
                        ]}
                    />
                    <br /><br />
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                            <Typography>Agência:</Typography>
                            <Input size="small" fullWidth placeholder="000" />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography>Dígito:</Typography>
                            <Input size="small" fullWidth placeholder="0" />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography>Conta:</Typography>
                            <Input size="small" fullWidth placeholder="000" />
                        </Grid>
                    </Grid>
                    <hr style={{ border: '1px solid #C292FF', marginTop: '20px' }} />

                    <Box className={classes.actionsNewSaque}>
                        <Button onClick={() => {setOpenModalBank(false)}} variant="outlined" color="white" className={classes.cancelActionNewSaque}>Cancelar</Button>
                        <Button onClick={() => {}} className={classes.continueActionNewSaque}>Continuar</Button>
                    </Box>

                </Box>
            </Modal>
            <Modal
                open={openModalBank}
                onClose={() => {setOpenModalBank(false)}}
            >
                <Box sx={styleModal} className="custom-scrollbar">

                    <Close onClick={() => {setOpenModalBank(false);}} style={{ color: '#A863FF', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />

                    <Box className={classes.headerIndicationss}>
                        <img src={BankIcon} style={{ width: '30px' }} />
                        <Typography className={classes.headerIndicationssTitle}>Dados bancários/PIX</Typography>
                    </Box>

                    <Typography sx={{ fontWeight: 700 }}>Dados bancários:</Typography>

                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel value="end" control={<Radio />} label="Conta corrente" />
                            <FormControlLabel value="end" control={<Radio />} label="Conta poupança" />
                        </RadioGroup>
                    </FormControl>

                    <Typography>Banco</Typography>

                    <Input 
                        fullWidth
                        size="small"
                        type="select"
                        options={[
                            {
                                label: 'Selecione',
                                value: ''
                            },
                            {
                                label: 'Banco 1',
                                value: 'banco_1'
                            }
                        ]}
                    />
                    <br /><br />
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                            <Typography>Agência:</Typography>
                            <Input size="small" fullWidth placeholder="000" />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography>Dígito:</Typography>
                            <Input size="small" fullWidth placeholder="0" />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography>Conta:</Typography>
                            <Input size="small" fullWidth placeholder="000" />
                        </Grid>
                    </Grid>
                    <br />
                    <Typography onClick={() => {setOpenModalBank(false);setOpenModalNewDataBank(true)}} className={classes.headerContentAction}>Adicionar conta bancária</Typography>
                    <br />
                    <hr style={{ border: '1px solid #C292FF' }} />
                    <br />

                    <Typography sx={{ fontWeight: 700 }}>PIX:</Typography>
                    <br />
                    <Typography>Chave PIX</Typography>
                    <Input placeholder="Sua chave" size="small" fullWidth />

                    <Box className={classes.actionsNewSaque}>
                        <Button onClick={() => {setOpenModalBank(false)}} variant="outlined" color="white" className={classes.cancelActionNewSaque}>Cancelar</Button>
                        <Button onClick={() => {}} className={classes.continueActionNewSaque}>Continuar</Button>
                    </Box>

                </Box>
            </Modal>
        </LoggedLayout>
    )
}

export default Indicacoes;