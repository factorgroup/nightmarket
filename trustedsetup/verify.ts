import { zKey } from "snarkjs";
import process from "process";

const PATH_SALE_R1CS = "./client/sale/sale.r1cs";
const PATH_LIST_R1CS = "./client/list/list.r1cs";
const PATH_PTAU = "./circuits/pot15_final.ptau";
const PATH_FOLDER_TRUSTED_SETUP = "./trustedsetup";

async function main () {
    process.removeAllListeners('warning'); // Warning: Closing file descriptor 45 on garbage collection from snarkJS
    const circuitType = process.argv.slice(2);
    const VERIFICATION = circuitType[ 0 ] === "sale" ? {r1cs: PATH_SALE_R1CS, zkey: `${PATH_FOLDER_TRUSTED_SETUP}/sale_000`} :
        (circuitType[ 0 ] === "list" ? {r1cs: PATH_LIST_R1CS, zkey: `${PATH_FOLDER_TRUSTED_SETUP}/list_000`} : (function () { throw "Wrong circuit name provided"; }()));
    console.log(`Verifying zkeys for ${VERIFICATION.r1cs}...`);
    for (let i = 0; i <= 4; i++) {
        const result: boolean = await zKey.verifyFromR1cs(VERIFICATION.r1cs, PATH_PTAU, `${VERIFICATION.zkey}${i}.zkey`);
        console.log(`${VERIFICATION.zkey}${i}.zkey : ${result}`);
    }
    return;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });