# `useGpsToAddress`

## Usage

```jsx
import { useGpsToAddress } from 'react-jusho';

const Demo = () => {
  const { getAddress } = useGpsToAddress();
  const [allAddress, setAllAddresss] = React.useState < string > '';

  const handleClick = async () => {
    const res = await getAddress();
    setAllAddresss(res.allAddress);
  };

  return (
    <div>
      <button onClick={handleClick}>GPSから住所を自動入力する</button>
      <label>{JSON.stringify(allAddress, null, 2)}</label>
    </div>
  );
};
```
