import dynamic from 'next/dynamic';
import classnames from 'classnames';
import React, { useState } from 'react';

const Button = dynamic(() => import('@/components/button'));
const AddComment = dynamic(() => import('@/components/comment/add-comment.component'));
const DeleteModal = dynamic(() => import('@/components/comment/delete-modal.component'));
const CommentVotes = dynamic(() => import('@/components/comment/comment-parts/comment-votes.component'));
const CommentFooter = dynamic(() => import('@/components/comment/comment-parts/comment-footer.component'));
const CommentHeader = dynamic(() => import('@/components/comment/comment-parts/comment-header.component'));

import styles from '@/styles/components/comment.module.scss';

import { useUser } from '@/hooks/use-user';

interface Props
{
    commentData: any,
    updateVote?: any,
    addNewReply?: any,
    editComment?: any,
    deleteComment?: any,
    setDeleteModalState?: any
}

const Reply = ({
    commentData,
    updateVote,
    addNewReply,
    editComment,
    deleteComment,
    setDeleteModalState,
}: Props) =>
{
    const [user] = useUser();

    const [content, setContent] = useState(commentData.content);
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const addReply = (newReply: string) =>
    {
        if (addNewReply)
        {
            addNewReply(newReply);
            setReplying(false);
        }
    };

    const commentContent = () =>
    {
        const text: any = commentData.content.trim().split(' ');
        const firstWord = text.shift().split(',');

        return (
            !editing ?
                <div className={styles.commentBodyContent}>
                    <span className={styles.commentBodyContentReplyingTo}>
                        { firstWord }
                    </span>
                    { text.join(' ') }
                </div>
                :
                <textarea
                    className={styles.commentBodyContentEdit}
                    value={content}
                    onChange={(e) =>
                    {
                        setContent(e.target.value);
                    }}
                />
        );
    };

    const updateComment = () =>
    {
        if (editComment)
        {
            editComment(content, commentData.id, 'reply');
            setEditing(false);
        }
    };

    const deleteReply = () =>
    {
        if (deleteComment)
        {
            deleteComment(commentData.id, 'reply');
            setDeleting(false);
        }
    };

    return (
        <div className={classnames(styles.commentContainer, commentData?.replies[0] !== undefined ? styles.commentReplyContainerGap : '')}>
            <div className={styles.comment}>
                <CommentVotes
                    updateVote={updateVote}
                    commentData={commentData}
                    type="reply"
                />
                <div className={styles.commentBody}>
                    <CommentHeader
                        commentData={commentData}
                        setReplying={setReplying}
                        setDeleting={setDeleting}
                        setDeleteModalState={setDeleteModalState}
                        setEditing={setEditing}
                    />

                    { commentContent() }
                    {
                        editing &&
                        <Button onClick={updateComment}>
                            Update
                        </Button>
                    }
                </div>

                <CommentFooter
                    updateVote={updateVote}
                    commentData={commentData}
                    setReplying={setReplying}
                    setDeleting={setDeleting}
                    setDeleteModalState={setDeleteModalState}
                    setEditing={setEditing}
                    type="reply"
                />
            </div>

            {
                replying &&
                <AddComment
                    user={user}
                    commentId={commentData.id}
                    addComments={addReply}
                    replyingTo={commentData.username}
                />
            }
            {
                commentData?.replies.map((reply: { id: string }) =>
                    (
                        <Reply key={reply.id} commentData={reply} addNewReply={addReply} />
                    ))}

            {
                deleting &&
                <DeleteModal
                    setDeleting={setDeleting}
                    deleteComment={deleteReply}
                    setDeleteModalState={setDeleteModalState}
                />
            }
        </div>
    );
};

export default Reply;
