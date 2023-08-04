import Image from 'next/image';
import { useRouter } from 'next/router';

import FeatureFrame from '@/../public/images/textures/frame_circle.svg';

type Props =
{
    index: number,
    item: any
};

const Features = ({ index, item }: Props) =>
{
    const { locale } = useRouter();

    return (
        <li data-index={ index }>
            <i><span /></i>

            <div>
                <h4>
                    { item['title_' + locale] }
                </h4>
                <p>
                    { item['description_' + locale] }
                </p>
            </div>

            <span>
                <span>
                    <Image
                        src={ `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/feature/${ item.image }` }
                        alt={ item['title_' + locale] }
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes={'100'}
                    />
                </span>

                <FeatureFrame />
            </span>
        </li>
    );
};

export default Features;
