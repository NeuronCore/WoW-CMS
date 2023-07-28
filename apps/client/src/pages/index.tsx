import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Autoplay, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useTranslation from 'next-translate/useTranslation';

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

import blogs from '@/data/blogs.data.json';

import styles from '@/styles/pages/home.module.scss';

import { createUniqueKey, middleOfArray } from '@/utils/helper.util';

const FAQ = dynamic(() => import('@/components/faq'));
const Features = dynamic(() => import('@/components/features'));
const BlogsHot = dynamic(() => import('@/components/blogs-card/blogs-hot.component'));
const BlogsNew = dynamic(() => import('@/components/blogs-card/blogs-new.component'));

const Home = ({ faq, features }: any) =>
{
    const [blog, setBlog] = useState<number>(0);
    const [faqs, setFaqs] = useState<number[]>([]);
    const [headerBlog, setHeaderBlog] = useState<number>(0);

    const { t } = useTranslation();

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
                            { t('home:header.title') }
                        </h1>
                        <p>
                            { t('home:header.paragraph') }
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
                                    { t('home:header.button') }
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
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        800: { slidesPerView: 2 },
                        1150: { slidesPerView: 3 },
                        1500: { slidesPerView: 4 }
                    }}
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
                    { t('home:blogs.title') }
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
                            slidesPerView={1}
                            grabCursor
                            keyboard={{ enabled: true }}
                            onSlideChange={(swiper) =>
                            {
                                swiper.slideTo(blogs.length <= swiper.realIndex ? 0 : swiper.realIndex);
                                setBlog(blogs.length <= swiper.realIndex ? 0 : swiper.realIndex);
                            }}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            modules={[ Keyboard, Autoplay ]}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                800: { slidesPerView: 2, spaceBetween: 0 },
                                1100: { slidesPerView: 3 }
                            }}
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
                    { t('home:features.title') }
                </p>
                <ul>{ features.map((item: any, index: number) => (<Features index={ index } item={ item } key={ item.id }/>)) }
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
                    { t('home:faq.title') }
                </p>

                <ul>{ faq.map((item: any, index: number) => (<FAQ setFaqs={ setFaqs } faqs={ faqs } index={ index } item={ item } key={ item.id }/>)) } </ul>

                <span className={styles.homeBlogsHeader} data-reverse/>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps<any> = async({ locale }) =>
{
    const responseFaq = await axios.get('/web/find-all/faq?locale=' + locale);
    const responseFeatures = await axios.get('/web/find-all/feature?locale=' + locale);

    if (!responseFaq?.data || !responseFeatures?.data)
        return { notFound: true };

    const faq = await responseFaq?.data?.data?.faq;
    const features = await responseFeatures?.data?.data?.features;

    return { props: { faq, features }, revalidate: 800 };
};

export default Home;
