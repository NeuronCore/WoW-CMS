import { useState } from 'react';

import { BsDash, BsPlus } from 'react-icons/bs';

import styles from '@/styles/components/comment.module.scss';

import { useUser } from '@/hooks/use-user';

const CommentVotes = ({ updateVote, commentData, type }: any) =>
{
    const [user] = useUser();

    const [votes, setVotes] = useState(commentData.votes || 0);
    const [voted, setVoted] = useState(commentData.isVoted);

    const upVote = async() =>
    {
        if (!user) return;

        if (voted !== 'up')
        {
            const n = Number(votes) + 1;

            setVotes(n);

            await updateVote(n, commentData.id, type, 'up');

            setVoted('up');
        }
    };

    const downVote = async() =>
    {
        if (!user) return;

        if (voted !== 'down')
        {
            const n = Number(votes) - 1;

            setVotes(n);

            await updateVote(n, commentData.id, type, 'down');

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
