const _ = require('lodash');

const {connectToSimpleArtistToken, weiToEth} = require('./connection.utils');

class SimpleArtistTokenService {

    async getOwnerTokens (network, owner) {
        const token = connectToSimpleArtistToken(network);

        return await token.tokensOfOwner(owner);
    }

    async getContractInfo (network) {
        const token = connectToSimpleArtistToken(network);

        const name = await token.name();
        const symbol = await token.symbol();

        const maxInvocations = await token.maxInvocations();
        const invocations = await token.invocations();

        const tokenBaseURI = await token.tokenBaseURI();
        const tokenBaseIpfsURI = await token.tokenBaseIpfsURI();

        const pricePerTokenInWei = await token.pricePerTokenInWei();
        const applicationChecksum = await token.applicationChecksum();

        const artistAddress = await token.artistAddress();
        const foundationAddress = await token.foundationAddress();
        const foundationPercentage = await token.foundationPercentage();

        return {
            name: name[0],
            symbol: symbol[0],
            invocations: invocations[0].toString(),
            maxInvocations: maxInvocations[0].toString(),
            tokenBaseURI: tokenBaseURI[0],
            tokenBaseIpfsURI: tokenBaseIpfsURI[0],
            pricePerTokenInWei: pricePerTokenInWei[0],
            applicationChecksum: applicationChecksum[0],
            artistAddress: artistAddress[0],
            foundationAddress: foundationAddress[0],
            foundationPercentage: foundationPercentage[0],
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
