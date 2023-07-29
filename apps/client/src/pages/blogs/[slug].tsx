import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

import { BsArrow90DegDown, BsArrow90DegUp, BsBookmark, BsCalendar, BsChat, BsChevronRight, BsEye, BsHeart, BsPrinter } from 'react-icons/bs';

import styles from '@/styles/pages/blog.module.scss';

import data from '@/data/comments.data.json';

import { capitalizeFirstLetter, createUniqueKey } from '@/utils/helper.util';

const Tooltip = dynamic(() => import('@/components/tooltips'));
const Preloader = dynamic(() => import('@/components/preloader'));
const Comment = dynamic(() => import('@/components/comment/comment.component'));
const AddComment = dynamic(() => import('@/components/comment/add-comment.component'));

const Blog = () =>
{
    const { locale, asPath, query } = useRouter();

    const [comments, updateComments] = useState<any[]>([]);
    const [deleteModalState, setDeleteModalState] = useState(false);

    const [blog, setBlog] = useState<any | 'loading'>('loading');

    useEffect(() =>
    {
        (
            async() =>
            {
                const getBlog = await axios.get(`/blog/find-by-slug/${ query.slug }?locale=${ locale }`);

                setBlog(getBlog.data.data);
            }
        )();
    }, []);

    useEffect(() =>
    {
        updateComments(data.comments);
    }, []);

    useEffect(() =>
    {
        deleteModalState
            ? document.body.classList.add('overflow--hidden')
            : document.body.classList.remove('overflow--hidden');
    }, [comments, deleteModalState]);

    const updateScore = (score: string, id: string, type: string, method: string) =>
    {
        const updatedComments = [...comments];

        if (type === 'comment')
        {
            updatedComments.forEach((data: { id: string | number, score: string, voted: boolean }) =>
            {
                if (data.id === id)
                {
                    data.score = score;
                    data.voted = method === 'upvote';
                }
            });
        }
        else if (type === 'reply')
        {
            updatedComments.forEach((comment: { replies: [] }) =>
            {
                comment.replies.forEach((data: { id: string | number, score: string, voted: boolean }) =>
                {
                    if (data.id === id)
                    {
                        data.score = score;
                        data.voted = method === 'upvote';
                    }
                });
            });
        }
        updateComments(updatedComments);
    };

    const addComments = (newComment: string) =>
    {
        const updatedComments = [...comments, newComment];
        updateComments(updatedComments);
    };

    const updateReplies = (replies: [], id: string | number) =>
    {
        const updatedComments = [...comments];
        updatedComments.forEach((data) =>
        {
            if (data.id === id)

                data.replies = [...replies];

        });
        updateComments(updatedComments);
    };

    const editComment = (content: string, id: string, type: string) =>
    {
        const updatedComments = [...comments];

        if (type === 'comment')
        {
            updatedComments.forEach((data) =>
            {
                if (data.id === id)

                    data.content = content;

            });
        }
        else if (type === 'reply')
        {
            updatedComments.forEach((comment) =>
            {
                comment.replies.forEach((data: { id: string, content: string }) =>
                {
                    if (data.id === id)

                        data.content = content;

                });
            });
        }

        updateComments(updatedComments);
    };

    const commentDelete = (id: string | number, type: string, parentComment: unknown) =>
    {
        let updatedComments = [...comments];
        let updatedReplies = [];

        if (type === 'comment')

            updatedComments = updatedComments.filter((data: { id: string }) => data.id !== id);

        else if (type === 'reply')
        {
            comments.forEach((comment) =>
            {
                if (comment.id === parentComment)
                {
                    updatedReplies = comment.replies.filter((data: { id: string | number }) => data.id !== id);
                    comment.replies = updatedReplies;
                }
            });
        }

        updateComments(updatedComments);
    };

    return (
        blog === 'loading'
            ? <Preloader />
            : blog.published
                ?
                <>
                    <nav data-blog='true' className={styles.blogNavbarHeaderNav}>
                        <div className='container'>
                            <div>
                                <p>
                                    Home
                                </p>
                                {
                                    asPath.split('/').map((item, index) =>
                                        (
                                            item
                                                ?
                                                <Fragment key={createUniqueKey([item, index, 'blog_router'])}>
                                                    <BsChevronRight />
                                                    <Link href={ '/' + item } data-active={ index === asPath.split('/').length - 1 }>
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
                                <source src={ `/videos/video_1-${ process.env.NEXT_PUBLIC_THEME }.mp4` } />
                            </video>
                            <span className={styles.blogHeaderFilter} />
                            <span className={styles.blogHeaderFilter} />
                            <span className={styles.blogHeaderFilter} />
                            <span className={styles.blogHeaderFilter} />
                            <span className={styles.blogHeaderFilter2} />
                        </span>

                        <div className='container'>
                            <h1>
                                { blog[`title_${ locale }`] }
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
                                        src={ blog.thumbnail }
                                        alt='WoW CMS'
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes={'100'}
                                    />
                                </span>
                            </span>
                            <footer data-info>
                                <div>
                                    <span>
                                        <Image
                                            src={ blog.account.avatar }
                                            alt={ blog.account.username }
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes={'100'}
                                        />
                                    </span>
                                    <div>
                                        By
                                        <h2>
                                            { blog.account.username }
                                        </h2>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Published on { blog.published_at } · Updated on { blog.updated_at }
                                        <BsCalendar />
                                    </p>
                                </div>
                            </footer>
                            <footer>
                                <div data-stats>
                                    <p>
                                        { blog.comments } Comments
                                        <BsChat />
                                    </p>
                                    <p>
                                        { blog.likes } Likes
                                        <BsHeart />
                                    </p>
                                    <p>
                                        { blog.readz } Reads
                                        <BsEye />
                                    </p>
                                </div>
                            </footer>
                        </div>

                        {/*<nav>*/}
                        {/*    <div>*/}
                        {/*        <i>*/}
                        {/*            <BsArrowBarLeft />*/}
                        {/*        </i>*/}
                        {/*        <div>*/}
                        {/*            <p>*/}
                        {/*                Previous Blog*/}
                        {/*            </p>*/}
                        {/*            <h2>*/}
                        {/*                Who are you rea...*/}
                        {/*            </h2>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <div>*/}
                        {/*            <p>*/}
                        {/*                Next Blog*/}
                        {/*            </p>*/}
                        {/*            <h2>*/}
                        {/*                Who are you rea...*/}
                        {/*            </h2>*/}
                        {/*        </div>*/}
                        {/*        <i>*/}
                        {/*            <BsArrowBarRight />*/}
                        {/*        </i>*/}
                        {/*    </div>*/}
                        {/*</nav>*/}
                    </header>

                    <section className={styles.blogMain}>
                        { blog[`content_${ locale }`] }
                    </section>

                    <section className={styles.blogMainFooter}>
                        <ul>
                            {
                                blog.tags.map((tag: string) =>
                                    (
                                        <li>
                                            <Link href='/blogs?tag=tag'>
                                                #{ tag }
                                            </Link>
                                        </li>
                                    ))
                            }
                        </ul>
                        <div>
                            <Link href={`/blogs?category=${ blog.category }`}>
                                <span>
                                    { blog.category }
                                </span>
                            </Link>
                            <div>
                                <Tooltip content='Liked The Blog'>
                                    <span>
                                        <BsHeart />
                                    </span>
                                </Tooltip>
                                <Tooltip content='Save The Blog'>
                                    <span>
                                        <BsBookmark />
                                    </span>
                                </Tooltip>
                                <Tooltip content='Print The Blog'>
                                    <span>
                                        <BsPrinter />
                                    </span>
                                </Tooltip>
                            </div>
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

                        {/*<div>*/}
                        {/*    <span>*/}
                        {/*        <Image*/}
                        {/*            src={ blog.account.avatar }*/}
                        {/*            alt={ blog.account.username }*/}
                        {/*            fill*/}
                        {/*            style={{ objectFit: 'cover' }}*/}
                        {/*            sizes={'100'}*/}
                        {/*        />*/}
                        {/*    </span>*/}
                        {/*    <div>*/}
                        {/*        <span>*/}
                        {/*            <h3>*/}
                        {/*                { blog.account.username }*/}
                        {/*            </h3>*/}
                        {/*             - Author*/}
                        {/*        </span>*/}
                        {/*        <p>*/}
                        {/*            { blog.account.biography }*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
                        <div className={styles.blogMainCommentsList}>
                            {
                                comments.map((comment) =>
                                    (
                                        <Comment
                                            key={comment.id}
                                            commentData={comment}
                                            updateScore={updateScore}
                                            updateReplies={updateReplies}
                                            editComment={editComment}
                                            commentDelete={commentDelete}
                                            setDeleteModalState={setDeleteModalState}
                                        />
                                    ))
                            }
                            <AddComment addComments={addComments} />
                        </div>
                    </section>
                </>
                : null
    );
};

export default Blog;
