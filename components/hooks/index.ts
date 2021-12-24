import useSWR from "swr";
import { Folder, Pane } from "../../interfaces";

// just wraps native fetch
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export function usePanes() {
  const { data, error } = useSWR(`/api/pane/list`, fetcher);

  return {
    panes: data,
    isLoading: !error && !data,
    isError: error,
  } as { panes: Pane[]; isLoading: boolean; isError: boolean };
}
export function useFolders() {
  const { data, error } = useSWR(`/api/folder/list`, fetcher);

  return {
    folders: data,
    isLoading: !error && !data,
    isError: error,
  } as { folders: Folder[]; isLoading: boolean; isError: boolean };
}
