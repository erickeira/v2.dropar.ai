import { 
    Box, 
    Chip, 
    Grid, 
    Typography, 
    Checkbox, 
    FormControlLabel, 
    Switch, 
    Paper 
} from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import Button from "../../components/button";
import { Add, Close } from "@mui/icons-material";
import Banner from '../../assets/img/banner.png'
import styles from './produtos.module.css';
import ClickIcon from '../../assets/icons/click.svg';
import { SwiperSlide } from "swiper/react";
import { useState } from "react";
import IconsCoin from '../../assets/icons/coins.svg';
import OptionsSelect from "../../components/options-select";
import ProducImage from '../../assets/img/product.png';
import Input from "../../components/input";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Radio from "@mui/material/Radio";
import ItemPlataform from "../../components/plataforms";
import ShopfyImage from '../../assets/img/shopify.svg';
import YampiImage from '../../assets/img/yampi.png';
import NuvemshopImage from '../../assets/img/numvemshop.svg';
import CartpandaImage from '../../assets/img/cartpanda.svg';
import ExclamationIcon from '../../assets/icons/exclamation.svg';
import TrashIcon from '../../assets/icons/trash.svg'
import DownloadIcon from '../../assets/icons/download.svg'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import Carrousel from "../../components/molecules/carrousel/carrousel";
import AmountDropsIcon from '../../assets/icons/amount-drops.svg';
import AmountCoinsIcon from '../../assets/icons/amount-coins.svg';
import { SearchRounded } from "@mui/icons-material";
import FilterIcon from '../../assets/icons/filter.svg';
import ProductDescription from '../../assets/img/product-description.png';
import ModalComponent from "../../components/atoms/modal/modal";
import RocketIcon from '../../assets/icons/rocket.svg'
import RocketPurpleIcon from '../../assets/icons/rocket-purple.svg'

const dropzoneStyles = {
    border: '2px dashed #D1D5DB',
    borderRadius: '12px',
    padding: '0px',
    textAlign: 'center',
    backgroundColor: 'transparent',
    height: '250px'
};

const dropzoneStylesVariation = {
    border: '2px dashed #D1D5DB',
    borderRadius: '12px',
    padding: '0px',
    textAlign: 'center',
    backgroundColor: 'transparent',
    height: '150px'
};

const inputStyles = {
    outline: 'none',
    padding: '10px', 
    fontSize: '14px',
    color: '#141414'
};

const Item = props => {

    return(
        <>
            <img src={props.data.image} alt='Item Image' className={styles.itemImage} />
        </>
    )
}

const ItemPackage = props => {

    return(
        <Box style={{ borderRadius: '8px', backgroundColor: '#F5ECFF', padding: '16px', marginTop: '10px' }}>
            <Box 
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px', 
                    justifyContent: 'space-between'
                }}
            >
                <Box>
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <img src={IconsCoin} style={{ width: '30px' }} />
                        <Typography variant="body1">Pacote com <b>{props.package.coins} DroparCoins</b></Typography>
                    </Box>
                    {!props?.disabledClick && (
                        <Typography 
                            onClick={() => {
                                if(props.handlePackage){
                                    props.handlePackage(props.package.coins);
                                }
                            }} 
                            className={styles.amountIconsInfosLink}
                        >
                            Quero esse pacote
                        </Typography>
                    )}
                </Box>
                <Typography style={{ fontSize: '16px' }}>{parseFloat(props.package.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Typography>
            </Box>
        </Box>
    )
}

const steps = [
    {
        'label': 'Pacotes',
        'subtitle': 'Selecione o ideal' 
    },
    {
        'label': 'Pagamento',
        'subtitle': 'Selecione a forma de pagemento' 
    }
];

