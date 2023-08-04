import dynamic from 'next/dynamic';

const CommentButton = dynamic(() => import('@/components/comment/comment-parts/comment-button.component'));
const CommentVotes = dynamic(() => import('@/components/comment/comment-parts/comment-votes.component'));

import styles from '@/styles/components/comment.module.scss';

const CommentFooter = ({
    updateVote,
    commentData,
    setReplying,
    setDeleting,
    setDeleteModalState,
    setEditing,
    type,
}: any) =>
{
    return (
        <div className={styles.commentFooter}>
            <CommentVotes
                updateVote={updateVote}
                commentData={commentData}
                type={type}
            />

            <CommentButton
                commentData={commentData}
                setReplying={setReplying}
                setDeleting={setDeleting}
                setDeleteModalState={setDeleteModalState}
                setEditing={setEditing}
            />
        </div>
    );
};

export default CommentFooter;
