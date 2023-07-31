import React, { useState } from 'react';

import { BsDash, BsPlus } from 'react-icons/bs';

import styles from '@/styles/components/comment.module.scss';

import { useUser } from '@/hooks/use-user';

const CommentVotes = ({ updateVote, commentData, type }: any) =>
{
    const [user] = useUser();

    const [votes, setVotes] = useState(commentData.votes || 0);
    const [voted, setVoted] = useState(commentData.voted);

    const upVote = () =>
    {
        if (!user) return;

        if (voted !== 'up')
        {
            const n = votes + 1;

            setVotes(n);

            updateVote(n, commentData.id, type, 'up');

            setVoted('up');
        }
    };

    const downVote = () =>
    {
        if (!user) return;

        if (voted !== 'down')
        {
            const n = votes - 1;

            setVotes(n);

            updateVote(n, commentData.id, type, 'down');

            setVoted('down');
        }
    };

    return (
        <div className={styles.commentVotes}>
            <button className={styles.commentVotesPlus} onClick={upVote}>
                <BsPlus />
            </button>

            <div className={styles.commentVotesCounter}>
                { commentData.votes || 0 }
            </div>

            <button className={styles.commentVotesMinus} onClick={downVote}>
                <BsDash />
            </button>
        </div>
    );
};

export default CommentVotes;
