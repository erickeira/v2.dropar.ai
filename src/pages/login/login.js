import { useState } from "react";
import { 
    Box, 
    Typography, 
    Checkbox,
    Snackbar,
    Alert 
} from "@mui/material";
import logo from '../../assets/img/logo.svg';
import Input from "../../components/input";
import { Link } from 'react-router-dom';
import Button from "../../components/button";
import AuthBlankLayout from "../../layouts/authBlank";
import { api, setApiToken } from "../../utils/api";
import VisibleIcon from '../../assets/icons/visible.svg';
import VisibleOffIcon from '../../assets/icons/visible-off.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import { useEffect } from "react";
import { validarEmail } from "../../utils/validacoes";
import { auth } from '../../utils/firebase';
import { FacebookAuthProvider, GoogleAuthProvider,  signInWithPopup } from 'firebase/auth';

const Login = ({ history }) => {
    const [ loginForm, setLoginForm ] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState();
    const [severitySnackbar, setSeveritySnackbar] = useState();
    
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingFace, setIsLoadingFace] = useState(false);
    const [lembrarEmail, setLembrarEmail] = useState(false)
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })

    useEffect(() => {
        const emailSalvo = localStorage.getItem('dropar_email_login');
        handleFormChange({email : emailSalvo || ''})
    },[])

    const handleFormChange = (dado) => {
        setLoginForm({ ...loginForm, ...dado });
        setErrors({})
    }
 
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        try {
            setIsLoadingGoogle(true);
            const { user } = await signInWithPopup(auth, provider)
            const form = {
                email: user.email,
                google_token : user.accessToken

            }
            const { data } = await api.post('/user/login' , form )
            console.log(data)
            setIsLoadingGoogle(false);
            await setApiToken(data.auth_token)
            history.push("/minhas-lojas");
        }catch(error){
            const { data } =  error?.response
            setSeveritySnackbar('error');
            setMessageSnackbar(data?.message);
            setOpenSnackbar(true)
            setIsLoadingGoogle(false);
        }
        
    }

    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider();
        try {
            setIsLoadingFace(true);
            const result = await signInWithPopup(auth, provider)
            const { user } = result 
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            const form = {
                email: user.email,
                facebook_token : accessToken
            }
            const { data } = await api.post('/user/login' , form )
            setIsLoadingFace(false);
            await setApiToken(data.auth_token)
            history.push("/minhas-lojas");
        }catch(error){
            setIsLoadingFace(false);
            const { data } =  error?.response
            setSeveritySnackbar('error');
            setMessageSnackbar(data?.message);
            setOpenSnackbar(true)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        
        if(isLoading) return
        setIsLoading(true);
        try{
            const { data } = await api.post('/user/login' , loginForm )
            setIsLoading(false);
            await setApiToken(data.auth_token)
            if(lembrarEmail){
                localStorage.setItem('dropar_email_login', loginForm.email);
            }
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

    return(
        <form onSubmit={handleLogin}>
            <AuthBlankLayout>
                <Link to="/">
                    <img 
                        src={logo}
                        style={{
                            display: 'block',
                            margin: 'auto',
                            width: '136.42px',
                            height: '38.37px',
                        }}
                    />
                </Link>
                <Typography
                    style={{
                        color: '#111827',
                        fontSize: '24px',
                        marginTop: '20px',
                        fontWeight: '800',
                        textAlign: 'center'
                    }}
                >
                    Que bom ter você de volta!
                </Typography>
                <Typography
                    style={{
                        color: '#262626',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        marginTop: '10px'
                    }}
                >
                    Preencha seus dados e acesse sua conta.
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
                        E-mail *
                    </Typography>
                    <Input 
                        size="small" 
                        value={loginForm?.email} 
                        onChange={(e) => {
                            handleFormChange({email: e.target.value})
                        }} 
                        placeholder="Digite seu e-mail" 
                        fullWidth
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
                        Senha *
                    </Typography>
                    <Input 
                        type={showPassword ? 'text' : 'password'} 
                        size="small" 
                        placeholder="Digite sua senha"
                        fullWidth 
                        value={loginForm?.password} 
                        onChange={(e) => {
                            handleFormChange({password: e.target.value})
                        }}
                        endAdornment={true}
                        endAdornmentIcon={showPassword ? <img src={VisibleIcon} /> : <img src={VisibleOffIcon} />}
                        handleClickEndAdornment={() => {setShowPassword(!showPassword)}}
                        error={!!errors.password}
                        errorText={errors.password}
                    />
                </Box>
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '25px'
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={()=> setLembrarEmail(!lembrarEmail)}
                    >
                        <input 
                            id="checkbox" 
                            type="checkbox"
                            checked={lembrarEmail} 
                            onChange={()=> setLembrarEmail(!lembrarEmail)}
                        />
                        <span style={{ color: '#0C0C0C', fontSize: '14px', lineHeight: 0 }}>
                            Lembrar-me
                        </span>
                    </Box>
                    <Link 
                        to="/recuperar-senha"
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#9643FF',
                                fontSize: '14px',
                                fontWeight: '700'
                            }}
                        >
                            Esqueceu sua senha?
                        </Typography>
                    </Link>
                </Box>
                <Box
                    sx={{
                        marginTop: '20px'
                    }}
                >
                    <Button 
                        type="submit"
                        size="large" 
                        variant="contained"
                        fullWidth 
                        isLoading={isLoading}
                        disabled={isLoadingGoogle || isLoadingFace}
                        label={'Entrar'} 
                    />
                </Box>
                <Box
                    sx={{
                        marginTop: '10px'
                    }}
                >
                    <Button 
                        onClick={handleGoogleLogin} 
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
                        onClick={handleFacebookLogin} 
                        size="large" 
                        variant="contained" 
                        color="white" 
                        fullWidth
                    >
                        <img alt="Dropar" src={FacebookIcon} /> 
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
                            color: '#0C0C0C', 
                            textAlign: 'center', 
                            fontSize: '14px' 
                        }}
                    >
                        Não tem uma conta? 
                        <Link 
                            to="/criar-conta"
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            <span style={{ color: '#5C299C', cursor: 'pointer', fontWeight: '800', marginLeft: '2px' }}>
                                Criar conta
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
    )
}

export default Login;