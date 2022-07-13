import { default as NightMarketJSON } from '../../../artifacts/contracts/NightMarket.sol/NightMarket.json';
import { default as NightMarketFactoryJSON } from '../../../artifacts/contracts/NightMarketFactory.sol/NightMarketFactory.json';

export const NIGHTMARKET_ABI = NightMarketJSON.abi;

export const LIST_VERIFY_ADDR = "0xCc4642bF6a055E94e364699502eE4Ae75244dd16";
export const SALE_VERIFY_ADDR = "0xdcD17cC3b8ABAd601798597174550ffa1045BacF";

export const NIGHTMARKET_FACTORY_ADDR = "0xF950500E618a83A70D8C4F5BC2A3fd4ed3f69079";
export const NIGHTMARKET_FACTORY_ABI = NightMarketFactoryJSON.abi;

// Plugin behaviors
export const POLL_INTERVAL = 5000;

// In browser proof generation
export const LIST_ZKEY_URL = 'https://raw.githubusercontent.com/factorgroup/nightmarket/main/client/list/list.zkey';
export const LIST_WASM_URL = 'https://raw.githubusercontent.com/factorgroup/nightmarket/main/client/list/list.wasm';

export const SALE_ZKEY_URL = 'https://raw.githubusercontent.com/factorgroup/nightmarket/main/client/sale/sale.zkey';
export const SALE_WASM_URL = 'https://raw.githubusercontent.com/factorgroup/nightmarket/main/client/sale/sale.wasm';