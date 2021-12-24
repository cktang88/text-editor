// just wraps native fetch
export const fetcher = (...args: any[]) =>
  fetch(...args).then((res) => res.json());
