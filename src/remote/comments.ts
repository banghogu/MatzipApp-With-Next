import { CommentApiResponse } from "@/models/comments";
import axios from "axios";

export const fetchComments = async ({ page, storeId }) => {
  const { data } = await axios("/api/comments", {
    params: {
      storeId: storeId,
      limit: 5,
      page: page,
    },
  });

  return data as CommentApiResponse;
};
