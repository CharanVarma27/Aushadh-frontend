import Navbar from "../components/Navbar";
import AiScannerInterface from "../components/AiScannerInterface";
import { Typography, Row, Col } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

export default function AiScannerPage() {
  const handleAiSelect = (med) => {
    // We navigate to Maps via localStorage communication or user prompt
    // Advanced: store in context/localStorage, or visually confirm
    window.location.href = `/maps`; 
    // Wait, the safest approach for demonstration is to let them copy or direct them.
    // I'll cache the med to localStorage so NearbyStoresMap can auto-load it theoretically.
    localStorage.setItem("aushadh_ai_cache", med);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-color)" }}>
      <Navbar />
      
      <div className="container" style={{ display: "block", paddingTop: "50px", paddingBottom: "60px", maxWidth: "1000px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <Title level={1} style={{ margin: 0, fontWeight: 900, fontSize: "42px", display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", background: "linear-gradient(90deg, var(--primary), #059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              <RobotOutlined style={{ color: "var(--primary)" }} /> Dedicated AI Vision Portal
            </Title>
            <Text type="secondary" style={{ fontSize: "18px", fontWeight: 500, marginTop: "12px", display: "block" }}>
              The industry's most advanced cloud-edge OCR engine. Connect your webcam or upload a file.
            </Text>
          </div>

          <Row justify="center">
            <Col xs={24} lg={22}>
               <AiScannerInterface height="500px" defaultActiveTab="camera" onSelectMedicine={handleAiSelect} />
            </Col>
          </Row>

        </motion.div>
      </div>
    </div>
  );
}
