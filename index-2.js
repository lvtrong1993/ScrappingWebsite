var express =  require('express');
var app = express();
var request = require("request");
var cheerio = require("cheerio");
var shell = require('shelljs');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./view");
app.listen(3001);
db = require('./db/db');
app.get("/", function(req, res){
	console.log('xxxx');
	for(var i = 0; i < 5; i++){
		cmd = 'curl "https://kenh14s.cnnd.vn/Handler/List/GetZoneData.ashx?c=getdatadulich&cid=190&page=' + i + '&size=10" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: http://kenh14.vn/doi-song/du-lich.chn" -H "Origin: http://kenh14.vn" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" --compressed >> abc/json' + i +'.txt ';
		shell.exec(cmd);
	} 
	//
});
app.get("/readfile", function(req, res){
	var fs = require('fs');
	fs.readFile('abc/json4.txt', 'utf8', function(err, data) {
		if (err) throw err;
		// var res = JSON.parse('[' + data.replace(/}{/g, '},{') + ']');
		// 	console.log(res[0]);
		var res = JSON.parse(data);
		console.log(res.Data[0].Title);

	});
});
//======================= function get website content ==================================================
let websiteContent = url => {
	return new Promise((resolve, reject) =>{
		setTimeout(()=>{
			// -------------------
			request(url, function(error, response, body){
				if(error){
					return reject(new Error('Scraping that bai'))
				}else{
					// $ = cheerio.load(body);
					// let htmlContent = $(body).find(".kbwc-title");
					// resolve(htmlContent.text());
// klw-new-content
$ =  cheerio.load(body, { decodeEntities: false });
let cc = $(body).find(".klw-new-content");
					// let htmlDOM = $(body).find(".krwli");
					resolve(cc.html());
				}
			})
			// ------------------
		}, 500);
	});
}
//  ===================== Read JSON files to get url and Scrapping ==========================
app.get('/scrapping',  function(req, res){
	var fs = require('fs'),
	files = fs.readdirSync(__dirname + '/abc/');
	files.forEach(async function(file) {
		try{
			var contents = fs.readFileSync(__dirname + '/abc/' + file, 'utf8');
			var cc = JSON.parse(contents);
			// cc.Data.length
			for(let j= 0 ; j< cc.Data.length; j++){
				let currentURL = "http://kenh14.vn/"+cc.Data[j].Url;
				let content = await websiteContent(currentURL);
				// console.log('==============================================================================');
				console.log(cc.Data[j].Title);

				// console.log(content);
				// Inssert title and responsive to database
				let tmpTitle = cc.Data[j].Title;
				content = content.replace(/'/g, "''");
				let sql  = "INSERT INTO `wp_posts` (`post_content`, `post_title`) values('"+content+"','"+tmpTitle+"')";
				await db.load(sql);
			}
		}catch(err){
			console.log("File not found");
		}
	})
});

// check connect db
var arr = ["SELECT `post_title` FROM `wp_posts` WHERE `ID`= 4", "SELECT `post_title` FROM `wp_posts` WHERE `ID`=5"];
app.get('/db', function(){
	arr.forEach( async function(e){
		await db.load(e);
	});
});

// });




















// ======================  read all file json to get url, and use thí url to scraping website content ================================ 
app.get('/readMultiFile', function(req, res){

	var fs = require('fs'),
	files = fs.readdirSync(__dirname + '/abc/');


	files.forEach(function(file) {
		var contents = fs.readFileSync(__dirname + '/abc/' + file, 'utf8');
		// console.log(contents);
		// var cc = JSON.parse(contents);
		var cc = JSON.parse(contents);
		console.log("==================================== So tin: "+cc.Data.length);
		for(let j= 0 ; j< cc.Data.length; j++){
			console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			console.log(cc.Data[j].Url);
			// console.log(cc.Data[j]);
			request("http://kenh14.vn/"+cc.Data[j].Url, function(error, response, body){
				if(error){
					console.log(error);
					// res.render("index.ejs", {html:"has error"});
				}else{
					$ = cheerio.load(body);
					var listHTML = $(body).find(".kbwc-title");
					console.log(listHTML.text());
				}
			});
			console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
		}
		// console.log(cc.Data[0].Title);
		// console.log( contents[]);
	})
});


app.get('/readMultiFile2', function(req, res){

	var fs = require('fs'),
	files = fs.readdirSync(__dirname + '/abc/');


	files.forEach(function(file) {
		var contents = fs.readFileSync(__dirname + '/abc/' + file, 'utf8');
		// console.log(contents);
		// var cc = JSON.parse(contents);
		var cc = JSON.parse(contents);
		// console.log(  cc.Data[0].Title);
		var lol = cc.Data;
		// var c = lol.lenght;
		console.log( lol);
		// Object.keys(object1)
	})
})
