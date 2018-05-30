module.exports = (req, res) => {
    res.json({
        statusCode:200,
        data:[
            {
                username:'arthur',
            }
        ]
    });
};