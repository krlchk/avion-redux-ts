export interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export interface SimpleButtonProps {
  text: string;
  onClick?: () => void;
}

export interface LoaderProps {
  styles?: string;
}
