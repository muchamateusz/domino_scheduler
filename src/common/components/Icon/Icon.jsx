import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);

const Icon = ({ iconName, ...rest }) => {
  return <FontAwesomeIcon icon={iconName} {...rest} />;
};

Icon.propTypes = {
  iconName: PropTypes.string
};
export default Icon;
