const Eth = require('ethjs');

const {contracts} = require('artblocks-v3-contract-tools');

const {INFURA_KEY} = require('../const'); // FIXME stick in env vars

const connectToNetwork = (network) => {
    let eth;
    if (network === 'local') {
        eth = new Eth(new Eth.HttpProvider(`http://127.0.0.1:7545`));
    } else {
        eth = new Eth(new Eth.HttpProvider(`https://${network}.infura.io/v3/${INFURA_KEY}`));
    }
    return eth;
};

const ethJsConnector = (networkId, abi, address) => {
    const network = contracts.getNetwork(networkId);
    const eth = connectToNetwork(network);
    return eth.contract(abi).at(address);
};

const connectToSimpleArtistToken = (networkId) => {
    const {address, abi} = contracts.getSimpleArtistToken(networkId);
    return ethJsConnector(networkId, abi, address);
};

const weiToEth = (wei) => {
    return Eth.fromWei(wei.toString(), 'ether');
};

module.exports = {
    connectToSimpleArtistToken,
    weiToEth
};
