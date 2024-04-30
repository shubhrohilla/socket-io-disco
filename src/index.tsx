import * as React from 'react';
import { io } from 'socket.io-client';
// import { connect } from 'socket.io-client';

interface DiscoLightProps {
  eventName?: string; // DEFAULT: message
  channelID?: string; // DEFAULT: disco
  server?: string; // DEFAULT: https://ws.shubhrohilla.com
  defaultColor?: string;
  setData?: React.Dispatch<React.SetStateAction<any>>;
}

export const DiscoLights = ({
  eventName = 'message',
  channelID = 'disco',
  server = 'https://ws.shubhrohilla.com',
  defaultColor,
  setData,
}: DiscoLightProps) => {
  const [status, setStatus] = React.useState<string | null>(null);
  const [bgColor, setBGColor] = React.useState<string>(
    defaultColor || '#ff0000'
  );
  const [sockConnection, setSockConnection] = React.useState<any>(null);
  React.useEffect(() => {
    if (sockConnection === null) {
      let testInterval: any;
      const socket = io(`${server}/${channelID}`);
      socket.on('connect', () => {
        setSockConnection(socket);
      });
      socket.on(eventName as string, color => {
        setBGColor(color);
        if (setData) setData(color);
      });
      socket.on('connect_error', err => {
        console.log(err);
        if (err.message == 'Invalid namespace') {
          setStatus('Invalid channel ID');
        } else {
          setStatus(err.message);
        }
      });
      return () => {
        if (testInterval) clearInterval(testInterval);
      };
    }
    return () => {};
  }, []);

  React.useEffect(() => {
    if (!sockConnection) {
      const timer = window.setInterval(() => {
        setBGColor(prev => (prev === '#ffffff' ? '#ff0000' : '#ffffff'));
      }, 1000);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [sockConnection]);
  return (
    <div
      className="websocket-disco"
      style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        padding: '2rem 4rem',
        backgroundColor: bgColor || defaultColor,
      }}
    >
      <p>Websocket: {sockConnection ? channelID.toUpperCase() : status}</p>
    </div>
  );
};
