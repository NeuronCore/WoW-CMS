import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/pages/blog.module.scss';

const BlogsCard = () =>
{
    return (
        <li className={styles.blogsItemContainer}>
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

            <Link className={styles.blogsItem} href='/blogs/test'>
                <span className={styles.blogsItemImage}>
                    <Image
                        src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                        alt='WoW CMS 3'
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes={'100'}
                    />
                </span>

                <div className={styles.blogsItemContent}>
                    <div>
                        <p>
                            WoW CMS 3
                        </p>
                        <ul>
                            <li>
                                85 reads
                            </li>
                            <li>
                                85 likes
                            </li>
                            <li>
                                85 comments
                            </li>
                        </ul>
                    </div>

                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                    </p>

                    <span>
                        Published on August 4, 2022
                    </span>
                </div>
            </Link>
        </li>
    );
};

export default BlogsCard;
