// TODO: factory pattern this
import { default as NightMarketJSON } from '../../../artifacts/contracts/NightMarket.sol/NightMarket.json';
// import { default as gameJSON } from '../../../artifacts/contracts/darkforest/GetterInterface.sol/IGetter.json';

// export const DF_ADDR = "0xa98f6b548a748427acfa591a9f24ab840764d129";
// export const DF_ABI = gameJSON.abi;

export const NIGHTMARKET_ADDR = "0x6bB571363f8dB78Fe71D3bE347192ecAd26a49D7";
export const NIGHTMARKET_ABI = NightMarketJSON.abi;

export const LIST_VERIFY_ADDR = "0x43869DE76b4739cd9E484df40f307D115C08A892";
export const SALE_VERIFY_ADDR = "0xa5067E2fcc7C5d74f19b1cD17B48B121B0077146";

// Plugin behaviors
export const POLL_INTERVAL = 5000;

// In browser proof generation
export const LIST_ZKEY_URL = 'https://raw.githubusercontent.com/0xSage/nightmarket/main/client/list/list.zkey';
export const LIST_WASM_URL = 'https://raw.githubusercontent.com/0xSage/nightmarket/main/client/list/list.wasm';

export const SALE_ZKEY_URL = 'https://raw.githubusercontent.com/0xSage/nightmarket/main/client/sale/sale.zkey';
export const SALE_WASM_URL = 'https://raw.githubusercontent.com/0xSage/nightmarket/main/client/sale/sale.wasm';