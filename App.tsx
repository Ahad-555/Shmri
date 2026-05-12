// يربط كل الصفحات
function Router() {
  return (
    <Layout>
      <AnnouncementBanner /> {/* بانر الإعلانات الجديدة */}
      <Switch>
        <Route path="/"              component={Login} />
        <Route path="/menu"          component={MainMenu} />
        <Route path="/schedule"      component={Schedule} />
        <Route path="/gpa-calculator" component={GpaCalculator} />
        <Route path="/quick-guide"   component={QuickGuide} />
        <Route path="/announcements" component={Announcements} />
        <Route path="/feedback"      component={Feedback} />
        <Route path="/admin"         component={Admin} />
      </Switch>
    </Layout>
  );
}
