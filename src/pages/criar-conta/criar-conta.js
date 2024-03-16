import AuthBlankLayout from '../../layouts/authBlank';
import logo from '../../assets/img/logo.svg';
import { Box, Typography, CircularProgress, Snackbar, Alert, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import Input from "../../components/input";
import Button from "../../components/button";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { api , setApiToken } from "../../utils/api";
import { validarEmail, validarPassword, validarNome } from "../../utils/validacoes";
import { useLocation } from 'react-router-dom';
import VisibleIcon from '../../assets/icons/visible.svg';
import VisibleOffIcon from '../../assets/icons/visible-off.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import CountrySelect from '../../components/country-select';
import InputMask from 'react-input-mask';
import { auth } from '../../utils/firebase';
import { 
    GoogleAuthProvider,  
    signInWithPopup,
    FacebookAuthProvider 
} from 'firebase/auth';

const CriarConta = ({ history }) => {
    const [acceptTerms, setAcceptTerms] = useState(false)
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingFace, setIsLoadingFace] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState();
    const [severitySnackbar, setSeveritySnackbar] = useState();
    const [errors, setErrors] = useState({})

    const [ formularioCadastro , setFormularioCadastro ] = useState({
        name: '',
        email: '',
        phone_number: '',
        indication_code: '',
        password: '',
        password_confirmation: ''
    })

    const handleFormChange = (dado) => {
        setFormularioCadastro({ ...formularioCadastro, ...dado });
        setErrors({})
    }

    useEffect(() => {
        console.log(formularioCadastro)
    },[formularioCadastro])

    const handleGoogleRegister = async () => {

        if(!acceptTerms){
            setSeveritySnackbar('warning');
            setMessageSnackbar("É necessario aceitar os termos de uso");
            setOpenSnackbar(true)
            return
        }

        const provider = new GoogleAuthProvider()
        try {
            setIsLoadingGoogle(true);
            const { user } = await signInWithPopup(auth, provider)
            const form = {
                name: user.displayName,
                email: user.email,
                google_token : user.accessToken

            }
            const { data } = await api.post('/user' , form )
            console.log(data)
            setIsLoadingGoogle(false);
            await setApiToken(data.auth_token)
            history.push("/minhas-lojas");
        }catch(error){
            console.log(error.status)
            setIsLoadingGoogle(false);
            setSeveritySnackbar('error');
            setMessageSnackbar(error?.response?.data?.message);
            setOpenSnackbar(true)
        }
        
    }

    const handleFacebookRegister = async () => {

        if(!acceptTerms){
            setOpenSnackbar(true)
            return
        }

        const provider = new FacebookAuthProvider();
        try {
            setIsLoadingFace(true);
            const result = await signInWithPopup(auth, provider)
            const { user } = result 
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            const form = {
                name: user.displayName,
                email: user.email,
                facebook_token : accessToken
            }
            const { data } = await api.post('/user' , form )
            setIsLoadingFace(false);
            await setApiToken(data.auth_token)
            history.push("/minhas-lojas");
        }catch(error){
            setIsLoadingFace(false);
            setSeveritySnackbar('error');
            setMessageSnackbar(error?.response?.data?.message);
            setOpenSnackbar(true)
        }
        
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        if(isLoading) return
        if(!acceptTerms){
            setSeveritySnackbar('warning');
            setMessageSnackbar("É necessario aceitar os termos de uso");
            setOpenSnackbar(true)
            return
        }
        const form = {
            ...formularioCadastro,
            phone_number: formularioCadastro.phone_number?.replace(/\D/g, '')
        }
        setIsLoading(true);
        try{
            const { data } = await api.post('/user' , form )
            console.log(data)
            setIsLoading(false);
            await setApiToken(data.auth_token)
            history.push("/minhas-lojas");
        }catch(error){
            setIsLoading(false);
            const { data } =  error?.response
            if(data?.errors) setErrors(data.errors)
            setSeveritySnackbar('error');
            setMessageSnackbar(data?.message);
            setOpenSnackbar(true)
        }

        
    }

    // useEffect(() => {
    //     let searchParams = new URLSearchParams(location.search);
    //     let token = searchParams.get('token');
    //     setToken(token);
    // }, [location.search]);

    return(
        <>
        <form onSubmit={handleRegister}>
            <AuthBlankLayout>
                <Link to="/">
                    <img 
                        src={logo}
                        style={{
                            display: 'block',
                            margin: 'auto',
                            width: '136.42px',
                            height: '38.37px'
                        }}
                    />
                </Link>
                <Typography
                    style={{
                        color: '#111827',
                        fontSize: '24px',
                        marginTop: '12px',
                        fontWeight: '800',
                        textAlign: 'center'
                    }}
                >
                    Crie sua conta agora!
                </Typography>
                <Typography
                    style={{
                        color: '#333055',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        marginTop: '10px'
                    }}
                >
                    Experimente a experiência da Dropar!
                </Typography>
                <Box
                    style={{
                        marginTop: '20px'
                    }}
                >
                    <Typography
                        style={{
                            color: '#0C0C0C',
                            marginBottom: '5px',
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}
                    >
                        Nome *
                    </Typography>
                    <Input 
                        size="small" 
                        placeholder="Digite seu nome" 
                        fullWidth 
                        value={formularioCadastro.name}
                        onChange={(e) => handleFormChange({ name : e.target.value })}
                        error={!!errors.name}
                        errorText={errors.name}
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
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}
                    >
                        E-mail *
                    </Typography>
                    <Input 
                        size="small" 
                        placeholder="Digite seu e-mail" 
                        fullWidth 
                        value={formularioCadastro.email} 
                        onChange={(e) => handleFormChange({ email : e.target.value })} 
                        error={!!errors.email}
                        errorText={errors.email}
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
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}
                    >
                        Telefone *
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-betweeen',
                            gap: '5px'
                        }}
                    >
                        <CountrySelect sx={{ borderRadius: '8px' }} />
                        <InputMask
                            mask="(99) 99999-9999"
                            value={formularioCadastro.phone_number} 
                            onChange={(e) => handleFormChange({ phone_number : e.target.value })} 
                            maskChar=""
                        >
                            {() => 
                                <Input 
                                    size="small" 
                                    placeholder="(00) 0 0000-0000" 
                                    fullWidth 
                                    error={!!errors.phone_number}
                                    errorText={errors.phone_number}
                                />
                            }
                        </InputMask>
                    </Box>
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
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}
                    >
                        Código de indicação 
                    </Typography>
                    <Input 
                        size="small" 
                        placeholder="Código de quem indicou a Dropar" 
                        fullWidth 
                        value={formularioCadastro.indication_code} 
                        onChange={(e) => handleFormChange({ indication_code : e.target.value })} 
                    />
                    {/* <Typography variant="body2" style={{ color: '#5C299C', fontWeight: 500, marginTop: '4px' }}>Indicado por: Romeu Bessa</Typography> */}
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
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}
                    >
                        Senha *
                    </Typography>
                    <Input 
                        type={showPassword ? 'text' : 'password'} 
                        size="small" 
                        placeholder="******" 
                        fullWidth 
                        value={formularioCadastro.password} 
                        onChange={(e) => handleFormChange({ password : e.target.value })} 
                        endAdornment={true}
                        endAdornmentIcon={showPassword ? <img src={VisibleIcon} /> : <img src={VisibleOffIcon} />}
                        handleClickEndAdornment={() => {setShowPassword(!showPassword)}}
                        error={!!errors.password}
                        errorText={errors.password}
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
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}
                    >
                        Confirmar senha *
                    </Typography>
                    <Input 
                        type={showPassword ? 'text' : 'password'} 
                        size="small" 
                        placeholder="******" 
                        fullWidth 
                        value={formularioCadastro.password_confirmation} 
                        onChange={(e) => handleFormChange({ password_confirmation : e.target.value })} 
                        endAdornment={true}
                        endAdornmentIcon={showPassword ? <img src={VisibleIcon} /> : <img src={VisibleOffIcon} />}
                        handleClickEndAdornment={() => {setShowPassword(!showPassword)}}
                        error={!!errors.password_confirmation}
                        errorText={errors.password_confirmation}
                    />
                </Box>
                <Box
                    style={{
                        marginTop: '20px',
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center',
                    }}
                >
                    <input 
                     id="checkbox" 
                     type="checkbox"
                     checked={acceptTerms} 
                     onClick={() => {
                        setAcceptTerms(!acceptTerms)
                        if(severitySnackbar == 'warning'){
                            setOpenSnackbar(false)
                        }
                     }} 
                    />
                    <span style={{ color: '#0C0C0C', fontSize: '12px', cursor: 'default', fontWeight: '500', lineHeight: '14.26px' }}>Aceito os <span style={{ color: '#9643FF', textDecoration: 'underline', cursor: 'pointer', fontWeight: '700' }}>termos de uso</span> e estou de acordo com a <span style={{ color: '#9643FF', textDecoration: 'underline', cursor: 'pointer', fontWeight: '700' }}>Política de privacidade.</span></span>
                </Box>
                <Box
                    sx={{
                        marginTop: '30px'
                    }}
                >
                    <Button 
                        type="submit"
                        size="large" 
                        variant="contained" 
                        fullWidth 
                        isLoading={isLoading}
                        disabled={isLoadingGoogle || isLoadingFace}
                        label={'Criar conta'}
                    />
                </Box>
                <Box
                    sx={{
                        marginTop: '10px'
                    }}
                >
                    <Button 
                        onClick={handleGoogleRegister} 
                        size="large" 
                        variant="contained" 
                        color="white" 
                        fullWidth
                        isLoading={isLoadingGoogle}
                        disabled={isLoading || isLoadingFace}
                    >
                        <img alt="Dropar" src={GoogleIcon} />
                         &nbsp; Entrar com Google
                    </Button>
                </Box>
                <Box
                    sx={{
                        marginTop: '10px'
                    }}
                >
                    <Button 
                        onClick={handleFacebookRegister} 
                        size="large" 
                        variant="contained" 
                        color="white" 
                        fullWidth
                    ><img alt="Dropar" src={FacebookIcon} />
                     &nbsp; Entrar com Facebook
                    </Button>
                </Box>
                <Box
                    sx={{
                        marginTop: '28px'
                    }}
                >
                    <Typography 
                        sx={{ 
                            color: '#262626', 
                            textAlign: 'center', 
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '20px'
                        }}
                    >
                        Já tem uma conta? 
                        <Link 
                            to="/entrar"
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            <span style={{ color: '#5C299C', cursor: 'pointer', fontWeight: '800', marginLeft: '2px' }}>
                                Entrar
                            </span>
                        </Link>
                    </Typography>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => {setOpenSnackbar(false)}}>
                    <Alert onClose={() => {setOpenSnackbar(false)}} severity={severitySnackbar} sx={{ width: '100%' }}>
                        {messageSnackbar}
                    </Alert>
                </Snackbar>
            </AuthBlankLayout>
        </form>
        </>
    )
}

export default CriarConta;