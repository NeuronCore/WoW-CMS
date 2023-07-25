import axios from 'axios';
import Image from 'next/image';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

import Profile from '@/../public/images/heros/profile.jpg';

import { createUniqueKey } from '@/utils/helper.util';

const Characters = () =>
{
    const [user] = useUser();

    const [realms, setRealms] = useState<[]>([]);
    const [characters, setCharacters] = useState<[]>([]);
    const [realm, setRealm] = useState<string>('');

    useEffect(() =>
    {
        (
            async() =>
            {
                const response = await axios.get('/database/realms');

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

                    setCharacters(response.data.data.characters);
                }
            }
        )();
    }, [realm]);

    return (
        <div className={styles.accountContent}>
            <h3 className={styles.accountContentHeader}>
                ACCOUNT SECURITY
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
                    characters.map((character: any, index) =>
                        (
                            <div key={createUniqueKey([character.name, character.totaltime, index])} className={styles.accountContentItem}>
                                <header>
                                    <h3>
                                        { character.name }
                                    </h3>
                                </header>
                                <div>
                                    <div className={styles.accountContentItemCharacter}>
                                        <CircularProgressbarWithChildren value={(character.level/Number(process.env.NEXT_PUBLIC_CHARACTER_MAXIMUM_LEVEL))*100}>
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
                                                    HUMAN
                                                </p>
                                            </div>
                                        </CircularProgressbarWithChildren>
                                        <ul>
                                            <li>
                                                <p>
                                                    Realm
                                                </p>
                                                <span>
                                        MAMAD
                                                </span>
                                            </li>
                                            <li>
                                                <p>
                                                    Race
                                                </p>
                                                <span>
                                        MAMAD
                                                </span>
                                            </li>
                                            <li>
                                                <p>
                                                    Faction
                                                </p>
                                                <span>
                                        MAMAD
                                                </span>
                                            </li>
                                            <li>
                                                <p>
                                                    Class
                                                </p>
                                                <span>
                                        MAMAD
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default Characters;
