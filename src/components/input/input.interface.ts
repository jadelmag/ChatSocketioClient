export interface InputInterface {
  formik: any;
  lblText: string;
  type: string;
  value: string;
  placeholder: string;
  name: string;
  hideError?: boolean;
}

export interface InputRespInterface {
  name: string;
  value: string;
}
