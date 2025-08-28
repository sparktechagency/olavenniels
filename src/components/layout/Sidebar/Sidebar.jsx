import React, { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetProfileDataQuery } from "../../../Redux/Apis/service/profileApis";
import { SidebarRoutes } from "./sidebar-route/SidebarRoutes";
import { SuperAdminSidebarRoutes } from "./sidebar-route/SuperAdminSidebarRoutes";

const SideBar = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const { data: profileData } = useGetProfileDataQuery();
  const userRole = profileData?.admin?.role;
  const routes = userRole === "ADMIN" ? SidebarRoutes : SuperAdminSidebarRoutes;

  useEffect(() => {
    const currentPath = location.pathname;
    let activeRoute = null;
    let activeParent = null;
    for (const item of routes) {
      if (item.link === currentPath) {
        activeRoute = item;
        break;
      }
      if (item.children) {
        const childMatch = item.children.find(child => child.link === currentPath);
        if (childMatch) {
          activeRoute = childMatch;
          activeParent = item;
          break;
        }
      }
    }
    if (activeRoute) {
      setSelectedKey(activeRoute.key);
    }
    if (activeParent && !expandedKeys.includes(activeParent.key)) {
      setExpandedKeys(prev => [...prev, activeParent.key]);
    }
  }, [location.pathname, routes]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate('/auth/login');
    window.location.reload();
  };

  const isRouteActive = (item) => {
    if (item.link === location.pathname) return true;

    if (item.children) {
      return item.children.some(child => child.link === location.pathname);
    }

    return false;
  };

  const isChildActive = (child) => {
    return child.link === location.pathname;
  };


  const renderMenuItems = (items) => {
    return items.map((item) => {
      const isActive = isRouteActive(item);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.key} className="mb-1">
          <Link
            to={hasChildren ? "#" : item.link}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${isActive
              ? "bg-[var(--secondary-color)] text-white shadow-md"
              : "text-white hover:bg-[var(--primary-color)]/60 hover:text-white"
              }`}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                onParentClick(item.key);
              } else {
                setSelectedKey(item.key);
              }
            }}
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="flex-1 text-left">{item.label}</span>
            {hasChildren && (
              <FaChevronRight
                className={`ml-2 transition-transform duration-200 ${expandedKeys.includes(item.key) ? "transform rotate-90" : ""
                  }`}
              />
            )}
          </Link>

          {hasChildren && (
            <div
              className={`overflow-hidden transition-all duration-300 ${expandedKeys.includes(item.key) ? "my-2" : "m-0"
                }`}
              style={{
                maxHeight: expandedKeys.includes(item.key)
                  ? `${contentRef.current[item.key]?.scrollHeight || 0}px`
                  : "0",
              }}
              ref={(el) => (contentRef.current[item.key] = el)}
            >
              <div className="ml-6 pl-3 border-l-2 border-[var(--secondary-color)] space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.key}
                    to={child.link}
                    className={`block px-3 py-2 text-base rounded-md transition-colors duration-150 ${isChildActive(child)
                      ? "bg-[var(--secondary-color)] text-white shadow-md"
                      : "text-white hover:bg-[var(--primary-color)]/60 hover:text-white"
                      }`}
                    onClick={() => {
                      setSelectedKey(child.key);
                    }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex bg-[var(--primary-color)] pt-3 flex-col h-full">
      {/* Scrollable menu items */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 space-y-1 pb-4">
          {renderMenuItems(routes)}
        </div>
      </div>

      {/* Logout button at the bottom */}
      <div className="p-4 ">
        <button
          onClick={handleLogout}
          className="w-full cursor-pointer flex items-center justify-center px-4 py-2.5 text-sm font-medium bg-[var(--secondary-color)]  rounded-lg transition-colors duration-200"
        >
          <IoIosLogOut className="w-5 !text-white h-5 mr-2" />
          <span className="text-white">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;