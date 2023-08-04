import Image from 'next/image';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useState, useEffect } from 'react';

const CommentButton = dynamic(() => import('@/components/comment/comment-parts/comment-button.component'));

import styles from '@/styles/components/comment.module.scss';

import Profile from '@/../public/images/heros/profile.jpg';

import { useUser } from '@/hooks/use-user';

import { timeSince } from '@/utils/helper.util';

const CommentHeader =
({
    commentData,
    replying,
    setReplying,
    setDeleting,
    setDeleteModalState,
    setEditing,
}: any) =>
{
    const [user] = useUser();

    const [time, setTime] = useState<string | number>('');

    const createdAt = new Date(commentData.created_at);
    let differenceInTime = timeSince(createdAt);

    useEffect(() =>
    {
        const timeout = setTimeout(() =>
        {
            differenceInTime = timeSince(createdAt);

            setTime(differenceInTime);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={styles.commentBodyHeader}>
            <div className={classnames(styles.commentBodyHeaderProfile)}>
                <Image
                    src={ commentData.avatar ? `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/avatar/${ commentData.avatar }` : Profile }
                    alt={ commentData.username }
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes={'100'}
                />
            </div>

            <div className={styles.commentBodyHeaderUsername}>
                { commentData.username }
            </div>

            {
                commentData.username === user?.username
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
