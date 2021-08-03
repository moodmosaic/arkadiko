require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_NAME = 'arkadiko-swap-v1-1';
const FUNCTION_NAME = 'create-pair';
const rp = require('request-promise');
const tx = require('@stacks/transactions');
const BN = require('bn.js');
const utils = require('./utils');
const network = utils.resolveNetwork();
const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');
const blockstack = require('blockstack');
const c32check = require('c32check');

const derive = async () => {
  const seed = await bip39.mnemonicToSeed('TODO - ADD SEED');
  const master = bip32.fromSeed(seed);
  const child = master.derivePath("m/44'/5757'/0'/0/2"); // taken from stacks-wallet. See https://github.com/blockstack/stacks-wallet
  const ecPair = bitcoin.ECPair.fromPrivateKey(child.privateKey);
  const privkey = blockstack.ecPairToHexString(ecPair);
  const wif = child.toWIF();

  // const addr = getPrivateKeyAddress(network, privkey);
  let btcAddress;
  // if (network.isTestnet()) {
  //   // btcAddress = const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  //   const { address } = bitcoin.payments.p2pkh({
  //     pubkey: ecPair.publicKey,
  //     network: bitcoin.networks.regtest,
  //   });
  //   btcAddress = address;
  // } else {
    const { address } = bitcoin.payments.p2pkh({ pubkey: ecPair.publicKey, network: bitcoin.networks.bitcoin });
    btcAddress = address;
  // }
  const result = {
    privateKey: privkey,
    address: tx.getAddressFromPrivateKey(privkey),//c32check.b58ToC32('1BBcymYZCapJqCEcaqyBrYaz712byztMtX'),
    btcAddress,
    wif,
    index: 0,
  };
  console.log(result);
  return result;
};

function getPrivateKeyAddress(network, privateKey) {
  if (false) {//isCLITransactionSigner(privateKey)) {
    const pkts = privateKey;
    return pkts.address;
  } else {
    const pk = privateKey;
    const ecKeyPair = blockstack.hexStringToECPair(pk);
    return network.coerceAddress(blockstack.ecPairToAddress(ecKeyPair));
  }
}

derive();
