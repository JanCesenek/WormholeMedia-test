import { useQuery } from "react-query";
import { api } from "../core/api";

export function usePosts() {
  const path = "/posts";
  const fetch = async () => await api.get(path).then((res) => res.data);
  const data = useQuery(path, fetch);
  return data;
}
