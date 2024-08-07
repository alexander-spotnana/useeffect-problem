import { FC, useState } from 'react';
import { useCustomUseEffect } from '../../hooks/useCustomUseEffect/useCustomUseEffect';

type CustomComponentProps = {
  count: number;
};

export const CustomComponent: FC<CustomComponentProps> = ({ count }) => {
  const [message, setMessage] = useState('');

  useCustomUseEffect(() => {
    console.log('Custom effect has run');
    setMessage(`Count is ${count}`);

    return () => {
      console.log('Cleanup has run');
      setMessage('');
    };
  }, [count]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};