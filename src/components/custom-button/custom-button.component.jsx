import React from "react";

//import "./custom-button.style.scss";

import { CustomButtonContainer } from "./custom-button.styles";

// childre je za type
const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
