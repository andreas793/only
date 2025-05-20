import React from "react";
import styled from "styled-components";
import {EventTitle, EventWrapper} from "./events.styled";

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

