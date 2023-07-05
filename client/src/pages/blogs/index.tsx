import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/pages/blog.module.scss';

const Blogs = () =>
{
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

        </>
    );
};

export default Blogs;
