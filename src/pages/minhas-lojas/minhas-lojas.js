import { 
    Alert,
    Box, 
    Chip, 
    Grid, 
    Skeleton, 
    Snackbar, 
    Typography
} from "@mui/material";
import { 
    Add, 
    Close, 
    Search 
} from "@mui/icons-material";
import LoggedLayout from "../../layouts/logged";
import Button from "../../components/button";
import { SwiperSlide } from "swiper/react";
import ImageItem from './image21.svg';
import BagIcon from '../../assets/icons/bag-purple.svg';
import { useEffect, useState } from "react";
import ShopfyImage from '../../assets/img/shopify.svg';
import YampiImage from '../../assets/img/yampi.png';
import NuvemshopImage from '../../assets/img/numvemshop.svg';
import CartpandaImage from '../../assets/img/cartpanda.svg';
import Input from "../../components/input";
import { Link } from 'react-router-dom';
import ItemPlataform from "../../components/plataforms";
import Carrousel from "../../components/molecules/carrousel/carrousel";
import DropzoneComponent from "../../components/molecules/dropzone/dropzone";
import styles from './minhas-lojas.module.css';
import ModalComponent from "../../components/atoms/modal/modal";
import { api } from "../../utils/api";
import { urlImages } from "../../utils";

const Item = props => {
    const {
        id,
        name,
        domain,
        logo,
        status,
        platform
    } = props.data
    const statusChip = {
        active : {
            label: 'Loja Ativa',
            style: styles.chipInactive,
            labelButton: 'Desativar', 
            styleButton: styles.inactive
        },
        disabled : {
            label: 'Loja Inativa',
            labelButton: 'Ativar',
            style: styles.chipInactive,
            styleButton: styles.active
        },
    }
    return(
        <Box className={styles.item}>
            <Chip 
                label={statusChip[status]?.label} 
                className={statusChip[status]?.style} 
                size="small" 
            />
            {
                logo ?
                <img 
                   src={`${urlImages}/${logo}`} 
                   className={styles.img} 
                />
                :
                <img 
                    src={BagIcon} 
                    className={styles.imgDefault}
                />
            }
           
            <Typography variant="h5" className={styles.itemTitle}>{name}</Typography>
            <Typography variant="h6" className={styles.itemSubtitle}>{domain}</Typography>
            <Grid container spacing={0} className={styles.actions}>
                <Grid item xs={12} md={6}>
                    <Link to="/produtos">
                        <Button className={styles.button}>Dashboard</Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography className={statusChip[status]?.styleButton}>{statusChip[status]?.labelButton}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

const MinhasLojas = ({history, infoUser}) => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedPlataform, setSelectedPlataform] = useState();
    const [actionStepNewPlataform, setActionStepNewPlataform] = useState(1);
    const [formNewStore, setFormNewStore] = useState({
        domain : "",
        name: "",
        access_token: "",
        api_key : "",
        logo : "",
        platform : "1"
    })
    const [newStoreErrors, setNewStoreErrors] = useState({})
    const [ platforms, setPlatforms] = useState([])
    const [isLoadingPlatforms, setLoadingPlatforms] = useState(true)
    const [ stores, setStores] = useState([])
    const [isLoadingStores, setLoadingStores] = useState(true)
    const [isLoadingNewStore, setLoadingNewStore] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState();
    const [severitySnackbar, setSeveritySnackbar] = useState();

    useEffect(() => {
        getPlatforms()
        if(!stores.length) getStores()
    },[])

    const handleFormNewStoreChange = (dado) => {
        setFormNewStore({ ...formNewStore, ...dado });
        setNewStoreErrors({})
    }

    const getStores = async (page = 1) => {
        const limit = 20
        setLoadingStores(true);
        try{
            const { data } = await api.get('/me/stores' ,{
                params: {
                    page,
                    limit
                }
            })
            console.log(data)
            setStores(data.result)
            setLoadingStores(false);
        }catch(error){
            setLoadingStores(false);
            const { data } =  error?.response
            console.log(data)
            setSeveritySnackbar('error');
            setMessageSnackbar(data?.message);
            setOpenSnackbar(true)
        }
    }
    const getPlatforms = async (page = 1) => {
        const limit = 10
        setLoadingPlatforms(true);
        try{
            const { data } = await api.get('/platforms' ,{
                params: {
                    page,
                    limit
                }
            })
            console.log(data)
            setPlatforms(data.result)
            setLoadingPlatforms(false);
        }catch(error){
            setLoadingPlatforms(false);
            const { data } =  error?.response
            console.log(data)
            setSeveritySnackbar('error');
            setMessageSnackbar(data?.message);
            setOpenSnackbar(true)
        }
    }

    const handleAdicionarLoja = async () => {
        const limit = 10
        if(isLoadingNewStore) return
        setLoadingNewStore(true);
        try{
            const { data } = await api.post('/me/stores', formNewStore )
            getStores()
            setOpenModal(false)
            setFormNewStore({})
            setLoadingNewStore(false);
        }catch(error){
            setLoadingNewStore(false);
            const { data } =  error?.response
            if(data?.errors) setNewStoreErrors(data?.errors)
            setSeveritySnackbar('error');
            setMessageSnackbar(data?.message);
            setOpenSnackbar(true)
        }
    } 


    return(
        <LoggedLayout history={history}>
            <Box className={styles.boxHeader}>
                <Box>
                    <Typography 
                        style={{ fontSize: '36px', fontWeight: '500', lineHeight: '42.77px' }}
                    >
                        Bem-vindo(a) de volta, {infoUser.name}!
                    </Typography>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '5px',
                            '@media (max-width: 600px)': {
                                display: 'grid'
                            }
                        }}
                    >
                        <Typography className={styles.subtitle}>Selecione uma loja ou crie uma nova.</Typography>
                        <Chip 
                            size="small" 
                            label={stores.length == 1 ? '1 loja' : `${stores.length}lojas`} 
                            className="chip"
                         />
                    </Box>
                </Box>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        '@media (max-width: 600px)': {
                            display: 'grid',
                            marginTop: '10px'
                        }
                    }}
                >
                    <Input 
                        size="small" 
                        placeholder="Procurar"
                        startAdornment={true}
                        startAdornmentIcon={<Search />}
                        handleClickStartAdornment={() => {}}
                    />
                    <Button size="small" onClick={() => {setOpenModal(true)}}><Add /> Nova loja</Button>
                </Box>
            </Box>
            <Box className={styles.carrousel}>
                
                    {
                        !isLoadingStores ? 
                        <Carrousel>
                            {
                                stores.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <Item data={item} />
                                    </SwiperSlide>
                                ))
                            }
                        </Carrousel>
                       
                        :
                        <Carrousel>
                            <SwiperSlide>
                                <Skeleton 
                                    variant="rectangular" 
                                    className={styles.item}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Skeleton 
                                    variant="rectangular" 
                                    className={styles.item}
                                />
                            </SwiperSlide><SwiperSlide>
                                <Skeleton 
                                    variant="rectangular" 
                                    className={styles.item}
                                />
                            </SwiperSlide>
                        </Carrousel>
                    }
                
            </Box>
            <ModalComponent open={openModal} handleClose={() => {setOpenModal(false)}}>
                <Close 
                    onClick={() => {
                        setOpenModal(false);
                        setActionStepNewPlataform(1);
                        setSelectedPlataform('');
                    }}
                    sx={{ 
                        color: '#A863FF', 
                        position: 'absolute', 
                        top: '20px', 
                        right: '20px', 
                        cursor: 'pointer' 
                    }} 
                />
                {actionStepNewPlataform == 1 && (
                    <>
                        <Box className={styles.headerNewStore}>
                            <img src={BagIcon} />
                            <Typography className={styles.headerNewStoreTitle}>Selecione a plataforma</Typography>
                        </Box>
                        {platforms.map((plataform, index) => (
                            <ItemPlataform 
                                handleClick={(id) => {
                                    setSelectedPlataform(id)
                                }} 
                                selectedPlataform={selectedPlataform} 
                                plataform={plataform} 
                                key={index} 
                            />
                        ))}
                        <Box className={styles.actionsNewStore}>
                            <Button onClick={() => {setOpenModal(false);setActionStepNewPlataform(1);setSelectedPlataform('');}} color="light" className={styles.cancelActionNewStore}>Cancelar</Button>
                            <Button 
                                disabled={!selectedPlataform} 
                                onClick={() => {
                                    setActionStepNewPlataform(2)
                                    handleFormNewStoreChange({ platform : selectedPlataform})
                                }} 
                                className={styles.continueActionNewStore}
                            >Continuar</Button>
                        </Box>
                    </>
                )}
                {actionStepNewPlataform == 2 && (
                    <>
                        <Box className={styles.headerNewStore}>
                            <img src={platforms.find(platform => platform.id === selectedPlataform)?.image || ''} style={{ width: '30px' }} />
                            <Typography className={styles.headerNewStoreTitle}>Adicionar loja</Typography>
                        </Box>
                        <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#0C0C0C',
                                    marginBottom: '5px',
                                    fontWeight: 700
                                }}
                            >
                                Domínio {platforms.find(platform => platform.id === selectedPlataform)?.name || ''}
                            </Typography>
                            <Input 
                                size="small" 
                                placeholder="Digite o domínio" 
                                fullWidth 
                                value={formNewStore.domain} 
                                onChange={(e) => {
                                    handleFormNewStoreChange({domain: e.target.value})
                                }} 
                                error={!!newStoreErrors.domain}
                                errorText={newStoreErrors.domain}
                            />
                        </Box>
                        <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#0C0C0C',
                                    marginBottom: '5px',
                                    fontWeight: 700
                                }}
                            >
                                Token de acesso da API admin
                            </Typography>
                            <Input 
                                size="small"
                                 placeholder="Cole o token aqui" 
                                 fullWidth 
                                 value={formNewStore.api_key} 
                                 onChange={(e) => {
                                     handleFormNewStoreChange({api_key: e.target.value})
                                 }} 
                                 error={!!newStoreErrors.api_key}
                                 errorText={newStoreErrors.api_key}
                            />
                        </Box>
                        {/* <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#0C0C0C',
                                    marginBottom: '5px',
                                    fontWeight: 700
                                }}
                            >
                                Chave secreta da API
                            </Typography>
                            <Input size="small" placeholder="Cole o chave aqui" fullWidth value={secretKey} onChange={(e) => {setSecretKey(e.target.value)}} />
                        </Box> */}
                        <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#0C0C0C',
                                    marginBottom: '5px',
                                    fontWeight: 700
                                }}
                            >
                                Nome da loja
                            </Typography>
                            <Input 
                                size="small" 
                                placeholder="Cole o nome da loja" 
                                fullWidth 
                                value={formNewStore.name} 
                                onChange={(e) => {
                                    handleFormNewStoreChange({name: e.target.value})
                                }} 
                                error={!!newStoreErrors.name}
                                errorText={newStoreErrors.name}
                            />
                        </Box>
                        {/* <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#0C0C0C',
                                    marginBottom: '5px',
                                    fontWeight: 700
                                }}
                            >
                                Logo da loja
                            </Typography>
                            <DropzoneComponent handleFile={(file) => {setLogotipoStore(file)}} />
                        </Box> */}
                        <hr style={{ border: '0.5px solid #FF9FC7', marginTop: '20px', marginBottom: '20px' }} />
                        <iframe style={{ borderRadius: '8px' }} width="100%" height="200" src="https://www.youtube.com/embed/2T8teD6elGU?si=bQ77m308afcJ9fJi" title="YouTube video player" frameborder="0"></iframe>
                        <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#0C0C0C',
                                    marginBottom: '5px',
                                    fontWeight: 700
                                }}
                            >
                                Tutorial de integração
                            </Typography>
                            <Typography
                                style={{
                                    fontWeight: 400,
                                    fontSize: '16px'
                                }}
                            >
                                Informe a URL da loja, o Access Token e a Secret Key. Saiba como obter essas informações <span style={{ color: '#FF599F', textDecoration: 'underline' }}>veja nosso tutorial.</span>
                            </Typography>
                        </Box>
                        <Box className={styles.actionsNewStore}>
                            <Button 
                            onClick={() => {setOpenModal(false);setActionStepNewPlataform(1);setSelectedPlataform('');}} color="light" className={styles.cancelActionNewStore}>Cancelar</Button>
                            <Button 
                                disabled={!selectedPlataform} 
                                onClick={handleAdicionarLoja}
                                isLoading={isLoadingNewStore}
                                className={styles.continueActionNewStore}
                            >Adicionar</Button>
                        </Box>
                    </>
                )}
            </ModalComponent>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => {setOpenSnackbar(false)}}>
                <Alert onClose={() => {setOpenSnackbar(false)}} severity={severitySnackbar} sx={{ width: '100%' }}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>
        </LoggedLayout>
    )
}

export default MinhasLojas;