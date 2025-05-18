import { useEffect, useState, useCallback, useMemo } from "react";

const cache: Record<string, any> = {};

const useFetchWithCache = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(!!url);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    if (cache[url]) {
      setData(cache[url]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");

      const result = await res.json();
      cache[url] = result;
      setData(result);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
};

export default useFetchWithCache;
