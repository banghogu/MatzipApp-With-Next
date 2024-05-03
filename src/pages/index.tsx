import CurrentLocationButton from "@/components/home/CurrentLocation";
import Map from "@/components/home/Map";
import Markers from "@/components/home/Markers";
import StoreBox from "@/components/home/StoreBox";
import { StoreType } from "@/models/store";
import axios from "axios";

export default function Home({ stores }: { stores: StoreType[] }) {
  return (
    <div>
      <Map />
      <Markers storeDatas={stores} />
      <StoreBox />
      <CurrentLocationButton />
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
