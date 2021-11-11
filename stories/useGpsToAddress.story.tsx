import { storiesOf } from '@storybook/react';
import React, { useRef } from 'react';
import { useGpsToAddress } from '../src/hooks/useGpsToAddress';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [prefRef, townRef, cityRef] = [useRef(null), useRef(null), useRef(null)];
  const { address, error, getAddress } = useGpsToAddress({
    pref: prefRef,
    city: cityRef,
    town: townRef,
  });

  const handleClick = async () => {
    await getAddress();
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <button onClick={handleClick}>GPSから住所を自動入力する</button>
        <input type="text" placeholder={'都道府県'} ref={prefRef} />
        <input type="text" placeholder={'市区町村'} ref={cityRef} />
        <input type="text" placeholder={'町域名'} ref={townRef} />
      </div>
      <p>{`error: ${error}`}</p>
      <p>{`json: ${JSON.stringify(address, null, 2)}`}</p>
    </>
  );
};

storiesOf('Hooks/useGpsToAddress', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useGpsToAddress.md')} />)
  .add('Demo', () => <Demo />);
