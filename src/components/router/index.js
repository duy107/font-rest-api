import LayoutDefault from "../layout/LayoutDefault";
import JobDetail from "../../views/client/pages/job/detail.job";
import Register from "../../views/client/pages/user/register";
import Signin from "../../pages/Signin";
import Logout from "../../pages/Logout";
import LayoutAdmin from "../layout/LayoutAdmin/index";
import PrivateRouter from "../PrivateRouter"
import DashBoard from "../../views/admin/pages/dashboard";
import InforCompany from "../../views/admin/pages/company/infor";
import JobManagement from "../../views/admin/pages/job";
import CreateJob from "../../views/admin/pages/job/CreateJob";
import CvManagement from "../../views/admin/pages/cv";
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
import Role from "../../views/admin/pages/role";
import Permission from "../../views/admin/pages/permission";
import Account from "../../views/admin/pages/account";
import CreateAccount from "../../views/admin/pages/account/create";
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
                element: <AuthClient> <SearchJob /> </AuthClient>
            },
            {
                path: "jobs",
                element: <AuthClient> <Result /> </AuthClient>
            },
            {
                path: "jobs/:slug",
                element: <AuthClient><JobDetail/></AuthClient>
            },
            {
                path: "infor",
                element: <AuthClient> <Infor /> </AuthClient>
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
                            },
                            {
                                path: "role",
                                element: <Role />
                            },
                            {
                                path: "permission",
                                element: <Permission />
                            },
                            {
                                path: "account-management",
                                element: <Account />
                            },
                            {
                                path: "account-management/create",
                                element: <CreateAccount />
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
