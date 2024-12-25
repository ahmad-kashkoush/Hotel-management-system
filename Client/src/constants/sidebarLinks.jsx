import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

 function useSidebarLinks(){
const sidebarLinks = [
  {
    link: "Home",
    to: "/dashboard",
    icon: <HiOutlineHome />,
  },
  {
    link: "Bookings",
    to: "/bookings",
    icon: <HiOutlineCalendarDays />,
  },
  {
    link: "Cabins",
    to: "/cabins",
    icon: <HiOutlineHomeModern />,
  },
  {
    link: "Users",
    to: "/users",
    icon: <HiOutlineUsers />,
  },
  {
    link: "Settings",
    to: "/settings",
    icon: <HiOutlineCog6Tooth />,
  },
];
return {sidebarLinks};

}
export {useSidebarLinks};
