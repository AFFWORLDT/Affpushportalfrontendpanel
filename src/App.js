import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';



// ----------------------------------------------------------------------

export default function App() {
  return (

    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>

  );
}
