import DashboardLayout from "../../layouts/dashboard";
import ItemNotifcation from "../../components/item-notification";
import styles from './history.module.css';
import { Box, Typography } from "@mui/material";
import Button from "../../components/button";
import Input from "../../components/input";
import { SearchRounded } from "@mui/icons-material";

const History = props => {

    const notifications = [
        {
            title: 'Novidade! Nova integração disponível!',
            created_at: '20/10/2023  10:40 PM',
            status: 'news',
            id: 1,
            user: 'Amanda Santos',
            user_email: 'amandasantos@gmail.com'
        },
        {
            title: 'Novidade! Nova integração disponível!',
            created_at: '20/10/2023  10:40 PM',
            status: 'news',
            id: 2,
            user: 'Amanda Santos',
            user_email: 'amandasantos@gmail.com'
        },
        {
            title: 'Sem sucesso ao Dropar! Produto: Faca do Chef Acabamento Aço-Damasco 8” C/Caixa de Luxo ',
            created_at: '20/10/2023  10:40 PM',
            status: 'failed',
            id: 3,
            user: 'Amanda Santos',
            user_email: 'amandasantos@gmail.com'
        },
        {
            title: 'Dropou com sucesso! Produto: Faca do Chef Acabamento Aço-Damasco 8” C/Caixa de Luxo ',
            created_at: '20/10/2023  10:40 PM',
            status: 'success',
            id: 4,
            user: 'Amanda Santos',
            user_email: 'amandasantos@gmail.com'
        },
        {
            title: 'Novidade! Nova integração disponível!',
            created_at: '20/10/2023  10:40 PM',
            status: 'news',
            id: 5,
            user: 'Amanda Santos',
            user_email: 'amandasantos@gmail.com'
        }
    ]

    return(
        <DashboardLayout infoUser={props?.infoUser}>
            <Box className={styles.boxHeader}>
                <Box>
                    <Typography variant="h5">Histórico de Drops</Typography>
                    <Typography variant="body1" className={styles.subtitle}>Crie e gerencie as notificações que chegam ao seus usuários.</Typography>
                </Box>
            </Box>
            <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', '@media (max-width: 600px)': { display: 'grid' } }}>
                <Typography variant="h5">Últimos drops dos usuários</Typography>
                <Button>Marca como lida</Button>
            </Box>
            <Box sx={{ marginTop: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', '@media (max-width: 600px)': { display: 'grid' } }}>
                <Input 
                    size="small" 
                    placeholder="Procurar" 
                    sx={{ width: '80%', '@media (max-width: 600px)': { width: '100%' } }} 
                    startAdornment={true}
                    startAdornmentIcon={<SearchRounded />}
                    handleClickStartAdornment={() => {}}
                />
                <Box sx={{ width: '20%', '@media (max-width: 600px)': { width: '100%' } }} >
                    <Input 
                        size="small"
                        type="select"
                        fullWidth
                        options={[
                            {
                                label: 'Todos',
                                value: ''
                            },
                            {
                                label: 'Usuário ativos',
                                value: 'user_active'
                            },
                            {
                                label: 'Usuários inativos',
                                value: 'user_inactive'
                            }
                        ]}
                    />
                </Box>
            </Box>
            {notifications.map((notification, index) => (
                <ItemNotifcation key={index} data={notification} />
            ))}
        </DashboardLayout>
    )
}

export default History;