import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Chip, Box, Typography, Grid, Slider, Radio, RadioGroup, FormControlLabel, Switch } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import styles from './drop-reels.module.css';
import Product from "./product";
import { useState } from "react";
import OptionsSelect from "../../components/options-select";

const DropReels = props => {

    const products = [
        {
            'name': 'Tênis Nike AIR Force',
            'store': 'www.vison.com.br',
            'link_product': 'https://www.nike.com.br/tenis-nike-pegasus-40-masculino-025803.html?cor=ID'
        },
        {
            'name': 'Tênis Nike AIR Force',
            'store': 'www.vison.com.br',
            'link_product': 'https://www.nike.com.br/tenis-nike-pegasus-40-masculino-025803.html?cor=ID'
        },
        {
            'name': 'Tênis Nike AIR Force',
            'store': 'www.vison.com.br',
            'link_product': 'https://www.nike.com.br/tenis-nike-pegasus-40-masculino-025803.html?cor=ID'
        },
        {
            'name': 'Tênis Nike AIR Force',
            'store': 'www.vison.com.br',
            'link_product': 'https://www.nike.com.br/tenis-nike-pegasus-40-masculino-025803.html?cor=ID'
        },
        {
            'name': 'Tênis Nike AIR Force',
            'store': 'www.vison.com.br',
            'link_product': 'https://www.nike.com.br/tenis-nike-pegasus-40-masculino-025803.html?cor=ID'
        },
        {
            'name': 'Tênis Nike AIR Force',
            'store': 'www.vison.com.br',
            'link_product': 'https://www.nike.com.br/tenis-nike-pegasus-40-masculino-025803.html?cor=ID'
        },
        {
            'name': 'Tênis Nike AIR Force',
            'store': 'www.vison.com.br',
            'link_product': 'https://www.nike.com.br/tenis-nike-pegasus-40-masculino-025803.html?cor=ID'
        }
    ]

    const [option, setOption] = useState('products');

    return(
        <DashboardLayout history={props?.history} infoUser={props?.infoUser}>
            <Box className={styles.boxHeader}>
                <Box>
                    <Typography variant="h4">Bem-vindo(a), {props?.infoUser?.name.split(' ')[0]}</Typography>
                    <Typography className={styles.subtitle}>Este é o seu painel dos seus produtos.</Typography>
                </Box>
            </Box>
            <Box style={{ marginTop: '40px' }}>
                <OptionsSelect 
                    option={option}
                    onChange={(e) => {setOption(e)}}
                    options={[
                        {
                            label: "Produtos",
                            value: 'products'
                        },
                        {
                            label: "Configurações",
                            value: 'configurations'
                        }
                    ]}
                />
            </Box>
            <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
            {option == 'products' && (
                <>
                    <Typography variant="h5" style={{ marginTop: '20px' }}>Produtos</Typography>
                    <Box className={styles.boxTable}>
                        <Box className={styles.boxTitleTable}>
                            <Typography variant="h6">Lista de produtos</Typography>
                            <Chip size="small" label={`${products.length} usuários`} className="chip" />
                        </Box>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="drop reels table">
                                <TableHead className={styles.tableHead}>
                                    <TableRow>
                                        <TableCell>PRODUTO</TableCell>
                                        <TableCell align="center">LOJA</TableCell>
                                        <TableCell align="center">LINK DO PRODUTO</TableCell>
                                        <TableCell>DROP REELS</TableCell>
                                        <TableCell>AÇÕES</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product, index) => (
                                        <Product product={product} key={index} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>
            )}
            {option == 'configurations' && (
                <>
                    <Typography variant="h5" style={{ marginTop: '20px' }}>Configure seus Drop Reels</Typography>
                    <Grid container spacing={3} style={{ marginTop: '0px' }}>
                        <Grid item md={6} xs={12}>
                            <Box style={{ border: '1px solid #F0F0F0', borderRadius: '8px', padding: '16px' }}>
                                <Typography variant="h6">Configurações</Typography>
                                <hr style={{ border: '0.5px solid #EAECF0', marginTop: '20px' }} />
                                <Typography style={{ marginTop: '20px' }} variant="body1">Tamanho do vídeo:</Typography>
                                <Slider style={{ color: '#9643FF', marginTop: '10px', width: '320px' }} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" size="medium" />
                                <Typography style={{ marginTop: '10px' }} variant="body1">Disposição na tela:</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="right" control={<Radio />} label="Direita" />
                                    <FormControlLabel value="left" control={<Radio />} label="Esquerda" />
                                </RadioGroup>
                                <Typography style={{ marginTop: '10px' }} variant="body1">Formato:</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="circle" control={<Radio />} label="Circular" />
                                    <FormControlLabel value="square" control={<Radio />} label="Retangular" />
                                    <FormControlLabel value="rect" control={<Radio />} label="Quadrado" />
                                </RadioGroup>
                                <Typography style={{ marginTop: '10px' }} variant="body1">Mostrar informações do produto:</Typography>
                                <Switch />
                                <Typography style={{ marginTop: '10px' }} variant="body1">Borda ativa:</Typography>
                                <Switch />
                                <Typography style={{ marginTop: '10px' }} variant="body1">Cor da borda:</Typography>
                                <Box style={{ marginTop: '10px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <input type="color" />
                                    <FormControlLabel value="story" control={<Radio />} label="Padrão Story" />
                                </Box>
                                <Typography style={{ marginTop: '20px' }} variant="body1">Largura da borda:</Typography>
                                <Slider style={{ color: '#9643FF', marginTop: '10px', width: '320px' }} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" size="medium" />
                            </Box>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Box style={{ border: '1px solid #F0F0F0', borderRadius: '8px', padding: '16px' }}>
                                <Typography variant="h6">Preview</Typography>
                                <hr style={{ border: '0.5px solid #EAECF0', marginTop: '20px' }} />
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )}
        </DashboardLayout>
    )
}

export default DropReels;