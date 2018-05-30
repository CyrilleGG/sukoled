module.exports = (req, res) => {
    res.json({
        statusCode:200,
        data:{
            username:req.params.username,
            firstname:'Arthur',
            last_name:'Foo',
            age:54
        }
    });
};