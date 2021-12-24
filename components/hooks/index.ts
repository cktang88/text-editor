import useSWR from "swr";
import { Folder, Pane } from "../../interfaces";
import { fetcher } from "../util";

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
