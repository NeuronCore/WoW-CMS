import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { v4 as uuidV4 } from 'uuid';

import { BsGithub, BsTwitter } from 'react-icons/bs';

import styles from './footer.module.scss';

import Logo from '../../../../public/images/logo.png';

import footerItems from '../../../data/footer.data.json';

const Footer = () =>
{
    return (
        <footer className={styles.footer}>
            <div className={classnames(styles.footerContainer, 'container')}>
                <div className={styles.footerContainerItem}>
                    <span className={styles.footerContainerImage}>
                        <Image
                            src={Logo.src}
                            alt='WoW CMS'
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </span>

                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                    </p>

                    <span>
                        Follow us
                    </span>

                    <ul data-social>
                        <li>
                            <Link href='/'>
                                <BsGithub />
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <BsTwitter />
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <BsTwitter />
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <BsTwitter />
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.footerContainerItem}>
                    <span data-border>
                        Useful links
                    </span>

                    <ul data-links>
                        {
                            footerItems.map((item) =>
                                (
                                    <li key={ uuidV4() }>
                                        <Link href={ item.href }>
                                            { item.name }
                                        </Link>
                                    </li>
                                ))
                        }
                        {
                            footerItems.map((item) =>
                                (
                                    <li key={ uuidV4() }>
                                        <Link href={ item.href }>
                                            { item.name }
                                        </Link>
                                    </li>
                                ))
                        }
                    </ul>
                </div>

                <ul className={styles.footerContainerItem}>
                </ul>
            </div>

            <div className={styles.footerNavigation}>
                <div className={classnames(styles.footerNavigationContainer, 'container')}>
                    <span>
                        © Copyright WoW CMS 2023
                    </span>

                    <ul>
                        {
                            footerItems.map((item) =>
                                (
                                    <li key={ uuidV4() }>
                                        <Link href={ item.href }>
                                            { item.name }
                                        </Link>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
