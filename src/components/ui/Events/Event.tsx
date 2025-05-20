import React from "react";
import styled from "styled-components";

interface EventPropsTypes {
    item: { id: number, title: string, period: { start: number, end: number } };
    posx: number;
    posy: number;
    active: boolean;
    lengthEvents: number;
    onActiveChange: (id: number) => void;
}


export const Event = ({
                          item,
                          posx,
                          posy,
                          active,
                          lengthEvents,
                          onActiveChange,
                      }: EventPropsTypes) => {

    // const calculateAngle = ({current, target}: { current: number, target: number }) => {
    //     const angle = 360 / length;
    //
    //     if (target === length && current === 1) return angle;
    //     if (target === 1 && current === length) return -angle;
    //
    //     if (target < current) return angle * (current - target);
    //
    //     return -angle * (target - current);
    // }

    // const handleClick = () => {
    //     if (item.id === active) return;
    //
    //     const delta = calculateAngle({current: active, target: item.id});
    //     setRotate(rotate + delta);
    // }
    const handleClick = () => {
        onActiveChange(item.id);
    }

    return <EventWrapper posx={posx}
                         posy={posy}
                         isActive={active}
                         lengthEvents={lengthEvents}
                         idEl={item.id}
                         onClick={handleClick}>
        <span>{item.id}</span>
        <EventTitle>{item.title}</EventTitle>
    </EventWrapper>;
}

const EventWrapper = styled.div<{ posx?: number, posy?: number, isActive: boolean, lengthEvents: number, idEl: number }>`
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

    }`;

const EventTitle = styled.span`
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    left: 76px;
    opacity: 0;
    transition: .3s;
    transition-delay: 0.5s;

`;