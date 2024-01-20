import { useEffect, useState } from "react";

const useFetch = (url, option, errorMessage) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const [restaurants, setRestaurants] = useState(null);
    const searchParams = new URLSearchParams(window.location.search);
    const initialPageIndex = parseInt(searchParams.get('page')) || 1;
    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    useEffect(() => {
        void fetchRestaurant(url, option, errorMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex]);
    const fetchRestaurant = async (url, option, errorMessage) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`${url}?pagination[page]=${pageIndex}&pagination[pageSize]=12`, option);
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            const json = await response.json();
            setRestaurants(json);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return { isLoading, error, restaurants, setPageIndex, pageIndex }
}

export default useFetch;