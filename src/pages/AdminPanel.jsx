import { Layout, Menu, Avatar, Card, Row, Col, Typography, Table, Tag, message, Button, Form, Switch, Spin } from "antd";
import { UserOutlined, DashboardOutlined, TeamOutlined, ShopOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import API from "../services/api";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function AdminPanel() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('1');
  const [loading, setLoading] = useState(true);

  const [pharmacies, setPharmacies] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalPharmacies: 0, pendingPharmacies: 0, activePharmacies: 0 });
  const [sysSettings, setSysSettings] = useState({
    enable_map_search: true,
    auto_approval: false,
    maintenance_mode: false
  });

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const statsRes = await API.get('/admin/stats');
      setStats(statsRes.data);

      const pharmaRes = await API.get('/admin/pharmacies');
      setPharmacies(pharmaRes.data.map(p => ({
        key: p.id,
        name: p.name,
        location: p.city || p.address,
        license: `AP-AUTH-${p.id}`,
        status: p.verified ? 'Approved' : 'Pending'
      })));

      const userRes = await API.get('/admin/users');
      setUsers(userRes.data.map(u => ({
        key: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: 'Active'
      })));

      const settingsRes = await API.get('/admin/settings');
      const settingsMap = {};
      settingsRes.data.forEach(s => {
        settingsMap[s.settingKey] = s.settingValue === 'true';
      });
      setSysSettings(prev => ({ ...prev, ...settingsMap }));

    } catch (e) {
      console.warn("Could not fetch admin API data.", e);
      setStats({ totalUsers: 3, totalPharmacies: 2, pendingPharmacies: 1, activePharmacies: 1 });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const handleApprove = async (key) => {
    try {
      await API.put(`/admin/pharmacies/${key}/approve`);
      message.success("Database Verification Granted!");
      fetchAdminData();
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#10b981', '#34d399', '#fadb14', '#059669']
        });
      }
    } catch (e) {
      message.error("Could not append verification state.");
    }
  };

  const handleToggle = async (key, val) => {
    try {
      await API.post('/admin/settings', { settingKey: key, settingValue: val.toString() });
      setSysSettings(prev => ({ ...prev, [key]: val }));
      message.success(`System ${key} propagated successfully.`);
    } catch (error) {
      message.error("Failed to update system logic via API.");
    }
  };

  const columns = [
    { title: 'Pharmacy Node', dataIndex: 'name', key: 'name', render: (t) => <b>{t}</b> },
    { title: 'Geographic Zone', dataIndex: 'location', key: 'location' },
    { title: 'Server ID', dataIndex: 'license', key: 'license' },
    { title: 'Validation State', dataIndex: 'status', key: 'status', render: (status) => (
      <Tag color={status === 'Pending' ? 'orange' : 'green'}>{status}</Tag>
    )},
    { 
      title: 'Action Command', 
      key: 'action', 
      render: (_, record) => (
        record.status === 'Pending' 
        ? <Button size="small" type="primary" onClick={() => handleApprove(record.key)}>Push Verification (v1)</Button>
        : <span style={{color: "var(--text-muted)"}}>Propagated</span>
      ) 
    },
  ];

  const userColumns = [
    { title: 'Registered Entity', dataIndex: 'name', key: 'name', render: (t) => <b>{t}</b> },
    { title: 'Linked Identity', dataIndex: 'email', key: 'email' },
    { title: 'System Grouping', dataIndex: 'role', key: 'role', render: (role) => <Tag color={role === 'Super Admin' ? 'purple' : 'blue'}>{role}</Tag> },
    { title: 'Network Stream', dataIndex: 'status', key: 'status', render: (status) => <Tag color="green">{status}</Tag> },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "var(--bg-color)" }}>
      {/* Sidebar */}
      <Sider width={280} theme="dark" style={{ background: "#0f172a" }}>
        <div style={{ padding: "30px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 40, height: 40, background: "var(--primary)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 20 }}>
            <SettingOutlined />
          </div>
          <span style={{ fontSize: "20px", fontWeight: 800, color: "white" }}>SYS<span style={{color:"var(--primary)"}}>ADMIN</span></span>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={(e) => { if (e.key !== '5') setActiveKey(e.key); }}
          style={{ background: "#0f172a", borderRight: 0, padding: "0 16px" }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />} style={{ borderRadius: "8px", marginBottom: "8px" }}>Cluster Overview</Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />} style={{ borderRadius: "8px", marginBottom: "8px" }}>Pharmacy Nodes</Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />} style={{ borderRadius: "8px", marginBottom: "8px" }}>User Identities</Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />} style={{ borderRadius: "8px", marginBottom: "8px" }}>Platform Engine</Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} onClick={() => navigate("/")} style={{ borderRadius: "8px", color: "#ff4d4f", marginTop: "40px" }}>Kill Session</Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout style={{ background: "transparent" }}>
        <Header style={{ background: "transparent", padding: "0 40px", display: "flex", justifyContent: "flex-end", alignItems: "center", height: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "white", padding: "8px 24px", borderRadius: "30px", boxShadow: "var(--shadow-soft)", cursor: "pointer" }}>
            <Avatar style={{ backgroundColor: "#0f172a" }} icon={<UserOutlined />} />
            <span style={{ fontWeight: 600 }}>Super Root</span>
          </div>
        </Header>

        <Content style={{ padding: "0 40px 40px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={activeKey}>
            <div style={{ marginBottom: "30px" }}>
              <Title level={2} style={{ margin: 0, fontWeight: 800 }}>
                {activeKey === '1' && "Network Cluster Overview"}
                {activeKey === '2' && "Approved Pharmacy Nodes"}
                {activeKey === '3' && "Identity Management System"}
                {activeKey === '4' && "Platform Logic Engine"}
              </Title>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Running secured endpoints connected via MySQL.
              </Text>
            </div>

            {loading ? <Spin size="large" style={{ display: "block", margin: "100px auto" }} /> : (
              <>
                {/* Overview Tab */}
                {activeKey === '1' && (
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={8}>
                      <Card bordered={false} style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)" }}>
                        <Text type="secondary">Identities Resolved</Text>
                        <Title level={2} style={{ margin: "10px 0 0 0", color: "var(--primary)" }}>{stats.totalUsers}</Title>
                      </Card>
                    </Col>
                    <Col xs={24} md={8}>
                      <Card bordered={false} style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)" }}>
                        <Text type="secondary">Verified Live Nodes</Text>
                        <Title level={2} style={{ margin: "10px 0 0 0", color: "var(--primary)" }}>{stats.activePharmacies}</Title>
                      </Card>
                    </Col>
                    <Col xs={24} md={8}>
                      <Card bordered={false} style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)", background: stats.pendingPharmacies > 0 ? "#fffbe6" : "white" }}>
                        <Text type="warning">Pending Authorization Lock</Text>
                        <Title level={2} style={{ margin: "10px 0 0 0", color: "#faad14" }}>{stats.pendingPharmacies}</Title>
                      </Card>
                    </Col>
                    <Col xs={24}>
                      <Card bordered={false} style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)" }} title={<span style={{ fontWeight: 700, fontSize: "18px" }}>Recent Pharmacy Applications</span>}>
                        <Table columns={columns} dataSource={pharmacies.filter(p => p.status === 'Pending')} pagination={false} rowKey="key" />
                      </Card>
                    </Col>
                  </Row>
                )}

                {/* Pharmacies Tab */}
                {activeKey === '2' && (
                  <Card bordered={false} style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)", minHeight: "500px" }}>
                    <Table columns={columns} dataSource={pharmacies} pagination={true} rowKey="key" />
                  </Card>
                )}

                {/* Users Tab */}
                {activeKey === '3' && (
                  <Card bordered={false} style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)", minHeight: "500px" }}>
                    <Table columns={userColumns} dataSource={users} pagination={true} rowKey="key" />
                  </Card>
                )}

                {/* Config Tab */}
                {activeKey === '4' && (
                  <Card bordered={false} style={{ borderRadius: "24px", boxShadow: "var(--shadow-soft)", maxWidth: "800px" }}>
                    <Form layout="vertical">
                      <Form.Item label={<b>Enable Global Map Search Database Ping</b>}>
                        <Switch checked={sysSettings.enable_map_search} onChange={(val) => handleToggle('enable_map_search', val)} /> 
                        <Text type="secondary" style={{marginLeft: 10}}>Allows users to search pharmacies dynamically near them.</Text>
                      </Form.Item>
                      <Form.Item label={<b>Automatic Vendor Database Write Approval</b>}>
                        <Switch checked={sysSettings.auto_approval} onChange={(val) => handleToggle('auto_approval', val)} /> 
                        <Text type="secondary" style={{marginLeft: 10}}>Automatically verify and approve pharmacy requests via API.</Text>
                      </Form.Item>
                      <Form.Item label={<b>Platform Maintenance Node Kill Switch</b>}>
                        <Switch checked={sysSettings.maintenance_mode} onChange={(val) => handleToggle('maintenance_mode', val)} /> 
                        <Text type="secondary" style={{marginLeft: 10}}>Disables login and shows maintenance page to all users.</Text>
                      </Form.Item>
                    </Form>
                  </Card>
                )}
              </>
            )}

          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;