import CurrentLocationButton from "@/components/home/CurrentLocation";
import Map from "@/components/home/Map";
import Markers from "@/components/home/Markers";
import StoreBox from "@/components/home/StoreBox";
import { StoreType } from "@/models/store";
import axios from "axios";
import { useQuery } from "react-query";

export default function Home() {
  const fetchStore = async () => {
    const stores = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
    );
    return stores?.data as StoreType[];
  };

  const { data: stores } = useQuery(["stores"], fetchStore);

  return (
    <div>
      <Map />
      <Markers storeDatas={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </div>
  );
}
