import { useRef } from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './carrousel.module.css';

const Carrousel = props => {

    const swiperRef = useRef(null);
    
    const slideNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    
    const slidePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return(
        <>
            <div className={styles.swiperContainer}>
                <Swiper
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination'
                    }}
                    mousewheel={true}
                    keyboard={true}
                    spaceBetween={15}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        1024: {
                            slidesPerView: props.amountDisplay ? props.amountDisplay : 4,
                            spaceBetween: 15,
                        },
                    }}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                    {props.children}
                </Swiper>
                <div className={styles.navigation}>
                    <div
                        className={`${styles.swiperButton} swiper-button-prev`}
                        onClick={slidePrev}
                    />
                    <div
                        className={`${styles.swiperButton} swiper-button-next`}
                        onClick={slideNext}
                    />
                </div>
                <div className={`${styles.pagination} swiper-pagination`} />
            </div>
        </>
    )
}

export default Carrousel;