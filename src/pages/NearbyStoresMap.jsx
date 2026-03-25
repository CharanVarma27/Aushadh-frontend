import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import AiScannerInterface from "../components/AiScannerInterface";
import { Button, message, Spin, Typography, Card, Row, Col, Statistic, Tooltip, Modal } from "antd";
import { CompassOutlined, MedicineBoxOutlined, RocketOutlined, CameraOutlined, RobotOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import API from "../services/api";

const { Title, Text } = Typography;

function NearbyStoresMap() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoc, setUserLoc] = useState([17.3850, 78.4867]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const getLiveLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ lat: 17.3850, lng: 78.4867 });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => resolve({ lat: 17.3850, lng: 78.4867 }),
        { timeout: 5000 }
      );
    });
  };

  const fetchNearbyStores = async () => {
    setLoading(true);
    message.loading({ content: 'Acquiring Secure GPS Signal...', key: 'map-locator' });
    const coords = await getLiveLocation();
    setUserLoc([coords.lat, coords.lng]);
    try {
      const res = await API.get(`/pharmacies/all-nearby?lat=${coords.lat}&lng=${coords.lng}`);
      if (res.data && res.data.length > 0) {
        setData(res.data);
        message.success({ content: `Detected ${res.data.length} pharmacies in your vicinity!`, key: 'map-locator' });
      } else {
        throw new Error("No data");
      }
    } catch {
      message.error({ content: 'Connected to demonstration network overlay.', key: 'map-locator' });
      setData([
        { pharmacyId: 1, pharmacy: "Apollo Pharmacy", distance: 0.8, status: "Available", price: 0, medicine: "N/A", lat: coords.lat + 0.01, lng: coords.lng + 0.01 },
        { pharmacyId: 2, pharmacy: "MedPlus", distance: 2.1, status: "Available", price: 0, medicine: "N/A", lat: coords.lat + 0.02, lng: coords.lng - 0.01 },
        { pharmacyId: 3, pharmacy: "Wellness Forever", distance: 3.5, status: "Available", price: 0, medicine: "N/A", lat: coords.lat - 0.015, lng: coords.lng + 0.02 }
      ]);
    }
    setLoading(false);
  };

  const handleAiSelect = async (med) => {
    setIsScannerOpen(false);
    setLoading(true);
    message.loading({ content: `Locating ${med} nearby...`, key: 'ai-locator' });
    try {
      const res = await API.get(`/pharmacies/nearby?medicine=${med}&lat=${userLoc[0]}&lng=${userLoc[1]}`);
      if (res.data && res.data.length > 0) {
        setData(res.data);
        message.success({ content: `Found ${res.data.length} pharmacies stocking ${med}!`, key: 'ai-locator' });
      } else {
        throw new Error("No data");
      }
    } catch {
      // Fallback mock
      setData([
        { pharmacyId: 1, pharmacy: "Apollo Pharmacy", distance: 0.8, status: "Available", price: 45, medicine: med, lat: userLoc[0] + 0.01, lng: userLoc[1] + 0.01 },
        { pharmacyId: 2, pharmacy: "MedPlus", distance: 2.1, status: "Low Stock", price: 48, medicine: med, lat: userLoc[0] + 0.02, lng: userLoc[1] - 0.01 }
      ]);
      message.success({ content: `Mock Locator: Found ${med} nearby.`, key: 'ai-locator' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNearbyStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-color)" }}>
      <Navbar />
      
      <Modal
        open={isScannerOpen}
        onCancel={() => setIsScannerOpen(false)}
        footer={null}
        destroyOnClose
        centered
        width={550}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "18px" }}>
            <RobotOutlined style={{ color: "var(--primary)", fontSize: "22px" }} /> Mobile Prescription Scanner
          </div>
        }
      >
        <AiScannerInterface defaultActiveTab="camera" onSelectMedicine={handleAiSelect} height="320px" />
      </Modal>

      <div className="container" style={{ display: "block", paddingTop: "40px", paddingBottom: "60px", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          
          {/* Header Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <Title level={2} style={{ margin: 0, fontWeight: 900, background: "linear-gradient(90deg, var(--primary), #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "32px" }}>
                Live Health Radar 📍
              </Title>
              <Text type="secondary" style={{ fontSize: "16px", fontWeight: 500 }}>
                Real-time spatial tracking of essential pharmaceutical services.
              </Text>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <Tooltip title="Launch Live Web Camera to Scan Prescription">
                <Button 
                  size="large" 
                  icon={<CameraOutlined style={{fontSize: "20px"}} />} 
                  onClick={() => setIsScannerOpen(true)}
                  style={{ borderRadius: "14px", fontWeight: 700, padding: "0 20px", height: "48px", background: "var(--primary-dark)", color: "white", border: "none" }}
                >
                  AI Scanner
                </Button>
              </Tooltip>
              <Button 
                type="primary" 
                size="large" 
                icon={<CompassOutlined />} 
                onClick={fetchNearbyStores} 
                loading={loading}
                style={{ borderRadius: "14px", fontWeight: 700, padding: "0 24px", height: "48px", boxShadow: "0 8px 16px rgba(16, 185, 129, 0.25)" }}
              >
                Recalibrate
              </Button>
            </div>
          </div>
          
          {/* Stats Glassmorphism Grid */}
          <Row gutter={[24, 24]} style={{ marginBottom: "28px", display: "flex", justifyContent: "center" }}>
            <Col xs={24} md={12}>
              <Card bordered={false} style={{ borderRadius: "20px", background: "linear-gradient(135deg, var(--primary) 0%, #059669 100%)", color: "white", boxShadow: "0 12px 30px rgba(16, 185, 129, 0.3)" }}>
                 <Statistic 
                    title={<span style={{color: "rgba(255,255,255,0.85)", fontWeight: 600}}>Pharmacies Detected</span>} 
                    value={data.length} 
                    valueStyle={{ color: "white", fontWeight: 900, fontSize: "42px", display: "flex", alignItems: "center", gap: "10px" }} 
                    prefix={<MedicineBoxOutlined style={{opacity: 0.8}} />} 
                 />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card bordered={false} style={{ borderRadius: "20px", background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", color: "white", boxShadow: "0 12px 30px rgba(59, 130, 246, 0.3)" }}>
                 <Statistic 
                    title={<span style={{color: "rgba(255,255,255,0.85)", fontWeight: 600}}>Nearest Node Available</span>} 
                    value={data.length > 0 ? `${data[0].distance.toFixed(1)} km` : '...'} 
                    valueStyle={{ color: "white", fontWeight: 900, fontSize: "42px", display: "flex", alignItems: "center", gap: "10px" }} 
                    prefix={<RocketOutlined style={{opacity: 0.8}} />} 
                 />
              </Card>
            </Col>
          </Row>

          {/* Centered Map Container */}
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Card bordered={false} style={{ borderRadius: "28px", boxShadow: "0 25px 50px rgba(0,0,0,0.1)", padding: 0, overflow: "hidden", minHeight: "60vh", width: "100%", maxWidth: "1200px", border: "1px solid rgba(0,0,0,0.04)" }} bodyStyle={{ padding: 0, height: "100%" }}>
              {loading && data.length === 0 ? (
                <div style={{ height: "60vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px", background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)" }}>
                  <Spin size="large" />
                  <Text type="secondary" style={{ fontWeight: 600, fontSize: "16px", color: "#64748b" }}>Establishing secure geospatial connection...</Text>
                </div>
              ) : (
                <div style={{ height: "60vh", width: "100%" }}>
                  <MapView pharmacies={data} userLocation={userLoc} />
                </div>
              )}
            </Card>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default NearbyStoresMap;
