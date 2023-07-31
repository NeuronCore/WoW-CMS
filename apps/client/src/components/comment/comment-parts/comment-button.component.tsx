import React from 'react';

import { BsPen, BsReply, BsTrash } from 'react-icons/bs';

import styles from '@/styles/components/comment.module.scss';

import { useUser } from '@/hooks/use-user';

const CommentButton = ({
    commentData,
    replying,
    setReplying,
    setDeleting,
    setDeleteModalState,
    setEditing
}: any) =>
{
    const [user] = useUser();

    const showAddComment = () =>
    {
        setReplying(!replying);
    };

    const showDeleteModal = () =>
    {
        setDeleting(true);
        setDeleteModalState(true);
    };

    const showEditComment = () =>
    {
        setEditing(true);
    };

    return (
        user
            ?
            <>
                <div className={styles.commentButton}>
                    {
                        user
                            ?
                            <button className={styles.commentBodyContentReplyingTo} onClick={showAddComment}>
                                <BsReply /> Reply
                            </button>
                            : null
                    }
                    {
                        user.username === commentData.author.username
                            ?
                            <button onClick={showEditComment}>
                                <BsPen /> Edit
                            </button>
                            : null
                    }
                    {
                        user.username === commentData.author.username || user.role === 'admin'
                            ?
                            <button className={styles.commentButtonDelete} data-delete onClick={showDeleteModal}>
                                <BsTrash /> Delete
                            </button>
                            : null
                    }
                </div>
            </>
            : null
    );
};

export default CommentButton;
