const _ = require('lodash');

const {connectToSimpleArtistToken, weiToEth} = require('./connection.utils');

const padTokenId = (tokenId) => ('000000000' + tokenId).slice(-10);

class SimpleArtistTokenService {

    async getOwnerTokens (network, owner) {
        const token = connectToSimpleArtistToken(network);

        return await token.tokensOfOwner(owner);
    }

    async getHash (network, tokenId) {
        const token = connectToSimpleArtistToken(network);

        return (await token.tokenIdToHash(tokenId))[0];
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
            pricePerTokenInEth: weiToEth(pricePerTokenInWei[0]),
            applicationChecksum: applicationChecksum[0],
            artistAddress: artistAddress[0],
            foundationAddress: foundationAddress[0],
            foundationPercentage: foundationPercentage[0],
        };
    }

    async getMetaData (network, tokenId) {
        const token = connectToSimpleArtistToken(network);

        const tokenUri = await token.tokenURI(tokenId);

        return {
            name: `#${padTokenId(tokenId)}`,
            description: `ArtBlocks v3 #${padTokenId(tokenId)}`,
            image: `${tokenUri[0].toString()}`,
            background_color: 'FEFEBE', // pissy yellow
            attributes: {}
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
