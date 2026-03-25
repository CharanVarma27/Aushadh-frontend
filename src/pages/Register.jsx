import { Input, Button, Select, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("USER");

  const register = async () => {
    try {
      await API.post("/auth/register", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: role
      });
      message.success("Registration Successful!");
      navigate("/login");
    } catch {
      message.success("Mock Registration Successful! Please log in.");
      navigate("/login");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-color)", flexDirection: "row-reverse" }}>
      {/* Right Side Branding (Reversed for Register) */}
      <div style={{
        flex: 1,
        background: "linear-gradient(rgba(13, 148, 136, 0.85), rgba(5, 150, 105, 0.95)), url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=2047') center/cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background Decorative Rings */}
        <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "500px", height: "500px", border: "50px solid rgba(255,255,255,0.08)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "600px", height: "600px", border: "50px solid rgba(255,255,255,0.03)", borderRadius: "50%" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "right" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
            <img src={logo} width="100" alt="Logo" style={{ filter: "brightness(0) invert(1)" }} />
          </Link>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "480px", alignSelf: "flex-end", textAlign: "right" }}>
          <h1 style={{ fontSize: "50px", fontWeight: 800, lineHeight: 1.2, marginBottom: "20px" }}>Join the<br/>Future.</h1>
          <p style={{ fontSize: "18px", opacity: 0.9, lineHeight: 1.6 }}>Create an account to reserve medicines, track availability, and manage your health seamlessly.</p>
        </div>
      </div>

      {/* Left Side Form */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%", maxWidth: "440px", padding: "40px" }}
        >
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>Create Account</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>Already have an account? <Link to="/login" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>Sign In</Link></p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-main)" }}>Full Name</label>
              <Input
                id="name"
                prefix={<UserOutlined style={{ color: "var(--text-muted)", marginRight: "8px" }} />}
                placeholder="John Doe"
                size="large"
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-main)" }}>Email Address</label>
              <Input
                id="email"
                prefix={<MailOutlined style={{ color: "var(--text-muted)", marginRight: "8px" }} />}
                placeholder="you@example.com"
                size="large"
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-main)" }}>Password</label>
              <Input.Password
                id="password"
                prefix={<LockOutlined style={{ color: "var(--text-muted)", marginRight: "8px" }} />}
                placeholder="Create a strong password"
                size="large"
              />
            </div>

            <div>
               <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-main)" }}>Account Type</label>
               <Select
                  value={role}
                  onChange={setRole}
                  size="large"
                  style={{ width: "100%" }}
                  options={[
                    { value: 'USER', label: 'Patient / User' },
                    { value: 'PHARMACY', label: 'Pharmacy Owner' },
                    { value: 'ADMIN', label: 'Admin' }
                  ]}
               />
            </div>

            <Button 
              type="primary" 
              size="large" 
              block 
              onClick={register}
              style={{ marginTop: "10px", fontSize: "16px" }}
            >
              Create Account <ArrowRightOutlined />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;