const Jimp = require('jimp');
const request = require('request-promise');

module.exports = {
    optim: (urls) => {
        return new Promise((resolve) => {
            getOptimizedImages(urls).then((imageData) => {
                resolve(imageData);
            });
        });
    }
}

async function getOptimizedImages(urls) {
    let imageData = [];
    for (let i = 0; i < urls.length; i++) {
        let image = await Jimp.read(urls[i]);
        if (image) {
            if (image.getMIME() == 'image/jpeg') {
                image.quality(90);
            }
            image.getBuffer(Jimp.AUTO, function(err, data) {
                if (err) console.log(err);
                imageData.push(data);
            });
        } else {
            imageData.push(await request.get(urls[i]));
        }
    }
    return imageData;
}