import React from 'react';

export function CountDownTimer({
  _time,
  func,
}: {
  _time: number;
  func: () => void;
}) {
  const [time, setTime] = React.useState(_time || 10);
  const timerRef = React.useRef(time);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        func();
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [func]);
}
