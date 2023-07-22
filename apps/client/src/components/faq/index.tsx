import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { HiChevronRight } from 'react-icons/hi';

import styles from '@/styles/pages/home.module.scss';

type Props =
    {
        index: number,
        item: any,
        faqs: number[],
        setFaqs: any
    };

const FAQ = ({ index, item, faqs, setFaqs }: Props) =>
{
    const { locale } = useRouter();

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
                    { item['title_' + locale] }
                </p>
                <i>
                    <HiChevronRight />
                </i>
            </div>

            <p>
                { item['description_' + locale] }
            </p>
        </li>
    );
};

export default FAQ;
