import React, {useCallback, useMemo, useState} from "react";
import {Event} from "./Event";
import {Pagination} from "./Pagination";
import CountUp from "react-countup";
import {CountUpText, EventsWrapper, Section, Title, TitleWrapper, Wrapper} from "./events.styled";
import {SimpleSwiper} from "../Swiper/Swiper";
import styled from "styled-components";
import {eventsData} from "./DataEvets";

const initialState = {
    activeId: 1,
    rotation: 0,
    period: {
        start: 0,
        end: 0,
        oldStart: 0,
        oldEnd: 0
    },
    slider: {}
}


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
        },
        slider: eventsData[0].slider,
    })

    const position = useMemo(() => {
        const radius = 530 / 2;
        const center = radius;
        return eventsData.map((_, i) => {
            const angle = (i * 2 * Math.PI) / eventsData.length;
            return {
                x: center + radius * Math.cos(angle),
                y: center + radius * Math.sin(angle)
            };
        });
    }, [eventsData])

    const calculateAngle = useCallback(({current, target, lengthAvents}: {
        current: number,
        target: number,
        lengthAvents: number
    }) => {
        const angle = 360 / lengthAvents;

        if (target === lengthAvents && current === 1) return angle;
        if (target === 1 && current === lengthAvents) return -angle;
        if (target < current) return angle * (current - target);
        return -angle * (target - current);
    }, [state])

    const handleActiveChange = (newId: number) => {
        const event = eventsData.find(e => e.id === newId);
        const delta = calculateAngle({current: state.activeId, target: newId, lengthAvents: eventsData.length});
        if (event) {
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
                },
                slider: event.slider,
            }));
        }
    }


    return (
        <Section>
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
            <Wrapper>
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
                <Pagination active={state.activeId} max={eventsData.length} onActiveChange={handleActiveChange}/>
            </Wrapper>
            <SimpleSwiper data={state.slider}/>
        </Section>)
}




