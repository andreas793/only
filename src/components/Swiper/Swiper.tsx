import {Navigation, Pagination} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styled from "styled-components";
import {Btn} from "../ui/Events/events.styled";
import {FC} from "react";

interface SliderItem {
    year: string;
    text: string;
}

type SimpleSwiperProps = {
    data: SliderItem[],
    name?:string
}

export const SimpleSwiper: FC<SimpleSwiperProps> = ({data, name}) => {
    return (
        <Wrapper>
            <Btn className={`swiper-review-button-prev ${name}`} onClick={()=>{}}></Btn>
            <Swiper
                breakpoints={{
                    320: {
                        slidesPerView: 1.5,
                        spaceBetween: 25,

                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 80,
                    },
                    grabCursor: true,
                }}
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




const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 100;
    box-sizing: border-box;
    position: relative;
    @media(max-width: 1280px) {
        border-top: 1px solid rgba(66, 86, 122, .1);
        padding-top: 32px;
        margin-bottom: 78px;
        height: 134px;
    }
    .swiper-review-button-next,
    .swiper-review-button-prev{
        min-width: 30px;
        height: 30px;
        margin: 0 15px;
        &:after{
            width: 5px;
            height: 5px;
            border-left-color: #3877EE;
            border-bottom-color: #3877EE;
        }
        @media(max-width: 1280px) {
            display: none;
        }
    }
    .swiper-review-button-next:after{
        left: -2px;
    }
    .swiper-review-button-prev:after{
        left: 2px;
    }
    .swiper-button-disabled{
        opacity: .3;
    }
`;

const Slide = styled(SwiperSlide)`
    p{
        color: #42567A;
    }`;

const Title = styled.h4`
    color: #3877EE;
    margin-bottom: 16px;
`;