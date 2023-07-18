import React, { useRef } from 'react';

import useOutside from '@/hooks/use-outside';

import styles from '@/styles/components/modal.module.scss';

const Modal = ({ setModalState }: any) =>
{
    const modalRef = useRef(null);

    useOutside(modalRef, (() =>
    {
        setModalState({ hidden: true });
    }));

    return (
        <div className={styles.modal}>
            <div className={styles.modalContainerBackground} ref={modalRef}>
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

                <div className={styles.modalContainer}>
                    <div className={styles.modalContainerTitle}>
                        modal comment
                    </div>
                    <div className={styles.modalContainerConfirmationMessage}>
                        Are you sure you want to modal this comment? This will remove the
                        comment and can't be undone.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
