import { Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import AdminPanel from "./pages/AdminPanel";
import NearbyStoresMap from "./pages/NearbyStoresMap";
import AiScannerPage from "./pages/AiScannerPage";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { ErrorBoundary } from "./ErrorBoundary";

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#10b981',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          borderRadius: 8,
          colorBgContainer: isDarkMode ? '#1f2937' : '#ffffff',
          colorText: isDarkMode ? '#f3f4f6' : 'rgba(0, 0, 0, 0.88)',
        },
        components: {
          Button: {
            controlHeight: 45,
            borderRadius: 12,
            fontWeight: 600,
          },
          Input: {
            controlHeight: 45,
            borderRadius: 12,
          }
        }
      }}
    >
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/maps" element={<NearbyStoresMap />} />
          <Route path="/ai-scanner" element={<AiScannerPage />} />
        </Routes>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      {/* Vite HMR remount trigger */}
      <AppContent />
    </ThemeProvider>
  );
}

export default App;