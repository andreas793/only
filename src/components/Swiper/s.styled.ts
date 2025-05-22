import styled from "styled-components";
import {SwiperSlide} from "swiper/react";

export const Wrapper = styled.div`
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

export const Title = styled.h4`
    color: #3877EE;
    margin-bottom: 16px;
`;

export const Slide = styled(SwiperSlide)`
    p{
        color: #42567A;
    }`;