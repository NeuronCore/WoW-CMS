import Image from 'next/image';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import React, { useState, useEffect } from 'react';

const CommentButton = dynamic(() => import('@/components/comment/comment-parts/comment-button.component'));

import styles from '@/styles/components/comment.module.scss';

import MasterCard from '@/../public/images/logos/master_card.png';

const CommentHeader = ({
    commentData,
    replying,
    setReplying,
    setDeleting,
    setDeleteModalState,
    setEditing,
}: any) =>
{
    const [time, setTime] = useState<string | number>('');

    const today = new Date();
    const createdAt = new Date(commentData.createdAt);

    useEffect(() =>
    {
        const timeout = setTimeout(() =>
        {
            const differenceInTime = today.getTime() - createdAt.getTime();
            setTime(differenceInTime);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={styles.commentBodyHeader}>
            <div className={classnames(styles.commentBodyHeaderProfile)}>
                <Image
                    src={MasterCard.src}
                    alt='MasterCard'
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className={styles.commentBodyHeaderUsername}>
                { commentData.username }
            </div>

            {
                commentData.currentUser
                    ?
                    <div className={styles.commentBodyHeaderYouTag}>
                        you
                    </div>
                    : ''
            }

            <div className={styles.commentBodyHeaderTime}>
                ・ {`${ time } ago`}
            </div>

            <CommentButton
                commentData={commentData}
                replying={replying}
                setReplying={setReplying}
                setDeleting={setDeleting}
                setDeleteModalState={setDeleteModalState}
                setEditing={setEditing}
            />
        </div>
    );
};

export default CommentHeader;
