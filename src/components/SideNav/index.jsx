import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBarChart2, FiUser, FiSettings } from "react-icons/fi";
import "./SideNav.css";

const SideNav = () => {
  const location = useLocation();

  const links = [
    { id: "home", label: "Home", icon: <FiHome />, path: "/", disabled: false },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: <FiBarChart2 />,
      path: "/portfolio",
      disabled: false,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <FiUser />,
      path: "/profile",
      disabled: true,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FiSettings />,
      path: "/settings",
      disabled: true,
    },
  ];

  return (
    <nav className="sidenav">
      <div className="logo_wrapper">LOGO</div>
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={`${location.pathname === link.path ? "active" : ""} ${
              link.disabled ? "disabled" : ""
            }`}
          >
            {link.disabled ? (
              <div className="disabled-link">
                <span className="icon">{link.icon}</span>
                <span className="label">{link.label}</span>
              </div>
            ) : (
              <Link to={link.path}>
                <span className="icon">{link.icon}</span>
                <span className="label">{link.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
