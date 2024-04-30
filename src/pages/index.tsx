import Map from "@/components/home/Map";
import Markers from "@/components/home/Markers";
import { useState } from "react";
import StoreBox from "@/components/home/StoreBox";
import { StoreType } from "@/models/store";
import axios from "axios";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  return (
    <div>
      <Map setMap={setMap} />
      <Markers
        storeDatas={stores}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox currentStore={currentStore} setCurrentStore={setCurrentStore} />
    </div>
  );
}

export async function getStaticProps() {
  const stores = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  );
  return {
    props: {
      stores: stores?.data,
      revalidate: 60 * 60,
    },
  };
}
