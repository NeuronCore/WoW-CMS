import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Autoplay, Keyboard } from 'swiper';
import React, { useEffect, useState } from 'react';
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

import { createUniqueKey } from '@/utils/helper.util';

const FAQ = dynamic(() => import('@/components/faq'));
const Preloader = dynamic(() => import('@/components/preloader'));
const Button = dynamic(() => import('@/components/button'));
const Features = dynamic(() => import('@/components/features'));
const BlogsHot = dynamic(() => import('@/components/blogs-card/blogs-hot.component'));
const BlogsNew = dynamic(() => import('@/components/blogs-card/blogs-new.component'));

const Home = () =>
{
    const { t } = useTranslation();
    const { locale } = useRouter();

    const [faq, setFaq] = useState<any[] | 'loading'>('loading');
    const [features, setFeatures] = useState<any[] | 'loading'>('loading');
    const [newestBlogs, setNewestBlogs] = useState<any[] | 'loading'>('loading');
    const [activeBlog, setActiveBlog] = useState<number>(0);
    const [faqs, setFaqs] = useState<number[]>([]);
    const [headerBlog, setHeaderBlog] = useState<number>(0);

    useEffect(() =>
    {
        (
            async() =>
            {
                try
                {
                    const getFaqs = await axios.get('/web/find-all/faq?locale=' + locale);

                    setFaq(getFaqs.data.data.faq);
                }
                catch (error)
                {
                    console.log(error);

                    setFaq([]);
                }
            }
        )();
    }, [locale]);

    useEffect(() =>
    {
        (
            async() =>
            {
                try
                {
                    const getFeatures = await axios.get('/web/find-all/feature?locale=' + locale);

                    setFeatures(getFeatures.data.data.features);
                }
                catch (error)
                {
                    console.log(error);

                    setFeatures([]);
                }
            }
        )();
    }, [locale]);

    useEffect(() =>
    {
        (
            async() =>
            {
                try
                {
                    const getNewestBlogs = await axios.get(`/blog/find-all-and-order/type/created_at?locale=${ locale }&page=1&limit=10`);

                    setNewestBlogs(getNewestBlogs.data.data.blogs);
                }
                catch (error)
                {
                    console.log(error);

                    setFeatures([]);
                }
            }
        )();
    }, [locale]);

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
                    initialSlide={+blogs}
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
                        {
                            newestBlogs === 'loading'
                                ? <Preloader component/>
                                :
                                <div>
                                    <h3>
                                        { newestBlogs[activeBlog][`title_${ locale }`] }
                                    </h3>
                                    <p>
                                        { newestBlogs[activeBlog][`summary_${ locale }`] }
                                    </p>
                                    <Button href={ `/blogs/${ newestBlogs[activeBlog][`slug_${ locale }`] }` }>
                                        Read
                                    </Button>
                                </div>
                        }
                    </div>
                    <div className={styles.homeBlogsListSwiper}>
                        {
                            newestBlogs === 'loading'
                                ? <Preloader component/>
                                :
                                <Swiper
                                    slidesPerView={1}
                                    grabCursor
                                    keyboard={{ enabled: true }}
                                    onSlideChange={(swiper) =>
                                    {
                                        swiper.slideTo(newestBlogs.length <= swiper.realIndex ? 0 : swiper.realIndex);
                                        setActiveBlog(newestBlogs.length <= swiper.realIndex ? 0 : swiper.realIndex);
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
                                        newestBlogs.map((blog, index: number) =>
                                            (
                                                <SwiperSlide key={ createUniqueKey([blog.alt, index, 'blogs_2']) } virtualIndex={ index }>
                                                    <BlogsNew blog={ blog } active={ index === activeBlog }/>
                                                </SwiperSlide>
                                            ))
                                    }
                                    <SwiperSlide />
                                    <SwiperSlide />
                                </Swiper>
                        }
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
                <ul>
                    {
                        features === 'loading'
                            ? <Preloader component/>
                            : features.map((item: any, index: number) => (<Features index={ index } item={ item } key={ item.id }/>))
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
                    { t('home:faq.title') }
                </p>

                <ul>
                    {
                        faq === 'loading'
                            ? <Preloader component/>
                            : faq.map((item: any, index: number) => (<FAQ setFaqs={ setFaqs } faqs={ faqs } index={ index } item={ item } key={ item.id }/>))
                    }
                </ul>

                <span className={styles.homeBlogsHeader} data-reverse/>
            </div>
        </>
    );
};

export default Home;
