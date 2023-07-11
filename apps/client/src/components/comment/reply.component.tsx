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

const Reply = ({
    commentData,
    updateScore,
    addNewReply,
    editComment,
    deleteComment,
    setDeleteModalState,
}: any) =>
{
    const [content, setContent] = useState(commentData.content);
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const addReply = (newReply: any) =>
    {
        addNewReply(newReply);
        setReplying(false);
    };

    const commentContent = () =>
    {
        const text = commentData.content.trim().split(' ');
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
        editComment(content, commentData.id, 'reply');
        setEditing(false);
    };

    const deleteReply = () =>
    {
        deleteComment(commentData.id, 'reply');
        setDeleting(false);
    };

    return (
        <div className={classnames(styles.commentContainer, commentData.replies[0] !== undefined ? styles.commentReplyContainerGap : '')}>
            <div className={styles.comment}>
                <CommentVotes
                    updateScore={updateScore}
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
                        <Button>
                            Update
                        </Button>
                    }
                </div>

                <CommentFooter
                    updateScore={updateScore}
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
                    buttonValue={'reply'}
                    addComments={addReply}
                    replyingTo={commentData.username}
                />
            }
            {
                commentData.replies.map((reply: any) =>
                    (
                        <Reply key={reply.id} commentData={reply} addReply={addReply} />
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
