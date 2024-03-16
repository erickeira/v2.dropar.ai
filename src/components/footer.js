import { Box, Typography, Modal } from "@mui/material";
import logo from '../assets/img/logo.svg';
import InstagramIcon from '../assets/icons/instagram.svg';
import YoutubeIcon from '../assets/icons/youtube.svg';
import HelpIcon from '../assets/icons/help.svg';
import HelpPurpleIcon from '../assets/icons/help-purple.svg';
import styles from './footer.module.css';
import { useState } from "react";

const Footer = () => {

    return(
        <>
            <Box className={styles.footer}>
                <img src={logo} className={styles.logo} />
                <Box className={styles.social}>
                    <Typography style={{ fontWeight: '500', fontSize: '14px', lineHeight: '20px' }}>Acompanhe nas redes:</Typography>
                    <a href="http://instagram.com.br/" target="_blank">
                        <img src={InstagramIcon} />
                    </a>
                    <a href="https://www.youtube.com/" target="_blank">
                        <img src={YoutubeIcon} />
                    </a>
                </Box>
                <img className={styles.help} src={HelpPurpleIcon} />
            </Box>
        </>
    )
}

export default Footer;