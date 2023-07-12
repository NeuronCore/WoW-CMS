import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Autoplay, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import HeroImage1 from '@/../public/images/heros/hero_1-cataclysm.png';
import HeroImage2 from '@/../public/images/heros/hero_1-wotlk.png';

import ButtonImage1 from '@/../public/images/textures/button-cataclysm.png';
import ButtonImage2 from '@/../public/images/textures/button-wotlk.png';

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

const FAQ = dynamic(() => import('@/components/faq'));
const Features = dynamic(() => import('@/components/features'));
const BlogsHot = dynamic(() => import('@/components/blogs-card/blogs-hot.component'));
const BlogsNew = dynamic(() => import('@/components/blogs-card/blogs-new.component'));

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
                        <source src={ `/videos/video_1-${ process.env.NEXT_PUBLIC_THEME }.mp4` } />
                    </video>
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter} />
                    <span className={styles.homeHeaderFilter2} />
                </span>

                <div className={styles.homeHeaderContainer}>
                    <div className={styles.homeHeaderHero}>
                        <img src={
                            process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                                ? HeroImage1.src
                                : process.env.NEXT_PUBLIC_THEME === 'wotlk'
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
                                process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                                    ? ButtonImage1.src
                                    : process.env.NEXT_PUBLIC_THEME === 'wotlk'
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
                                <SwiperSlide key={ createUniqueKey([item.alt, index, 'blogs_1']) } virtualIndex={ index }>
                                    <BlogsHot item={ item } active={ index === headerBlog }/>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </div>

            <div className={styles.homeBlogs}>
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${
                    process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                        ? HeaderBlogs1.src
                        : process.env.NEXT_PUBLIC_THEME === 'wotlk'
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
                                            <BlogsNew item={ item } active={ index === blog }/>
                                        </SwiperSlide>
                                    ))
                            }
                            <SwiperSlide />
                            <SwiperSlide />
                        </Swiper>
                    </div>
                </div>

                <span className={styles.homeBlogsHeader} data-reverse/>
            </div>

            <div className={styles.homeFeatures}>
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${
                    process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                        ? Header1Image1.src
                        : process.env.NEXT_PUBLIC_THEME === 'wotlk'
                            ? Header1Image2.src
                            : Header1Image1.src
                })` }} />
                <span className={styles.homeBlogsFilter}/>
                <p>
                    WoW CMS Features
                </p>
                <ul>
                    {
                        features.map((item, index: number) =>
                            (
                                <Features index={ index } item={ item } key={ createUniqueKey([item.alt, index, 'features_1']) }/>
                            ))
                    }
                </ul>
            </div>

            <div className={styles.homeFaq}>
                <span  className={styles.homeBlogsHeaderImage} style={{ backgroundImage: `url(${
                    process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                        ? Header3Image1.src
                        : process.env.NEXT_PUBLIC_THEME === 'wotlk'
                            ? Header3Image2.src
                            : Header3Image1.src
                })` }} />
                <span className={styles.homeFaqFilter}/>

                <span className={styles.homeBlogsHeader}/>

                <p>
                    Frequently Asked Questions
                </p>

                <ul>
                    {
                        faq.map((item, index: number) =>
                            (
                                <FAQ setFaqs={ setFaqs } faqs={ faqs } index={ index } item={ item } key={ createUniqueKey([item.question, index, 'faq_1']) }/>
                            ))
                    }
                </ul>

                <span className={styles.homeBlogsHeader} data-reverse/>
            </div>
        </>
    );
};

export default Home;
