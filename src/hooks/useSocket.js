import { useEffect, useState } from 'react';

export default function useSocket(Socket, pair) {
  const [values, setValues] = useState(null);

  useEffect(() => {
    if (pair) {
      new Socket({
        onMessageCallback: message => setValues(message),
        pair,
      });
    }
  }, [pair]);

  return values;
}
