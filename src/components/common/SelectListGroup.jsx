import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

///se pasan los props que se requiere.. no se si props haria lo mismo aqui.. ver
let SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  let selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;

/// aqui se reemplazan los harcoded fields por los props que se trajeron al principio en la definicion del componente
