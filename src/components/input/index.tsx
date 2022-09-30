import { useState, useEffect } from "react";
import { InputInterface } from "src/components/input/input.interface";
import "./input.scss";

export const Input = ({
  formik,
  lblText,
  type,
  value,
  placeholder,
  name,
  hideError,
}: InputInterface): JSX.Element => {
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (value.trim().length > 0) {
      setTouched(true);
    }
  }, [value]);

  return (
    <div className="form-input">
      <label htmlFor={name} className="form-label">
        {lblText}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newValues: string = e.target.value;
          formik.setFieldValue(name, newValues);
        }}
      />
      {!hideError && touched && formik.errors[name] && (
        <span className="input-error">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default Input;
