import React from 'react';
import Image from 'next/image';

import FeatureFrame from '@/../public/images/textures/frame_circle.svg';

type Props =
    {
        index: number,
        item: { name: string, description: string, src: string, alt: string }
    };

const Features = ({ index, item }: Props) =>
{
    return (
        <li data-index={ index }>
            <i><span /></i>

            <div>
                <h4>
                    { item.name }
                </h4>
                <p>
                    { item.description }
                </p>
            </div>

            <span>
                <span>
                    <Image
                        src={ item.src }
                        alt={ item.alt }
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </span>

                <FeatureFrame />
            </span>
        </li>
    );
};

export default Features;
