'use client';

// IMPORTS
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from  '@/styles/components/sidebar.module.css';

// ICONS
import { DashboardIcon, ReaderIcon, GearIcon } from '@radix-ui/react-icons'

export default function AppContainer({ children, name }:{ children: any, name: string})
{
    const currentPath = usePathname();

	return (
        <div className={styles.appContainer}>
            <div className={styles.sidebarContainer}>
                <h2 className={styles.helloMsg}>Hello, {name}</h2>
                <div className={styles.navigationContainer}>
                    <Link className={'/dashboard' === currentPath ? `${styles.navigator} ${styles.active}` : styles.navigator} href="/dashboard">
                        <DashboardIcon/>
                        <h3 style={{fontSize: 20}}>Dashboard</h3>
                    </Link>
                    <Link className={'/history' === currentPath ? `${styles.navigator} ${styles.active}` : styles.navigator} href="./history">
                        <ReaderIcon/>
                        <h3 style={{fontSize: 20}}>History</h3>
                    </Link>
                    <Link className={'/settings' === currentPath ? `${styles.navigator} ${styles.active}` : styles.navigator} href="/settings">
                        <GearIcon/>
                        <h3 style={{fontSize: 20}}>Settings</h3>
                    </Link>
                </div>
            </div>
            {children}
        </div>
	)
}