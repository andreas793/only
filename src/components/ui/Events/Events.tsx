import React, {useMemo, useState} from "react";
import styled from "styled-components";
import {Event} from "./Event";
import {Pagination} from "./Pagination";
import CountUp from "react-countup";
import {CountUpText, EventsWrapper, Title, TitleWrapper} from "./events.styled";

const initialState = {
    activeId: 1,
    rotation: 0,
    period: {
        start: 0,
        end: 0,
        oldStart: 0,
        oldEnd: 0
    }
}

const eventsData = [
    {id: 1, title: "Мода", period: {start: 1992, end: 1997}},
    {id: 2, title: "Спорт", period: {start: 1987, end: 1991}},
    {id: 3, title: "Литература", period: {start: 1991, end: 1996}},
    {id: 4, title: "Кино", period: {start: 1999, end: 2004}},
    {id: 5, title: "Музыка", period: {start: 1995, end: 2000}},
    {id: 6, title: "Наука", period: {start: 1993, end: 1998}},
];

export const Events = () => {

    const [state, setState] = useState({
        ...initialState,
        rotation: -60,
        period: {
            ...initialState.period,
            start: eventsData[0].period.start,
            end: eventsData[0].period.end,
            oldStart: eventsData[0].period.start,
            oldEnd: eventsData[0].period.end
        }
    })

    const position = useMemo(()=>{
        const radius = 530 / 2;
        const center = radius;
        return eventsData.map((_, i) => {
            const angle = (i * 2 * Math.PI) / eventsData.length;
            return {
                x: center + radius * Math.cos(angle),
                y: center + radius * Math.sin(angle)
            };
        });
    },[eventsData])

    const calculateAngle = ({current, target}:{ current: number, target: number}) => {
        const lengthAvents = eventsData.length;
        const angle = 360/lengthAvents;

        if(target === lengthAvents && current === 1) return angle;
        if (target === 1 && current === lengthAvents) return -angle;
        if (target < current) return angle * (current - target);
        return -angle * (target - current);
    }

    const handleActiveChange = (newId: number) => {
        const event = eventsData.find(e => e.id === newId);
        const delta = calculateAngle({current: state.activeId, target: newId });
        if(event){
            setState(prev => ({
                ...prev,
                activeId: newId,
                rotation: state.rotation + delta,
                period: {
                    ...prev.period,
                    oldStart: prev.period.start,
                    oldEnd: prev.period.end,
                    start: event.period.start,
                    end: event.period.end
                }
            }));
        }
    }


    return (
        <>
        <TitleWrapper>Исторические <br/> даты</TitleWrapper>
        <Title>
            <CountUpText>
                <CountUp
                    start={state.period.oldStart}
                    end={state.period.start}
                    duration={2}
                    separator={""}
                />
            </CountUpText>
            <CountUpText>
                <CountUp
                    start={state.period.oldEnd}
                    end={state.period.end}
                    duration={2}
                    separator={""}
            /></CountUpText>
        </Title>
        <EventsWrapper rotate={state.rotation}>
            {
                eventsData.map((item, i) => {
                    const {x, y} = position[i];
                    return <Event key={item.id}
                                  item={item}
                                  posx={x}
                                  posy={y}
                                  active={state.activeId === item.id}
                                  onActiveChange={handleActiveChange}
                                  lengthEvents={eventsData.length}
                    />
                })}
        </EventsWrapper>
        <Pagination active={state.activeId} max={eventsData.length} onActiveChange={handleActiveChange} />
    </>)
}



