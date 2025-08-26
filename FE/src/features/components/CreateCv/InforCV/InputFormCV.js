import React, { useState } from "react";
import PropTypes from "prop-types";
import { validateInput } from "./Validator";

function InputFormCV({
  label = "", // Giá trị mặc định cho label
  value = "", // Giá trị mặc định cho value
  type = "text", // Giá trị mặc định cho type
  validators = [], // Giá trị mặc định cho validators
  onChange,
  placeholder = "", // Giá trị mặc định cho placeholder
  helpText,
}) {
  const [error, setError] = useState(false);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setError(validateInput(validators, value));
    onChange(value);
  };

  return (
    <div className="form-group">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={handleOnChange}
        aria-describedby="helpId"
        placeholder={placeholder}
      />
      <small id="helpId" className="form-text text-muted">
        {helpText}
      </small>
      <br />
      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
}

InputFormCV.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validators: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  helpText: PropTypes.string, // Đảm bảo rằng helpText là string
};

export default InputFormCV;
