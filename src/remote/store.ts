import axios from "axios";

export async function fetchStores(pageParam = 1) {
  const { data } = await axios("/api/stores?page=" + pageParam, {
    params: {
      limit: 10,
      page: pageParam,
    },
  });
  return data;
}
