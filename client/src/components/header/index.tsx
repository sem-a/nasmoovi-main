import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import styles from "./index.module.css";
import { Container } from "../containers";
import { PATHS } from "../../paths";

const menuItems = [
  { name: "ГЛАВНАЯ", path: PATHS.home },
  { name: "СВАДЕБНЫЕ СЕРИИ", path: PATHS.weedings },
  { name: "СВАДЕБНЫЕ ВИДЕО", path: PATHS.video },
  { name: "КОНТАКТЫ", path: PATHS.contact },

];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.header}>
        <Container>
            <Row justify="space-between" align="middle">
              <Col>
                <Link to="/">
                  <div className={styles.logo}>
                    <h2>NASMOOVI</h2>
                  </div>
                </Link>
              </Col>
              <Col>
                <div className={styles.navTriggerPrimary} onClick={toggleMenu}>
                  <span className={`${styles.navTriggerIcon} ${isMenuOpen ? styles.navTriggerIconActive : ""}`}></span>
                </div>
              </Col>
            </Row>
        </Container>
      </div>
      <Menu items={menuItems} isMenuOpen={isMenuOpen} />
    </>
  );
};

const Menu: React.FC<{ items: typeof menuItems; isMenuOpen: boolean }> = ({ items, isMenuOpen }) => {
  return (
    <div className={`${styles.menuOverlay} ${isMenuOpen ? styles.menuOverlayOpen : ''}`}>
       <div className={styles.menuContent}>
        {items.map((item) => (
          <Link key={item.name} to={item.path} className={styles.menuItem}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;