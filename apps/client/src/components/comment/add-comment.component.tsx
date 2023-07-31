import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AxiosResponse } from 'axios';
import React, { FormEvent, useMemo, useState } from 'react';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/styles/pages/blog.module.scss';

import HttpService from '@/services/http.service';

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

    const httpService = useMemo(() => (new HttpService()), []);

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState<any[]>([]);

    const addComment = (event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        if (comment === '' || comment === ' ') return;
        if (comment.length < 8 || comment.length > 250) return;

        const newComment = { content: comment, username: user.username, avatar: user.avatar, created_at: new Date() };

        addComments(newComment);

        setComment('');

        httpService.post(`/comment/${ replyingTo ? 'reply' : 'create' }/${ replyingTo ? 'comment' : 'blog' }-id/${ replyingTo ? commentId : blogId }`, newComment).then(async(response: AxiosResponse<any>) =>
        {
            if (response.data.error)
                setErrors(response.data.message);
        }).catch(error =>
        {
            if (error.response.data.error)
                setErrors(error.response.data.message);
        });
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
