import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";
import { DownOutlined, HeartFilled, SearchOutlined, CompassOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Row, Col, Card } from "antd";

function Home() {
  return (
    <>
      <div style={{ background: "linear-gradient(90deg, #dc2626, #ef4444)", width: "100%", overflow: "hidden", whiteSpace: "nowrap", padding: "10px 0", zIndex: 1100, position: "relative" }}>
        <style>
          {`
            @keyframes marquee-scroll {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .safe-marquee {
              display: inline-block;
              color: white;
              font-weight: 700;
              font-size: 14px;
              letter-spacing: 1px;
              animation: marquee-scroll 25s linear infinite;
            }
          `}
        </style>
        <div className="safe-marquee">
          🚨 HEALTH ALERT (Hyderabad Region): Dengue cases rising. Extremely high demand for Paracetamol and Rehydration Salts. Pharmacies are advised to immediately restock. Users, please verify availability before walking in. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 🚨
        </div>
      </div>
      <Navbar />

      <div style={{
        position: "relative",
        minHeight: "calc(100vh - 80px)",
        background: "linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=2069') center/cover",
        overflow: "hidden",
        display: "flex",
        alignItems: "center"
      }}>
        
        {/* Background Decorative Blur Orbs */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          background: "var(--primary-light)",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.6,
          zIndex: 0
        }} />
        <div style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background: "rgba(16, 185, 129, 0.15)",
          borderRadius: "50%",
          filter: "blur(120px)",
          zIndex: 0
        }} />

        <div className="container" style={{ 
          position: "relative", 
          zIndex: 1, 
          width: "100%", 
          maxWidth: "1200px", 
          margin: "0 auto",
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center"
        }}>
          
          {/* Left Side Typography and Search */}
          <motion.div
            initial={{opacity:0, x:-50}}
            animate={{opacity:1, x:0}}
            transition={{ duration: 0.6 }}
            style={{ position: "relative", zIndex: 10 }}
          >
            <div style={{
              display: "inline-block",
              background: "rgba(16, 185, 129, 0.3)",
              color: "var(--primary-light)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "20px",
              border: "1px solid rgba(16, 185, 129, 0.5)"
            }}>
              ✨ The Future of Pharmacy
            </div>
            
            <h1 style={{
              fontSize: "56px", 
              fontWeight: "800", 
              color: "white",
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-1.5px"
            }}>
              Find Medicines <br/>
              <span style={{ color: "var(--primary)" }}>Instantly.</span>
            </h1>

            <p style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.85)",
              marginBottom: "40px",
              lineHeight: 1.6,
              maxWidth: "480px"
            }}>
              Discover nearby pharmacies, check real-time availability, and reserve your medicines before you arrive. All in one seamless platform.
            </p>

            <div style={{ position: "relative", zIndex: 10 }}>
              <SearchBar />
            </div>
            
            <div style={{ display: "flex", gap: "20px", marginTop: "40px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", fontWeight: 500 }}>
              <span>✅ Verified Pharmacies</span>
              <span>✅ Real-time Stock</span>
              <span>✅ Best Prices</span>
            </div>
          </motion.div>

          {/* Right Side Visuals (floating elements) */}
          <motion.div
            initial={{opacity:0, scale:0.95}}
            animate={{opacity:1, scale:1}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              position: "relative",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%"
            }}
          >
            {/* Main Visual Card */}
            <motion.div 
              className="glass-panel"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{
                width: "90%",
                height: "80%",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                borderRadius: "32px",
                padding: "40px",
                color: "white",
                boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.4)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "absolute",
                zIndex: 2
              }}
            >
              <div>
                <h3 style={{ fontSize: "28px", fontWeight: 700, margin: 0 }}>Paracetamol 500mg</h3>
                <p style={{ opacity: 0.8, margin: "8px 0 0 0", fontSize: "16px" }}>In Stock nearby</p>
              </div>
              
              <div style={{ 
                background: "rgba(255,255,255,0.2)", 
                padding: "20px", 
                borderRadius: "16px",
                backdropFilter: "blur(10px)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontWeight: 600 }}>Apollo Pharmacy</span>
                  <span style={{ background: "white", color: "var(--primary-dark)", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: 700 }}>0.8 km</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "700", fontSize: "18px" }}>₹45.00</span>
                  <span>🟢 Available</span>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Element 1 */}
            <motion.div 
              className="glass-panel"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "-20px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                zIndex: 3
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                🛵
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-main)", margin: 0 }}>Fast Pickup</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>Skip the line</div>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 10
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>Scroll</span>
          <DownOutlined style={{ fontSize: "16px" }} />
        </motion.div>
      </div>

      {/* How it Works Section */}
      <div style={{ padding: "100px 20px", background: "var(--bg-color)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 800, color: "var(--text-main)", marginBottom: "16px" }}>How AUSHADH Works</h2>
            <p style={{ fontSize: "18px", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
              Your complete health journey simplified into three seamless steps.
            </p>
          </div>
          
          <Row gutter={[40, 40]} justify="center">
            <Col xs={24} md={8}>
              <Card 
                bordered={false} 
                style={{ textAlign: "center", borderRadius: "24px", boxShadow: "var(--shadow-soft)", height: "100%" }}
                bodyStyle={{ padding: "40px" }}
              >
                <div style={{ width: "80px", height: "80px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "var(--primary)", margin: "0 auto 24px auto" }}>
                  <SearchOutlined />
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "var(--text-main)" }}>1. Smart Search</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>Type your medicine or simply upload a picture of your doctor's prescription. Our AI instantly reads it.</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card 
                bordered={false} 
                style={{ textAlign: "center", borderRadius: "24px", boxShadow: "var(--shadow-soft)", transform: "translateY(-15px)", height: "100%" }}
                bodyStyle={{ padding: "40px" }}
              >
                <div style={{ width: "80px", height: "80px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "var(--primary)", margin: "0 auto 24px auto" }}>
                  <CompassOutlined />
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "var(--text-main)" }}>2. Compare & Locate</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>View real-time stock and prices across all pharmacies in your city mapped directly to your GPS.</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card 
                bordered={false} 
                style={{ textAlign: "center", borderRadius: "24px", boxShadow: "var(--shadow-soft)", height: "100%" }}
                bodyStyle={{ padding: "40px" }}
              >
                <div style={{ width: "80px", height: "80px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "var(--primary)", margin: "0 auto 24px auto" }}>
                  <CheckCircleOutlined />
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "var(--text-main)" }}>3. Instant Reserve</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>Lock in your medicine with one click and get animated driving directions straight to the pickup counter.</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{
        background: "var(--bg-color)",
        borderTop: "1px solid rgba(16, 185, 129, 0.1)",
        padding: "40px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-main)",
          fontSize: "16px",
          fontWeight: 500
        }}>
          Made with <HeartFilled style={{ color: "#ef4444" }} /> in India
        </div>
        <p style={{ 
          color: "var(--text-muted)", 
          marginTop: "12px", 
          fontSize: "14px",
          fontWeight: 600
        }}>
          Designed & Built by <span style={{ color: "var(--primary)", fontWeight: 800, fontSize: "16px" }}>Charan</span>
        </p>
      </footer>
    </>
  );
}

export default Home;