import { StoreType } from "@/models/store";
import axios from "axios";

export async function fetchStores({ pageParam = "1", searchParams }) {
  const { data } = await axios("/api/stores?page=" + pageParam, {
    params: {
      limit: 10,
      page: pageParam,
      ...searchParams,
    },
  });
  return data;
}

export async function getStore(id: string) {
  const { data } = await axios("/api/stores?id=" + id);
  return data as StoreType;
}
