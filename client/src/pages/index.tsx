import React from 'react';
import Link from 'next/link';

import HeroImage from '../../public/images/hero-image.png';
import ButtonImage from '../../public/images/button-image.webp';

import styles from '../styles/pages/home.module.scss';

const Home = () =>
{
    return (
        <>
            <div className={styles.homeHeader}>
                <span className={styles.homeHeaderVideo}>
                    <video src='/videos/header-video.mp4' loop autoPlay />
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter} />
                </span>

                <div className={styles.homeHeaderHero}>
                    <img src={ HeroImage.src } alt='Hero Image'/>
                </div>

                <div className={styles.homeHeaderContent}>
                    <h1>
                        WOW CMS
                    </h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                    </p>
                    <div>
                        <Link style={{ backgroundImage: `url(${ ButtonImage.src })` }} href='/'>
                            <>
                                Play Now!
                                <span />
                            </>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
