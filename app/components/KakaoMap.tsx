// 카카오맵 위젯 — 기존 AboutLocation.jsx의 SDK 로딩 로직 그대로 이식.
// window/document를 직접 다루므로 페이지 전체가 아니라 이 컴포넌트만 클라이언트 경계로 둔다.
'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

const APP_KEY = '7d5e79e80e99f8fadef7dfde6f87f86a'

export default function KakaoMap({
  lat,
  lng,
  markerLabel,
}: {
  lat: number
  lng: number
  markerLabel: string
}) {
  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById('kakao-map')
      if (!container) return
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 4,
      })
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(lat, lng),
      })
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:6px 12px;font-size:13px;font-weight:600;white-space:nowrap;color:#000;">${markerLabel}</div>`,
      })
      infowindow.open(map, marker)
    }

    if (window.kakao && window.kakao.maps) {
      initMap()
      return
    }
    if (window.kakao) {
      window.kakao.maps.load(initMap)
      return
    }
    if (document.getElementById('kakao-sdk')) return

    const script = document.createElement('script')
    script.id = 'kakao-sdk'
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    script.onload = () => window.kakao.maps.load(initMap)
    document.head.appendChild(script)
  }, [lat, lng, markerLabel])

  return <div id="kakao-map" style={{ width: '100%', height: 360 }} />
}
