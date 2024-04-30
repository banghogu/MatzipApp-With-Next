import Loader from "@/components/shared/Loader";
import Loading from "@/components/shared/Loading";
import StoreList from "@/components/stores/StoreList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { StoreType } from "@/models/store";
import { fetchStores } from "@/remote/store";
import React, { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

const StoreListPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(["stores"], ({ pageParam }) => fetchStores(pageParam), {
    getNextPageParam: (lastPage) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });
  const stores: StoreType[] = data?.pages?.map(({ data }) => data).flat();

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-10 mt-2">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading && <Loading />}
        {stores?.map((store, i) => <StoreList key={i} store={store} />)}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
};

export default StoreListPage;
