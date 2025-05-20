import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    border: 1px solid rgba(66, 86, 122, .1);
    position: relative;
    font-family: "PT Sans", Arial, sans-serif;
    padding: 170px 80px 0 80px;
    box-sizing: border-box;
    &:after {
        display: block;
        content: '';
        width: 100%;
        height: 1px;
        background: rgba(66, 86, 122, .1);
        position: absolute;
        left: 0;
        top: calc(50% - 1px);
        z-index: -5;
    }

    &:before {
        content: '';
        position: absolute;
        display: block;
        width: 1px;
        height: 100%;
        background-color: rgba(66, 86, 122, .1);
        top: 0;
        left: calc(50% - 1px);
        z-index: -5;
    }
`;
