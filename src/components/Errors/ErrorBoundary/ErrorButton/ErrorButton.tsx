import { useState } from 'react';
import Button from '~/components/ui/Button/Button';

export default function ErrorButton() {
  const [throwError, setThrowError] = useState(false);

  const onClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Check Error Boundary');
  }

  return (
    <Button className="max-w-100 text-red-500" onClick={onClick}>
      Throw render error
    </Button>
  );
}
