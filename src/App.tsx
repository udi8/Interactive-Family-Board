import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FamilyProvider } from './contexts/FamilyContext';
import { ShoppingProvider } from './contexts/ShoppingContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { MemberPage } from './pages/MemberPage';
import { WeatherPage } from './pages/WeatherPage';
import { AdminPage } from './pages/AdminPage';
import { SettingsPage } from './pages/SettingsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/Interactive-Family-Board">
      <FamilyProvider>
        <ShoppingProvider>
          <WeatherProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/member/:id" element={<MemberPage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </Layout>
          </WeatherProvider>
        </ShoppingProvider>
      </FamilyProvider>
    </BrowserRouter>
  );
}

export default App;
