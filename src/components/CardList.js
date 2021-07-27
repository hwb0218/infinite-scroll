import React, { useEffect, useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const CardList = () => {
    const [cardList, setCardList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const target = useRef(null);

    const onIntersect = ([entry]) => {
        setIsVisible(entry.isIntersecting);
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10')
            .then((response) => response.json())
            .then((data) => setCardList(data));

        const observer = new IntersectionObserver(onIntersect, options);
        if (target.current) observer.observe(target.current);

        return () => {
            if(target.current) observer.unobserve(target.current);
        }
    }, [setCardList, target, options]);

    return (
            <CardContainer>
                <div style={{ position: 'fixed'}}>{isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'}</div>
                {cardList.map((data, index) => {
                    const lastCard = index === cardList.length - 1;
                    return (
                        <Card ref={lastCard ? target : null} key={data.id}>
                            <div>
                                <span>Comment id</span>
                                <span>{data.id}</span>
                            </div>
                            <EmailWrapper>
                                <span>Email</span>
                                <span>{data.email}</span>
                            </EmailWrapper>
                            <div>
                                <p>Comment</p>
                                <div>{data.body}</div>
                            </div>
                        </Card>
                    );
                })}
            </CardContainer>
    );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 33px;
`;

const Card = styled.div`
  width: 500px;
  padding: 20px;
  border: 0.5px solid #CED4D4;
  border-radius: 20px;
  background: #F8F9FA;
  
  & + & {
    margin-top: 14px;
  } 
`;

const EmailWrapper = styled.div`
  margin: 10px 0;
`;

export default CardList;