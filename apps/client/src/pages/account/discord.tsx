import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

import Profile from '@/../public/images/heros/profile.jpg';

import Logo from '@/components/logo';

const Button = dynamic(() => import('@/components/button'));

const Discord = () =>
{
    const [user] = useUser();

    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
            }}
        >
            <div className={styles.accountContent}>
                <h3 className={styles.accountContentHeader}>
                    { t('account:discord.title') }
                </h3>
                <div className={styles.accountContentListGrid1}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                { t('account:discord.subtitleVerification') }
                            </h3>
                        </header>
                        {
                            user.discord
                                ?
                                <div data-discord='connection'>
                                    <div>
                                        <p>
                                            { t('account:discord.discord') }
                                        </p>
                                        <div>
                                            <span>
                                                <Image
                                                    src={ user.avatar ? user.avatar : Profile }
                                                    alt='Discord'
                                                    fill
                                                    style={{ objectFit: 'contain' }}
                                                    sizes={'100'}
                                                />
                                            </span>
                                            <p>
                                                hello_im_parsa
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <span>
                                                <Image
                                                    src={ Logo() }
                                                    alt='Discord Server'
                                                    fill
                                                    style={{ objectFit: 'contain' }}
                                                    sizes={'100'}
                                                />
                                            </span>
                                            <p>
                                                WoW-CMS
                                            </p>

                                            <Button href='/'>
                                                { t('account:discord.join') }
                                            </Button>
                                        </div>
                                    </div>
                                    <p>
                                        { t('account:discord.paragraph0') }
                                    </p>
                                    <Button>
                                        { t('account:discord.unlinkAccount') }
                                    </Button>
                                </div>
                                :
                                <div data-discord='link'>
                                    <p>
                                        { t('account:discord.paragraph1') }
                                    </p>
                                    <Button>
                                        { t('account:discord.linkDiscord') }
                                    </Button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Discord;
