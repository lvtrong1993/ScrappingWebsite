var mysql = require('mysql');
exports.load = (sql) => {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "fashion"
  });

    con.connect(function(err) {
        if (err) throw err;
        //console.log("Concect");
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
};