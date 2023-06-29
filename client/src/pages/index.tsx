import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidV4 } from 'uuid';
import classnames from 'classnames';
import React, { useState } from 'react';
import { Autoplay, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HiChevronRight } from 'react-icons/hi';

import Texture1 from '../../public/images/texture-1.jpg';
import HeroImage from '../../public/images/hero-image.png';
import ButtonImage from '../../public/images/button-image.webp';
import Header1Image from '../../public/images/header-1-image.jpg';
import Header2Image from '../../public/images/header-2-image.webp';
import HeaderBlogs from '../../public/images/header-blogs-image.png';
import FeatureFrame from '../../public/images/circle-frame-image.svg';

import faq from '../data/faq.data.json';
import blogs from '../data/blogs.data.json';
import features from '../data/features.data.json';

import styles from '../styles/pages/home.module.scss';

import { middleOfArray } from '../utils/help';

const Home = () =>
{
    const [faqs, setFaqs] = useState<number[]>([]);
    const [blog, setBlog] = useState<number>(0);
    const [headerBlog, setHeaderBlog] = useState<number>(0);

    return (
        <>
            <div className={styles.homeHeader}>
                <span className={styles.homeHeaderVideo}>
                    <video src='/videos/header-video.mp4' loop autoPlay />
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter2} />
                </span>

                <div className={styles.homeHeaderContainer}>
                    <div className={styles.homeHeaderHero}>
                        <img src={ HeroImage.src } alt='Hero Image'/>
                    </div>

                    <div className={styles.homeHeaderContent}>
                        <h1>
                            WOW CMS
                        </h1>
                        <p>
                            WOW CMS is a Classless game that allows you to imagine and build the character of your dreams. Your custom character has any ability or talent within their reach. Imagine your hero and achieve glory!
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

                <Swiper
                    slidesPerView={4}
                    centeredSlides
                    grabCursor
                    initialSlide={middleOfArray(blogs)}
                    keyboard={{ enabled: true }}
                    className={styles.homeHeaderSwiper}
                    onSlideChange={(swiper) => setHeaderBlog(swiper.realIndex)}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    modules={[ Keyboard, Autoplay ]}
                >
                    {
                        blogs.map((item: any, index: number) =>
                            (
                                <SwiperSlide key={ uuidV4() } virtualIndex={ index }>
                                    <div className={classnames(styles.homeHeaderItem, { [styles.homeHeaderItemActive]: index === headerBlog })}>
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
                                                <div>
                                                    <span>
                                                        6/27/2023
                                                    </span>
                                                    <p>
                                                        { item.name }
                                                    </p>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </div>

            <div className={styles.homeBlogs}>
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${ HeaderBlogs.src })` }} />
                <span className={styles.homeBlogsFilter} />

                <span className={styles.homeBlogsHeader} />

                <p>
                    WoW CMS Blogs
                </p>

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
                            grabCursor
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
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${ Header1Image.src })` }} />
                <span className={styles.homeBlogsFilter} />

                <p>
                    WoW CMS Features
                </p>

                <ul>
                    {
                        features.map((item, index: number) =>
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

            <div className={styles.homeFaq}>
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${ Header2Image.src })` }} />
                <span className={styles.homeFaqFilter} />

                <span className={styles.homeBlogsHeader} />

                <p>
                    Frequently Asked Questions
                </p>

                <ul>
                    {
                        faq.map((item, index: number) =>
                            (
                                <li key={ uuidV4() } className={classnames(styles.homeFaqItem, { [styles.homeFaqItemActive]: faqs.includes(index) })}>
                                    <div style={{ backgroundImage: `url(${ Texture1.src })` }} onClick={() =>
                                    {
                                        let newFaqs = faqs;

                                        if (newFaqs.includes(index))
                                            newFaqs = newFaqs.filter(e => e !== index);
                                        else
                                            newFaqs.push(index);

                                        setFaqs([...newFaqs]);
                                    }}>
                                        <p>
                                            { item.question }
                                        </p>
                                        <i>
                                            <HiChevronRight />
                                        </i>
                                    </div>

                                    <p>
                                        { item.answer }
                                    </p>
                                </li>
                            ))
                    }
                </ul>

                <span className={styles.homeBlogsHeader} data-reverse />
            </div>
        </>
    );
};

export default Home;
