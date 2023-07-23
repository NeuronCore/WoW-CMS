import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { v4 as uuidV4 } from 'uuid';

import { BsGithub, BsTwitter } from 'react-icons/bs';

import Logo from '@/components/logo';

import styles from '@/components/layouts/footer/footer.module.scss';

import IdPay from '@/../public/images/logos/id_pay.png';
import Tether from '@/../public/images/logos/tether.png';
import Stripe from '@/../public/images/logos/stripe.png';
import Paypal from '@/../public/images/logos/paypal.png';
import VisaCard from '@/../public/images/logos/visa_card.png';
import ZarinPal from '@/../public/images/logos/zarin_pal.png';
import MasterCard from '@/../public/images/logos/master_card.png';

import footerItems from '@/data/footer.data.json';

const Footer = () =>
{
    return (
        <footer className={styles.footer}>
            <div className={classnames(styles.footerContainer, 'container')}>
                <div className={styles.footerContainerItem}>
                    <span className={styles.footerContainerImage}>
                        <Image
                            src={ Logo() }
                            alt='WoW CMS'
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes={'100'}
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
                    <li>
                        <Link href='/'>
                            <Image
                                src={Paypal.src}
                                alt='Paypal'
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes={'100'}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <Image
                                src={MasterCard.src}
                                alt='MasterCard'
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes={'100'}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <Image
                                src={VisaCard.src}
                                alt='Paypal'
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes={'100'}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <Image
                                src={Stripe.src}
                                alt='Paypal'
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes={'100'}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <Image
                                src={Tether.src}
                                alt='Paypal'
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes={'100'}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <Image
                                src={ZarinPal.src}
                                alt='Paypal'
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes={'100'}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <Image
                                src={IdPay.src}
                                alt='Paypal'
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes={'100'}
                            />
                        </Link>
                    </li>
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
