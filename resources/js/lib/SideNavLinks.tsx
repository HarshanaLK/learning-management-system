import { FaShieldHalved } from "react-icons/fa6";
import { IoBarChart, IoCogSharp, IoIdCardSharp, IoLayers, IoSettings } from "react-icons/io5";
import { RiSettings5Fill } from "react-icons/ri";


export const navigationLinks = [

    {
        name: "Dashboard",
        link: true,
        border: false,
        startWith: "/dashboard",
        route: "dashboard.index",
        firstItem : true ,
        icon: IoBarChart,
    },
    {
        name: "Student Management",
        link: true,
        border: false,
        startWith: "/students",
        route: "students.index",
        icon: IoIdCardSharp ,
    },
    {
        name: "My Courses",
        link: true,
        border: false,
        startWith: "/courses/all",
        route: "courses.all",
        icon: IoLayers,
    },
    {
        name: "Policy Editor",
        link: true,
        border: false,
        startWith: "/privacy-policy",
        route: "privacy-policy.index",
        icon: FaShieldHalved,
    },
    {
        name: "Settings",
        link: true,
        border: false,
        startWith: "/setting",
        route: "setting.index",
        icon: IoSettings,
    },
];
