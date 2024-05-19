import Dropdown from 'react-bootstrap/Dropdown';
import { GradientHamburgerMenu } from './GradientHamburgerMenu';
import { BsPersonFillAdd } from 'react-icons/bs';
import { FC } from 'react';

interface RegisterRequestDropdownProps {
    registerRequestsData: any[]; // Function to handle edit click
}

const RegisterRequestDropdown: FC<RegisterRequestDropdownProps> = ({ registerRequestsData }) => {
    console.log("registerRequestsData", registerRequestsData);

    return (
        <Dropdown className="">
            <Dropdown.Toggle id="dropdown-basic">
                <div
                    style={{
                        backgroundColor: "#fff",
                    }}
                    id='reg_req_btn'
                >
                    <GradientHamburgerMenu onClick={() => { }}>
                        Register Requests
                    </GradientHamburgerMenu>
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>

                {
                    registerRequestsData.map((item: any, index: number) => {
                        return (
                            <Dropdown.Item key={index} onClick={() => {
                                // navigate("/dashboard")
                            }}>
                                <div className='color_blue_hover'>
                                    <BsPersonFillAdd className='' />
                                    <span className='ps-2'><strong>{item.first_name + " " + item.last_name}</strong> sent register request</span>
                                </div>
                            </Dropdown.Item>
                        )
                    })
                }

            </Dropdown.Menu>
        </Dropdown>)
}

export default RegisterRequestDropdown