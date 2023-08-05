import Image from 'next/image';
import { Autoplay } from 'swiper';
import classnames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from '@/styles/pages/home.module.scss';

import Logo from '@/components/logo';

interface Props
{
    active: boolean,
    realm: any
}

const RealmsCard = ({ active, realm }: Props) =>
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
                    <span data-background>
                        <Image
                            src={ Logo() }
                            alt={ 'WoW-CMS' }
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes={'100'}
                        />
                        <span className={styles.homeHeaderFilter} />
                        <span className={styles.homeHeaderFilter} />
                        <span className={styles.homeHeaderFilter2} />
                    </span>
                    <Swiper
                        slidesPerView={1}
                        grabCursor
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        modules={[ Autoplay ]}
                    >
                        <SwiperSlide>
                            <div data-stats>
                                <span>
                                    <i data-online={ true }/>
                                online since 13h 57m
                                </span>
                                <p>
                                            PvE
                                    <i>
                                                x1.5
                                    </i>
                                </p>
                                <h5>
                                            Oribos
                                </h5>
                                <b>
                                    <span>
                                    2367
                                    </span>
                                            connected players
                                </b>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div data-stats>
                                <span>
                                    <i data-online={ true }/>
                                online since 13h 57m
                                </span>
                                <p>
                                            PvE
                                    <i>
                                                x1.5
                                    </i>
                                </p>
                                <h5>
                                            Oribos
                                </h5>
                                <b>
                                    <span>
                                    2367
                                    </span>
                                            connected players
                                </b>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    <span>
                        <Image
                            src={ Logo() }
                            alt={ 'WoW-CMS' }
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes={'100'}
                        />
                    </span>
                </span>
            </div>
        </div>
    );
};

export default RealmsCard;
