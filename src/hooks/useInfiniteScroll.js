import React, {useEffect} from 'react';

const useInfiniteScroll = ({ target, onIntersect, threshold }) => {
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, {
            threshold
        });
        if (!target) return;

        observer.observe(target);

        return () => {
            observer.unobserve(target);
        }, [target, onIntersect, threshold]
    });

    return (
        <div>

        </div>
    );
};

export default useInfiniteScroll;
