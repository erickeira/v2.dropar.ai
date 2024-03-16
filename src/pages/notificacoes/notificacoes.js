import LoggedLayout from "../../layouts/logged";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import Input from "../../components/input";
import Button from "../../components/button";
import ItemNotifcation from "../../components/item-notification";

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
    notifications: {
        marginTop: '40px'
    }
}));

const Notificacoes = ({ history }) => {

    const classes = useStyles();

    const notifications = [
        {
            title: 'Novidade! Nova integração disponível!',
            created_at: '20/10/2023  10:40 PM',
            status: 'news',
            id: 1
        },
        {
            title: 'Novidade! Nova integração disponível!',
            created_at: '20/10/2023  10:40 PM',
            status: 'news',
            id: 2
        },
        {
            title: 'Sem sucesso ao Dropar! Produto: Faca do Chef Acabamento Aço-Damasco 8” C/Caixa de Luxo ',
            created_at: '20/10/2023  10:40 PM',
            status: 'failed',
            product_title: 'Faca do Chef Acabamento Aço-Damasco 8” C/Caixa de Luxo ',
            id: 3
        },
        {
            title: 'Dropou com sucesso! Produto: Faca do Chef Acabamento Aço-Damasco 8” C/Caixa de Luxo ',
            created_at: '20/10/2023  10:40 PM',
            status: 'success',
            product_title: 'Faca do Chef Acabamento Aço-Damasco 8” C/Caixa de Luxo ',
            id: 4
        },
        {
            title: 'Novidade! Nova integração disponível!',
            created_at: '20/10/2023  10:40 PM',
            status: 'news',
            product_title: 'Faca do Chef Acabamento Aço-Damasco 8” C/Caixa de Luxo ',
            id: 5
        }
    ]

    return(
        <LoggedLayout history={history}>
            <Box className={classes.boxHeader}>
                <Box>
                    <Typography variant="h4">Notificações</Typography>
                    <Typography className={classes.subtitle}>Saiba o que chegou pra você!</Typography>
                </Box>
                <Box>
                    <Input size="small" label="Procurar" />
                    <Button className={classes.button}>Marcar como lida</Button>
                </Box>
            </Box>
            <Box className={classes.notifications}>
                {notifications.map((notification, index) => (
                    <ItemNotifcation key={index} data={notification} />
                ))}
            </Box>
        </LoggedLayout>
    )
}

export default Notificacoes;