import React from 'react';
import classnames from 'classnames';
import { HiChevronRight } from 'react-icons/hi';

import styles from '@/styles/pages/home.module.scss';

type Props =
    {
        index: number,
        item: { answer: string, question: string },
        faqs: number[],
        setFaqs: Function
    };

const FAQ = ({ index, item, faqs, setFaqs }: Props) =>
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
                    newFaqs = newFaqs.filter((newIndex: number) => newIndex !== index);
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
