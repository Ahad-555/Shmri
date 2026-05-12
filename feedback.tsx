// إرسال اقتراح
const handleSuggestSubmit = async () => {
  await fetch("/api/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: suggestion }),
  });
};

// إرسال تقييم بالنجوم
const handleRatingSubmit = async () => {
  await fetch("/api/ratings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: rating }), // من 1 إلى 5
  });
};
