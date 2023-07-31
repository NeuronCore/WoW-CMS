import React, { useState } from 'react';

import { BsDash, BsPlus } from 'react-icons/bs';

import styles from '@/styles/components/comment.module.scss';

const CommentVotes = ({ updateScore, commentData, type }: any) =>
{
    const [score, setScore] = useState(commentData.score);
    const [voted, setVoted] = useState(commentData.voted ?? false);

    const upVote = () =>
    {
        if (commentData.currentUser) return;
        if (voted === false)
        {
            const n = score + 1;

            setScore(n);

            updateScore(n, commentData.id, type, 'upvote');

            setVoted(true);
        }
    };

    const downVote = () =>
    {
        if (commentData.currentUser)
            return;

        if (voted === true)
        {
            const n = score - 1;

            setScore(n);

            updateScore(n, commentData.id, type, 'downvote');

            setVoted(false);
        }
    };

    return (
        <div className={styles.commentVotes}>
            <button className={styles.commentVotesPlus} onClick={upVote}>
                <BsPlus />
            </button>

            <div className={styles.commentVotesCounter}>
                { commentData.votes ? commentData.votes.length : 0 }
            </div>

            <button className={styles.commentVotesMinus} onClick={downVote}>
                <BsDash />
            </button>
        </div>
    );
};

export default CommentVotes;
