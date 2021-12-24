import useSWR from "swr";

// just wraps native fetch
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export function usePanes() {
  const { data, error } = useSWR(`/api/panes/list`, fetcher);

  return {
    panes: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useFolders() {
  const { data, error } = useSWR(`/api/folders/list`, fetcher);

  return {
    folders: data,
    isLoading: !error && !data,
    isError: error,
  };
}
