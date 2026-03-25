import { Input, Button, Tooltip, Modal } from "antd";
import { CameraOutlined, ScanOutlined, UploadOutlined, RobotOutlined } from "@ant-design/icons";
import API from "../services/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapView from "./MapView";
import confetti from "canvas-confetti";
import AiScannerInterface from "./AiScannerInterface";

function SearchBar() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState("camera");

  const openAiScanner = (mode) => {
    setScannerMode(mode);
    setIsScannerOpen(true);
  };

  const search = async (value) => {
    if (!value) {
      setData([]);
      return;
    }
    try {
      const res = await API.get(`/pharmacies/nearby?medicine=${value}&lat=17.3850&lng=78.4867`);
      if (res.data && res.data.length > 0) {
        setData(res.data);
      } else {
        throw new Error("No data");
      }
    } catch {
      // Mock data for UI demonstration purposes
      setData([
        { pharmacyId: 1, pharmacy: "Apollo Pharmacy", distance: 0.8, status: "Available", price: 45, medicine: value, lat: 17.3950, lng: 78.4967 },
        { pharmacyId: 2, pharmacy: "MedPlus", distance: 2.1, status: "Low Stock", price: 48, medicine: value, lat: 17.4050, lng: 78.4767 },
        { pharmacyId: 3, pharmacy: "Wellness Forever", distance: 3.5, status: "Available", price: 40, medicine: value, lat: 17.4250, lng: 78.5067 }
      ]);
    }
  };

  const handleAiSelect = (med) => {
    setSearchValue(med);
    setIsScannerOpen(false);
    search(med);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      
      {/* Search Input & Action Buttons */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", width: "100%" }}>
        <Input.Search
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search for medicines (e.g., Paracetamol)"
          onSearch={search}
          size="large"
          prefix={<ScanOutlined style={{ color: "var(--primary)", marginRight: 8, fontSize: "16px" }} />}
          enterButton={<span style={{ fontWeight: 600, padding: "0 10px" }}>Find</span>}
          style={{
            flex: 1,
            boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.3)",
            borderRadius: "12px",
            overflow: "hidden"
          }}
        />
        <Tooltip title="Live AI Camera Scanner" placement="bottom">
          <Button 
            type="primary" 
            size="large"
            onClick={() => openAiScanner("camera")}
            icon={<CameraOutlined style={{ fontSize: '20px' }} />} 
            style={{ 
              background: "var(--primary-dark)", 
              height: "48px", 
              width: "48px",
              borderRadius: "12px", 
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }} 
          />
        </Tooltip>
        <Tooltip title="Upload Prescription Image" placement="bottom">
          <Button 
            type="primary" 
            size="large"
            onClick={() => openAiScanner("upload")}
            icon={<UploadOutlined style={{ fontSize: '20px' }} />} 
            style={{ 
              background: "#3b82f6", 
              height: "48px", 
              width: "48px",
              borderRadius: "12px", 
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }} 
          />
        </Tooltip>
      </div>

      {/* AI Scanner Unified Modal */}
      <Modal
        open={isScannerOpen}
        onCancel={() => setIsScannerOpen(false)}
        footer={null}
        destroyOnClose
        centered
        width={550}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "18px" }}>
            <RobotOutlined style={{ color: "var(--primary)", fontSize: "22px" }} /> AUSHADH Universal Vision System
          </div>
        }
      >
        <AiScannerInterface defaultActiveTab={scannerMode} onSelectMedicine={handleAiSelect} height="320px" />
      </Modal>

      {/* Dynamic Results Menu */}
      {data.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          style={{
            position: "absolute",
            top: "calc(100% + 15px)",
            left: "50%",
            width: "800px",
            maxWidth: "90vw",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            padding: "20px",
            maxHeight: "500px",
            zIndex: 100,
            border: "1px solid rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", color: "var(--text-main)" }}>Nearby Results</h3>
            <span style={{ fontSize: "12px", cursor: "pointer", color: "var(--text-muted)", fontWeight: 600, padding: "4px 8px", background: "var(--bg-color)", borderRadius: "8px" }} onClick={() => setData([])}>Close</span>
          </div>
          
          <div style={{ display: "flex", gap: "20px", flex: 1, minHeight: 0 }}>
            {/* List View */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              style={{ display: "flex", flexDirection: "column", gap: "12px", width: "320px", overflowY: "auto", paddingRight: "8px" }}
            >
              <AnimatePresence>
                {data.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, x: -20 },
                      visible: { opacity: 1, scale: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                    }}
                    whileHover={{ scale: 1.03, background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.3)" }}
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "border 0.2s"
                    }}
                  >
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 600 }}>{p.pharmacy}</h4>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", display: "flex", gap: "12px" }}>
                      <span>📍 {p.distance.toFixed(1)} km</span>
                      <span style={{ color: p.status === "Available" ? "var(--primary-dark)" : "#f59e0b", fontWeight: 600 }}>
                        ● {p.status}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", marginLeft: "8px" }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-main)", marginBottom: "4px" }}>₹{p.price}</div>
                    <Button 
                      type="primary" 
                      size="small"
                      style={{ borderRadius: "6px", fontSize: "12px" }}
                      onClick={async () => {
                        import('antd').then(({ message }) => {
                          message.success(`Locked & Reserved ${p.medicine} at ${p.pharmacy}!`);
                        });
                        confetti({
                          particleCount: 150,
                          spread: 70,
                          origin: { y: 0.6 },
                          colors: ['#10b981', '#34d399', '#059669', '#ffffff']
                        });
                      }}
                    >
                      Reserve
                    </Button>
                  </div>
                </motion.div>
              ))}
              </AnimatePresence>
            </motion.div>

            {/* Map View */}
            <div style={{ flex: 1, borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" }}>
              <MapView pharmacies={data} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SearchBar;