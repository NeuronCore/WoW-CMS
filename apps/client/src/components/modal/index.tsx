import { useEffect, useRef } from 'react';

import useOutside from '@/hooks/use-outside';

import styles from '@/styles/components/modal.module.scss';

const Modal = ({ modal, setModal, timeout = 5000 }: any) =>
{
    const modalRef = useRef(null);

    useOutside(modalRef, (() =>
    {
        setModal({ hidden: true, title: '', description: '' });
        modal.onHidden();
    }));

    useEffect(() =>
    {
        (() =>
        {
            setTimeout(() =>
            {
                modal.onHidden();
            }, timeout);
        }
        )();
    }, []);

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
                    <h2 className={styles.modalContainerTitle}>
                        { modal.title }
                    </h2>
                    <p className={styles.modalContainerMessage}>
                        { modal.description }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
