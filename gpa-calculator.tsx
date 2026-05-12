// جدول تحويل الدرجات
const GRADE_SCALE = [
  { label: "A+", min: 95, points: 5.00 },
  { label: "A",  min: 90, points: 4.75 },
  { label: "B+", min: 85, points: 4.50 },
  // ...
];

// حساب المعدل الفصلي
const calculate = () => {
  let totalPoints = 0, totalHours = 0;
  for (const course of courses) {
    const total = mid + yearWork + final; // مجموع الدرجات
    const { points } = getGradeInfo(total);
    totalPoints += hours * points;
    totalHours += hours;
  }
  setGpa(totalPoints / totalHours); // المعدل النهائي
};

// حساب التراكمي
const calculateCumulative = () => {
  let totalPoints = 0, totalHrs = 0;
  for (const sem of semesters) {
    totalPoints += sem.gpa * sem.hours;
    totalHrs += sem.hours;
  }
  setCumGpa(totalPoints / totalHrs);
};
