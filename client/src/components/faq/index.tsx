import React from 'react';
import classnames from 'classnames';
import { HiChevronRight } from 'react-icons/hi';

import styles from '@/styles/pages/home.module.scss';

const FAQ = ({ index, item, faqs, setFaqs }: any) =>
{
    return (
        <li className={classnames(styles.homeFaqItem, { [styles.homeFaqItemActive]: faqs.includes(index) })}>
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

            <div onClick={() =>
            {
                let newFaqs = faqs;

                if (newFaqs.includes(index))
                    newFaqs = newFaqs.filter(e => e !== index);
                else
                    newFaqs.push(index);

                setFaqs([...newFaqs]);
            }}>
                <p>
                    { item.question }
                </p>
                <i>
                    <HiChevronRight />
                </i>
            </div>

            <p>
                { item.answer }
            </p>
        </li>
    );
};

export default FAQ;
