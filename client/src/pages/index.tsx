import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidV4 } from 'uuid';
import classnames from 'classnames';
import React, { useState } from 'react';
import { Autoplay, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import HeroImage from '../../public/images/hero-image.png';
import ButtonImage from '../../public/images/button-image.webp';
import HeaderBlogs from '../../public/images/header-blogs-image.png';
import FeatureFrame from '../../public/images/circle-frame-image.svg';

import blogs from '../data/blogs.data.json';
import features from '../data/features.data.json';

import styles from '../styles/pages/home.module.scss';

const Home = () =>
{
    const [blog, setBlog] = useState<number>(0);

    return (
        <>
            <div className={styles.homeHeader}>
                <span className={styles.homeHeaderVideo}>
                    <video src='/videos/header-video.mp4' loop autoPlay />
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter2} />
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

            <div className={styles.homeBlogs}>
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${ HeaderBlogs.src })` }} />
                <span className={styles.homeBlogsFilter} />

                <span className={styles.homeBlogsHeader} />

                <div className={styles.homeBlogsList}>
                    <div className={styles.homeBlogsListContent}>
                        <div>
                            <h3>
                                { blogs[blog]?.name }
                            </h3>
                            <p>
                                { blogs[blog]?.description }
                            </p>
                        </div>
                    </div>
                    <div className={styles.homeBlogsListSwiper}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            keyboard={{ enabled: true }}
                            onSlideChange={(swiper) => setBlog(swiper.realIndex)}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            modules={[ Keyboard, Autoplay ]}
                        >
                            {
                                blogs.map((item: any, index: number) =>
                                    (
                                        <SwiperSlide key={ uuidV4() } virtualIndex={ index }>
                                            <div className={classnames(styles.homeBlogsListSwiperItem, { [styles.homeBlogsListSwiperItemActive]: index === blog })}>
                                                <div>
                                                    <i data-top_right>
                                                        <span/>
                                                        <span/>
                                                    </i>
                                                    <i data-top_left>
                                                        <span/>
                                                        <span/>
                                                    </i>
                                                    <i data-bottom_left>
                                                        <span/>
                                                        <span/>
                                                    </i>
                                                    <i data-bottom_right>
                                                        <span/>
                                                        <span/>
                                                    </i>
                                                    <span>
                                                        <Image
                                                            src={ item.src }
                                                            alt={ item.alt }
                                                            layout='fill'
                                                            objectFit='cover'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                            }
                            <SwiperSlide />
                            <SwiperSlide />
                        </Swiper>
                    </div>
                </div>

                <span className={styles.homeBlogsHeader} data-reverse />
            </div>

            <div className={styles.homeFeatures}>
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${ HeaderBlogs.src })` }} />
                <span className={styles.homeBlogsFilter} />

                <p>
                    WoW CMS Features
                </p>

                <ul>
                    {
                        features.map((item: any, index: number) =>
                            (
                                <li key={ uuidV4() } data-index={ index }>
                                    <i><span /></i>

                                    <div>
                                        <h4>
                                            Feature
                                        </h4>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                                        </p>
                                    </div>

                                    <span>
                                        <span>
                                             <Image
                                                 src={ item.src }
                                                 alt={ item.alt }
                                                 layout='fill'
                                                 objectFit='cover'
                                             />
                                        </span>

                                        <FeatureFrame />
                                    </span>
                                </li>
                            ))
                    }
                </ul>
            </div>
        </>
    );
};

export default Home;
