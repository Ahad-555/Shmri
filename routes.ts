// المصادقة
app.post("/api/auth/verify", async (req, res) => {
  const { password } = req.body;
  if (password === "1234") {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ message: "الرمز غير صحيح" });
  }
});

// الإعلانات
app.get("/api/announcements", async (_req, res) => {
  res.json(await storage.getAnnouncements());
});
app.post("/api/announcements", async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ message: "غير مصرح" });
  const ann = { id: Date.now().toString(), ...req.body, pinned: false,
    date: new Date().toLocaleDateString("ar-SA", { year:"numeric", month:"long", day:"numeric" }) };
  await storage.addAnnouncement(ann);
  res.json(ann);
});
app.delete("/api/announcements/:id", async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ message: "غير مصرح" });
  res.json({ ok: await storage.deleteAnnouncement(req.params.id) });
});
app.patch("/api/announcements/:id/pin", async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ message: "غير مصرح" });
  const ann = await storage.togglePin(req.params.id);
  if (!ann) return res.status(404).json({ message: "غير موجود" });
  res.json(ann);
});

// الاقتراحات
app.post("/api/suggestions", async (req, res) => {
  const s = { id: Date.now().toString(), text: req.body.text.trim(),
    date: new Date().toLocaleDateString("ar-SA", { year:"numeric", month:"long", day:"numeric" }) };
  await storage.addSuggestion(s);
  res.json(s);
});

// التقييمات
app.post("/api/ratings", async (req, res) => {
  const r = { id: Date.now().toString(), value: Number(req.body.value),
    date: new Date().toLocaleDateString("ar-SA", { year:"numeric", month:"long", day:"numeric" }) };
  await storage.addRating(r);
  res.json(r);
});

// الدعم الفني — يحفظ ويرسل إيميل
app.post("/api/support", async (req, res) => {
  const { problemType, message } = req.body;
  await transporter.sendMail({ from: SUPPORT_EMAIL, to: SUPPORT_EMAIL,
    subject: `دعم فني - ${problemType}`, html: `<p>${message}</p>` });
  await storage.addSupportTicket({ id: Date.now().toString(), problemType, message, date: "..." });
  res.json({ success: true });
});

// التصدير Excel
app.get("/api/admin/export", async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ message: "غير مصرح" });
  const ratings = await storage.getRatings();
  const suggestions = await storage.getSuggestions();
  const tickets = await storage.getSupportTickets();
  // يبني ملف xlsx ويرسله
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  res.setHeader("Content-Disposition", `attachment; filename="بيانات.xlsx"`);
  res.send(buffer);
});
