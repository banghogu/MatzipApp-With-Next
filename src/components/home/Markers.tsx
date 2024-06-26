/* eslint-disable react-hooks/exhaustive-deps */
import { currentStoreState, locationState, mapState } from "@/atom";
import { StoreType } from "@/models/store";
import React, { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface MarkersProps {
  storeDatas: StoreType[];
}

const Markers = ({ storeDatas }: MarkersProps) => {
  const map = useRecoilValue(mapState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const [location, setLocation] = useRecoilState(locationState);

  const loadKakoMarker = useCallback(() => {
    if (map) {
      storeDatas?.map((store) => {
        var imageSrc = store?.category
            ? `/images/markers/${store?.category}.png`
            : "/images/markers/default.png",
          imageSize = new window.kakao.maps.Size(40, 40),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        var markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng
        );
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });
        marker.setMap(map);

        var content = `<div class="infowindow">${store?.name}</div>`;
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
          setLocation({
            ...location,
            lat: store.lat,
            lng: store.lng,
          });
        });
      });
    }
  }, [map, storeDatas]);
  useEffect(() => {
    loadKakoMarker();
  }, [loadKakoMarker, map]);
  return <></>;
};

export default Markers;
