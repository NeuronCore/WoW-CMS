import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import React, { useState } from 'react';
import { Autoplay, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HiChevronRight } from 'react-icons/hi';

import HeroImage1 from '@/../public/images/heros/hero_1-cataclysm.png';
import HeroImage2 from '@/../public/images/heros/hero_1-wotlk.png';

import ButtonImage1 from '@/../public/images/textures/button-cataclysm.png';
import ButtonImage2 from '@/../public/images/textures/button-wotlk.png';
import FeatureFrame from '@/../public/images/textures/frame_circle.svg';

import HeaderBlogs1 from '@/../public/images/backgrounds/background_4-cataclysm.png';
import HeaderBlogs2 from '@/../public/images/backgrounds/background_4-wotlk.jpg';
import Header1Image1 from '@/../public/images/backgrounds/background_1-cataclysm.jpg';
import Header1Image2 from '@/../public/images/backgrounds/background_1-wotlk.jpeg';
import Header3Image1 from '@/../public/images/backgrounds/background_3-cataclysm.png';
import Header3Image2 from '@/../public/images/backgrounds/background_3-wotlk.png';

import faq from '@/data/faq.data.json';
import blogs from '@/data/blogs.data.json';
import features from '@/data/features.data.json';

import styles from '@/styles/pages/home.module.scss';

import { createUniqueKey, middleOfArray } from '@/utils/helper.util';

const Home = () =>
{
    const [blog, setBlog] = useState<number>(0);
    const [faqs, setFaqs] = useState<number[]>([]);
    const [headerBlog, setHeaderBlog] = useState<number>(0);

    return (
        <>
            <div className={styles.homeHeader}>
                <span className={styles.homeHeaderVideo}>
                    <video autoPlay loop>
                        <source src={ `/videos/video_1-${ process.env.THEME }.mp4` } />
                    </video>
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter2} />
                </span>

                <div className={styles.homeHeaderContainer}>
                    <div className={styles.homeHeaderHero}>
                        <img src={
                            process.env.THEME === 'cataclysm'
                                ? HeroImage1.src
                                : process.env.THEME === 'wotlk'
                                    ? HeroImage2.src
                                    : HeroImage1.src
                        } alt='Hero Image'/>
                    </div>

                    <div className={styles.homeHeaderContent}>
                        <h1>
                            WOW CMS
                        </h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                        </p>
                        <div>
                            <Link style={{ backgroundImage: `url(${
                                process.env.THEME === 'cataclysm'
                                    ? ButtonImage1.src
                                    : process.env.THEME === 'wotlk'
                                        ? ButtonImage2.src
                                        : ButtonImage1.src
                            })` }} href='/'>
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
                        blogs.map((item, index: number) =>
                            (
                                <SwiperSlide key={ createUniqueKey([item.alt, index, 'blogs_1']) }  virtualIndex={ index }>
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
                                                    fill
                                                    style={{ objectFit: 'cover' }}
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
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${
                    process.env.THEME === 'cataclysm'
                        ? HeaderBlogs1.src
                        : process.env.THEME === 'wotlk'
                            ? HeaderBlogs2.src
                            : HeaderBlogs1.src
                })` }} />
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
                                blogs.map((item, index: number) =>
                                    (
                                        <SwiperSlide key={ createUniqueKey([item.alt, index, 'blogs_2']) } virtualIndex={ index }>
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
                                                            fill
                                                            style={{ objectFit: 'cover' }}
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
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${
                    process.env.THEME === 'cataclysm'
                        ? Header1Image1.src
                        : process.env.THEME === 'wotlk'
                            ? Header1Image2.src
                            : Header1Image1.src
                })` }} />
                <span className={styles.homeBlogsFilter} />

                <p>
                    WoW CMS Features
                </p>

                <ul>
                    {
                        features.map((item, index: number) =>
                            (
                                <li key={ createUniqueKey([item.alt, index, 'features_1']) } data-index={ index }>
                                    <i><span /></i>

                                    <div>
                                        <h4>
                                            { item.name }
                                        </h4>
                                        <p>
                                            { item.description }
                                        </p>
                                    </div>

                                    <span>
                                        <span>
                                            <Image
                                                src={ item.src }
                                                alt={ item.alt }
                                                fill
                                                style={{ objectFit: 'cover' }}
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
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${
                    process.env.THEME === 'cataclysm'
                        ? Header3Image1.src
                        : process.env.THEME === 'wotlk'
                            ? Header3Image2.src
                            : Header3Image1.src
                })` }} />
                <span className={styles.homeFaqFilter} />

                <span className={styles.homeBlogsHeader} />

                <p>
                    Frequently Asked Questions
                </p>

                <ul>
                    {
                        faq.map((item, index: number) =>
                            (
                                <li key={ createUniqueKey([item.question, index, 'faq_1']) } className={classnames(styles.homeFaqItem, { [styles.homeFaqItemActive]: faqs.includes(index) })}>
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

                                    <div onClick={() =>
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
