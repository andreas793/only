import React from 'react';
import './App.css';
import {Events} from "./components/ui/Events/Events";
import {Wrapper} from "./app.styled";
import {SimpleSwiper} from "./components/Swiper/Swiper";



function App() {
    return (<Wrapper>
            <Events />
        </Wrapper>
    );
}



export default App;
