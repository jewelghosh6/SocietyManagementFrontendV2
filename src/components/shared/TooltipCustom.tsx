import { FC, useEffect, useRef } from 'react';
import { Tooltip } from 'bootstrap';

interface ToolTipProps {
  text: string;
  children: any;
}

const TooltipCustom: FC<ToolTipProps> = ({ text, children }) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const tooltipInstance = useRef<Tooltip | null>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      if (tooltipInstance.current) {
        tooltipInstance.current.dispose();
      }
      tooltipInstance.current = new Tooltip(tooltipRef.current, { title: text });
    }

    return () => {
      if (tooltipInstance.current) {
        tooltipInstance.current.dispose();
        tooltipInstance.current = null;
      }
    };
  }, [text, children]);

  return (
    <span ref={tooltipRef} data-bs-toggle="tooltip" data-bs-placement="top">
      {children}
    </span>
  );
};

export default TooltipCustom;
