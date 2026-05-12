export default function Splash() {
  const [, setLocation] = useLocation();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // بعد 3.2 ثانية يبدأ التلاشي ثم ينتقل للقائمة
    const fadeTimer = setTimeout(() => setFading(true), 3200);
    const navTimer  = setTimeout(() => setLocation("/menu"), 4000);
    return () => { clearTimeout(fadeTimer); clearTimeout(navTimer); };
  }, []);

  return (
    <motion.div animate={{ opacity: fading ? 0 : 1 }}>
      <img src={logoImg} alt="شعار الجامعة" />
      <h1>دليل كليتي</h1>
      <p>بوابتك الشاملة لخدمات الكلية</p>
      {/* نقاط تحميل متحركة */}
    </motion.div>
  );
}
