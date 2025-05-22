import {Navigation} from 'swiper/modules';

import {Swiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Btn} from "../Events/events.styled";
import {FC} from "react";
import {Slide, Title, Wrapper} from "./s.styled";

interface SliderItem {
    year: string;
    text: string;
}

type SimpleSwiperProps = {
    data: SliderItem[],
    name?:string
}

const breakpoints = {
    320: {
        slidesPerView: 1.5,
        spaceBetween: 25,

    },
    1280: {
        slidesPerView: 3,
        spaceBetween: 80,
    },
    grabCursor: true,
}

export const SimpleSwiper: FC<SimpleSwiperProps> = ({data, name}) => {
    return (
        <Wrapper>
            <Btn className={`swiper-review-button-prev ${name}`} onClick={()=>{}}></Btn>
            <Swiper
                breakpoints={breakpoints}
                modules={[Navigation]}
                navigation={{
                    nextEl: `.swiper-review-button-next.${name}`,
                    prevEl: `.swiper-review-button-prev.${name}`,
                }
                }
            >
                { data.map((item, index) => (
                    <Slide key={index}>
                        <Title>{item.year}</Title>
                        <p>{item.text}</p>
                    </Slide>)) }
            </Swiper>
            <Btn className={`swiper-review-button-next ${name}`} type={"next"} onClick={()=>{}}></Btn>
        </Wrapper>
    );
};






