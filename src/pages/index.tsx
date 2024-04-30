import Map from "@/components/home/Map";
import Markers from "@/components/home/Markers";
import { useState } from "react";
import * as stores from "@/data/store_data.json";
import StoreBox from "@/components/home/StoreBox";

export default function Home() {
  const storeDatas = stores?.["DATA"];
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  return (
    <div>
      <Map setMap={setMap} />
      <Markers
        storeDatas={storeDatas}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox currentStore={currentStore} setCurrentStore={setCurrentStore} />
    </div>
  );
}
