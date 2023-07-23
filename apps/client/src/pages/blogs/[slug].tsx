import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

import { BsArrow90DegDown, BsArrow90DegUp, BsArrowBarLeft, BsArrowBarRight, BsBookmark, BsCalendar, BsChat, BsChevronRight, BsEye, BsHeart, BsPrinter } from 'react-icons/bs';

import styles from '@/styles/pages/blog.module.scss';

import data from '@/data/comments.data.json';

import { capitalizeFirstLetter, createUniqueKey } from '@/utils/helper.util';

const Tooltip = dynamic(() => import('@/components/tooltips'));
const Comment = dynamic(() => import('@/components/comment/comment.component'));
const AddComment = dynamic(() => import('@/components/comment/add-comment.component'));

const Blog = () =>
{
    const { asPath } = useRouter();

    const [comments, updateComments] = useState<any[]>([]);
    const [deleteModalState, setDeleteModalState] = useState(false);

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
                                sizes={'100'}
                            />
                        </span>
                    </span>
                    <footer data-info>
                        <div>
                            <span>
                                <Image
                                    src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                                    alt='WoW CMS'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes={'100'}
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
                                Published on May 8, 2020 · Updated on January 23, 2023
                                <BsCalendar />
                            </p>
                        </div>
                    </footer>
                    <footer>
                        <div data-stats>
                            <p>
                                85 Comments
                                <BsChat />
                            </p>
                            <p>
                                8585 Likes
                                <BsHeart />
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
                <ul>
                    <li>
                        <Link href='/'>
                            #Tag
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            #Tag
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            #Tag
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            #Tag
                        </Link>
                    </li>
                </ul>
                <div>
                    <Link href='/'>
                        <span>
                            Tutorial
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
                            src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700780850.jpg'
                            alt='WoW CMS'
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes={'100'}
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
    );
};

export default Blog;
