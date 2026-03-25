import { Layout, Dropdown, Menu, Switch } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, UserOutlined, ShopOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import { useTheme } from "../ThemeContext";

const { Header } = Layout;

function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 50px",
      height: "80px",
      borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)"}`,
      background: isDarkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)"
    }}>
      <div>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} height="105" alt="Aushadh Logo" style={{ objectFit: 'contain' }} />
        </Link>
      </div>
      
      <div 
        style={{ display: 'flex', gap: '30px', alignItems: 'center' }}
      >
        <Switch 
          checked={isDarkMode} 
          onChange={toggleTheme} 
          checkedChildren="🌙" 
          unCheckedChildren="☀️"
          style={{ background: isDarkMode ? '#4b5563' : '#d1d5db' }}
        />
        <Link to="/" style={{ color: "var(--text-main)", fontWeight: 500, textDecoration: "none", fontSize: "16px" }}>Home</Link>
        <Link to="/maps" style={{ color: "var(--text-main)", fontWeight: 500, textDecoration: "none", fontSize: "16px" }}>Live Maps</Link>
        
        <Dropdown 
          menu={{
            items: [
              {
                key: '1',
                icon: <UserOutlined style={{color: "var(--primary)"}}/>,
                label: <Link to="/dashboard" style={{ fontWeight: 600 }}>User Dashboard</Link>,
                style: { borderRadius: "8px", padding: "10px 16px" }
              },
              {
                key: '2',
                icon: <ShopOutlined style={{color: "#0284c7"}}/>,
                label: <Link to="/pharmacy" style={{ fontWeight: 600 }}>Pharmacy Portal</Link>,
                style: { borderRadius: "8px", padding: "10px 16px" }
              },
              {
                key: '3',
                icon: <SafetyCertificateOutlined style={{color: "#7c3aed"}}/>,
                label: <Link to="/admin" style={{ fontWeight: 600 }}>Admin Panel</Link>,
                style: { borderRadius: "8px", padding: "10px 16px" }
              }
            ],
            style: { borderRadius: "12px", padding: "8px", width: "220px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }
          }}
          placement="bottomRight"
        >
          <span style={{ 
            color: "var(--text-main)", 
            fontWeight: 500, 
            fontSize: "16px", 
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            Preview Dashboards <DownOutlined style={{ fontSize: "12px" }} />
          </span>
        </Dropdown>

        <Link to="/login" style={{ color: "var(--text-main)", fontWeight: 500, textDecoration: "none", fontSize: "16px" }}>Login</Link>
        <Link to="/register" style={{ 
          background: "var(--primary)", 
          color: "white", 
          padding: "8px 20px", 
          borderRadius: "8px",
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => e.target.style.background = "var(--primary-dark)"}
        onMouseLeave={(e) => e.target.style.background = "var(--primary)"}
        >Get Started</Link>
      </div>
    </Header>
  );
}

export default Navbar;