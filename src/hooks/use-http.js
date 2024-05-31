import { useCallback, useState } from "react";
import HttpError from "../errors/HttpError";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new HttpError(response.status, "Something went wrong!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err)
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
