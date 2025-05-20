import styled from "styled-components";
import {ActionPanel, Btn, PaginationWrapper, Text} from "./events.styled";

interface PaginationProps {
    active: number;
    max: number;
    onActiveChange: (id: number) => void;
}

export const Pagination = ({active, max, onActiveChange}:PaginationProps) => {

    const prevClick = () => {
        onActiveChange(active === 1 ? max : --active);
    };

    const nextClick = () => {
        onActiveChange(active === max ? 1 : ++active);
    }

    return (<PaginationWrapper>
        <Text>{active < 10 ? "0" + active : active}/{max < 10 && "0"}{max}</Text>
        <ActionPanel>
            <Btn onClick={prevClick}/>
            <Btn onClick={nextClick} type={"next"}/>
        </ActionPanel>
    </PaginationWrapper>)
}