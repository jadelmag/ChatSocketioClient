export interface FormContainerInterFace {
  title: string;
  children: React.ReactNode;
  onSubmit: (event: any) => void;
}
