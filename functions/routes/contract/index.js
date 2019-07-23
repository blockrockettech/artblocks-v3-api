const _ = require('lodash');

const contract = require('express').Router({mergeParams: true});

const simpleArtistTokenService = require('../../services/SimpleArtistToken.service');
const imageGenService = require('../../services/ImageGen.service');

contract.get('/token/:tokenId/image', async (req, res, next) => {
    try {
        const {network, tokenId} = req.params;

        const hash = await simpleArtistTokenService.getHash(network, tokenId);
        const buffer = await imageGenService.generate(hash);

        return res
            .contentType('image/png')
            .send(buffer);
    } catch (e) {
        return next(e);
    }
});


contract.get('/token/:tokenId', async (req, res, next) => {
    try {
        const {network, tokenId} = req.params;

        const tokenDetails = await simpleArtistTokenService.getMetaData(network, tokenId);

        return res
            .status(200)
            .json(tokenDetails);
    } catch (e) {
        return next(e);
    }
});

contract.get('/owner/:address', async (req, res, next) => {
    try {
        const {network, address} = req.params;

        const ownerTokens = await simpleArtistTokenService.getOwnerTokens(network, address);

        return res
            .status(200)
            .json(_.map(ownerTokens, t => t.toString()));
    } catch (e) {
        return next(e);
    }
});

contract.get('/info', async (req, res, next) => {
    try {
        const {network} = req.params;

        const contractDetails = await simpleArtistTokenService.getContractInfo(network);

        return res
            .status(200)
            .json(contractDetails);
    } catch (e) {
        return next(e);
    }
});

contract.get('/whitelisted/:account', async (req, res, next) => {
    try {
        const {network, account} = req.params;

        const isWhitelisted = await simpleArtistTokenService.isWhitelisted(network, account);

        return res
            .status(200)
            .json({
                isWhitelisted: isWhitelisted
            });
    } catch (e) {
        return next(e);
    }
});

module.exports = contract;
