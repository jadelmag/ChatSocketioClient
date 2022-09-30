import { FormContainerInterFace } from "src/components/formcontainer/interface";
import "./form-container.scss";

export const FormContainer = ({
  title,
  children,
  onSubmit,
}: FormContainerInterFace): JSX.Element => {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="brand">
          <h1>{title}</h1>
        </div>
        {children}
      </form>
    </div>
  );
};

export default FormContainer;
