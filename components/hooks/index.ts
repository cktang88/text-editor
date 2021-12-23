import useSWR from "swr";

// just wraps native fetch
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

function usePanes() {
  const { data, error } = useSWR(`/api/panes/list`, fetcher);

  return {
    panes: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export default usePanes;
