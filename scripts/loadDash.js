let loadDash = async(gData) => {
    let dashboardData;

    try {
        dashboardData = {
            speed_score: gData.ruleGroups.SPEED.score,
            image_bytes: gData.pageStats.imageResponseBytes,
            http_resources: gData.pageStats.numberResources,
            roundtrips: gData.pageStats.numRenderBlockingRoundTrips,
            request_bytes: gData.pageStats.totalRequestBytes,
        };
    } catch (error) {
        if (error.message) throw new Error(error.message);
        throw new Error('Could Not Load Dropthemzier Dashboard');
    }
    return dashboardData;
}

exports.loadDash = loadDash;