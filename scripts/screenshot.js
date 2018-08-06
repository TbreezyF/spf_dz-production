module.exports = {
    image: async(shop, db) => {
        try {
            let screenshot;
            const puppeteer = require('puppeteer');
            (async() => {
                const browser = await puppeteer.launch({
                    args: ['--no-sandbox']
                });
                const page = await browser.newPage();
                await page.setViewport({
                    width: 375,
                    height: 667,
                    isMobile: true
                });
                await page.goto('https://' + shop);
                screenshot = (await page.screenshot()).toString('base64');
                await browser.close();
                if (screenshot) {
                    updateDBwithScreenshot(shop, screenshot, db);
                }
            })();
            return screenshot;
        } catch (error) {
            console.log('Could not generate new screenshot exit(1)');
        }
    }
}

async function updateDBwithScreenshot(shop, screenshot, db) {
    try {
        let date = new Date().getDate();
        let updateParams = {
            TableName: "Dropthemizer-Users",
            Key: {
                "shop": shop
            },
            UpdateExpression: "set info.screenshot = :s, info.screenshot_date = :d",
            ExpressionAttributeValues: {
                ":s": screenshot,
                ":d": date
            }
        };
        db.update(updateParams).promise();
    } catch (error) {
        console.log("Tried to update user screenshot data when user does not yet exist...");
    }
}