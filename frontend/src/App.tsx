import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CalculatorView } from './views/CalculatorView';
import { useSettingsStore } from './store/settingsStore';

const queryClient = new QueryClient();

function App() {
  const theme = useSettingsStore(state => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <CalculatorView />
    </QueryClientProvider>
  );
}

export default App;
