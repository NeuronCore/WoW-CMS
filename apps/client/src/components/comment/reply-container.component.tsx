import React from 'react';
import dynamic from 'next/dynamic';

const Reply = dynamic(() => import('@/components/comment/reply.component'));

import styles from '@/styles/components/comment.module.scss';

const ReplyContainer = ({
    commentData,
    updateScore,
    addReply,
    editComment,
    deleteComment,
    setDeleteModalState,
}: any) =>
{
    return (
        <div className={styles.commentReplyContainer} data-reply>
            {
                commentData.map((comment: { id: string | number }) =>
                    (
                        <Reply
                            key={comment.id}
                            commentData={comment}
                            updateScore={updateScore}
                            addNewReply={addReply}
                            editComment={editComment}
                            deleteComment={deleteComment}
                            setDeleteModalState={setDeleteModalState}
                        />
                    ))
            }
        </div>
    );
};

export default ReplyContainer;
