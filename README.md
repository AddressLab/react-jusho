# react-jusho

郵便番号から住所を取得する React カスタムフックです。郵便番号入力フィールドと住所入力フィールドをカスタムフックに接続するだけで、住所の自動入力が実現できます。

# インストール

```bash
$ npm install --save react-jusho
```

または

```
$ yarn add react-jusho
```

# 使用例

```
import { usePostcode } from 'react-jusho'

const [prefRef, townRef, cityRef] = [useRef(null), useRef(null), useRef(null)];
const { searchAddress } = usePostcode({ prefRef, cityRef, townRef });

return (
  <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
    <input onChange={(e: any) => searchAddress(e.target.value)} />
  <>
    <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
      <input onChange={(e: any) => searchAddress(e.target.value)} />
      <input type="text" placeholder={'都道府県'} ref={prefRef} />
      <input type="text" placeholder={'市区町村'} ref={cityRef} />
      <input type="text" placeholder={'町域名'} ref={townRef} />
    </div>
    <label>{JSON.stringify(address, null, 2)}</label>
  </>
)
```

# 取得可能な情報

`address`には以下の情報が含まれます。

```
prefCode: string; // 都道府県名コード 半角数字   2 桁
cityCode: string; // 市区町村コード　半角数字   3 桁
postcode: string; // 郵便番号 角数字  7  桁

pref: string; // 都道府県 漢字
city: string; // 市区町村 漢字
town: string; // 町域名 漢字
allAddress: string; // 都道府県市区町村町域名 漢字
office: string; // 大口事業所名 漢字

hiragana.pref: string;　// 都道府県 ひらがな
hiragana.city: string; // 市区町村 ひらがな
hiragana.town: string; // 町域名 ひらがな
hiragana.allAddress: string; // 都道府県市区町村町域名 ひらがな
hiragana.office: string; // 大口事業所名 ひらがな

halfWidthKana.pref: string;　// 都道府県 半角カタカナ
halfWidthKana.city: string; // 市区町村 半角カタカナ
halfWidthKana.town: string; // 町域名 半角カタカナ
halfWidthKana.allAddress: string; // 都道府県市区町村町域名 半角カタカナ
halfWidthKana.office: string; // 大口事業所名 半角カタカナ

fullWidthKana.pref: string;　// 都道府県 全角カタカナ
fullWidthKana.city: string; // 市区町村 全角カタカナ
fullWidthKana.town: string; // 町域名 全角カタカナ
fullWidthKana.allAddress: string; // 都道府県市区町村町域名 全角カタカナ
fullWidthKana.office: string; // 大口事業所名 全角カタカナ

generalPostcode: boolean; // 一般郵便番号の場合は  true
officePostcode: boolean; // 大口事業所個別番号の場合は  true

```

# デモ

jsfiddle の URL を貼っておく

# 使用データ

日本郵便
