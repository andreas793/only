import styled from "styled-components";

export const TitleWrapper = styled.div`
    font-size: 56px;
    font-weight: bold;
    margin-bottom: 80px;
    @media(max-width: 1280px){
        font-size: 20px;
        margin-bottom: 56px;
}
`;


export const Title = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 137px;
    font-size: 200px;
    line-height: 160px;
    display: flex;
    justify-content: center;
    z-index: -1;
    gap: 100px;
    @media(max-width: 1280px){
        font-size: 56px;
        margin-bottom: 56px;
        gap: 30px;
    }
`;

export const CountUpText = styled.div`
    color: #3877EE;
    font-weight: bold;
    &:last-child {
        color: deeppink;
    }`;

export const EventsWrapper = styled.div<{rotate: number}>`
    width: 530px;
    height: 530px;
    position: absolute;
    left: calc(50% - 265px);
    top: calc(50% - 265px);
    border-radius: 50%;
    border: 1px solid rgba(66, 86, 122, .1);
    transform: rotate(${({rotate}) => rotate+'deg'});
    transition: transform .5s;
    @media(max-width: 1280px){
        width: auto;
        height: 6px;
        position: relative;
        top: 32px;
        left: 0;
        border: none;
        border-radius: 0;
        transform: none;
        transition: none;
        display: flex;
        gap: 10px;
        max-width: 118px;
    }
`;

export const EventWrapper = styled.div<{ posx?: number, posy?: number, isActive: boolean, lengthEvents: number, idEl: number }>`
    width: ${({isActive}) => isActive ? '56' : '6'}px;
    height: ${({isActive}) => isActive ? '56' : '6'}px;
    overflow: ${({isActive}) => isActive ? 'visible' : 'hidden'};
    border: 1px solid rgba(66, 86, 122, .1);
    background-color: ${({isActive}) => isActive ? '#fff' : '#42567A'};
    color: #42567A;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    left: ${({posx = 0, isActive}) => (posx - (isActive ? 28 : 4))}px;
    top: ${({posy = 0, isActive}) => (posy - (isActive ? 28 : 4))}px;
    transform: rotate(${({idEl, lengthEvents}) => {
    const angleInRadiansEl = (idEl * 2 * Math.PI) / lengthEvents;
    const angleInRadiansLastEl = (lengthEvents * 2 * Math.PI) / lengthEvents;
    const angleInDegreesEl = -(angleInRadiansLastEl - angleInRadiansEl) * (180 / Math.PI);
    return angleInDegreesEl;
}}deg);

    span {
        ${({isActive}) => isActive && 'opacity: 1'};
    }
    @media(max-width: 1280px){
        width: 6px;
        height: 6px;
        background-color: ${({isActive}) => isActive ? '#42567A' : 'rgba(66, 86, 122, .1)'};
        position: initial;
        span {
            display: none;
        }
    }
    
`;

export const EventTitle = styled.span`
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    left: 76px;
    opacity: 0;
    transition: .3s;
    transition-delay: 0.5s;
    
`;


export const PaginationWrapper = styled.div`
    margin-left: 80px;
    margin-bottom: 56px;
    @media(max-width: 1280px){
        order: 1;
        margin-left: 0;
    }
`;

export const Text = styled.div`
    font-size: 14px;
    color: #42567A;
`;

export const ActionPanel = styled.div`
    display: flex;
    gap: 20px;`;

export const Btn = styled.button<{type?: "next"}>`
    width: 50px;
    min-width: 50px;
    height: 50px;
    border: 1px solid #42567A80;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    margin-top: 20px;
    &:after{
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border: 2px solid #42567A;
        border-top-color: transparent;
        border-right-color: transparent;
        position: relative;
        left: ${({type}) => type ? -4 : 4}px;
        transform: rotate(${({type}) => type ? 225 : 45}deg);
    }`;