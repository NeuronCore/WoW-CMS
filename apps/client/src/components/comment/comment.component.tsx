import dynamic from 'next/dynamic';
import classnames from 'classnames';
import React, { useState } from 'react';

const Button = dynamic(() => import('@/components/button'));
const AddComment = dynamic(() => import('@/components/comment/add-comment.component'));
const DeleteModal = dynamic(() => import('@/components/comment/delete-modal.component'));
const ReplyContainer = dynamic(() => import('@/components/comment/reply-container.component'));
const CommentHeader = dynamic(() => import('@/components/comment/comment-parts/comment-header.component'));
const CommentVotes = dynamic(() => import('@/components/comment/comment-parts/comment-votes.component'));
const CommentFooter = dynamic(() => import('@/components/comment/comment-parts/comment-footer.component'));

import styles from '@/styles/components/comment.module.scss';

const Comment = ({
    commentData,
    updateScore,
    updateReplies,
    editComment,
    commentDelete,
    setDeleteModalState,
    blogId,
    user
}: any) =>
{
    const [content, setContent] = useState(commentData.content);
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const addReply = (newReply: any) =>
    {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const replies = [...commentData?.replies, newReply];

        updateReplies(replies, commentData.id);

        setReplying(false);
    };

    const updateComment = () =>
    {
        editComment(content, commentData.id, 'comment');

        setEditing(false);
    };

    const deleteComment = (id: any, type: any) =>
    {
        const finalType = type !== undefined ? type : 'comment';
        const finalId = id !== undefined ? id : commentData.id;

        commentDelete(finalId, finalType, commentData.id);

        setDeleting(false);
    };

    return (
        <div className={classnames(styles.commentContainer, { [styles.commentReplyContainerGap]: false })} data-reply={false}>
            <div className={styles.comment}>
                <CommentVotes
                    updateScore={updateScore}
                    commentData={commentData}
                    type="comment"
                />
                <div className={styles.commentBody}>
                    <CommentHeader
                        user={user}
                        commentData={commentData}
                        replying={replying}
                        setReplying={setReplying}
                        setDeleting={setDeleting}
                        setDeleteModalState={setDeleteModalState}
                        setEditing={setEditing}
                    />
                    {
                        !editing
                            ?
                            <div className={styles.commentBodyContent}>
                                { commentData.content }
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
                    }
                    {
                        editing &&
                        <Button onClick={updateComment}>
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
                    type="comment"
                />{' '}
            </div>

            {
                replying &&
                <AddComment
                    user={user}
                    blogId={blogId}
                    addComments={addReply}
                    replyingTo={commentData.username}
                />
            }
            {/*{*/}
            {/*    commentData?.replies &&*/}
            {/*    <ReplyContainer*/}
            {/*        key={commentData?.replies.id}*/}
            {/*        commentData={commentData?.replies}*/}
            {/*        updateScore={updateScore}*/}
            {/*        addReply={addReply}*/}
            {/*        editComment={editComment}*/}
            {/*        deleteComment={deleteComment}*/}
            {/*        setDeleteModalState={setDeleteModalState}*/}
            {/*    />*/}
            {/*}*/}

            {
                deleting &&
                <DeleteModal
                    setDeleting={setDeleting}
                    deleteComment={deleteComment}
                    setDeleteModalState={setDeleteModalState}
                />
            }
        </div>
    );
};

export default Comment;
