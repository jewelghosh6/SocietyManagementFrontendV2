import styled from 'styled-components';

export const GradientHamburgerMenu = styled.div`
  className="grad_menu"
  width: fit-content; /* Adjust width as needed */
  height: fit-content; /* Adjust height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px; /* Adjust padding as needed */
  border-radius: 5px; /* Add border radius for rounded corners */

  background: linear-gradient( to right,
    #5ee7df,
    #b490ca); /* Adjust gradient colors */

  /* Optional: Add hover effect for visual feedback */
  &:hover {
    cursor: pointer;
    /*  // opacity: 0.8; Adjust hover opacity */
    background:black;
    
  }
`;
