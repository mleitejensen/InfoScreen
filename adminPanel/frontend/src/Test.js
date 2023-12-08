import React, { useEffect, useState } from 'react';

function Test() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:9000')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
export default Test;