const Produtos = props => {
    
    const itens = [
        {
            image: Banner
        },
        {
            image: Banner
        },
        {
            image: Banner
        }
    ]

    const [amountDrops, setAmountDrops] = useState(45);
    const [amountIcons, setAmountIcons] = useState(25);
    const [amountProducts, setAmountProducts] = useState(56);
    const [openModalCoins, setOpenModalCoins] = useState(false);

    const packages = [
        {
            'coins': 50,
            'price': 50
        },
        {
            'coins': 70,
            'price': 70
        },
        {
            'coins': 100,
            'price': 100
        }
    ]

    const [newProduct, setNewProduct] = useState(false);
    const [option, setOption] = useState('product');
    const [optionProduct, setOptionProduct] = useState('product');

    const infoProduct = {
        image: ProducImage,
        title: 'Tênis Nike',
        by: ShopfyImage,
        price: 297,
        promotionPrice: 400,
        description: 'Aqui será colocado algumas informações sobre o tópico em especifico. Também podemos separar as informações da seguinte maneira.',
        images: [
            ProducImage,
            ProducImage,
            ProducImage,
            ProducImage,
            ProducImage
        ],
        variations: [
            'Preto/35',
            'Vermelho/35',
            'Preto/36',
            'Vermelho/35'
        ],
        tags: [
            'Feminino',
            'Calçados',
            'Internacional'
        ],
        collections: [
            'Nike',
            'Calçados',
            'Tecido'
        ]
    };

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [selectedPackage, setSelectedPackage] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);

    const handleChangeStatusImages = ({ meta, file, remove }, status) => {
        if (status === 'preparing') {}
        if (status === 'headers_received') {}
        if (status === 'done') {
            console.log("Avatar: ", file)
        }
        if (status === 'removed') {
        }
    }

    const plataforms = [
        {
            image: ShopfyImage,
            name: 'Shopfy',
            id: 1
        },
        {
            image: YampiImage,
            name: 'Yampi',
            id: 2
        },
        {
            image: NuvemshopImage,
            name: 'Nuvemshop',
            id: 3
        },
        {
            image: CartpandaImage,
            name: 'Cartpanda',
            id: 4
        }
    ]

    const [selectedPlataform, setSelectedPlataform] = useState();
    const [openTurbCopy, setOpenTurbCopy] = useState(false);
    const [openPriceApply, setOpenPriceApply] = useState(false);

    return(
        <DashboardLayout history={props?.history} infoUser={props?.infoUser}>
            {!newProduct ?
                <>
                    <Box className={styles.boxHeader}>
                        <Box>
                            <Typography variant="h4">Bem-vindo(a), {props?.infoUser?.name.split(' ')[0]}</Typography>
                            <Typography className={styles.subtitle}>Este é o seu painel dos seus produtos.</Typography>
                        </Box>
                        <Box>
                            <Button onClick={() => {setNewProduct(true)}} className={styles.button}><Add /> Novo produto</Button>
                        </Box>
                    </Box>
                    <Box className={styles.carrousel}>
                        <Box sx={{ display: 'block', margin: 'auto', width: '88%' }}>
                            <Carrousel amountDisplay={1}>
                                {itens.map((item, index) => (
                                    <SwiperSlide key={index} style={{ pointerEvents: 'none' }}>
                                        <Item data={item} />
                                    </SwiperSlide>
                                ))}
                            </Carrousel>
                        </Box>
                    </Box>
                    <Grid container spacing={3} className={styles.boxes}>
                        <Grid item md={6} xs={12}>
                            <Box 
                                className={styles.amountDrops}
                                style={{
                                    backgroundImage: `url(${AmountDropsIcon})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'bottom right'
                                }}
                            >
                                <img src={ClickIcon} />
                                <Box className={styles.amountDropsInfos}>
                                    <Box>
                                        <Typography style={{ fontSize: '24px', fontWeight: '500' }}>Quantidade de Drops</Typography>
                                        <Typography color="textSecondary" style={{ fontSize: '14px' }}>Seus drops já realizados.</Typography>
                                    </Box>
                                    <Typography variant="h4">{amountDrops}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Box 
                                className={styles.amountIcons}
                                style={{
                                    backgroundImage: `url(${AmountCoinsIcon})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'top right'
                                }}
                            >
                                <img src={IconsCoin} />
                                <Box className={styles.amountIconsInfos}>
                                    <Box>
                                        <Typography style={{ fontSize: '24px', fontWeight: '500' }}>DroparCoins disponíveis</Typography>
                                        <Typography color="textSecondary" style={{ fontSize: '14px' }}>Seus créditos para você turbinar seus produtos!</Typography>
                                        <Typography onClick={() => {setOpenModalCoins(true)}} className={styles.amountIconsInfosLink}>Quero mais créditos</Typography>
                                    </Box>
                                    <Typography variant="h4">{amountIcons}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box className={styles.boxTitle}>
                        <Typography style={{ fontSize: '30px' }}>Produtos disponíveis</Typography>
                        <Chip size="small" label={`${amountProducts} produtos`} className="chip" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', '@media (max-width: 600px)': { display: 'grid' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', '@media (max-width: 600px)': { display: 'grid' } }}>
                            <Input 
                                size="small" 
                                placeholder="Procurar" 
                                sx={{ width: '400px' }} 
                                startAdornment={true}
                                startAdornmentIcon={<SearchRounded />}
                                handleClickStartAdornment={() => {}}
                            />
                            <Button sx={{ width: '200px', justifyContent: 'flex-start' }} color="gray" variant="outlined" onClick={() => {setOpenFilter(true)}} label="Filtros"><img src={FilterIcon} /> &nbsp; Filtros</Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', '@media (max-width: 600px)': { display: 'grid' } }}>
                            <Typography style={{ color: '#9C3661', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}>Excluir todos</Typography>
                            <Button label="Dropar todos" /> 
                        </Box>
                    </Box>
                    <Box style={{ backgroundColor: '#F5ECFF', borderRadius: '8px', padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
                        <OptionsSelect 
                            option={optionProduct}
                            onChange={(e) => {setOptionProduct(e)}}
                            options={[
                                {
                                    label: "Produto",
                                    value: 'product'
                                },
                                {
                                    label: "Detalhes do produto",
                                    value: 'details'
                                },
                                {
                                    label: "Imagens",
                                    value: 'images'
                                },
                                {
                                    label: 
                                        <Box style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                                            <Typography>Variações</Typography>
                                            <Chip size="small" label={infoProduct.variations.length} className="chip" />
                                        </Box>
                                    ,
                                    value: 'variations'
                                }
                            ]}
                            fullSize={true}
                        />
                        {optionProduct == 'product' && (
                            <>
                                <Grid container spacing={3} style={{ marginTop: '0px' }}>
                                    <Grid item md={6} xs={12}>
                                        <img src={infoProduct.image} style={{ borderRadius: '8px', width: '100%', marginBottom: '20px' }} />
                                        <Grid container spacing={3}>
                                            <Grid item md={4} xs={12}>
                                                <img src={infoProduct.image} style={{ borderRadius: '8px', width: '100%' }} />
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <img src={infoProduct.image} style={{ borderRadius: '8px', width: '100%' }} />
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <img src={infoProduct.image} style={{ borderRadius: '8px', width: '100%' }} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="h4" style={{ fontWeight: 'bold' }}>{infoProduct.title}</Typography>
                                        <Box 
                                            sx={{ 
                                                marginTop: '10px',
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '10px',
                                                '@media (max-width: 600px)': {
                                                    display: 'grid' 
                                                }
                                            }}
                                        >
                                            <Typography style={{ fontSize: '48px' }}>{parseFloat(infoProduct.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Typography>
                                            <Typography style={{ color: '#D4B2FF', textDecoration: 'line-through', fontSize: '30px' }}>{parseFloat(infoProduct.promotionPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Typography>
                                        </Box>
                                        <Box style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '5px' }}>
                                            <Button color="pink" label="Ver produto" />
                                            <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <Typography style={{ color: '#5C299C' }}>BY</Typography>
                                                <img src={infoProduct?.by} style={{ width: '22px' }} />
                                            </Box>
                                        </Box>
                                        <Typography style={{ color: '#344054', fontSize: '12px', marginTop: '10px', fontWeight: '500' }}>Tags do produto</Typography>
                                        <Paper elevation={0} style={{ borderRadius: '4.18px', border: '0.52px solid #D0D5DD', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px', padding: '5.22px 7.31px 5.22px 7.31px' }}>
                                            {infoProduct?.tags?.map((tag, index) => (
                                                <Box key={index} style={{ backgroundColor: '#D4B2FF', borderRadius: '4px', padding: '2px 10px 2px 10px' }}>
                                                    <Typography style={{ color: '#5C299C', fontWeight: '500', fontSize: '12px' }}>{tag}</Typography>
                                                </Box>
                                            ))}
                                        </Paper>
                                        <Typography style={{ color: '#344054', fontSize: '12px', marginTop: '10px', fontWeight: '500' }}>Coleções do Produto</Typography>
                                        <Paper elevation={0} style={{ borderRadius: '4.18px', border: '0.52px solid #D0D5DD', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px', padding: '5.22px 7.31px 5.22px 7.31px' }}>
                                            {infoProduct?.collections?.map((collection, index) => (
                                                <Box key={index} style={{ backgroundColor: '#FFBBD8', borderRadius: '4px', padding: '2px 10px 2px 10px' }}>
                                                    <Typography style={{ color: '#9C3661', fontWeight: '500', fontSize: '12px' }}>{collection}</Typography>
                                                </Box>
                                            ))}
                                        </Paper>
                                        <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
                                        <Typography style={{ color: '#141414', fontWeight: '700', fontSize: '16px', marginTop: '10px' }}>Aqui Fica o título deste tópico</Typography>
                                        <Typography style={{ color: '#595959', marginTop: '10px' }}>{infoProduct.description}</Typography>
                                        <ul style={{ color: '#595959' }}>
                                            <li>Em Bullets points colocar informações de lista.</li>
                                            <li>Em Bullets points colocar informações de lista.</li>
                                        </ul>
                                        <img src={ProductDescription} style={{ width: '100%' }} />
                                        <Typography style={{ color: '#595959', marginTop: '10px' }}>Aqui fica uma descrição das características que o produto possui.</Typography>
                                        <ul style={{ color: '#595959' }}>
                                            <li>Aqui um tópico de característico</li>
                                            <li>Aqui um tópico de característico</li>
                                        </ul>
                                    </Grid>
                                </Grid>
                                <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', justifyContent: 'end' }}>
                                    <Button label="Dropar produto" />
                                    <Button label="Salvar" sx={{ backgroundColor: '#5C299C' }} />
                                    <Typography style={{ color: '#9C3661', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}>Excluir</Typography>
                                </Box>
                            </>
                        )}
                        {optionProduct == 'details' && (
                            <>
                                <Box style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '8px', border: '1px solid #D9D9D9', marginTop: '20px' }}>
                                    <div style={{ backgroundColor: '#F5ECFF', width: 'fit-content', padding: '4px 16px 4px 16px', borderRadius: '8px' }}>
                                        <Typography style={{ color: '#5C299C' }}>Coleções:</Typography>
                                    </div>
                                    <Typography variant="body2" style={{ marginTop: '20px' }}>Adicionar Coleções do produto</Typography>
                                    <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
                                    <div style={{ backgroundColor: '#F5ECFF', width: 'fit-content', padding: '4px 16px 4px 16px', borderRadius: '8px', marginTop: '20px' }}>
                                        <Typography style={{ color: '#5C299C' }}>Tags</Typography>
                                    </div>
                                    <Typography variant="body2" style={{ marginTop: '20px' }}>Adicionar TAGS</Typography>
                                    <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
                                    <Box style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                        <div style={{ backgroundColor: '#F5ECFF', width: 'fit-content', padding: '4px 16px 4px 16px', borderRadius: '8px', marginTop: '20px' }}>
                                            <Typography style={{ color: '#5C299C' }}>Descrição do produto:</Typography>
                                        </div>
                                        <Button onClick={() => {setOpenTurbCopy(true)}}><img src={RocketIcon} /> &nbsp; Turbo copy</Button>
                                    </Box>
                                </Box>
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', justifyContent: 'end' }}>
                                    <Typography style={{ color: '#9C3661', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}>Excluir</Typography>
                                    <Button label="Dropar produto" />
                                    <Button label="Salvar" sx={{ backgroundColor: '#5C299C' }} />
                                </Box>
                            </>
                        )}
                        {optionProduct == 'images' && (
                            <>
                                <Grid container spacing={2} style={{ marginTop: '0px'}}>
                                    {infoProduct.images.map((image) => (
                                        <Grid item md={3} xs={12}>
                                            <Box
                                                style={{ 
                                                    backgroundImage: `url(${image})`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: 'cover',
                                                    borderRadius: '8px',
                                                    width: '100%',
                                                    height: '250px',
                                                    position: 'relative'
                                                }}
                                            >
                                                <input type="checkbox" id="checkbox" style={{ position: 'absolute', top: '14px', right: '14px' }} />
                                                <Box style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#FFF', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <img src={DownloadIcon} style={{ cursor: 'pointer' }} />
                                                    <img src={TrashIcon} style={{ cursor: 'pointer' }} />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                    <Grid item md={3} xs={12}>
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
                                                        <span style={{ color: '#141414', fontWeight: 'bold' }}>
                                                            Faça upload de uma nova imagem
                                                        </span> 
                                                        <br />
                                                        <span style={{ color: '#8C8C8C' }}> 
                                                            PNG, JPG, JPEG máx. 10MB
                                                        </span>
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', justifyContent: 'end' }}>
                                    <Typography style={{ color: '#9C3661', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>Excluir</Typography>
                                    <Button label="Salvar" />
                                    <Button label="Dropar produto" />
                                </Box>
                            </>
                        )}
                        {optionProduct == 'variations' && (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', '@media (max-width: 600px)': { display: 'grid', gap: '10px' } }}>
                                    <Typography style={{ color: '#5C299C', display: 'flex', gap: '3px', alignItems: 'center', textDecoration: 'underline' }}><Add /> Adicionar opções como tamanho ou cor</Typography>
                                    <Button onClick={() => {setOpenPriceApply(true)}} label="Alterar preço de todos" />
                                </Box>
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                                    <Button label="Salvar" /> 
                                    <Typography style={{ color: '#9C3661', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>Cancelar</Typography>
                                </Box>
                                <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
                                <Grid container spacing={2} style={{ marginTop: '0px' }}>
                                    {infoProduct.variations.map((variation, index) => (
                                        <Grid item md={6} xs={12} key={index}>
                                            <Box style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '8px', border: '1px solid #D9D9D9' }}>
                                                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <FormControlLabel
                                                        value="end"
                                                        control={<Checkbox />}
                                                        label={variation}
                                                        labelPlacement="end"
                                                    />
                                                    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <Typography style={{ color: '#9C3661', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>Salvar</Typography>
                                                        <Button label="Excluir" /> 
                                                    </Box>
                                                </Box>
                                                <Box 
                                                    sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        marginTop: '20px', 
                                                        gap: '15px',
                                                        '@media (max-width: 600px)': {
                                                            display: 'grid'
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{ width: '30%', '@media (max-width: 600px)': { width: '100%' } }}>
                                                        <Dropzone
                                                            maxFiles={1}
                                                            onChangeStatus={handleChangeStatusImages}
                                                            styles={{
                                                                dropzone: dropzoneStylesVariation,
                                                                inputLabel: inputStyles,
                                                            }}
                                                            inputContent={
                                                                <>
                                                                    <Typography style={{ fontSize: '14px', fontWeight: 400 }}>
                                                                        <span style={{ color: '#141414', fontWeight: 'bold' }}>
                                                                            Faça upload de uma nova imagem
                                                                        </span> 
                                                                        <br />
                                                                        <span style={{ color: '#8C8C8C' }}> 
                                                                            PNG, JPG, JPEG máx. 10MB
                                                                        </span>
                                                                    </Typography>
                                                                </>
                                                            }
                                                        />
                                                    </Box>
                                                    <Box sx={{ width: '70%', '@media (max-width: 600px)': { width: '100%' } }}>
                                                        <Grid container spacing={2}>
                                                            <Grid md={6} xs={12} item>
                                                                <Typography
                                                                    style={{
                                                                        color: '#0C0C0C',
                                                                        marginBottom: '5px'
                                                                    }}
                                                                >
                                                                    Código
                                                                </Typography>
                                                                <Input size="small" placeholder="00fdfodf0fd0" fullWidth />
                                                            </Grid>
                                                            <Grid md={6} xs={12} item>
                                                                <Typography
                                                                    style={{
                                                                        color: '#0C0C0C',
                                                                        marginBottom: '5px'
                                                                    }}
                                                                >
                                                                    Disponíveis
                                                                </Typography>
                                                                <Input size="small" placeholder="138" fullWidth />
                                                            </Grid>
                                                            <Grid md={6} xs={12} item>
                                                                <Typography
                                                                    style={{
                                                                        color: '#0C0C0C',
                                                                        marginBottom: '5px'
                                                                    }}
                                                                >
                                                                    Tamanho
                                                                </Typography>
                                                                <Input size="small" placeholder="35/26" fullWidth />
                                                            </Grid>
                                                            <Grid md={6} xs={12} item>
                                                                <Typography
                                                                    style={{
                                                                        color: '#0C0C0C',
                                                                        marginBottom: '5px'
                                                                    }}
                                                                >
                                                                    Cor
                                                                </Typography>
                                                                <Input size="small" placeholder="Preto" fullWidth />
                                                            </Grid>
                                                            <Grid md={6} xs={12} item>
                                                                <Typography
                                                                    style={{
                                                                        color: '#0C0C0C',
                                                                        marginBottom: '5px'
                                                                    }}
                                                                >
                                                                    Preço
                                                                </Typography>
                                                                <Input size="small" placeholder="R$190,00" fullWidth />
                                                            </Grid>
                                                            <Grid md={6} xs={12} item>
                                                                <Typography
                                                                    style={{
                                                                        color: '#0C0C0C',
                                                                        marginBottom: '5px'
                                                                    }}
                                                                >
                                                                    Preço riscado
                                                                </Typography>
                                                                <Input size="small" placeholder="R$80,00" fullWidth />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Box>
                    
                    <ModalComponent open={openModalCoins} handleClose={() => {setOpenModalCoins(false)}}>

                        <Close onClick={() => {setOpenModalCoins(false);}} style={{ color: '#A863FF', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />
                        
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px', 
                            justifyContent: 'center'
                        }}>
                            {/* {turbCopy ?
                                <Typography variant="h5">Turbo copy</Typography>
                            :
                                <> */}
                                    <img src={IconsCoin} />
                                    <Typography variant="h5">Quero mais créditos</Typography>
                                {/* </>
                            } */}
                        </Box>

                        {/* {turbCopy && (
                            <Box style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <img src={ExclamationIcon} />
                                    <Typography variant="h6">Atenção!</Typography>
                                </Box>
                                <Typography style={{ textAlign: 'center' }}>Você não possui créditos suficientes para completar esta ação. Recarregue para continuar turbinando. </Typography>
                            </Box>
                        )} */}

                        <Box sx={{ width: '70%', display: 'block', margin: 'auto', paddingTop: '20px', paddingBottom: '20px' }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((step, index) => (
                                    <Step key={step.label} completed={completed[index]} onClick={() => {setActiveStep(index)}} style={{ cursor: 'pointer' }}>
                                        <StepLabel>
                                            <Typography style={{ color: '#0C0C0C', fontSize: '14px', fontWeight: '700' }}>{step.label}</Typography>
                                            <Typography style={{ color: '#595959', fontSize: '10px' }}>{step.subtitle}</Typography>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>

                        {activeStep == 0 && (
                            <>
                                <Typography style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>Pacotes disponíveis:</Typography>

                                {packages.map((item, index) => (
                                    <ItemPackage 
                                        key={index} 
                                        package={item} 
                                        handlePackage={(e) => {
                                            console.log(packages.filter(packageOption => packageOption.coins === e));
                                            setSelectedPackage(packages.filter(packageOption => packageOption.coins === e));
                                            setActiveStep(1);
                                        }} 
                                    />
                                ))}
                            </>
                        )}

                        {activeStep == 1 && (
                            <>
                                <ItemPackage 
                                    package={selectedPackage?.[0]}
                                    disabledClick={true}
                                />
                                <Typography style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>Pagar com:</Typography>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
                                    <Typography>Saldo Dropar: R$ 88,90</Typography>
                                    <Radio />
                                </Box>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
                                    <Typography>Pagar com cartão de crédito</Typography>
                                    <Radio />
                                </Box>
                                <Box style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <Button onClick={() => {setActiveStep(0);}} color="light" label="Voltar" sx={{ width: '50%' }} />
                                    <Button label="Concluir" sx={{ width: '50%' }} />
                                </Box>
                            </>
                        )}

                    </ModalComponent>
                    <ModalComponent open={openTurbCopy} handleClose={() => {setOpenTurbCopy(false)}}>

                        <Close onClick={() => {setOpenTurbCopy(false);}} style={{ color: '#A863FF', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />
                        
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px', 
                            justifyContent: 'center'
                        }}>
                            <img src={RocketPurpleIcon} style={{ width: '24px' }} />
                            <Typography variant="h5">Turbo copy</Typography>
                        </Box>

                        <Box style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                <img src={ExclamationIcon} />
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Atenção!</Typography>
                            </Box>
                            <Typography style={{ textAlign: 'center' }}>A ação de turbinar copy irá consumir <br /><b>05 DroparCoins</b> da sua conta.</Typography>
                        </Box>
                        
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
                            <Button onClick={() => {setOpenTurbCopy(false)}} color="light" label="Cancelar" sx={{ width: '50%' }} />
                            <Button label="Turbinar copy" sx={{ width: '50%' }} />
                        </Box>

                    </ModalComponent>
                </>
            :
                <>
                    <Box className={styles.boxHeader}>
                        <Box>
                            <Typography variant="h4">Criação de novo produto</Typography>
                            <Typography className={styles.subtitle}>Preencha as informações do novo produto.</Typography>
                        </Box>
                    </Box>
                    <Button onClick={() => {setNewProduct(false)}} label="Voltar p/produtos" color="light" sx={{ marginTop: '30px' }} />
                    <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px', marginBottom: '20px' }} />
                    <OptionsSelect 
                        option={option}
                        onChange={(e) => {setOption(e)}}
                        options={[
                            {
                                label: "Produto",
                                value: 'product'
                            },
                            {
                                label: "Variações",
                                value: 'variations'
                            }
                        ]}
                    />
                    {option == 'variations' && (
                        <> 
                            <Typography variant="h6">Adicione as variações do produto</Typography>
                            <Box style={{ border: '1px solid #D9D9D9', padding: '24px', marginTop: '20px', borderRadius: '8px' }}>
                                <div style={{ backgroundColor: '#F5ECFF', width: 'fit-content', padding: '4px 16px 4px 16px', borderRadius: '8px' }}>
                                    <Typography style={{ color: '#5C299C' }}>Variações:</Typography>
                                </div>
                                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <Typography style={{ color: '#5C299C', display: 'flex', gap: '3px', alignItems: 'center', textDecoration: 'underline' }}><Add /> Adicionar opções como tamanho ou cor</Typography>
                                    <Button onClick={() => {setOpenPriceApply(true)}} label="Alterar preço de todos" />
                                </Box>
                                <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px', marginBottom: '20px' }} />
                            </Box>
                            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', justifyContent: 'end' }}>
                                <Typography style={{ color: '#9C3661', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>Cancelar</Typography>
                                <Button label="Salvar" /> 
                            </Box>
                        </>
                    )}
                    {option == 'product' && (
                        <>
                            <Typography variant="h6" sx={{ '@media (max-width: 600px)': { marginTop: '20px' } }}>Adicione título e precificações</Typography>
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
                                    Título do produto
                                </Typography>
                                <Input size="small" placeholder="Digite o título" fullWidth />
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
                                    O produto possui variações
                                </Typography>
                                <Switch defaultChecked />
                            </Box>
                            <Typography variant="h6">Adicione os detalhes do produto</Typography>
                            <Box style={{ border: '1px solid #D9D9D9', padding: '24px', marginTop: '20px', borderRadius: '8px' }}>
                                <div style={{ backgroundColor: '#F5ECFF', width: 'fit-content', padding: '4px 16px 4px 16px', borderRadius: '8px' }}>
                                    <Typography style={{ color: '#5C299C' }}>Coleções:</Typography>
                                </div>
                                <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px', marginBottom: '20px' }} />
                                <div style={{ backgroundColor: '#F5ECFF', width: 'fit-content', padding: '4px 16px 4px 16px', borderRadius: '8px', marginTop: '20px' }}>
                                    <Typography style={{ color: '#5C299C' }}>Tags</Typography>
                                </div>
                                <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px', marginBottom: '20px' }} />
                                <Box style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                    <div style={{ backgroundColor: '#F5ECFF', width: 'fit-content', padding: '4px 16px 4px 16px', borderRadius: '8px' }}>
                                        <Typography style={{ color: '#5C299C' }}>Descrição do produto:</Typography>
                                    </div>
                                    <Button onClick={() => {setOpenTurbCopy(true)}} label="Turbo copy" />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'end', marginTop: '20px', marginBottom: '20px' }}>
                                <Typography style={{ color: '#9C3661', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>Cancelar</Typography>
                                <Button label="Salvar" /> 
                            </Box>
                        </>
                    )}
                </>
            }
            <ModalComponent open={openPriceApply} handleClose={() => {setOpenPriceApply(false)}}>

                <Close onClick={() => {setOpenPriceApply(false);}} style={{ color: '#A863FF', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />
                
                <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px', 
                    justifyContent: 'center'
                }}>
                    {/* <img src={IconsCoin} /> */}
                    <Typography variant="h5">Alterar preço de todos</Typography>
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
                        Preço riscado
                    </Typography>
                    <Input size="small" placeholder="R$ 00,00" fullWidth />
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
                        Preço
                    </Typography>
                    <Input size="small" placeholder="R$ 00,00" fullWidth />
                </Box>

                <Box
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#FEF3C7',
                        borderRadius: '8px',
                        padding: '4px 16px 4px 16px'
                    }}
                >
                    <Typography style={{ color: '#92400E' }}>Atenção! Esta ação alterará todas as variações.</Typography>
                </Box>

                <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                    <Button onClick={() => {setOpenPriceApply(false)}} color="light" label="Cancelar" sx={{ width: '50%' }} />
                    <Button label="Concluir" sx={{ width: '50%' }} />
                </Box>

            </ModalComponent>
            <ModalComponent filter={true} open={openFilter} handleClose={() => {setOpenFilter(false)}}>

                <Typography variant="h5">Filtros</Typography>
                <Input size="small" placeholder="Procurar" fullWidth sx={{ marginTop: '10px' }} />
                <Typography variant="h6" sx={{ marginTop: '20px' }}>Tipo de loja</Typography>
                {plataforms.map((plataform, index) => (
                    <ItemPlataform handleClick={(id) => {setSelectedPlataform(id)}} selectedPlataform={selectedPlataform} plataform={plataform} key={index} />
                ))}
                <Typography variant="h6" sx={{ marginTop: '20px' }}>Preço:</Typography>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', marginTop: '10px' }}>
                    <Input size="small" label="Máx." sx={{ width: '50%' }} />
                    <Input size="small" label="Min." sx={{ width: '50%' }} />
                </Box>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
                    <Button onClick={() => {setOpenFilter(false)}} color="light" label="Cancelar" sx={{ width: '50%' }} />
                    <Button label="Aplicar filtros" sx={{ width: '50%' }} />
                </Box>

            </ModalComponent>
        </DashboardLayout>
    )
}

export default Produtos;