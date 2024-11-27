import Link from 'next/link';

import styles from './header.module.scss';


export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                <Link href="/">Dtrw.ovh</Link>
            </div>
            <ul>
                <Link href="/blog">Blog</Link>
            </ul>
        </header>
    );
}
