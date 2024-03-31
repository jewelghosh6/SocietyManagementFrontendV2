import Dropdown from 'react-bootstrap/Dropdown';
import { RxHamburgerMenu } from "react-icons/rx";
import { GradientHamburgerMenu } from './GradientHamburgerMenu';
import { useNavigate } from 'react-router-dom';
import { BiSolidUserPlus } from 'react-icons/bi';
import { GoPasskeyFill } from 'react-icons/go';
import { BsPersonFillAdd } from 'react-icons/bs';

export const DropdownForHome = () => {
    const navigate = useNavigate();
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    <div
                        style={{
                            backgroundColor: "#fff",
                        }}
                    >
                        <GradientHamburgerMenu onClick={() => { }}>
                            <RxHamburgerMenu />
                        </GradientHamburgerMenu>
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { navigate("/auth/sign-up") }}>
                        <div className='color_blue_hover'>
                            <BsPersonFillAdd className='' />
                            <span className='ps-2'>Sign up</span>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => { navigate("/auth/sign-in") }}>
                        <div className='color_blue_hover'>
                            <GoPasskeyFill />
                            <span className='ps-2'>Sign in</span>
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>

    )
}

export default DropdownForHome