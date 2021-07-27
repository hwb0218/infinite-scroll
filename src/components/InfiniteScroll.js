import React, { useRef, useEffect } from 'react';
import useTargetObserver from "../hooks/useTargetObserver";

const InfiniteScroll = ({ children, trigger, length, id, isLoaded }) => {
    const target = useRef(null);
    const isIntersecting = useTargetObserver({ threshold: 1 }, target);

    const needMoreList = (id % length) === 0;

    useEffect(() => {
        if (isIntersecting && needMoreList) {
            trigger();
        }
    }, [isIntersecting, needMoreList]);

    return (
        <>
            {children}
            {isLoaded && needMoreList && <div ref={target} />}
        </>
    );
};

export default InfiniteScroll;