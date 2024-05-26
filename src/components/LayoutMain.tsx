import { Outlet, useNavigate } from 'react-router-dom'
import SideNavBarForDashboard from './SideNavBarForDashboard'
import TopNavBar from './TopNaavBar'
import { FC, createContext, useEffect, useState } from 'react';

import { MdBallot, MdManageAccounts, MdMeetingRoom } from 'react-icons/md';
import { RiBillFill, RiDashboard3Fill } from 'react-icons/ri';
import { IoIosPeople } from 'react-icons/io';
import { FaNoteSticky, FaUserSecret } from 'react-icons/fa6';
import { PiChatsFill } from 'react-icons/pi';
import { BsCalendarEventFill } from 'react-icons/bs';
import axios from 'axios';
import config from '../environments/config';

interface LayoutMainProps {
    children?: React.ReactNode; // Optional children prop
}
export const UserSpecificMenuContext = createContext<any>([]);

const LayoutMain: FC<LayoutMainProps> = () => {
    const [navBarColapsed, setNavBarCollapsed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let intervalId = setInterval(async () => {
            console.log("inside setInterval");

            if (new Date(localStorage.getItem("accessTokenExpireAt") ?? "") < new Date()) {
                let refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    navigate('/auth/sign-in');
                }
                let res = await axios.post(`${config.API_URL}/auth/generate-access-token`, { refreshToken })
                if (res.status === 200) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                }

            }
        }, 3 * 60 * 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const [permissions] = useState(JSON.parse(localStorage.getItem("userData") ?? "").permissions);



    const MenuLinksArray = [
        {
            accessKey: "can_view_dashboard",
            url: "/dashboard",
            icon: <RiDashboard3Fill />,
            title: "Dashboard"
        },
        {
            accessKey: "can_manage_user",
            url: "/manage-users",
            icon: <MdManageAccounts />,
            title: "Manage Users"
        },
        {
            accessKey: "can_view_all_flat_details",
            url: "/all-flats",
            icon: <MdMeetingRoom />,
            title: "Flat Details"
        },
        {
            accessKey: "can_view_single_flat_details",
            url: "/my-flat",
            icon: <MdMeetingRoom />,
            title: "My Flat"
        },
        {
            accessKey: "can_allot_new_flats_to_user",
            url: "/flat-allotment",
            icon: <MdBallot />,
            title: "Flat Allotment"
        },
        {
            accessKey: "can_manage_bills_section",
            url: "/manage-bills",
            icon: <RiBillFill />,
            title: "Manage Bills"
        },
        {
            accessKey: "can_pay_own_flat_bills",
            url: "/my-bills",
            icon: <RiBillFill />,
            title: "My Bills"
        },
        {
            accessKey: "can_manage_visitor_activity",
            url: "/visitors",
            icon: <IoIosPeople />,
            title: "Manage Visitors "
        },
        {
            accessKey: "can_view_complaint/suggestions",
            url: "/suggestions",
            icon: <FaNoteSticky />,
            title: "Suggestions"
        },
        {
            accessKey: "can_view_security_section",
            url: "/security",
            icon: <FaUserSecret />,
            title: "Security"
        },
        {
            accessKey: "can_view_events_section",
            url: "/events",
            icon: <BsCalendarEventFill />,
            title: "Events"
        },
        {
            accessKey: "have_access_to_group_chat",
            url: "/group-chat",
            icon: <PiChatsFill />,
            title: "Group Chat"
        },
    ]


    let FilteredMenus = MenuLinksArray.filter(element => permissions.includes(element.accessKey))

    return (
        <>
            <UserSpecificMenuContext.Provider value={FilteredMenus}>

                <div className=' main_container d-flex'>
                    <SideNavBarForDashboard navBarColapsed={navBarColapsed} setNavBarCollapsed={setNavBarCollapsed} />
                    <div className='sidenav_animation g-0' style={{ width: navBarColapsed ? " calc( 100% - 80px) " : " calc( 100%  ) " }}>
                        <TopNavBar />
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>


            </UserSpecificMenuContext.Provider>

        </>
    )
}

export default LayoutMain