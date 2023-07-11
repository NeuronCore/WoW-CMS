import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import React, { useState } from 'react';

import styles from '@/styles/pages/blog.module.scss';

import blogs from '@/data/blogs.data.json';

import { createUniqueKey } from '@/utils/helper.util';

const Input = dynamic(() => import('@/components/input'));
const BlogsCard = dynamic(() => import('@/components/blogs-card/blogs-card.component'));

const Blogs = () =>
{
    const [sort, setSort] = useState({ hidden: true, by: 'newest' });
    const [category, setCategory] = useState('tutorial');
    const [filter, setFilter] = useState({ hidden: true });

    return (
        <>
            <header className={styles.blogNavbarHeaderBlogsPage}>
                <span className={styles.blogHeaderVideo}>
                    <video autoPlay loop>
                        <source src={ `/videos/video_1-${ process.env.NEXT_PUBLIC_THEME }.mp4` } />
                    </video>
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter2} />
                </span>

                <ul>
                    <li>
                        <h1>
                            Hottest Blogs
                        </h1>
                    </li>

                    <li>
                        <input placeholder='Search for characters, pages, and more...' />
                    </li>
                </ul>

                <div className='container'>
                    <Link href='/'>
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
                                    src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                                    alt='WoW CMS'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div>
                                    <span>
                                        6/27/2023
                                    </span>
                                    <p>
                                        WoW CMS 1
                                    </p>
                                </div>
                            </span>
                        </div>
                    </Link>
                    <Link href='/'>
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
                                    src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                                    alt='WoW CMS'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div>
                                    <span>
                                        6/27/2023
                                    </span>
                                    <p>
                                        WoW CMS 1
                                    </p>
                                </div>
                            </span>
                        </div>
                    </Link>
                    <Link href='/'>
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
                                    src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                                    alt='WoW CMS'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div>
                                    <span>
                                        6/27/2023
                                    </span>
                                    <p>
                                        WoW CMS 1
                                    </p>
                                </div>
                            </span>
                        </div>
                    </Link>
                    <Link href='/'>
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
                                    src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                                    alt='WoW CMS'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div>
                                    <span>
                                        6/27/2023
                                    </span>
                                    <p>
                                        WoW CMS 1
                                    </p>
                                </div>
                            </span>
                        </div>
                    </Link>
                    <Link href='/'>
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
                                    src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                                    alt='WoW CMS'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div>
                                    <span>
                                        6/27/2023
                                    </span>
                                    <p>
                                        WoW CMS 1
                                    </p>
                                </div>
                            </span>
                        </div>
                    </Link>
                </div>
            </header>

            <ul className={styles.blogsListNavbar}>
                <li className={styles.blogsListNavbarSort}>
                    <div className={classnames(styles.blogsListNavbarSortBy, { [styles.blogsListNavbarSortByActive]: !sort.hidden })} onClick={() => setSort({ ...sort, hidden: !sort.hidden })}>
                        { sort.by }
                    </div>

                    <ul className={classnames(styles.blogsListNavbarSortList, { [styles.blogsListNavbarSortListActive]: !sort.hidden })}>
                        <li onClick={() => setSort({ ...sort, hidden: true, by: 'viewed' })} className={classnames(styles.blogsListNavbarSortListItem, { [styles.blogsListNavbarSortListItemActive]: sort.by === 'viewed' })}>
                            Most viewed
                        </li>
                        <li onClick={() => setSort({ ...sort, hidden: true, by: 'liked' })} className={classnames(styles.blogsListNavbarSortListItem, { [styles.blogsListNavbarSortListItemActive]: sort.by === 'liked' })}>
                            Most liked
                        </li>
                        <li onClick={() => setSort({ ...sort, hidden: true, by: 'newest' })} className={classnames(styles.blogsListNavbarSortListItem, { [styles.blogsListNavbarSortListItemActive]: sort.by === 'newest' })}>
                            Newest
                        </li>
                    </ul>
                </li>

                <li className={styles.blogsListNavbarCategories}>
                    <span onClick={() => setCategory('tutorial')} className={classnames(styles.blogsListNavbarCategoriesItem, { [styles.blogsListNavbarCategoriesItemActive]: category === 'tutorial' })}>
                        Tutorial
                    </span>
                    <span onClick={() => setCategory('updates')} className={classnames(styles.blogsListNavbarCategoriesItem, { [styles.blogsListNavbarCategoriesItemActive]: category === 'updates' })}>
                        Updates
                    </span>
                    <span onClick={() => setCategory('news')} className={classnames(styles.blogsListNavbarCategoriesItem, { [styles.blogsListNavbarCategoriesItemActive]: category === 'news' })}>
                        News
                    </span>
                </li>

                <li className={classnames(styles.blogsListNavbarFilter, { [styles.blogsListNavbarFilterActive]: !filter.hidden })} onClick={() => setFilter({ hidden: !filter.hidden })}>
                    Filters
                </li>
            </ul>
            <div className={classnames(styles.blogsListFilters, { [styles.blogsListFiltersActive]: !filter.hidden })}>
                <Input label='Search in Tags'/>
                <Input label='Search in Contents'/>
            </div>

            <ul className={styles.blogsList}>
                {
                    blogs.map((item, index: number) =>
                        (
                            <BlogsCard key={ createUniqueKey([item.alt, index, 'blogs_page_1'])}/>
                        ))
                }
            </ul>
        </>
    );
};

export default Blogs;
