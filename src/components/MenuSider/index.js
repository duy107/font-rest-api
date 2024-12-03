import { Menu } from "antd"
import { useEffect } from "react";
import { AiOutlineDashboard, AiOutlineLayout } from "react-icons/ai";
import { GrAppsRounded, GrGroup } from "react-icons/gr";
import { HiOutlineChartPie } from "react-icons/hi2";
import { MdManageAccounts } from "react-icons/md";
import { TbLockAccess } from "react-icons/tb";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

function MenuSider() {

    const navigate = useNavigate();
    const permission = useSelector(state => state.permission);
    // handle when reload page
    useEffect(() => {
        // Detect reload and navigate to /admin/infor-company
        const handleReload = (event) => {
            if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
                navigate("/admin/overview");
            }
        };

        window.addEventListener('load', handleReload);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('load', handleReload);
        };
    }, [navigate]);


    const items = [
        {
            label: "Tổng quan",
            key: "1",
            icon: <Link to={"/admin/overview"}><AiOutlineDashboard /></Link>,
        },
        {
            label: "Thông tin công ty",
            key: "2",
            icon: <Link to={"/admin/infor-company"}><GrAppsRounded /></Link>,
        }
    ]
    if (permission.includes("job_view")) {
        items.push({
            label: "Quản lý công việc",
            key: "3",
            icon: <Link to={"/admin/job-management"}><AiOutlineLayout /></Link>
        })
    }
    if (permission.includes("cv_view")) {
        items.push({
            label: "Quản lý CV",
            key: "4",
            icon: <Link to={"/admin/cv-management"}><HiOutlineChartPie /></Link>
        })
    }
    if (permission.includes("role_permission")) {
        items.push({
            label: "Phân quyền",
            key: "6",
            icon: <Link to={"/admin/permission"}><TbLockAccess /> </Link>
        })
    }
    if (permission.includes("role_view")) {
        items.push({
            label: "Nhóm quyền",
            key: "5",
            icon: <Link to={"/admin/role"}><GrGroup /></Link>
        })
    }
    if (permission.includes("account_view")) {
        items.push({
            label: "Quản lý tài khoản",
            key: "7",
            icon: <Link to={"/admin/account-management"}><MdManageAccounts /></Link>
        })
    }
    return (
        <>
            <Menu
                mode="inline"
                items={items}
                defaultSelectedKeys={['1']}
                theme="light"
            />
        </>
    );
}

export default MenuSider;