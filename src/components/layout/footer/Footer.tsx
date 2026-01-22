import Logo from "@/components/common/Logo";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left section */}
        <div style={styles.column}>
          <Logo className="" iconSize={6} textSize="text-xl" />

          <p style={styles.description}>
            Revolutionizing eyewear since 2012. We combine artisan craftsmanship
            with digital precision to bring you the finest optical experience.
          </p>

          <div style={styles.social}>
            <button style={styles.iconBtn}>🌐</button>
            <button style={styles.iconBtn}>🔗</button>
          </div>
        </div>

        {/* Shop */}
        <div style={styles.column}>
          <h4 style={styles.title}>SHOP</h4>
          <ul style={styles.list}>
            <li>All Eyewear</li>
            <li>New Arrivals</li>
            <li>Blue Light</li>
            <li>Sunglasses</li>
          </ul>
        </div>

        {/* Support */}
        <div style={styles.column}>
          <h4 style={styles.title}>SUPPORT</h4>
          <ul style={styles.list}>
            <li>Track Order</li>
            <li>Returns</li>
            <li>Store Locator</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* Legal */}
        <div style={styles.column}>
          <h4 style={styles.title}>LEGAL</h4>
          <ul style={styles.list}>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: "#ffffff",
    borderTop: "1px solid #e5e7eb",
    padding: "40px 80px",
    fontFamily: "Arial, sans-serif",
    color: "#374151",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "40px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 600,
    fontSize: "18px",
  },
  logoIcon: {
    color: "#2563eb",
  },
  logoText: {
    color: "#111827",
  },
  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#6b7280",
    maxWidth: "300px",
  },
  social: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  iconBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    cursor: "pointer",
  },
  title: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
};

export default Footer;
