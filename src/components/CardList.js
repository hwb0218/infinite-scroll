import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Card from "./Card";
import useObserver from "../hooks/useObserver";

const API = 'https://jsonplaceholder.typicode.com';

const CardList = () => {
    const [cardList, setCardList] = useState([]);
    const [page, setPage] = useState(1);
    const target = useRef(null);
    const isIntersecting = useObserver(target);

    const getCardData = useCallback(async (page) => {
        try {
            const fetchCardData = await fetch(`${API}/comments?_page=${page}&_limit=10`);
            const response = await fetchCardData.json();
            setCardList([...cardList, ...response]);
        } catch (err) {
            console.log(err)
        }
    }, [cardList]);

    useEffect(() => {
        getCardData(page);
    }, [page]);

    useEffect(() => {
        if (isIntersecting) setPage((page) => page + 1);
    }, [isIntersecting]);

    return (
            <CardContainer>
                {cardList.map((card) =>
                    <Card cardData={card} key={card.id} />
                )}
                <div ref={target} />
            </CardContainer>
    );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 33px;
`;

export default CardList;