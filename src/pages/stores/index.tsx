import Loader from "@/components/shared/Loader";
import Loading from "@/components/shared/Loading";
import SearchFilter from "@/components/stores/SearchFilter";
import StoreList from "@/components/stores/StoreList";
import useDebounce from "@/hooks/useDebounce";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { StoreType } from "@/models/store";
import { fetchStores } from "@/remote/store";
import React, { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { BiError } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { searchState } from "@/atom";

const StoreListPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const searchValue = useRecoilValue(searchState);
  const debouncedKeyword = useDebounce(searchValue?.q);

  const searchParams = {
    q: debouncedKeyword,
    district: searchValue?.district,
  };

  const {
    data,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(
    ["stores", searchParams],
    ({ pageParam }) => fetchStores({ pageParam, searchParams }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
      refetchOnWindowFocus: false,
    }
  );
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
      <SearchFilter />
      {debouncedKeyword != "" && stores?.length == 0 && (
        <div className="flex justify-center items-center font-bold mt-44">
          <BiError className="text-xl" />
          검색결과가 존재하지 않습니다
        </div>
      )}
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading && <Loading />}
        {stores?.map((store, i) => <StoreList key={i} store={store} />)}
      </ul>
      {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
};

export default StoreListPage;
