import React, { useState } from 'react';
import { IdleTimerProvider } from 'react-idle-timer';
import JWTAuth from 'services/auth/jwt';

const IdleContextProvider = ({ children }) => {
    const [time] = useState(1000 * 10 * 60); // 10 minutos de inactividad se desloguea
    

    const onIdle = () => {
      console.log('Idle');
      JWTAuth.onLogout();
      JWTAuth.getAuthUser();
      window.location.reload(true);
    };

    return (
      <IdleTimerProvider timeout={time} throttle={500} onIdle={onIdle}>
        {children}
      </IdleTimerProvider>
    );
};

export default IdleContextProvider;
