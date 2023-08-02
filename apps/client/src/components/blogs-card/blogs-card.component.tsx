import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '@/styles/pages/blog.module.scss';

const BlogsCard = ({ blog }: any) =>
{
    const { locale } = useRouter();

    return (
        <div className={styles.blogsItemContainer}>
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

            <Link className={styles.blogsItem} href={ `/blogs/${ blog[`slug_${ locale }`] }` }>
                <span className={styles.blogsItemImage}>
                    <Image
                        src={ `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/thumbnail/${ blog.thumbnail }` }
                        alt={ blog[`meta_title_${ locale }`] }
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes={'100'}
                    />
                </span>

                <div className={styles.blogsItemContent}>
                    <div>
                        <p>
                            { blog[`title_${ locale }`] }
                        </p>
                        <ul>
                            <li>
                                { blog.readz } reads
                            </li>
                            <li>
                                { blog.likes } likes
                            </li>
                            <li>
                                { blog.comments } comments
                            </li>
                        </ul>
                    </div>

                    <p>
                        { blog[`summary_${ locale }`] }
                    </p>

                    <span>
                        Published on August 4, 2022
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default BlogsCard;
