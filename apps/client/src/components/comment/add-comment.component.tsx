import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FormEvent, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/styles/pages/blog.module.scss';
import stylesForm from '@/styles/components/form.module.scss';

import { useUser } from '@/hooks/use-user';

interface Props
{
    blogId?: number,
    addComments: any,
    getComments: any,
    replyingTo?: string,
    commentId?: number
}

const AddComment = ({ addComments, replyingTo, getComments, blogId, commentId }: Props) =>
{
    const [user] = useUser();
    const { t } = useTranslation();

    const [errors, setErrors] = useState<any[]>([]);
    const [comment, setComment] = useState('');

    const addComment = async(event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        if (comment === '' || comment === ' ' || comment.length < 8 || comment.length > 250)
            setErrors([{ content: '1004' }]);

        const newComment = { content: comment, username: user.username, avatar: user.avatar, created_at: new Date(), loading: true };

        addComments(newComment);
        setComment('');

        await axios.post(`/comment/${ replyingTo ? 'reply' : 'create' }/${ replyingTo ? 'comment' : 'blog' }-id/${ replyingTo ? commentId : blogId }`, { content: comment });

        getComments();
    };

    return (
        <form className={styles.blogMainCommentsForm} data-reply={replyingTo} onSubmit={addComment} data-deactive={!user}>
            <textarea
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
                errors[0]
                    ?
                    <p className={stylesForm.messageError} data-relative>
                        { t(`common:${ errors[0].content }`) }
                    </p>
                    : null
            }

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
