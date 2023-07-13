import React from 'react';
import classnames from 'classnames';

import { BsPen, BsReply, BsTrash } from 'react-icons/bs';

import styles from '@/styles/components/comment.module.scss';

interface Props
{
    commentData: { currentUser: unknown },
    replying: Function,
    setReplying: Function,
    setDeleting: Function,
    setDeleteModalState: Function,
    setEditing: Function
}

const CommentButton = ({
    commentData,
    replying,
    setReplying,
    setDeleting,
    setDeleteModalState,
    setEditing,
}: Props) =>
{
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
        <div className={styles.commentButton}>
            <button
                className={classnames(styles.commentBodyContentReplyingTo, !commentData.currentUser ? '' : 'display--none')}
                onClick={showAddComment}
            >
                <BsReply /> Reply
            </button>
            <button
                className={classnames(styles.commentButtonDelete, commentData.currentUser ? '' : 'display--none')}
                data-delete
                onClick={showDeleteModal}
            >
                <BsTrash /> Delete
            </button>
            <button
                className={classnames(commentData.currentUser ? '' : 'display--none')}
                onClick={showEditComment}
            >
                <BsPen /> Edit
            </button>
        </div>
    );
};

export default CommentButton;
