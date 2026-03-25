import { Layout, Menu, Avatar, Card, Row, Col, Typography, Badge, Button, message, Tag, Form, Input } from "antd";
import { UserOutlined, MedicineBoxOutlined, HistoryOutlined, SettingOutlined, LogoutOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function Dashboard() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('1');
  const [userData, setUserData] = useState({ name: "Guest", email: "guest@example.com", phone: "+91 9876543210" });
  const [form] = Form.useForm();

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser && rawUser !== "undefined" && rawUser !== "null") {
        const parsed = JSON.parse(rawUser);
        setUserData(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error("Failed to parse user session data", e);
    }
  }, []);

  const [reservations, setReservations] = useState([
    { id: 1, medicine: 'Paracetamol 500mg', pharmacy: 'Apollo Pharmacy', distance: '0.8 km away', price: 45, status: 'Ready for Pickup', icon: '💊' }
  ]);
  
  const [history] = useState([
    { id: 101, medicine: 'Vitamin C Complex', pharmacy: 'MedPlus', date: 'Oct 12, 2026', status: 'Completed', price: 120 }
  ]);

  const handleCancel = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    message.info("Reservation cancelled.");
  };

  const handleUpdateSettings = (values) => {
    const updated = { ...userData, ...values };
    setUserData(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    message.success("Settings updated successfully!");
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "var(--bg-color)" }}>
      {/* Sidebar */}
      <Sider width={280} theme="light" style={{ borderRight: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ padding: "30px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 40, height: 40, background: "var(--primary)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 20 }}>
            A
          </div>
          <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)" }}>AUSHADH</span>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={(e) => {
            if (e.key !== '4') setActiveKey(e.key);
          }}
          style={{ borderRight: 0, padding: "0 16px" }}
        >
          <Menu.Item key="1" icon={<MedicineBoxOutlined />} style={{ borderRadius: "8px", marginBottom: "8px" }}>My Prescriptions</Menu.Item>
          <Menu.Item key="2" icon={<HistoryOutlined />} style={{ borderRadius: "8px", marginBottom: "8px" }}>Order History</Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />} style={{ borderRadius: "8px", marginBottom: "8px" }}>Settings</Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => navigate("/")} style={{ borderRadius: "8px", color: "#ff4d4f", marginTop: "40px" }}>Log Out</Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout style={{ background: "transparent" }}>
        <Header style={{ background: "transparent", padding: "0 40px", display: "flex", justifyContent: "flex-end", alignItems: "center", height: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "white", padding: "8px 24px", borderRadius: "30px", boxShadow: "var(--shadow-soft)", cursor: "pointer" }}>
            <Avatar style={{ backgroundColor: "var(--primary)" }} icon={<UserOutlined />} />
            <span style={{ fontWeight: 600 }}>{userData?.name || "User"}</span>
          </div>
        </Header>

        <Content style={{ padding: "0 40px 40px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={activeKey}>
            <div style={{ marginBottom: "30px" }}>
              <Title level={2} style={{ margin: 0, fontWeight: 800 }}>
                {activeKey === '1' && `Welcome back, ${(userData?.name || "User").split(' ')[0]} 👋`}
                {activeKey === '2' && "Order History"}
                {activeKey === '3' && "Account Settings"}
              </Title>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                {activeKey === '1' && "Here is what's happening with your health today."}
                {activeKey === '2' && "View your past purchases and reservations."}
                {activeKey === '3' && "Manage your profile and preferences."}
              </Text>
            </div>

            {activeKey === '1' && (
              <Row gutter={[24, 24]}>
              {/* Active Reservations Bento Box */}
              <Col xs={24} lg={16}>
                <Card 
                  bordered={false} 
                  style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)", height: "100%" }}
                  bodyStyle={{ padding: "30px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <Title level={4} style={{ margin: 0 }}>Active Reservations</Title>
                    <Link to="/" style={{ color: "var(--primary)", fontWeight: 600 }}>Find More</Link>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {reservations.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "40px", background: "var(--bg-color)", borderRadius: "16px" }}>
                        <Text type="secondary" style={{ fontSize: "16px" }}>No active reservations right now.</Text>
                      </div>
                    ) : (
                      reservations.map(res => (
                        <div key={res.id} style={{ background: "var(--bg-color)", borderRadius: "16px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                            <div style={{ width: 60, height: 60, background: "white", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                              {res.icon}
                            </div>
                            <div>
                              <h4 style={{ margin: "0 0 4px 0", fontSize: "18px" }}>{res.medicine}</h4>
                              <Text type="secondary">{res.pharmacy} • {res.distance}</Text>
                            </div>
                          </div>
                          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                            <Badge status="processing" text={res.status} style={{ fontWeight: 600, color: "var(--primary-dark)" }} />
                            <div style={{ fontWeight: "bold", fontSize: "16px" }}>₹{res.price.toFixed(2)}</div>
                            <Button size="small" danger type="text" onClick={() => handleCancel(res.id)}>Cancel</Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </Col>

              {/* Health Stats Bento Box */}
              <Col xs={24} lg={8}>
                <Card 
                  bordered={false} 
                  style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)", background: "var(--primary)", color: "white", height: "100%" }}
                  bodyStyle={{ padding: "30px" }}
                >
                  <Title level={4} style={{ margin: 0, color: "white", opacity: 0.9 }}>Health Score</Title>
                  <div style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1, margin: "20px 0" }}>92</div>
                  <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>You are in the top 10% of users maintaining their schedule perfectly.</Text>
                </Card>
              </Col>

              </Row>
            )}

            {activeKey === '2' && (
              <Card 
                bordered={false} 
                style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)", minHeight: "400px" }}
              >
                {history.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.05)", padding: "20px 0" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "18px", color: "var(--text-main)" }}>{item.medicine}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "15px", marginTop: "4px" }}>{item.pharmacy} • {item.date}</div>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                      <div style={{ fontWeight: 700, fontSize: "18px" }}>₹{item.price.toFixed(2)}</div>
                      <Tag color="green" icon={<CheckCircleOutlined />} style={{ padding: "4px 10px", borderRadius: "12px", fontSize: "13px" }}>{item.status}</Tag>
                    </div>
                  </div>
                ))}
              </Card>
            )}

            {activeKey === '3' && (
              <Card 
                bordered={false} 
                style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)", maxWidth: "600px" }}
              >
                <Form 
                  form={form} 
                  layout="vertical" 
                  initialValues={userData}
                  onFinish={handleUpdateSettings}
                >
                  <Form.Item label={<span style={{ fontWeight: 600 }}>Full Name</span>} name="name" rules={[{ required: true }]}>
                    <Input size="large" style={{ borderRadius: "12px" }} />
                  </Form.Item>
                  <Form.Item label={<span style={{ fontWeight: 600 }}>Email Address</span>} name="email" rules={[{ type: 'email' }]}>
                    <Input size="large" style={{ borderRadius: "12px" }} />
                  </Form.Item>
                  <Form.Item label={<span style={{ fontWeight: 600 }}>Phone Number</span>} name="phone">
                    <Input size="large" style={{ borderRadius: "12px" }} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: "12px", width: "100%", fontWeight: 600, marginTop: "10px" }}>
                    Save Changes
                  </Button>
                </Form>
              </Card>
            )}

          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;