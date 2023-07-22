import React from 'react';
import Image from 'next/image';
import classnames from 'classnames';

import styles from '@/styles/pages/home.module.scss';

interface Props
{
    active: boolean,
    item: { name: string, src: string, alt: string }
}

const BlogsHot = ({ active, item }: Props) =>
{
    return (
        <div className={classnames(styles.homeHeaderItem, { [styles.homeHeaderItemActive]: active })}>
            <div>
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
                <span>
                    <Image
                        src={ item.src }
                        alt={ item.alt }
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes={'100'}
                    />
                    <div>
                        <span>
                            6/27/2023
                        </span>
                        <p>
                            { item.name }
                        </p>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default BlogsHot;
