import { useState, useEffect } from "react";
import AuthLayout from "../../layouts/auth";
import logo from '../../assets/img/logotype.svg';
import Button from "../../components/button";
import Input from "../../components/input";
import { Box, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import VisibleIcon from '../../assets/icons/visible.svg';
import VisibleOffIcon from '../../assets/icons/visible-off.svg';
import CountrySelect from "../../components/country-select";
import InputMask from 'react-input-mask';
import { api, setApiToken } from "../../utils/api";
import { validarEmail, validarPassword } from "../../utils/validacoes";
import { countries } from "../../utils";
const RecuperarSenha = ({ history }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [ formRecovery, setFormRecovery ] = useState({
        email: '',
        phone_number: ''
    })
    const [ formNewPassword, setFormNewPassword ] = useState({
        password: '',
        password_confirmation: '',
        token: ''
    })
    const [errors,setErrors] = useState({})
    const [newPasswordErrors,setNewPasswordErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState();
    const [severitySnackbar, setSeveritySnackbar] = useState();

    const [code1, setCode1] = useState();
    const [code2, setCode2] = useState();
    const [code3, setCode3] = useState();
    const [code4, setCode4] = useState();
    const [code5, setCode5] = useState();
    const [code6, setCode6] = useState();
    const [codeErrors, setCodeErrors] = useState({})
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [resend, setResend] = useState(false);
    const [country, setCountry] = useState('br');

    useEffect(() => {
        const accept_language  = localStorage.getItem('dropar_language') || 'pt_BR'
        if(accept_language){
          const countryAux = countries.find(c => c.accept_language == accept_language)
          setCountry(countryAux);
        }
    },[])

    useEffect(() => {
        if (step === 2) {
            const timer = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(timer);
                    setResend(true);
                } else {
                    if (seconds === 0) {
                            setMinutes(minutes - 1);
                            setSeconds(59);
                    } else {
                        setSeconds(seconds - 1);
                    }
                }
            }, 1000);
    
            return () => clearInterval(timer);
        }
    }, [step, minutes, seconds]);


    const handleFormChange = (dado) => {
        setFormRecovery({ ...formRecovery, ...dado });
        setErrors({})
    }

    const handleRecovery = async (resend) => {

        if(isLoading) return
        setIsLoading(true);
        const form = {
            ...formRecovery,
            phone_number: `${country.ddd}${formRecovery.phone_number?.replace(/\D/g, '')}`
        }
        try{
            const { data } = await api.post('/user/forgot-password' , form )
            setIsLoading(false);
            setStep(2);
        }catch(error){
            setIsLoading(false);
            const { data } =  error?.response
            if(data?.errors) setErrors(data.errors)
            setSeveritySnackbar('error');
            setMessageSnackbar(error?.response?.data?.message);
            setOpenSnackbar(true)
        } 

    }

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [isLoadingNewPassword, setIsLoadingNewPassword] = useState(false);
    const [isLoadingConfirmCode, setIsLoadingConfirmCode] = useState(false);
    const [typeRecovery, setTypeRecovery] = useState('email');

    const handleValidateCode = (form) => {
        let newErrors = {
            code1 : !code1,
            code2 : !code2,
            code3 : !code3,
            code4 : !code4,
            code5 : !code5,
            code6 : !code6,
        }
        setCodeErrors(newErrors)
        return !Object.entries(newErrors).some(([chave, valor]) => valor)
    }

    const handleCheckCode = async () => {

        if(!handleValidateCode(formRecovery) || isLoadingConfirmCode) return
        const form ={ 
            ...formRecovery,
            phone_number: `${country.ddd}${formRecovery.phone_number?.replace(/\D/g, '')}`,
            code: `${code1}${code2}${code3}-${code4}${code5}${code6}`
        }
        setIsLoadingConfirmCode(true)
        try{
            const { data } = await api.post('/user/forgot-code-validation' , form )
            setIsLoadingConfirmCode(false);
            handleFormNewPasswordChange({ token : data.auth_token })
            setStep(3)
            // history.push("/minhas-lojas");
        }catch(error){
            setIsLoadingConfirmCode(false);
            setSeveritySnackbar('error');
            setMessageSnackbar(error?.response?.data?.message);
            setOpenSnackbar(true)
        } 
    }

    const handleFormNewPasswordChange = (dado) => {
        setFormNewPassword({ ...formNewPassword, ...dado });
        setNewPasswordErrors({})
    }

    const handleNewPassword = async() => {
        if(isLoadingNewPassword) return
        setIsLoadingNewPassword(true)
        try{
            const { data } = await api.post('/user/reset-password' , formNewPassword )
            setIsLoadingNewPassword(false);
            await setApiToken(data.auth_token)
            history.push("/minhas-lojas");
            setSeveritySnackbar('success');
            setMessageSnackbar(data?.message);
            setOpenSnackbar(true)
        }catch(error){
            const { data } =  error?.response
            if(data?.errors) setNewPasswordErrors(data.errors)
            setIsLoadingNewPassword(false);
            setSeveritySnackbar('error');
            setMessageSnackbar(error?.response?.data?.message);
            setOpenSnackbar(true)
        } 
    }


    return(
        <>
            <AuthLayout maxWidth={step == 2 && '460px'}>
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
                {step == 1 && (
                    <>
                        <Typography
                            style={{
                                color: '#FFF',
                                fontSize: '30px',
                                marginTop: '20px',
                                fontWeight: '500'
                            }}
                        >
                            Esqueceu sua senha?
                        </Typography>
                        <Typography
                            style={{
                                color: '#FFF',
                                fontWeight: '400',
                                fontSize: '16px'
                            }}
                        >
                            {typeRecovery == 'email' ?
                                'Insira seu e-mail e verifique sua caixa de entrada para mudar a sua senha.'
                            :
                                'Insira seu número de telefone e verifique sua caixa de SMS para mudar a sua senha.'
                            }
                        </Typography>
                        <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            {typeRecovery == 'email' ?
                                <>
                                    <Typography
                                        style={{
                                            color: '#FFF',
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
                                        value={formRecovery.email} 
                                        onChange={(e) => {
                                            handleFormChange({
                                                email: e.target.value,
                                                phone_number: ''
                                            })
                                        }} 
                                        error={!!errors.email}
                                        errorText={errors.email}
                                    />
                                </>
                            :
                                <>
                                    <Typography
                                        style={{
                                            color: '#FFF',
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
                                        <CountrySelect 
                                            sx={{ borderRadius: '8px' }} 
                                            callBackCountry={setCountry}
                                        />
                                        <InputMask
                                            mask="(99) 99999-9999"
                                            value={formRecovery.phone_number} 
                                            onChange={(e) => {
                                                handleFormChange({
                                                    email:'',
                                                    phone_number:  e.target.value
                                                })
                                            }} 
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
                                </>
                            }
                        </Box>
                        <Box
                            sx={{
                                marginTop: '20px'
                            }}
                        >
                            <Button 
                                // disabled={(typeRecovery == 'email' && !email) || (typeRecovery == 'sms' && !cellphone) || isLoading} 
                                onClick={() => {
                                    handleRecovery()
                                }} 
                                size="large" 
                                variant="contained"
                                fullWidth 
                                label={isLoading ? <CircularProgress size={24} /> : 'Recuperar acesso'}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginTop: '20px'
                            }}
                        >
                            {typeRecovery == 'email' ? 
                                <Typography
                                    onClick={() => {setTypeRecovery('sms')}}
                                    sx={{ 
                                        color: '#C292FF', 
                                        textAlign: 'center', 
                                        fontSize: '14px',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Recuperar por SMS
                                </Typography>
                            :
                                <Typography
                                    onClick={() => {setTypeRecovery('email')}}
                                    sx={{ 
                                        color: '#C292FF', 
                                        textAlign: 'center', 
                                        fontSize: '14px',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Recuperar por E-mail
                                </Typography>
                            }
                        </Box>
                        <Box
                            sx={{
                                marginTop: '40px'
                            }}
                        >
                            <Typography 
                                sx={{ 
                                    color: '#FFF', 
                                    textAlign: 'center', 
                                    fontSize: '14px' 
                                }}
                            >
                                Já tem uma conta?
                                <Link 
                                    to="/entrar"
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                >
                                    <span style={{ color: '#C292FF', cursor: 'pointer' }}>
                                        &nbsp; Entrar
                                    </span>
                                </Link>
                            </Typography>
                        </Box>
                    </>
                )}
                {step == 2 && (
                    <>
                        <Typography
                            style={{
                                color: '#FFF',
                                fontSize: '30px',
                                marginTop: '20px'
                            }}
                        >
                            Digite o código de verificação!
                        </Typography>
                        <Typography
                            style={{
                                color: '#FFF'
                            }}
                        >
                            {typeRecovery == 'email' ?
                                'Verifique sua caixa de entrada, enviamos um código para verificar seu e-mail.'
                            :
                                'Verifique sua caixa de SMS, enviamos um código para verificar seu número de telefone.'
                            }
                        </Typography>
                        <Box
                            sx={{
                                marginTop: '30px',
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#FFF',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px'
                                }}
                            >
                                Digite o código de verificação *
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                    marginTop: '-10px',
                                    marginBottom: '-6px'
                                }}
                            >
                                <Input 
                                    placeholder="0" 
                                    maxLength="1" 
                                    value={code1} 
                                    onChange={(e) => {setCode1(e.target.value)}} 
                                    sx={{
                                        '& input::placeholder': {
                                            fontSize: '32px', 
                                            textAlign: 'center',
                                            position: 'relative',
                                            top: '100%',
                                            transform: 'translateY(-50%)'
                                        }
                                    }}
                                    error={codeErrors.code1}
                                />
                                <Input 
                                    placeholder="0" 
                                    maxLength="1" 
                                    value={code2} 
                                    onChange={(e) => {setCode2(e.target.value)}} 
                                    sx={{
                                        '& input::placeholder': {
                                            fontSize: '32px', 
                                            textAlign: 'center',
                                            position: 'relative',
                                            top: '100%',
                                            transform: 'translateY(-50%)'
                                        }
                                    }}
                                    error={codeErrors.code2}
                                />
                                <Input 
                                    placeholder="0" 
                                    maxLength="1" 
                                    value={code3} 
                                    onChange={(e) => {setCode3(e.target.value)}} 
                                    sx={{
                                        '& input::placeholder': {
                                            fontSize: '32px', 
                                            textAlign: 'center',
                                            position: 'relative',
                                            top: '100%',
                                            transform: 'translateY(-50%)'
                                        }
                                    }}
                                    error={codeErrors.code3}
                                />
                                <Typography
                                    sx={{
                                        color: '#D0D5DD',
                                        fontSize: '60px'
                                    }}
                                >
                                    -
                                </Typography>
                                <Input 
                                    placeholder="0" 
                                    maxLength="1" 
                                    value={code4} 
                                    onChange={(e) => {setCode4(e.target.value)}} 
                                    sx={{
                                        '& input::placeholder': {
                                            fontSize: '32px', 
                                            textAlign: 'center',
                                            position: 'relative',
                                            top: '100%',
                                            transform: 'translateY(-50%)'
                                        }
                                    }}
                                    error={codeErrors.code4}
                                />
                                <Input 
                                    placeholder="0" 
                                    maxLength="1" 
                                    value={code5} 
                                    onChange={(e) => {setCode5(e.target.value)}} 
                                    sx={{
                                        '& input::placeholder': {
                                            fontSize: '32px', 
                                            textAlign: 'center',
                                            position: 'relative',
                                            top: '100%',
                                            transform: 'translateY(-50%)'
                                        }
                                    }}
                                    error={codeErrors.code5}
                                />
                                <Input 
                                    placeholder="0" 
                                    maxLength="1" 
                                    value={code6} 
                                    onChange={(e) => {setCode6(e.target.value)}} 
                                    sx={{
                                        '& input::placeholder': {
                                            fontSize: '32px', 
                                            textAlign: 'center',
                                            position: 'relative',
                                            top: '100%',
                                            transform: 'translateY(-50%)'
                                        }
                                    }}
                                    error={codeErrors.code6}
                                />
                            </Box>
                            <Box style={{ backgroundColor: '#5C299C', padding: '4px 16px 4px 16px', borderRadius: '4px', gap: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                <Typography style={{ color: '#FFF', fontWeight: '400', fontSize: '14px', lineHeight: '20px' }}>O código expira em:</Typography>
                                <Box style={{ backgroundColor: '#C292FF', borderRadius: '2px', padding: '2px 8px 2px 8px' }}>
                                    {`${minutes}:${seconds.toString().padStart(2, '0')}`}
                                </Box>
                            </Box>
                            <Typography 
                                sx={{ 
                                    color: '#FFF', 
                                    fontSize: '14px',
                                    fontWeight: '400'
                                }}
                            >
                                Não recebeu o código?
                                {isLoading ? 
                                    <CircularProgress size={24} /> 
                                :
                                    <span onClick={() => {handleRecovery('true')}} style={{ color: '#C292FF', cursor: 'pointer', textDecoration: 'underline', marginLeft: '2px' }}>
                                        Clique para reenviar.
                                    </span>
                                }
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                marginTop: '30px',
                                display: 'flex',
                                gap: '10px'
                            }}
                        >
                            <Button 
                                onClick={() => {
                                    // setEmail('');
                                    // setCellphone('');
                                    // setStep(1);
                                }} 
                                size="large" 
                                variant="contained" 
                                fullWidth 
                                label="Cancelar" 
                                color="white" 
                            />
                            <Button 
                                onClick={handleCheckCode}
                                size="large" 
                                variant="contained" 
                                fullWidth 
                                isLoading={isLoadingConfirmCode}
                                label={'Confirmar'} 
                            />
                        </Box>
                    </>
                )}
                {step == 3 && (
                    <>
                        <Typography
                            style={{
                                color: '#FFF',
                                fontSize: '30px',
                                marginTop: '20px'
                            }}
                        >
                            Crie uma nova senha!
                        </Typography>
                        <Typography
                            style={{
                                color: '#FFF'
                            }}
                        >
                            Crie e confirme sua nova senha para recuperar o acesso!
                        </Typography>
                        <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#FFF',
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
                                value={formNewPassword.password} 
                                onChange={(e) => {
                                    handleFormNewPasswordChange({ password : e.target.value})
                                }}
                                endAdornment={true}
                                endAdornmentIcon={showPassword ? <img src={VisibleIcon} /> : <img src={VisibleOffIcon} />}
                                handleClickEndAdornment={() => {setShowPassword(!showPassword)}}
                                error={!!newPasswordErrors.password}
                                errorText={newPasswordErrors.password}
                            />
                        </Box>
                        <Box
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#FFF',
                                    marginBottom: '5px',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px'
                                }}
                            >
                                Confirme a senha *
                            </Typography>
                            <Input 
                                type={showPassword ? 'text' : 'password'} 
                                size="small" 
                                placeholder="******" 
                                fullWidth 
                                value={formNewPassword.password_confirmation} 
                                onChange={(e) => {
                                    handleFormNewPasswordChange({ password_confirmation : e.target.value})
                                }}
                                endAdornment={true}
                                endAdornmentIcon={showPassword ? <img src={VisibleIcon} /> : <img src={VisibleOffIcon} />}
                                handleClickEndAdornment={() => {setShowPassword(!showPassword)}}
                                error={!!newPasswordErrors.password_confirmation}
                                errorText={newPasswordErrors.password_confirmation}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginTop: '20px'
                            }}
                        >
                            <Button 
                                onClick={handleNewPassword} 
                                size="large" 
                                variant="contained" 
                                fullWidth 
                                isLoading={isLoadingNewPassword}
                                label={'Confirmar'}  
                            />
                        </Box>
                        <Box
                            sx={{
                                marginTop: '20px'
                            }}
                        >
                            <Typography 
                                sx={{ 
                                    color: '#FFF', 
                                    textAlign: 'center', 
                                    fontSize: '14px' 
                                }}
                            >
                                Já tem uma conta?
                                <Link 
                                    to="/entrar"
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                >
                                    <span style={{ color: '#C292FF', cursor: 'pointer' }}>
                                        &nbsp; Entrar
                                    </span>
                                </Link>
                            </Typography>
                        </Box>
                    </>
                )}
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => {setOpenSnackbar(false)}}>
                    <Alert onClose={() => {setOpenSnackbar(false)}} severity={severitySnackbar} sx={{ width: '100%' }}>
                        {messageSnackbar}
                    </Alert>
                </Snackbar>
            </AuthLayout>
        </>
    )
}

export default RecuperarSenha;