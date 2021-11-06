import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useGpsToAddress } from '../src/hooks/useGpsToAddress';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { getAddress } = useGpsToAddress();
  const [allAddress, setAllAddresss] = React.useState<string>('');

  const handleClick = async () => {
    const res = await getAddress();
    if (res.error === null) {
      setAllAddresss(res.address.allAddress);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>GPSから住所を自動入力する</button>
      <label>{JSON.stringify(allAddress, null, 2)}</label>
    </div>
  );
};

storiesOf('Hooks/useGpsToAddress', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useGpsToAddress.md')} />)
  .add('Demo', () => <Demo />);
