import { ReactNode } from 'react';
import { message } from 'antd';

export const success = (str: string | ReactNode) => {
  message.success({
    content: str,
  });
};

export const error = (str: string | ReactNode) => {
  message.error({
    content: str,
  });
};