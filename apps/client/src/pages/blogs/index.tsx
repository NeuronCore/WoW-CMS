import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import styles from '@/styles/pages/blog.module.scss';

import { createUniqueKey, timeCalendar } from '@/utils/helper.util';

import useOutside from '@/hooks/use-outside';

const Input = dynamic(() => import('@/components/input'));
const Preloader = dynamic(() => import('@/components/preloader'));
const BlogsCard = dynamic(() => import('@/components/blogs-card/blogs-card.component'));

const defaultForm =
    {
        tag: '',
        content: ''
    };

const Blogs = () =>
{
    const sortRef = useRef(null);

    const { locale, query } = useRouter();

    const [formValues, setFormValues] = useState(defaultForm);
    const [category, setCategory] = useState('tutorial');
    const [filter, setFilter] = useState({ hidden: true });
    const [sort, setSort] = useState({ hidden: true, by: 'created_at' });
    const [hottestBlogs, setHottestBlogs] = useState<any[] | 'loading'>('loading');
    const [blogs, setBlogs] = useState<any[] | 'loading'>('loading');
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() =>
    {
        (
            async() =>
            {
                try
                {
                    const getBlogs = await axios.get(`/blog/find-all-and-order/type/${ sort.by }?locale=${ locale }&page=${ page }&limit=${ Number(query.limit) > 0 ? Number(query.limit) : 10 }`);

                    if (blogs !== 'loading')
                    {
                        const newBlogs = [...blogs];

                        for (const newBlog of getBlogs.data.data.blogs)
                        {
                            const xBlog = newBlogs.find(xBlog => xBlog.id === newBlog.id);

                            if (!xBlog)
                                newBlogs.push(newBlog);
                        }

                        setBlogs(newBlogs);
                    }
                    else
                        setBlogs(getBlogs.data.data.blogs);

                    setHasMore(getBlogs.data.data.hasMore);
                }
                catch (error)
                {
                    setBlogs([]);
                }
            }
        )();
    }, [page, sort.by]);

    useEffect(() =>
    {
        (
            async() =>
            {
                try
                {
                    const getHottestBlogs = await axios.get(`/blog/find-all-and-order/type/likes?locale=${ locale }&page=1&limit=5`);

                    setHottestBlogs(getHottestBlogs.data.data.blogs);
                }
                catch (error)
                {
                    setHottestBlogs([]);
                }
            }
        )();
    }, [locale]);

    useOutside(sortRef, (() =>
    {
        setSort({ ...sort, hidden: true });
    }));

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    return (
        <>
            <header className={styles.blogNavbarHeaderBlogsPage}>
                <span className={styles.blogHeaderVideo}>
                    <video autoPlay loop>
                        <source src={ `/videos/video_1-${ process.env.NEXT_PUBLIC_THEME }.mp4` } />
                    </video>
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter} />
                    <span className={styles.blogHeaderFilter2} />
                </span>

                <ul>
                    <li>
                        <h1>
                            Hottest Blogs
                        </h1>
                    </li>

                    <li>
                        <input placeholder='Search for characters, pages, and more...' />
                    </li>
                </ul>

                {
                    hottestBlogs === 'loading'
                        ? <Preloader component/>
                        :
                        <div className='container'>
                            {
                                hottestBlogs.map((blog: any, index: number) =>
                                    (
                                        <Link href={ `/blogs/${ blog.slug }` } key={createUniqueKey([blog.id, index, 'blog', 'hottest'])}>
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
                                                    <div>
                                                        <span>
                                                            { timeCalendar(blog.published_at).join('/') }
                                                        </span>
                                                        <p>
                                                            { blog[`meta_title_${ locale }`] }
                                                        </p>
                                                    </div>
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                            }
                        </div>
                }
            </header>

            <ul className={styles.blogsListNavbar}>
                <li className={styles.blogsListNavbarSort} ref={sortRef}>
                    <div className={classnames(styles.blogsListNavbarSortBy, { [styles.blogsListNavbarSortByActive]: !sort.hidden })} onClick={() => setSort({ ...sort, hidden: !sort.hidden })}>
                        {
                            sort.by === 'created_at'
                                ? 'Newest'
                                : sort.by === 'readz'
                                    ? 'Most read'
                                    : sort.by === 'likes'
                                        ? 'Most liked'
                                        : null
                        }
                    </div>

                    <ul className={classnames(styles.blogsListNavbarSortList, { [styles.blogsListNavbarSortListActive]: !sort.hidden })}>
                        <li onClick={() => setSort({ ...sort, hidden: true, by: 'readz' })} className={classnames(styles.blogsListNavbarSortListItem, { [styles.blogsListNavbarSortListItemActive]: sort.by === 'readz' })}>
                            Most read
                        </li>
                        <li onClick={() => setSort({ ...sort, hidden: true, by: 'likes' })} className={classnames(styles.blogsListNavbarSortListItem, { [styles.blogsListNavbarSortListItemActive]: sort.by === 'likes' })}>
                            Most liked
                        </li>
                        <li onClick={() => setSort({ ...sort, hidden: true, by: 'created_at' })} className={classnames(styles.blogsListNavbarSortListItem, { [styles.blogsListNavbarSortListItemActive]: sort.by === 'created_at' })}>
                            Newest
                        </li>
                    </ul>
                </li>

                <li className={styles.blogsListNavbarCategories}>
                    <span onClick={() => setCategory('tutorial')} className={classnames(styles.blogsListNavbarCategoriesItem, { [styles.blogsListNavbarCategoriesItemActive]: category === 'tutorial' })}>
                        Tutorial
                    </span>
                    <span onClick={() => setCategory('updates')} className={classnames(styles.blogsListNavbarCategoriesItem, { [styles.blogsListNavbarCategoriesItemActive]: category === 'updates' })}>
                        Updates
                    </span>
                    <span onClick={() => setCategory('news')} className={classnames(styles.blogsListNavbarCategoriesItem, { [styles.blogsListNavbarCategoriesItemActive]: category === 'news' })}>
                        News
                    </span>
                </li>

                <li className={classnames(styles.blogsListNavbarFilter, { [styles.blogsListNavbarFilterActive]: !filter.hidden })} onClick={() => setFilter({ hidden: !filter.hidden })}>
                    Filters
                </li>
            </ul>
            <div className={classnames(styles.blogsListFilters, { [styles.blogsListFiltersActive]: !filter.hidden })}>
                <Input
                    id='tag'
                    label='Search in Tags'
                    onChange={handleChange}
                />
                <Input
                    id='content'
                    label='Search in Contents'
                    onChange={handleChange}
                />
            </div>

            <div className={styles.blogsList}>
                {
                    blogs === 'loading'
                        ? <Preloader component/>
                        :
                        <InfiniteScroll
                            dataLength={ blogs.length }
                            next={() => setPage(page + 1)}
                            hasMore={ hasMore }
                            loader={ <Preloader component/> }
                        >
                            {
                                blogs.map((blog: any, index: number) =>
                                    (
                                        <BlogsCard blog={ blog } key={ createUniqueKey([blog.id, index, 'blogs_page_1'])}/>
                                    ))
                            }
                        </InfiniteScroll>
                }
            </div>
        </>
    );
};

export default Blogs;
