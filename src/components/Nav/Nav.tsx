import classnames from 'classnames';
import Link from 'next/link';

import styles from './Nav.module.scss';

import Logo from '@/assets/svgs/logo.svg';

import routes from '@/data/routes';

function Nav() {
  return (
    <nav className={classnames(styles.Nav)}>
      <div className={styles.wrapper}>
        <ul className={styles.routes}>
          {Object.values(routes).map(({ path, title }) => (
            <li key={path}>
              <Link href={path}>
                <a aria-label="Home">{path === '/' ? <Logo className={styles.logo} /> : title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
