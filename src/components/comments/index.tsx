import React from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchComments } from "@/remote/comments";

const Comments = ({ storeId }: { storeId: number }) => {
  const { status } = useSession();
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const { data: comments, refetch } = useQuery(
    ["comments", storeId],
    () => fetchComments({ storeId, page }),
    {
      enabled: !!storeId,
    }
  );

  return (
    <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">
      {/* comment form */}
      {status === "authenticated" && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      {/* comment list */}
      <CommentList comments={comments} />
      {/* pagination */}
      {/* <Pagination
        total={comments?.totalPage}
        page={page}
        pathname={`/stores/${storeId}`}
      /> */}
    </div>
  );
};

export default Comments;
