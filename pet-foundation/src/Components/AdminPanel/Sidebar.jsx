import React, { useState, useEffect } from 'react';
import './CSS/Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { CiSquareQuestion } from "react-icons/ci";
import { RiUserShared2Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { RiMessengerLine } from "react-icons/ri";
import { RiFeedbackLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { BsListNested } from "react-icons/bs";
import { LuArrowRightFromLine } from "react-icons/lu";
import { SiAnimalplanet } from "react-icons/si";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarVisible }) => {
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    // Handle logout
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        toast.success("Logged out successfully");
        navigate('/admin/admin-login');  // Redirect to login page
    };

    // Define menus
    const menus = [
        { id: 1, title: "Dashboard", to: "/admin/dashboard", icon: <IoHomeOutline size={20} /> },
        { id: 2, title: "Category", to: "/admin/category", icon: <BsListNested size={20} /> },
        { id: 3, title: "Pets", to: "/admin/pets", icon: <IoMdAdd size={22} /> },
        { id: 4, title: "Animal Shelters", to: "/admin/shelters", icon: <SiAnimalplanet size={20} /> },
        { id: 5, title: "Users", to: "/admin/user", icon: <RiUserShared2Line size={20} /> },
        { id: 6, title: "Feedback", to: "/admin/feedback", icon: <RiFeedbackLine size={20} /> },
        { id: 7, title: "Contact Us", to: "/admin/contact", icon: <RiMessengerLine size={20} /> },
        { id: 8, title: "Adoption", to: "/admin/adoption", icon: <CiSquareQuestion  size={20} /> },
        { id: 9, title: "Log Out", icon: <LuArrowRightFromLine size={20} /> },
    ];

    // Effect to set active menu based on current location
    useEffect(() => {
        const currentPath = location.pathname;
        const activeMenuItem = menus.find(menu => menu.to === currentPath);
        if (activeMenuItem) {
            setActiveMenu(activeMenuItem.title);
        } else {
            setActiveMenu("Dashboard"); // Fallback or default active menu
        }
    }, [location, menus]); // Re-run this effect when location changes

    return (
        <section className={`AdminSidebar ${sidebarVisible ? 'visible' : ''}`}>
            <ul style={{ width: "100%", marginTop: "2.2rem" }}>
                {
                    menus.map((menu) => (
                        menu.title === "Log Out" ? (
                            <div
                                key={menu.id}
                                className={`list_div ${activeMenu === menu.title ? 'active' : ''}`}
                                onClick={handleLogout}
                            >
                                {menu.icon}
                                {menu.title}
                            </div>
                        ) : (
                            <Link to={menu.to} key={menu.id} onClick={() => setActiveMenu(menu.title)}>
                                <div className={`list_div ${activeMenu === menu.title ? 'active' : ''}`}>
                                    {menu.icon}
                                    {menu.title}
                                </div>
                            </Link>
                        )
                    ))
                }
            </ul>
        </section>
    );
};

export default Sidebar;
