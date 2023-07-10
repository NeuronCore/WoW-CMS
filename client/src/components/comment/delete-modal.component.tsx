import React from 'react';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/styles/components/delete-modal.module.scss';

const DeleteModal = ({ setDeleting, deleteComment, setDeleteModalState }: any) =>
{
    const cancelDelete = () =>
    {
        setDeleting(false);
        setDeleteModalState(false);
    };

    const deleteBtnClick = () =>
    {
        deleteComment();
        setDeleteModalState(false);
    };

    return (
        <div className={styles.deleteConfirmationWrapper}>
            <div className={styles.deleteContainerBackground}>
                <i data-top_right>
                    <span/>
                    <span/>
                </i>
                <i data-top_left>
                    <span/>
                    <span/>
                </i>
                <i data-bottom_left>
                    <span/>
                    <span/>
                </i>
                <i data-bottom_right>
                    <span/>
                    <span/>
                </i>

                <div className={styles.deleteContainer}>
                    <div className={styles.deleteContainerTitle}>
                        Delete comment
                    </div>
                    <div className={styles.deleteContainerConfirmationMessage}>
                        Are you sure you want to delete this comment? This will remove the
                        comment and can't be undone.
                    </div>
                    <div className={styles.deleteContainerButtonContainer}>
                        <Button type='text' onClick={cancelDelete}>
                            No, cancel
                        </Button>
                        <Button onClick={deleteBtnClick}>
                            Yes, delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
