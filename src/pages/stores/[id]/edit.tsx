import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getStore } from "@/remote/store";
import Loader from "@/components/shared/Loader";
import EditStoreForm from "@/components/EditStore.tsx/EditStoreForm";

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const {
    data: store,
    isFetching,
    isError,
  } = useQuery(`store-${id}`, () => getStore(id), {
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  if (isFetching) {
    return <Loader className="mt-[20%]" />;
  }

  if (store == null) {
    return;
  }

  return <EditStoreForm data={store} />;
}
