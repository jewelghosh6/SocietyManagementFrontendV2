import { FC } from 'react';
import styled from 'styled-components';

interface MsgExtProps {
    // height: number;
    // color: string;
    direction: 'left' | 'right'; // New prop to determine the direction of the tail
}

const MessageTailExtStyled = styled.span<MsgExtProps>`
  position: absolute;
  width: 0;
  height: 0;
  top: 8px;
  ${({ direction }) => direction === 'right' ? `
    right: -7px;
    border-right: 10px solid transparent;
    border-top: 10px solid var(--blue-300);
    border-top-right-radius: 3px;
  ` : `
    left: -7px;
    border-left: 10px solid transparent;
    border-top: 10px solid var(--indigo-100);
    border-top-left-radius: 3px;
  `}
`;

// Define the functional component
export const MessageTailExt: FC<MsgExtProps> = ({ direction }) => {
    return <MessageTailExtStyled direction={direction} />;
};