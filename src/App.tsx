import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import {Events} from "./components/ui/Events/Events";
import {Wrapper} from "./app.styled";



function App() {
    return (<Wrapper>
            <Events />
        </Wrapper>
    );
}



export default App;
