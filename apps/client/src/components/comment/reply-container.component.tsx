import React from 'react';
import dynamic from 'next/dynamic';

const Reply = dynamic(() => import('@/components/comment/reply.component'));

import styles from '@/styles/components/comment.module.scss';

import { createUniqueKey } from '@/utils/helper.util';

const ReplyContainer = ({
    commentData,
    updateVote,
    addReply,
    editComment,
    deleteComment,
    setDeleteModalState,
}: any) =>
{
    return (
        <div className={styles.commentReplyContainer} data-reply>
            {
                commentData.map((comment: { id: string | number }, index: number) =>
                    (
                        <Reply
                            key={createUniqueKey([comment.id, index, 'comment', 'reply', 'container'])}
                            commentData={comment}
                            updateVote={updateVote}
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
