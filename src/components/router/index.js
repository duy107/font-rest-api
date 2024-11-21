import LayoutDefault from "../layout/LayoutDefault";
import JobDetail from "../../views/client/pages/job/detail.job";
import Company from "../../pages/Company";
import CompanyDetail from "../../pages/Company/CompanyDetail";
import Register from "../../pages/Register";
import Signin from "../../pages/Signin";
import Logout from "../../pages/Logout";
import LayoutAdmin from "../layout/LayoutAdmin/index";
import PrivateRouter from "../PrivateRouter"
import DashBoard from "../../pages/DashBoard";
import InforCompany from "../../pages/InforCompany";
import JobManagement from "../../pages/JobManagement";
import CreateJob from "../../pages/CreateJob";
import CvManagement from "../../pages/CvManagement";
import HomeUser from "../../pages/Home/HomeUser";
import HomeAdmin from "../../pages/Home/HomeAdmin";
import Infor from "../../views/client/pages/user/infor";
import SearchJob from "../../views/client/pages/search";
import UserSignin from "../../pages/Signin/UserSignin";
import CompanySigin from "../../pages/Signin/CompanySignin";
import AuthAdmin from "../authorization/admin/auth";
import AuthClient from "../authorization/client/auth";
import NotFound from "../../views/client/pages/404";
import Result from "../../views/client/pages/search/result";
import Forgot from "../../views/client/pages/user/forgot";
import OTP from "../../views/client/pages/user/otp";
import Reset from "../../views/client/pages/user/reset";

export const router = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <HomeUser />
            },
            {
                path: "search-job",
                element: <SearchJob />
            },
            {
                path: "jobs",
                element: <Result />
            },
            {
                path: "jobs/:slug",
                element: <JobDetail/>
            },
            {
                path: "infor",
                element: <AuthClient> <Infor /> </AuthClient>
            }
            ,
            {
                path: "company",
                element: <Company />
            },
            {
                path: "company/:id",
                element: <CompanyDetail />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "/",
                element: <Signin />,
                children: [
                    {
                        path: "login",
                        element: <UserSignin />,
                    },
                    {
                        path: "admin/login",
                        element: <CompanySigin />
                    }
                ]
            },
            {
                path: "forgot",
                element: <Forgot/>
            },
            {
                path: "forgot/otp",
                element: <OTP/>
            },
            {
                path: "forgot/reset",
                element: <Reset/>
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                path: "home-admin",
                element: <HomeAdmin />
            }
        ]
    },
    // private layout
    {
        element: <AuthAdmin><PrivateRouter /></AuthAdmin>,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    {
                        path: "admin",
                        children: [
                            {
                                path: "overview",
                                element: <DashBoard />
                            },
                            {
                                path: "infor-company",
                                element: <InforCompany />
                            },
                            {
                                path: "job-management",
                                element: <JobManagement />,
                            },
                            {
                                path: "job-management/create",
                                element: <CreateJob />
                            },
                            {
                                path: "cv-management",
                                element: <CvManagement />
                            }
                        ]
                    },
                    {
                        path: "detail-job/:id",
                        element: <JobDetail />
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]
