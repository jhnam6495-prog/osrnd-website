// 구글맵 위젯 — API 키 없이 쓸 수 있는 기본 iframe 임베드. JS SDK가 필요 없어 Server Component에서도 그대로 사용 가능.
export default function GoogleMap({ lat, lng, label }: { lat: number; lng: number; label?: string }) {
  const query = label ? `${label}@${lat},${lng}` : `${lat},${lng}`

  return (
    <iframe
      title="OSRnD 위치 지도"
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`}
      style={{ width: '100%', height: 360, border: 0, display: 'block' }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
