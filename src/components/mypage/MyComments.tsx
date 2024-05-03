import React from "react";
import CommentList from "../comments/CommentList";
import { useRouter } from "next/router";
import axios from "axios";
import { CommentApiResponse } from "@/models/comments";
import { useQuery } from "react-query";

const MyComments = () => {
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?&limit=5&page=${page}&user=${true}`
    );

    return data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery(
    `comments-${page}`,
    fetchComments
  );

  return (
    <>
      <div className="mt-12 px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          내가 쓴 리뷰
        </h3>
      </div>
      <CommentList comments={comments} displayStore={true} />
    </>
  );
};

export default MyComments;
