import React from 'react';
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
                   Discord Connection
                </h3>
                <div className={styles.accountContentListGrid1}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                Discord Verification
                            </h3>
                        </header>
                        {
                            user.discord
                                ?
                                <div data-discord='connection'>
                                    <div>
                                        <p>
                                            Discord
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
                                                Join
                                            </Button>
                                        </div>
                                    </div>
                                    <p>
                                        If you recently used a [Travel Guide] and do not see a discord to join, try refreshing in 5 minutes!
                                    </p>
                                    <Button>
                                        Unlink Account
                                    </Button>
                                </div>
                                :
                                <div data-discord='link'>
                                    <p>
                                        In order to link your WoW-CMS account to your Discord account and unlock additional functionality, please use the button below and proceed to authorize the linkage on the following Discord page.
                                    </p>
                                    <Button>
                                        Link Discord
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
