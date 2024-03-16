import DashboardLayout from "../../layouts/dashboard";
import Button from "../../components/button";
import { Typography, Box } from "@mui/material";
import styles from './extensao.module.css';
import step2Extension from '../../assets/img/step-2-extension.svg';
import step3Extension from '../../assets/img/step-3-extension.svg';
import step4Extension from '../../assets/img/step-4-extension.svg';

const Extensao = props => {

    return(
        <DashboardLayout history={props?.history} infoUser={props?.infoUser}>
            <Box className={styles.boxHeader}>
                <Box>
                    <Typography variant="h4">Bem-vindo(a), {props?.infoUser?.name.split(' ')[0]}</Typography>
                    <Typography className={styles.subtitle}>Aqui tem um breve tutorial de como você <br /> pode instalar e usar a nossa extensão.</Typography>
                </Box>
                <Box>
                    <Button className={styles.button}>Instalar extensão</Button>
                </Box>
            </Box>
            <Typography variant="h5" style={{ marginTop: '30px' }}>Passo 1</Typography>
            <Typography className={styles.subtitle} style={{ marginTop: '10px' }}>Clique no link abaixo para acessar diretamente a extensão na biblioteca do navegador.</Typography>
            <Box style={{ border: '1px solid #D0D5DD', borderRadius: '8px', padding: '16px', marginTop: '10px', width: '50%' }}>
                <a href="https://chromewebstore.google.com/detail/dropar/hbkhiliohiddheogklpojebfngafhkag" target="href">
                    <Typography style={{ color: '#5C299C', fontSize: '16px', textDecoration: 'underline' }}>https://chromewebstore.google.com/dropar.ai</Typography>
                </a>
            </Box>
            <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
            <Typography variant="h5" style={{ marginTop: '30px' }}>Passo 2</Typography>
            <Typography className={styles.subtitle} style={{ marginTop: '10px' }}>Acesse a página e clique no botão “Usar no Chrome” para instalar a extensão no seu naveador.</Typography>
            <img src={step2Extension} style={{ width: '100%', marginTop: '10px' }} />
            <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
            <Box style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                <Box>
                    <Typography variant="h5">Passo 3</Typography>
                    <Typography className={styles.subtitle} style={{ marginTop: '10px' }}>Faça login com sua conta da Dropar na extensão para começar a importar os seus produtos preferidos!</Typography>
                </Box>
                <img src={step3Extension} style={{ width: '80%', marginTop: '10px' }} />
            </Box>
            <hr style={{ border: '0.5px solid #C292FF', marginTop: '20px' }} />
            <Box style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                <Box>
                    <Typography variant="h5">Passo 4</Typography>
                    <Typography className={styles.subtitle} style={{ marginTop: '10px' }}>Escolha e selecione seus produtos favoritos. Você pode dropar diretamente para sua loja, ou personalizar seus produtos da forma que quiser dentro do seu dashboard da Dropar!</Typography>
                </Box>
                <img src={step4Extension} style={{ width: '80%', marginTop: '10px' }} />
            </Box>
        </DashboardLayout>
    )
}

export default Extensao;