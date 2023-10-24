import ChecklistIcon from '@mui/icons-material/Checklist';
import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
        <ChecklistIcon className={styles.icon} /><p className={styles.title}>TO DO LIST</p>
        </header>
    );
}