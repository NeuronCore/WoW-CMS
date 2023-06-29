import Link from 'next/link';
import Image from 'next/image';

import { BsGithub, BsTwitter } from 'react-icons/bs';

import styles from './footer.module.scss';

import Logo from '../../../../public/images/logo.png';

import footerItems from '../../../data/footer.data.json';

const Footer = () =>
{
    return (
        <footer className={styles.footer}>
            <span>
                <Image
                    src={Logo.src}
                    alt='WoW CMS'
                    layout='fill'
                    objectFit='cover'
                />
            </span>

            <div>
                <p>
                    © Copyright WoW CMS 2023
                </p>
                <span />
                <ul>
                    {
                        footerItems.map((item) =>
                            (
                                <li>
                                    <Link href={ item.href }>
                                        { item.name }
                                    </Link>
                                </li>
                            ))
                    }
                </ul>
            </div>

            <ul>
                <li>
                    <Link href='/'>
                        <BsTwitter />
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <BsGithub />
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
