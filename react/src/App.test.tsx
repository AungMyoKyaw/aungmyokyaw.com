import { AccessibilityProvider, useAccessibility } from './contexts';
import { useDataFetching } from './hooks';
import { PROFILE_DATA } from './utils';
import { LoadingPage, PortfolioPage } from './components';

// Main App Component (clean and focused)
const AppContent = () => {
  const { prefersReducedMotion } = useAccessibility();
  const { data, loading } = useDataFetching(prefersReducedMotion);

  // Show loading page while data is being fetched
  if (loading.isLoading || !data) {
    return <LoadingPage loading={loading} />;
  }

  // Show portfolio page with data
  return <PortfolioPage data={data} profile={PROFILE_DATA} />;
};

// App wrapper with context providers
const App = () => {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
};

export default App;
