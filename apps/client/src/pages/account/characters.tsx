import axios from 'axios';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import styles from '@/styles/pages/account.module.scss';

import Profile from '@/../public/images/heros/profile.jpg';

import { createUniqueKey } from '@/utils/helper.util';
import { getClassName, getFaction, getGender, getRaceName } from '@/functions/shared-defines.function';

const Button = dynamic(() => import('@/components/button'));
const Tooltip = dynamic(() => import('@/components/tooltips'));

const Characters = () =>
{
    const [realms, setRealms] = useState<[]>([]);
    const [characters, setCharacters] = useState<[]>([]);
    const [realm, setRealm] = useState<string>('');
    const [MaxLv, setMaxLv] = useState<number>(80);

    useEffect(() =>
    {
        (
            async() =>
            {
                const response = await axios.get('/database/realms');
                const responseLevel = await axios.get('/database/realm-level/realm/' + response.data.data.realms[0]);

                setMaxLv(responseLevel.data.data.level);
                setRealm(response.data.data.realms[0]);
                setRealms(response.data.data.realms);
            }
        )();
    }, []);

    useEffect(() =>
    {
        (
            async() =>
            {
                if (realm)
                {
                    const response = await axios.get('/characters/realm/' + realm);
                    const responseLevel = await axios.get('/database/realm-level/realm/' + realm);

                    setMaxLv(responseLevel.data.data.level);
                    setCharacters(response.data.data.characters);
                }
            }
        )();
    }, [realm]);

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
                    MY CHARACTERS
                </h3>
                <ul className={styles.accountContentRealms}>
                    {
                        realms.map((realmData, index) =>
                            (
                                <li onClick={() => setRealm(realmData)} className={classnames(styles.accountContentRealmsItem, { [styles.accountContentRealmsItemActive]: realmData === realm })} key={createUniqueKey([realmData, index])}>
                                    { realmData }
                                </li>
                            ))
                    }
                </ul>

                <div className={styles.accountContentListGrid2}>
                    {
                        characters?.map((character: any) =>
                            (
                                <div key={ character.guid } className={styles.accountContentItem}>
                                    <header>
                                        <h3>
                                            <Tooltip content={character.online === 1 ? 'Online' : 'Offline'}>
                                                <i data-online={character.online === 1}/>
                                            </Tooltip>
                                            { character.name }
                                        </h3>
                                    </header>
                                    <div>
                                        <div className={styles.accountContentItemCharacter} data-faction={getFaction(character.race)}>
                                            <CircularProgressbarWithChildren value={(character.level/Number(MaxLv))*100}>
                                                <div data-text>
                                                    <span>
                                                        <Image
                                                            src={ Profile }
                                                            alt={ character.name }
                                                            fill
                                                            style={{ objectFit: 'cover' }}
                                                            sizes={'100'}
                                                        />
                                                    </span>
                                                    <strong>
                                                        LV. { character.level }
                                                    </strong>
                                                    <p>
                                                        { getFaction(character.race) }
                                                    </p>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                            <ul>
                                                <li>
                                                    <p>
                                                        Race
                                                    </p>
                                                    <span>
                                                        { getRaceName(character.race) }
                                                    </span>
                                                </li>
                                                <li>
                                                    <p>
                                                        Gender
                                                    </p>
                                                    <span>
                                                        { getGender(character.gender) }
                                                    </span>
                                                </li>
                                                <li>
                                                    <p>
                                                        Class
                                                    </p>
                                                    <span>
                                                        { getClassName(character.class) }
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={styles.accountContentItemCharacterOptions}>
                                            <Button>
                                                Unstack
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                    <p>
                        If you don't see your characters, make sure you're logged into the right account. If you just made your character, it may take up to 10 minutes for them to appear.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Characters;
