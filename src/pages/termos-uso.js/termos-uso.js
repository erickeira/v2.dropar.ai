import { Box, Typography } from "@mui/material";
import LoggedLayout from "../../layouts/logged";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontSize: '32px'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#595959'
    },
    terms: {
        marginTop: '60px'
    },
    termsText: {
        fontSize: '16px',
        textAlign: 'justify'
    },
    termsTitle: {
        fontSize: '16px',
        color: '#9643FF',
        fontWeight: 600,
        marginTop: '40px',
        marginBottom: '20px'
    }
}));

const TermosUso = ({history}) => {

    const classes = useStyles();

    return(
        <LoggedLayout history={history}>
            <Typography className={classes.title}>Termos de uso</Typography>
            <Typography className={classes.subtitle}>Para você ter a melhor experiência!</Typography>
            <Box className={classes.terms}>
                <Typography className={classes.termsText}>
                    O uso da plataforma digital desenvolvida e disponibilizada pela DROPAR . (“DROPAR”) está condicionado à prévia aceitação e cumprimento dos presentes Termos e Condições de Uso e Serviços (“Termos de Uso”) ora descritos, os quais estão adequados às exigências previstas na Lei nº 10.406/2002 (“Código Civil Brasileiro”), na Lei nº 12.965/2014 (“Marco Civil da Internet”), na Lei nº 13.709/2018 (“Lei Geral de Proteção de Dados Pessoais”) e demais legislações pertinentes.
                    Nestes Termos de Uso, junto de nossas Políticas de Privacidade, encontram-se dispostas as regras e condições aplicáveis ao acesso, uso dos serviços e operações desta plataforma digital. Estes produtos e serviços são oferecidos pela DROPAR . (“DROPAR”).
                    A utilização da plataforma e contratação de nossos produtos e/ou serviços fica submetida à prévia aceitação destes Termos de Uso, sendo exigida do Usuário a sua prévia leitura e concordância com nossas regras e Políticas de Privacidade. Após a leitura dos Termos e Condições de Uso e da Política de Privacidade, o Usuário confirma que compreendeu e aceitou todas as previsões destes documentos.
                    A DROPAR poderá, a qualquer tempo, modificar estes Termos e Condições de Uso mediante notificação prévia aos Usuários, a ser enviada ao e-mail cadastrado pelo Usuário na Plataforma ou mediante a disponibilização de aviso na própria Plataforma. O uso da Plataforma ou contratação dos Produtos e Serviços após a entrada em vigor das modificações dos Termos e Condições constituirá aceitação e concordância do Usuário quanto aos novos termos contratuais.
                    Na hipótese de o Usuário não concordar com as alterações ou modificações, este poderá, a qualquer momento, solicitar o cancelamento de sua Conta.
                </Typography>
                <Typography className={classes.termsTitle}>1. Registro de Usuário</Typography>
                <Typography className={classes.termsText}>
                    Para a utilização da plataforma, o Usuário – pessoa física ou jurídica que esteja em pleno e total gozo da capacidade civil, bem como esteja apto à prática de todo e qualquer ato necessário à validade das solicitações de serviços requeridas, nos termos da legislação aplicável – deverá realizar seu cadastro na plataforma.
                    Ao se cadastrar, o Usuário se compromete a fornecer informações verídicas, completas e atualizadas, sob pena das consequências jurídicas e legais da apresentação de informações falsas.
                    O login e a senha criados pelo Usuário são pessoais e intransferíveis, sendo o Usuário seu único e exclusivo responsável por mantê-los em segurança e sigilo, evitando, pois, o uso não autorizado de seu Cadastro por terceiros.
                </Typography>
            </Box>
        </LoggedLayout>
    )
}

export default TermosUso;