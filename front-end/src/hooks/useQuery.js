import { useLocation } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();

    const query = new URLSearchParams(search);

    return query;
}

export default useQuery;
