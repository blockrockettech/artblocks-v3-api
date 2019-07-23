const _ = require('lodash');

const {connectToSimpleArtistToken, weiToEth} = require('./connection.utils');

class SimpleArtistTokenService {

    async getOwnerTokens (network, owner) {
        const token = connectToSimpleArtistToken(network);

        return await token.tokensOfOwner(owner);;
    }

    async getContractInfo (network) {
        const token = connectToSimpleArtistToken(network);

        const name = await token.name();
        const symbol = await token.symbol();

        return {
            name: name[0],
            symbol: symbol[0],
        };
    }

    async isWhitelisted (network, address) {
        // Assuming always validating against mainnet for artist updates
        const token = connectToSimpleArtistToken(network);
        console.log('Is Whitelisted', address);
        return (await token.isWhitelisted(address))[0];
    }
}

module.exports = new SimpleArtistTokenService();
