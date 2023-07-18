import React, { useRef } from 'react';

import useOutside from '@/hooks/use-outside';

import styles from '@/styles/components/modal.module.scss';

const Modal = ({ modal, setModal }: any) =>
{
    const modalRef = useRef(null);

    useOutside(modalRef, (() =>
    {
        setModal({ hidden: true, title: '', description: '' });
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
                        { modal.title }
                    </div>
                    <div className={styles.modalContainerMessage}>
                        { modal.description }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
