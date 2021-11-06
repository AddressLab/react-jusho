import { storiesOf } from '@storybook/react';
import React, { useRef } from 'react';
import { usePostcode } from '../src/hooks/usePostcode';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [prefRef, townRef, cityRef] = [useRef(null), useRef(null), useRef(null)];
  const { address, searchAddress } = usePostcode({ prefRef, cityRef, townRef });

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <input onChange={(e: any) => searchAddress(e.target.value)} />
        <input type="text" placeholder={'都道府県'} ref={prefRef} />
        <input type="text" placeholder={'市区町村'} ref={cityRef} />
        <input type="text" placeholder={'町域名'} ref={townRef} />
      </div>
      <label>{JSON.stringify(address, null, 2)}</label>
    </>
  );
};

storiesOf('Hooks/usePostcode', module)
  .add('Docs', () => <ShowDocs md={require('../docs/usePostcode.md')} />)
  .add('Demo', () => <Demo />);
