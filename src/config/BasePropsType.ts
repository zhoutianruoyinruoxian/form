import { CSSProperties, ReactChild } from 'react';

export default interface BasePropTypes {
  style?: CSSProperties;
  className?: string;
  children?: ReactChild;
}