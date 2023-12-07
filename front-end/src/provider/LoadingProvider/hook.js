import { useContext } from "react";

import { LoadingContext } from ".";

const useLoading = () => useContext(LoadingContext);

export default useLoading;
