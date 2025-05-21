import React, {useMemo, useState} from "react";
import {Event} from "./Event";
import {Pagination} from "./Pagination";
import CountUp from "react-countup";
import {CountUpText, EventsWrapper, Title, TitleWrapper} from "./events.styled";
import {SimpleSwiper} from "../../Swiper/Swiper";
import styled from "styled-components";

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

const fashion = [
    {year: "1992", text: "Кристиан Лакруа получил награду за инновационный дизайн, 'За смелое использование цвета и авангардные силуэты'"},
    {year: "1993", text: "Анна Суи признана дизайнером года, 'За демократизацию высокой моды и создание уникального американского стиля'"},
    {year: "1994", text: "Том Форд награжден за вклад в Gucci, 'За революционное обновление итальянского дома моды'"},
    {year: "1995", text: "Иссей Мияке получил приз за инновации, 'За экспериментальный подход к текстилю и форме'"},
    {year: "1996", text: "Александр Маккуин признан восходящей звездой, 'За провокационный дизайн и новаторские технологии'"},
    {year: "1997", text: "Донна Каран награждена за бизнес-достижения, 'За создание успешной модной империи и демократизацию люксовой одежды'"}
];
const sports = [
    {year: "1987", text: "Майкл Джордан признан MVP НБА, 'За революционное влияние на баскетбол и создание нового стиля игры'"},
    {year: "1990", text: "Стефан Эдберг выиграл 'Большой шлем', 'За доминирование в теннисе и создание нового стиля подачи'"},
    {year: "1992", text: "Сборная США по баскетболу выиграла Олимпиаду, 'За создание легендарной Dream Team и популяризацию баскетбола'"},
    {year: "1994", text: "Диего Марадона признан лучшим футболистом года, 'За выдающееся мастерство и вклад в развитие мирового футбола'"},
    {year: "1996", text: "Майкл Джонсон установил мировой рекорд, 'За революционный подход к спринтерскому бегу'"},
    {year: "1998", text: "Зинедин Зидан признан лучшим футболистом мира, 'За техническое совершенство и лидерские качества'"},
    {year: "2000", text: "Усэйн Болт стал чемпионом мира среди юниоров, 'За феноменальную скорость и потенциал'"},
    {year: "2002", text: "Роналдо признан лучшим футболистом мира, 'За невероятное мастерство и результативность'"},
    {year: "2004", text: "Лэнс Армстронг выиграл 'Тур де Франс', 'За преодоление рака и возвращение в большой спорт'"}
];
const literature = [
    {year: "1980", text: "Джон Ле Карре получил премию 'Золотой кинжал', 'За мастерское изображение шпионских интриг и глубокое понимание человеческой природы'"},
    {year: "1981", text: "Уильям Голдинг удостоен Нобелевской премии, 'За романы, которые с художественной силой исследуют проблемы человеческой природы'"},
    {year: "1983", text: "Габриэль Гарсиа Маркес удостоен Нобелевской премии, 'За прозу, в которой фантазия и реальность сливаются в новый континент'"},
    {year: "1984", text: "Кормак Маккарти награжден Пулитцеровской премией, 'За мощное повествование о человеческой стойкости в суровом мире'"},
    {year: "1986", text: "Нагиб Махфуз получил Нобелевскую премию, 'За реализм и глубину в изображении арабской жизни'"},
    {year: "1987", text: "Тони Моррисон получила Пулитцеровскую премию, 'За мощное повествование о расовых отношениях в Америке'"},
    {year: "1988", text: "Умберто Эко награжден премией за роман 'Имя розы', 'За виртуозное сочетание детектива, истории и философии'"},
    {year: "1989", text: "Салман Рушди удостоен премии 'За новаторское соединение восточных и западных традиций в современной прозе'"},
    {year: "1990", text: "Надин Гордимер получила Нобелевскую премию, 'За художественную силу и глубину изображения африканского опыта'"}
];
const cinema = [
    {year: "1999", text: "Оскар за лучший фильм - 'Красота по-американски', 'За глубокое исследование человеческой природы и социальных проблем'"},
    {year: "2000", text: "Золотой медведь - 'Догвилль', 'За новаторский подход к повествованию и исследование человеческой морали'"},
    {year: "2001", text: "Оскар за спецэффекты - 'Властелин колец: Братство кольца', 'За революционное развитие визуальных эффектов в кино'"},
    {year: "2002", text: "Пальмовая ветвь - 'Танцующий с волками', 'За масштабное исследование культурных различий и человеческой духовности'"},
    {year: "2003", text: "Оскар за лучшую женскую роль - Шарлиз Терон, 'Монстр', 'За трансформацию и воплощение реального персонажа'"},
    {year: "2004", text: "Золотой лев - 'Фаворитка', 'За остроумное исследование власти и человеческих отношений'"},
    {year: "2005", text: "Оскар за лучший анимационный фильм - 'Уоллес и Громит: Проклятие кролика-оборотня', 'За новаторский подход к стоп-моушн анимации'"},
    {year: "2006", text: "Пальмовая ветвь - 'Параллельные миры', 'За смелое исследование параллельных реальностей и человеческой любви'"}
];
const music = [
    {year: "1985", text: "Всесоюзный конкурс - Виктор Цой и группа 'Кино', 'За рождение новой волны русского рока и песню 'Перемен'"},
    {year: "1987", text: "Фестиваль 'Рок-панорама' - группа 'Алиса', 'За смелое звучание и социальную направленность творчества'"},
    {year: "1989", text: "Первый рок-фестиваль - группа 'Гражданская оборона', 'За создание уникального стиля и отражение эпохи перемен'"},
    {year: "1991", text: "Премия 'Овация' - группа 'Ария', 'За развитие отечественного хеви-метал и создание новой музыкальной школы'"},
    {year: "1993", text: "Песня года - Алла Пугачёва, 'За сохранение высокого уровня поп-музыки в период перемен'"},
    {year: "1995", text: "Премия 'Звезда' - группа 'Чайф', 'За создание уникального авторского стиля и верность рок-н-роллу'"},
    {year: "1997", text: "Золотой граммофон - 'Иванушки International', 'За популяризацию нового направления в российской поп-музыке'"},
    {year: "1999", text: "Премия 'MTV Russia Music Awards' - Земфира (признана иноагентом), 'За революционный подход к русскому року и создание нового женского вокала'"},
    {year: "2000", text: "Песня года - 'Фабрика звёзд', 'За создание нового формата музыкального шоу и открытие молодых талантов'"}
];
const science = [
    {year: "1989", text: "Создание МААН - 'Международная ассоциация академий наук', 'За объединение научного потенциала постсоветских стран'"},
    {year: "1990", text: "Государственная программа конверсии - 'Преобразование ВПК', 'За переориентацию военных технологий на гражданское производство'"},
    {year: "1991", text: "Реформа финансирования науки - 'Создание инновационных фондов', 'За внедрение рыночных механизмов в научную сферу'"},
    {year: "1992", text: "Постановление о поддержке РАН - 'О мерах по поддержке и развитию', 'За признание фундаментальной науки основой развития страны'"},
    {year: "1993", text: "Указ о поддержке учёных - 'Государственные стипендии', 'За признание важности сохранения научного потенциала'"},
    {year: "1994", text: "Постановление о приватизации - 'Защита научных объектов', 'За сохранение научного потенциала страны'"},
    {year: "1996", text: "Международное сотрудничество - 'Привлечение зарубежных грантов', 'За интеграцию российской науки в мировое научное сообщество'"},
    {year: "1998", text: "Реструктуризация научных институтов - 'Оптимизация системы', 'За создание более эффективной модели организации науки'"}

];

const eventsData = [
    {id: 1, title: "Мода", period: {start: 1992, end: 1997}, slider: fashion},
    {id: 2, title: "Спорт", period: {start: 1987, end: 2004}, slider: sports },
    {id: 3, title: "Литература", period: {start: 1980, end: 1990}, slider: literature},
    {id: 4, title: "Кино", period: {start: 1999, end: 2006}, slider: cinema },
    {id: 5, title: "Музыка", period: {start: 1985, end: 2000}, slider: music, },
    {id: 6, title: "Наука", period: {start: 1989, end: 1998}, slider: science },
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
        },
        slider: eventsData[0].slider,
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
                },
                slider: event.slider,
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
        <Pagination active={state.activeId} max={eventsData.length} onActiveChange={handleActiveChange} />
    </Wrapper>
        <SimpleSwiper data={state.slider} />
        </>)
}

const Wrapper = styled.div`
    @media(max-width: 1280px) {
        
        position: relative;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        gap: 16px;
        order: 1;
    }`;



