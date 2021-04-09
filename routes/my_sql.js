var mysql      = require('mysql');
module.exports = (
    connection = mysql.createConnection({
        // //mysql://b66eb3bbb25d87:f99ee176@us-cdbr-east-02.cleardb.com/heroku_d1c8e7a1fea3dc7?reconnect=true
        // host       : 'us-cdbr-east-02.cleardb.com',
        // user      : 'b66eb3bbb25d87',
        // password  : 'f99ee176', 
        // database  : 'heroku_d1c8e7a1fea3dc7' 

        host       : 'freedb.tech',
        user      : 'freedbtech_nguyen huu phu',
        password  : 'Nyc2019@', 
        database  : 'freedbtech_sdfdsgdsfg' 
     
    })
);