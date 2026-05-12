export default function Schedule() {
  const scheduleUrl = localStorage.getItem(STORAGE_KEY) || DEFAULT_SCHEDULE_URL;

  return (
    <div>
      <h1>جدول دليل كليتي</h1>

      {/* يعرض الجدول داخل إطار مدمج */}
      <iframe
        src={scheduleUrl}
        onLoad={() => setIframeLoading(false)}
        onError={() => setIframeError(true)}
      />

      {/* لو فشل التحميل يعرض زر للفتح في تبويب مستقل */}
      {iframeError && (
        <a href={scheduleUrl} target="_blank">افتح الجدول</a>
      )}
    </div>
  );
}
