import * as React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { DiscoLights } from '../src';

const DiscoApp = () => {
  return (
    <div>
      <DiscoLights channelID="disco" />
    </div>
  );
};
const RGBApp = () => {
  return (
    <div>
      <DiscoLights channelID="rgb" />
    </div>
  );
};
const InvalidApp = () => {
  return (
    <div>
      <DiscoLights channelID="an_incorrect_channel_id" />
    </div>
  );
};

describe('it', () => {
  it('disco lights', async () => {
    const { getByText: getByTextDisco } = render(<DiscoApp />);
    await waitFor(() =>
      expect(getByTextDisco('Websocket: DISCO')).toBeInTheDocument()
    );
  });
  it('rgb lights', async () => {
    const { getByText: getByTextRGB } = render(<RGBApp />);
    await waitFor(() =>
      expect(getByTextRGB('Websocket: RGB')).toBeInTheDocument()
    );
  });
  it('invalid channel id', async () => {
    const { getByText: getByTextInvalid } = render(<InvalidApp />);
    await waitFor(() =>
      expect(
        getByTextInvalid('Websocket: Invalid channel ID')
      ).toBeInTheDocument()
    );
  });
});
