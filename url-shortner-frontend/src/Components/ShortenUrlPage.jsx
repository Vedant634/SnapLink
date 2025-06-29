import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const ShortenUrlPage = () => {
  const { url } = useParams();
  const redirectedRef = useRef(false); 

  useEffect(() => {
    if (url && !redirectedRef.current) {
      redirectedRef.current = true;
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${url}`;
    }
  }, [url]);

  return <Loader/>;
};

export default ShortenUrlPage;
