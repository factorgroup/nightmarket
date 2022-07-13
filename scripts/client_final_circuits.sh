#!/bin/bash
snarkjs zkey export verificationkey ./trustedsetup/sale_final.zkey ./trustedsetup/sale_final.vkey.json
snarkjs zkey export verificationkey ./trustedsetup/list_final.zkey ./trustedsetup/list_final.vkey.json

cp ./trustedsetup/sale_final.vkey.json ./client/sale/sale.vkey.json
cp ./trustedsetup/list_final.vkey.json ./client/list/list.vkey.json

cp ./trustedsetup/sale_final.zkey ./client/sale/sale.zkey
cp ./trustedsetup/list_final.zkey ./client/list/list.zkey