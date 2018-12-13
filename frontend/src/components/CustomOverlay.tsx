import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface Props {
  id: string;
  delay?: number;
  text: string | React.ReactElement<any>;
  children: React.ReactElement<any>;
}

const CustomOverlay: React.SFC<Props> = ({ id, delay, text, children }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      delay={delay ? delay : 150}
      overlay={<Tooltip id={id}>{text}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default CustomOverlay;
