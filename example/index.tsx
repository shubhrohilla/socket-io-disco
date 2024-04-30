import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DiscoLights } from '../.';

const App = () => {
  return (
    <div>
      {/* <DiscoLights /> */}
      {/* <DiscoLights channelID="rgb" /> */}
      <DiscoLights channelID="disco" />
      {/* <DiscoLights channelID="an_incorrect_channel_id" /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
