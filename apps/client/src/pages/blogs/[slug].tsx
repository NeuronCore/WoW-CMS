import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'html-react-parser';
import React, { Fragment, useEffect, useState } from 'react';

import { BsArrow90DegDown, BsArrow90DegUp, BsBookmark, BsCalendar, BsChat, BsChevronRight, BsEye, BsHeart, BsPrinter } from 'react-icons/bs';

import styles from '@/styles/pages/blog.module.scss';

import { useUser } from '@/hooks/use-user';

import { capitalizeFirstLetter, createUniqueKey } from '@/utils/helper.util';

import Profile from '@/../public/images/heros/profile.jpg';

const Tooltip = dynamic(() => import('@/components/tooltips'));
const Preloader = dynamic(() => import('@/components/preloader'));
const Comment = dynamic(() => import('@/components/comment/comment.component'));
const AddComment = dynamic(() => import('@/components/comment/add-comment.component'));

const Blog = () =>
{
    const [user] = useUser();
    const { locale, asPath, query } = useRouter();

    const [deleteModalState, setDeleteModalState] = useState(false);
    const [blog, setBlog] = useState<any | 'loading'>('loading');
    const [comments, setComments] = useState<any | 'loading'>('loading');
    const [page, setPage] = useState<number>(1);

    useEffect(() =>
    {
        (
            async() =>
            {
                try
                {
                    const getBlog = await axios.get(`/blog/find-by-slug/${ query.slug }?locale=${ locale }`);

                    console.log(getBlog.data.data.blog);

                    setBlog(getBlog.data.data.blog);
                }
                catch (error)
                {
                    setBlog(null);
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
                    if (blog?.id)
                    {
                        const getComments = await axios.get(`/comment/find-all/blog-id/${ blog.id }?page=${ page }&limit=20`);

                        setComments(getComments.data.data.comments);
                    }
                }
                catch (error)
                {
                    setComments(null);
                }
            }
        )();
    }, [blog?.id]);

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

        setComments(updatedComments);
    };

    const addComments = (newComment: string) =>
    {
        if (comments)
            setComments([...comments, newComment]);
        else
            setComments([newComment]);
    };

    const updateReplies = (replies: [], id: string | number) =>
    {
        const updatedComments = [...comments];
        updatedComments.forEach((data) =>
        {
            if (data.id === id)
                data.replies = [...replies];
        });

        setComments(updatedComments);
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

        setComments(updatedComments);
    };

    const commentDelete = (id: string | number, type: string, parentComment: unknown) =>
    {
        let updatedComments = [...comments];
        let updatedReplies = [];

        if (type === 'comment')

            updatedComments = updatedComments.filter((data: { id: string }) => data.id !== id);

        else if (type === 'reply')
        {
            comments.forEach((comment: any) =>
            {
                if (comment.id === parentComment)
                {
                    updatedReplies = comment.replies.filter((data: { id: string | number }) => data.id !== id);
                    comment.replies = updatedReplies;
                }
            });
        }

        setComments(updatedComments);
    };

    return (
        blog === 'loading'
            ? <Preloader />
            : blog?.published === 'Confirmed'
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
                                        src={ `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/thumbnail/${ blog.thumbnail }` }
                                        alt={ blog[`meta_title_${ locale }`] }
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
                                            src={ blog.author.avatar ? `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/avatar/${ blog.author.avatar }` : Profile }
                                            alt={ blog.author.username }
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes={'100'}
                                        />
                                    </span>
                                    <div>
                                        By
                                        <h2>
                                            { blog.author.username }
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
                        { ReactHtmlParser(blog[`content_${ locale }`] || '') }
                    </section>

                    <section className={styles.blogMainFooter}>
                        {
                            blog.tags
                                ?
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
                                : null
                        }
                        <div>
                            <Link href={`/blogs?category=${ blog.category || 'None' }`}>
                                <span>
                                    { blog.category || 'None' }
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

                        <div>
                            <span>
                                <Image
                                    src={ blog.author.avatar ? `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/avatar/${ blog.author.avatar }` : Profile }
                                    alt={ blog.author.username }
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes={'100'}
                                />
                            </span>
                            <div>
                                <span>
                                    <h3>
                                        { blog.author.username }
                                    </h3>
                                     - Author
                                </span>
                                <p>
                                    { blog[`summary_${ locale }`] }
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
                        <div className={styles.blogMainCommentsList}>
                            {
                                comments === 'loading'
                                    ? <Preloader component/>
                                    : comments === null
                                        ? null
                                        :
                                        comments.map((comment: any, index: number) =>
                                            (
                                                <Comment
                                                    user={user}
                                                    blogId={blog.id}
                                                    key={createUniqueKey([comment.id, index, 'comment', 'blog', comment.author.username])}
                                                    commentData={comment}
                                                    updateScore={updateScore}
                                                    updateReplies={updateReplies}
                                                    editComment={editComment}
                                                    commentDelete={commentDelete}
                                                    setDeleteModalState={setDeleteModalState}
                                                />
                                            ))
                            }
                            <AddComment user={ user } addComments={ addComments } blogId={ blog.id } />
                        </div>
                    </section>
                </>
                : null
    );
};

export default Blog;
