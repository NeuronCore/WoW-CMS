import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FormEvent, useState } from 'react';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/styles/pages/blog.module.scss';

import { useUser } from '@/hooks/use-user';

interface Props
{
    blogId?: number,
    addComments: any,
    replyingTo?: string,
    commentId?: number
}

const AddComment = ({ addComments, replyingTo, blogId, commentId }: Props) =>
{
    const [user] = useUser();

    const [comment, setComment] = useState('');

    const addComment = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        if (comment === '' || comment === ' ') return;
        if (comment.length < 8 || comment.length > 250) return;

        const newComment = { content: comment, username: user.username, avatar: user.avatar, created_at: new Date() };

        addComments(newComment);

        setComment('');

        await axios.post(`/comment/${ replyingTo ? 'reply' : 'create' }/${ replyingTo ? 'comment' : 'blog' }-id/${ replyingTo ? commentId : blogId }`, { content: comment });
    };

    return (
        <form className={styles.blogMainCommentsForm} data-reply={replyingTo} onSubmit={addComment} data-deactive={!user}>
            <textarea
                required
                disabled={!user}
                className={styles.addCommentInput}
                value={comment}
                onChange={(e) =>
                {
                    setComment(e.target.value);
                }}
                placeholder='Your comment content'
            />

            {
                !user
                    ? <p><Link href='/login'>Login</Link> to your account to leave a comment</p>
                    : null
            }

            <Button disabled={!user}>
                    Confirm
            </Button>
        </form>
    );
};

export default AddComment;
