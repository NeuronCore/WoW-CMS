import Link from 'next/link';
import Image from 'next/image';

import { BsGithub, BsTwitter } from 'react-icons/bs';

import styles from './footer.module.scss';

import Logo from '../../../../public/logo.png';

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
                    <li>
                        <Link href='/'>
                            News
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            Support
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            Terms of Service
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            Refund Policy
                        </Link>
                    </li>
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
