export default function Announcements() {
  // تجلب الإعلانات من السيرفر وتحدثها كل 30 ثانية
  const { data: items = [] } = useQuery({
    queryKey: ["/api/announcements"],
    refetchInterval: 30_000,
  });

  return items.map(ann => (
    <div key={ann.id} className={ann.pinned ? "bg-[#004d40] text-white" : "bg-white"}>
      {ann.image && <img src={ann.image} />} {/* صورة الإعلان */}
      {ann.pinned && <span>📌 مثبّت</span>}
      <h2>{ann.title}</h2>
      <p>{ann.body}</p>
      <small>{ann.date}</small>
    </div>
  ));
}
