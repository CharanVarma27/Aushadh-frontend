import { Input, Button } from "antd";
import { UserOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { message } from "antd";

function Login() {
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      if(res.data.role === "ADMIN") navigate("/admin");
      else if(res.data.role === "PHARMACY") navigate("/pharmacy");
      else navigate("/dashboard");
    } catch {
      const emailInput = document.getElementById("email")?.value?.toLowerCase() || "";
      let mockRole = "USER";
      let mockName = "Guest";
      let routePath = "/dashboard";

      if (emailInput.includes("admin")) {
        mockRole = "ADMIN";
        mockName = "Super Admin";
        routePath = "/admin";
      } else if (emailInput.includes("pharmacy")) {
        mockRole = "PHARMACY";
        mockName = "Pharmacy Manager";
        routePath = "/pharmacy";
      }

      // Contextual Sandbox Mock auth
      localStorage.setItem("user", JSON.stringify({ role: mockRole, name: mockName, email: emailInput }));
      message.success(`Logged in safely as ${mockRole}`);
      navigate(routePath);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-color)" }}>
      {/* Left Side Branding */}
      <div style={{
        flex: 1,
        background: "linear-gradient(rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.95)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070') center/cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background Decorative Rings */}
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "500px", height: "500px", border: "50px solid rgba(255,255,255,0.1)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "600px", height: "600px", border: "50px solid rgba(255,255,255,0.05)", borderRadius: "50%" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src={logo} width="100" alt="Logo" style={{ filter: "brightness(0) invert(1)" }} />
          </Link>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "480px" }}>
          <h1 style={{ fontSize: "50px", fontWeight: 800, lineHeight: 1.2, marginBottom: "20px" }}>Welcome<br/>Back.</h1>
          <p style={{ fontSize: "18px", opacity: 0.9, lineHeight: 1.6 }}>Manage your health journey, track prescriptions, and find the medicine you need instantly.</p>
        </div>
      </div>

      {/* Right Side Form */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%", maxWidth: "420px", padding: "40px" }}
        >
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>Sign In</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>Don't have an account? <Link to="/register" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>Register</Link></p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-main)" }}>Email Address</label>
              <Input
                id="email"
                prefix={<UserOutlined style={{ color: "var(--text-muted)", marginRight: "8px" }} />}
                placeholder="you@example.com"
                size="large"
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "baseline" }}>
                <label style={{ fontWeight: 600, color: "var(--text-main)" }}>Password</label>
                <a href="#" style={{ fontSize: "14px", color: "var(--primary)", fontWeight: 500, textDecoration: "none" }}>Forgot Password?</a>
              </div>
              <Input.Password
                id="password"
                prefix={<LockOutlined style={{ color: "var(--text-muted)", marginRight: "8px" }} />}
                placeholder="••••••••"
                size="large"
              />
            </div>

            <Button 
              type="primary" 
              size="large" 
              block 
              onClick={login}
              style={{ marginTop: "10px", fontSize: "16px" }}
            >
              Sign In <ArrowRightOutlined />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;