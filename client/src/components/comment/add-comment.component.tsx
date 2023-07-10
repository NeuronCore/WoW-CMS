import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/styles/pages/blog.module.scss';

const AddComment = ({ addComments, replyingTo }: any) =>
{
    const replyingToUser = replyingTo ? `@${ replyingTo }, ` : '';
    const [comment, setComment] = useState(replyingToUser);

    const clickHandler = () =>
    {
        if (comment === '' || comment === ' ') return;

        const newComment =
            {
                id: Math.floor(Math.random() * 100) + 5,
                content: replyingToUser + comment.replace(replyingToUser, ''),
                createdAt: new Date(),
                score: 0,
                username: 'juliusomo',
                currentUser: true,
                replies: [],
            };

        addComments(newComment);

        setComment('');
    };

    return (
        <div className={styles.blogMainCommentsForm}>
            <form>
                <textarea
                    className={styles.addCommentInput}
                    value={comment}
                    onChange={(e) =>
                    {
                        setComment(e.target.value);
                    }}
                    placeholder='Your comment content'
                />
            </form>

            <Button onClick={clickHandler}>
                Confirm
            </Button>
        </div>
    );
};

export default AddComment;
