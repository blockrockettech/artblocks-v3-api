const _ = require('lodash');
const sharp = require('sharp');

class ImageGenService {

    async generate (hash) {

        const parts = hash.substr(2).match(/.{1,16}/g);
        const numbers = _.map(parts, h => parseInt(`0x${h}`) / 256);
        const splits = _.map(numbers, n => parseInt(`${n}`.substr(14)));

        const rbg = val => val < 256 ? val : parseInt(val / 4);
        const alpha = val => {
            if (val < 250) return 0.25;
            if (val < 500) return 0.5;
            if (val < 1000) return 0.75;
        };

        return  await sharp({
            create: {
                width: splits[0] / 2,
                height: splits[1] / 2,
                channels: 4,
                background: {r: rbg(splits[0]), g: rbg(splits[1]), b: rbg(splits[2]), alpha: alpha(splits[3])}
            }
        }).png().toBuffer();
    }
}

module.exports = new ImageGenService();
