import styled from "styled-components";

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

const PaginationWrapper = styled.div`
    margin-left: 80px;`;

const Text = styled.div`
    font-size: 14px;
    color: #42567A;
`;

const ActionPanel = styled.div`
    display: flex;
    gap: 20px;`;

const Btn = styled.button<{type?: "next"}>`
    width: 50px;
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