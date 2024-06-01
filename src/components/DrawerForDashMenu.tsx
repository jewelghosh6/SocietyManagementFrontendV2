import { useContext, useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { GradientHamburgerMenu } from './GradientHamburgerMenu';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import { UserSpecificMenuContext } from '../Layouts/LayoutMain';

const DrawerForDashboardMenu = () => {
    const UserSpecificMenus = useContext(UserSpecificMenuContext);

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='d-block d-md-none'>
            <GradientHamburgerMenu onClick={handleShow}>
                <RxHamburgerMenu />
            </GradientHamburgerMenu>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MySociety</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    {
                        UserSpecificMenus.map((item: any, index: any) => {
                            return (
                                <Link to={item.url} onClick={handleClose} key={index}>
                                    <div className={"cursor_pointer nav_items py-6px d-flex mb-2 "}>
                                        <div className={"d-flex justify-content-center align-items-center pe-2"}>{item.icon}</div>
                                        <span className={" "}>{item.title}</span>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default DrawerForDashboardMenu