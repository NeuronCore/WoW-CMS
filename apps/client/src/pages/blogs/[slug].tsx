import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'html-react-parser';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Fragment, useEffect, useState } from 'react';

import { BsArrow90DegDown, BsArrow90DegUp, BsCalendar, BsChat, BsChevronRight, BsEye, BsHeart, BsHeartFill, BsPrinter } from 'react-icons/bs';

import styles from '@/styles/pages/blog.module.scss';

import { useUser } from '@/hooks/use-user';

import { capitalizeFirstLetter, createUniqueKey, timeString } from '@/utils/helper.util';

import Profile from '@/../public/images/heros/profile.jpg';

const Error = dynamic(() => import('@/components/error'));
const Preloader = dynamic(() => import('@/components/preloader'));
const Comment = dynamic(() => import('@/components/comment/comment.component'));
const AddComment = dynamic(() => import('@/components/comment/add-comment.component'));

const Blog = () =>
{
    const [user] = useUser();
    const { locale, asPath, query } = useRouter();

    const [deleteModalState, setDeleteModalState] = useState(false);
    const [blog, setBlog] = useState<any | 'loading'>('loading');
    const [isLiked, setIsLiked] = useState<boolean | 'loading'>('loading');
    const [comments, setComments] = useState<any[] | 'loading'>('loading');
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() =>
    {
        (
            async() =>
            {
                try
                {
                    const getBlog = await axios.get(`/blog/find-by-slug/${ query.slug }?locale=${ locale }${ user?.id ? `&accountID=${ user.id }` : '' }`);

                    setBlog(getBlog.data.data.blog);
                    setIsLiked(getBlog.data.data.blog.isLiked);
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

                        if (comments !== 'loading')
                        {
                            const newComments = [...comments];

                            for (const newComment of getComments.data.data.comments)
                            {
                                const xComment = newComments.find(xComment => xComment.id === newComment.id);

                                if (!xComment)
                                    newComments.push(newComment);
                            }

                            setComments(newComments);
                        }
                        else
                            setComments(getComments.data.data.comments);

                        setHasMore(getComments.data.data.hasMore);
                    }
                }
                catch (error)
                {
                    setComments([]);
                }
            }
        )();
    }, [blog?.id]);

    const getComments = () =>
    {
        (
            async() =>
            {
                try
                {
                    if (blog?.id)
                    {
                        const getComments = await axios.get(`/comment/find-all/blog-id/${ blog.id }?page=${ page }&limit=20`);

                        if (comments !== 'loading')
                        {
                            const newComments = [...comments];

                            for (const newComment of getComments.data.data.comments)
                            {

                                const xComment = newComments.find(xComment => xComment.id === newComment.id);
                                const zComment = newComments.find(zComment => zComment.loading === true);

                                if (!xComment && !zComment)
                                    newComments.push(newComment);
                            }

                            setComments(newComments);
                        }
                        else
                            setComments(getComments.data.data.comments);

                        setHasMore(getComments.data.data.hasMore);
                    }
                }
                catch (error)
                {
                    setComments([]);
                }
            }
        )();
    };

    const likeHandler = async() =>
    {
        if (!user) return;

        if (isLiked)
            setIsLiked(false);
        else
            setIsLiked(true);

        await axios.post(`/blog/toggle-like/blog-id/${ blog.id }`);
    };

    const updateVote = async(votes: number, id: string, type: string, method: string) =>
    {
        if (comments !== 'loading')
        {
            const updatedComments = [...comments];

            if (type === 'comment')
            {
                updatedComments.forEach((data: { id: string | number, votes: number, voted: boolean }) =>
                {
                    if (data.id === id)
                    {
                        data.votes = votes;
                        data.voted = method === 'up';
                    }
                });
            }
            else if (type === 'reply')
            {
                updatedComments.forEach((comment: { replies: [] }) =>
                {
                    comment.replies.forEach((data: { id: string | number, votes: number, voted: boolean }) =>
                    {
                        if (data.id === id)
                        {
                            data.votes = votes;
                            data.voted = method === 'up';
                        }
                    });
                });
            }

            setComments(updatedComments);

            await axios.post(`/comment/vote/comment-id/${ id }?voteType=${ method }`);
        }
    };

    const addComments = (newComment: string) =>
    {
        if (comments !== 'loading')
            setComments([newComment, ...comments]);
        else
            setComments([newComment]);
    };

    const updateReplies = (replies: [], id: string | number) =>
    {
        if (comments !== 'loading')
        {
            const updatedComments = [...comments];

            updatedComments.forEach((data) =>
            {
                if (data.id === id)
                    data.replies = [...replies];
            });

            setComments(updatedComments);
        }
    };

    const editComment = async(content: string, id: string, type: string) =>
    {
        if (comments !== 'loading')
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

            await axios.patch(`/comment/update/comment-id/${ id }`, {content});
        }
    };

    const commentDelete = async(id: string | number, type: string, parentComment: unknown) =>
    {
        if (comments !== 'loading')
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

            await axios.delete(`/comment/delete/comment-id/${ id }`);
        }
    };

    return (
        blog === 'loading'
            ? <Preloader />
            : blog?.published === 'Confirmed'
                ?
                <>
                    <Head>
                        <title>
                            { blog[`meta_title_${ locale }`] }
                        </title>
                        <meta
                            name='description'
                            content={ blog[`summary_${ locale }`] }
                            key='desc'
                        />
                    </Head>

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
                                        sizes={'100'}
                                    />
                                </span>
                            </span>
                            <footer data-info>
                                <div>
                                    <span>
                                        <Image
                                            src={ blog.avatar ? `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/avatar/${ blog.avatar }` : Profile }
                                            alt={ blog.username }
                                            fill
                                            sizes={'100'}
                                        />
                                    </span>
                                    <div>
                                        By
                                        <h2>
                                            { blog.username }
                                        </h2>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Published on { timeString(blog.published_at) }
                                        {
                                            timeString(blog.updated_at) !== timeString(blog.published_at)
                                                ? <> · Updated on { timeString(blog.updated_at) }</>
                                                : null
                                        }
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
                                <span onClick={likeHandler}>
                                    {
                                        isLiked
                                            ? <BsHeartFill />
                                            : <BsHeart />
                                    }
                                </span>
                                <span onClick={() => window.print()}>
                                    <BsPrinter />
                                </span>
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
                                    src={ blog.avatar ? `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/avatar/${ blog.avatar }` : Profile }
                                    alt={ blog.username }
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes={'100'}
                                />
                            </span>
                            <div>
                                <span>
                                    <h3>
                                        { blog.username }
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

                    <header className={styles.blogsHeader}>
                        <h3>
                            Comments about this blog post
                        </h3>
                    </header>

                    <section className={styles.blogMainComments}>
                        <div className={styles.blogMainCommentsList}>
                            {
                                comments === 'loading'
                                    ? <Preloader component/>
                                    : comments === null
                                        ? null
                                        :
                                        <InfiniteScroll
                                            dataLength={ comments.length }
                                            next={() => setPage(page + 1)}
                                            hasMore={ hasMore }
                                            loader={ <Preloader component/> }
                                        >
                                            {
                                                comments.map((comment: any, index: number) =>
                                                    (
                                                        <Comment
                                                            blogId={blog.id}
                                                            key={createUniqueKey([comment.id, index, 'comment', 'blog', comment.username])}
                                                            commentData={comment}
                                                            updateVote={updateVote}
                                                            getComments={getComments}
                                                            updateReplies={updateReplies}
                                                            editComment={editComment}
                                                            commentDelete={commentDelete}
                                                            setDeleteModalState={setDeleteModalState}
                                                        />
                                                    ))
                                            }
                                        </InfiniteScroll>
                            }
                            <AddComment getComments={ getComments } addComments={ addComments } blogId={ blog.id } />
                        </div>
                    </section>
                </>
                : <Error title='404' message='The blog you wanted could not be found' href='/blogs' link='Back to blogs'/>
    );
};

export default Blog;
