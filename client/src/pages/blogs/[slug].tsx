import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import { BsArrow90DegDown, BsArrow90DegUp, BsArrowBarLeft, BsArrowBarRight, BsBookmark, BsCalendar, BsChat, BsChevronRight, BsEye, BsPrinter } from 'react-icons/bs';

import styles from '@/styles/pages/blog.module.scss';

import { capitalizeFirstLetter, createUniqueKey } from '@/utils/helper.util';

const Button = dynamic(() => import('@/components/button'));

const Blog = () =>
{
    const router = useRouter();

    return (
        <>
            <nav data-blog='true' className={styles.blogNavbarHeaderNav}>
                <div className='container'>
                    <div>
                        <p>
                            Home
                        </p>
                        {
                            router.asPath.split('/').map((item, index) =>
                                (
                                    item
                                        ?
                                        <Fragment key={createUniqueKey([item, index, 'blog_router'])}>
                                            <BsChevronRight />
                                            <Link href={ '/' + item } data-active={ index === router.asPath.split('/').length - 1 }>
                                                { capitalizeFirstLetter(item) }
                                            </Link>
                                        </Fragment>
                                        : null
                                ))
                        }
                    </div>

                    <Link href='/blogs'>
                        Back to blogs
                        <BsArrow90DegDown />
                    </Link>
                </div>
            </nav>

            <header className={styles.blogNavbarHeaderBlog}>
                <span className={styles.blogHeaderVideo}>
                    <video autoPlay loop>
                        <source src={ `/videos/video_1-${ process.env.THEME }.mp4` } />
                    </video>
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter2} />
                </span>

                <div className='container'>
                    <h1>
                        Are you noob in WOW?
                    </h1>
                    <span>
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
                        </span>
                    </span>
                    <footer>
                        <div>
                            <span>
                                <Image
                                    src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                                    alt='WoW CMS'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </span>
                            <div>
                                By
                                <h2>
                                    im-parsa
                                </h2>
                            </div>
                        </div>
                        <div>
                            <p>
                                Published on August 4, 2022
                                <BsCalendar />
                            </p>
                            <p>
                                85 Comments
                                <BsChat />
                            </p>
                            <p>
                                8585 Reads
                                <BsEye />
                            </p>
                        </div>
                    </footer>
                </div>

                <nav>
                    <div>
                        <i>
                            <BsArrowBarLeft />
                        </i>
                        <div>
                            <p>
                                Previous Blog
                            </p>
                            <h2>
                                Who are you rea...
                            </h2>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>
                                Next Blog
                            </p>
                            <h2>
                                Who are you rea...
                            </h2>
                        </div>
                        <i>
                            <BsArrowBarRight />
                        </i>
                    </div>
                </nav>
            </header>

            <section className={styles.blogMain}>
                <p>
                    "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
                </p>

                <h3>
                    What is Lorem Ipsum?
                </h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                </p>

                <h3>
                    Why do we use it?
                </h3>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
            </section>

            <section className={styles.blogMainFooter}>
                <span>
                    Tutorial
                </span>
                <div>
                    <span>
                        <BsBookmark />
                    </span>
                    <span>
                        <BsPrinter />
                    </span>
                </div>
            </section>

            <section className={styles.blogMainAuthor}>
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

                <div>
                    <span>
                        <Image
                            src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                            alt='WoW CMS'
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </span>
                    <div>
                        <span>
                            <h3>
                                im-parsa
                            </h3>
                             - Author
                        </span>
                        <p>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </p>
                    </div>
                </div>
            </section>

            <header className={styles.blogsHeader}>
                <h3>
                    You may also be interested in this content
                </h3>
                <Link href='/blogs'>
                    More
                    <BsArrow90DegUp />
                </Link>
            </header>

            <section className={styles.blogsMain}>
                <div className='container'>

                </div>
            </section>

            <section className={styles.blogMainComments}>
                <div className={styles.blogMainCommentsForm}>
                    <h3>
                        Post comment
                    </h3>
                    <form>
                        <textarea placeholder='Your comment content' />
                        <footer>
                            <div>
                                <input type='text' placeholder='Your first name' />
                            </div>
                            <div>
                                <input type='text' placeholder='Your email' />
                            </div>
                        </footer>
                    </form>

                    <Button>
                        Confirm
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Blog;
