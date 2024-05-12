import { Outlet } from 'react-router-dom'
import SideNavBarForDashboard from './SideNavBarForDashboard'
import TopNavBar from './TopNaavBar'
import { FC, useState } from 'react';

interface LayoutMainProps {
    children?: React.ReactNode; // Optional children prop
}
const LayoutMain: FC<LayoutMainProps> = () => {
    const [navBarColapsed, setNavBarCollapsed] = useState(false);

    return (
        <>
            {/* <div className="top_nav">
                <TopNavBar />
            </div> */}
            <div className=' main_container d-flex'>
                <SideNavBarForDashboard navBarColapsed={navBarColapsed} setNavBarCollapsed={setNavBarCollapsed} />
                <div className='sidenav_animation g-0' style={{ width: navBarColapsed ? " calc( 100% - 80px) " : " calc( 100%  ) " }}>
                    <TopNavBar />
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>

        </>
    )
}

export default LayoutMain