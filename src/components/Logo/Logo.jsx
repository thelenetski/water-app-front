import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className={styles.logoWrapper} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <span className={styles.logoText}>AQUATRACK</span>
        </div>
    );
};

export default Logo;
