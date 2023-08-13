import Image from 'next/image';
import classnames from 'classnames';
import { useRouter } from 'next/router';

import styles from '@/styles/pages/home.module.scss';

interface Props
{
    active: boolean,
    blog: any
}

const BlogsNew = ({ active, blog }: Props) =>
{
    const { locale } = useRouter();

    return (
        <div className={classnames(styles.homeBlogsListSwiperItem, { [styles.homeBlogsListSwiperItemActive]: active })}>
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
                        src={ `${ process.env.NEXT_PUBLIC_SERVER_IP_OR_URL }/account/uploaded-image/thumbnail/${ blog.thumbnail }` }
                        alt={ blog[`meta_title_${ locale }`] }
                        fill
                        sizes={'100'}
                    />
                </span>
            </div>
        </div>
    );
};

export default BlogsNew;
