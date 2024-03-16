import { Typography, Box, Grid, Chip } from "@mui/material";
import LoggedLayout from "../../layouts/logged";
import { makeStyles } from "@mui/styles";
import LogoResumid from '../../assets/icons/logo-resumid.svg';
import { useState } from "react";
import { Done } from "@mui/icons-material";
import Button from "../../components/button";
import OptionsSelect from "../../components/options-select";

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '48px',
        marginTop: '10px'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#595959'
    },
    chip: {
        backgroundColor: '#B33E6F',
        borderRadius: '8px',
        width: 'fit-content',
        display: 'block',
        margin: 'auto',
        padding: '4px',
        width: '302px'
    },
    chipContent: {
        display: 'flex',
        gap: 5,
        color: '#FFF',
        justifyContent: 'center'
    },
    chipContentText: {
        fontWeight: 700
    },
    plans: {
        marginTop: '40px',
        '@media (max-width: 600px)': { 
            justifyContent: 'center' 
        }
    }
}));

const Planos = ({ history }) => {

    const classes = useStyles();

    const [period, setPeriod] = useState('anual');

    const plans = [
        {
            border: false,
            background: '#F5ECFF',
            name: 'Plano Basic',
            value: 37.90,
            annual_value: 363.84,
            chip: '',
            colorChip: '',
            itens: [
                "40 Créditos por mês",
                "1 Loja integrada com a Shopify",
                "Edição de produtos simples e avançada",
                "Acesso a Fornecedores",
                "Copiar produtos da Shopify e Aliexpress (ilimitado)",
                "Suporte humanizado 24/7",
                "Otimização do seu tempo",
                "Plataforma Brasileira",
                "Acesso imediato",
                "Turbo Copy",
                "Reels Pro"
            ]
        },
        {
            border: true,
            background: '#FFF',
            name: 'Plano Pro',
            chip: 'MAIS POPULAR',
            colorChip: '#9643FF',
            value: 67.90,
            annual_value: 651.84,
            itens: [
                "70 Créditos por mês",
                "3 Lojas integradas com a Shopify",
                "Edição de produtos simples e avançada",
                "Copiar produtos da Shopify, Aliexpress, Cartpanda, Yampi, Nuvem Shop, Woo Commerce (ilimitado)",
                "Suporte humanizado 24/7",
                "Otimização do seu tempo",
                "Plataforma Brasileira",
                "Acesso imediato",
                "Turbo Copy",
                "Reels Pro",
                "Indique e ganhe"
            ]
        },
        {
            border: false,
            background: '#F5ECFF',
            name: 'Plano Premium',
            value: 97.90,
            annual_value: 939.84,
            chip: 'MAIOR DESCONTO',
            colorChip: '#FF599F',
            itens: [
                "100 Créditos por mês",
                "9 Lojas integradas com a Shopify",
                "Edição de produtos simples e avançada",
                "Acesso a Fornecedores",
                "Copiar produtos da Shopify, Aliexpress, Cartpanda, Yampi, Nuvem Shop, Woo Commerce (ilimitado)",
                "Suporte humanizado e dedicado 24/7",
                "Otimização do seu tempo",
                "Plataforma Brasileira",
                "Acesso imediato",
                "Turbo Copy",
                "Reels Pro",
                "Indique e ganhe"
            ]
        },
    ]

    return(
        <LoggedLayout history={history}>
            <Box className={classes.chip}>
                <Box className={classes.chipContent}>
                    <Typography className={classes.chipContentText}>Continue Dropando!</Typography>
                    <img src={LogoResumid} />
                </Box>
            </Box>
            <Typography className={classes.title}>Planos de Acesso</Typography>
            <Typography className={classes.subtitle}>Escolha o Plano Que Mais Combina Com Você!</Typography>
            <Box sx={{ marginTop: '40px' }}>
                <OptionsSelect 
                    option={period}
                    onChange={(e) => {setPeriod(e)}}
                    options={[
                        {
                            label: "Mensal",
                            value: 'mensal'
                        },
                        {
                            label: "Anual",
                            value: 'anual'
                        }
                    ]}
                />
            </Box>
            <Box>
                <Grid container className={classes.plans} alignItems="center">
                    {plans.map((plan, index) => (
                        <Grid  
                            key={index}
                            md={4}
                            sx={{
                                border: plan.border && '1px solid #9643FF',
                                borderRadius: '8px',
                                position: 'relative',
                                boxShadow: '0px 20px 25px -5px #0000001A'
                            }}
                        >
                            {plan.chip && (
                                <Chip 
                                    label={plan.chip} 
                                    size="small" 
                                    sx={{ 
                                        backgroundColor: plan.colorChip, 
                                        color: '#FFF', 
                                        fontWeight: 700, 
                                        marginTop: '-10px', 
                                        alignItems: 'center', 
                                        display: 'flex', 
                                        mx: 'auto', 
                                        width: 'fit-content', 
                                        position: 'absolute',
                                        top: '0%',
                                        left: '50%',
                                        transform: 'translate(-50%, 0%)'
                                    }} 
                                />
                            )}
                            <Box sx={{ padding: '30px', background: plan.background, borderRadius: '8px 8px 0px 0px' }}>
                                <Typography sx={{ textAlign: 'center', fontSize: '24px' }}>{plan.name}</Typography>
                                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography sx={{ fontSize: '36px' }}>R$ </Typography>
                                    <Typography sx={{ fontSize: '60px', fontWeight: 800, lineHeight: 'normal' }}>{parseFloat(period == 'mensal' ? plan.value : plan.annual_value).toLocaleString('pt-br')}</Typography>
                                    <Typography sx={{ color: '#6B7280', fontSize: '24px' }}>/mês</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ backgroundColor: '#F9FAFB', padding: '30px 30px 0px 30px', borderRadius: '0px 0px 8px 8px' }}>
                                {plan.itens.map((item, index) => (
                                    <Typography sx={{ display: 'flex', alignItems: 'center', marginTop: index > 0 && '10px' }}><Done style={{ color: '#FF599F', marginRight: '15px' }} /> {item}</Typography>
                                ))}
                                <Button color={!plan.border && 'white'} fullWidth sx={{ marginTop: !plan.border ? '50px' : '100px', marginBottom: !plan.border ? '50px' : '100px', boxShadow: !plan.border && '0px 4px 6px -1px #0000001A' }}>Teste grátis por 3 dias</Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </LoggedLayout>
    )
}

export default Planos;