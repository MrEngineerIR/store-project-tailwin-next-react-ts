import React from "react";

const Tooltip = ({
  message,
  className,
}: {
  message: string;
  className: string;
}) => {
  return <div className={className}>{message}</div>;
};

export default Tooltip;
