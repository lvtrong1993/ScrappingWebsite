var express =  require('express');
var app = express();
var request = require("request");
var cheerio = require("cheerio");
var shell = require('shelljs');
var rimraf = require("rimraf");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./view");
app.listen(3001);
db = require('./db/db');

// app.get("/", function(req, res){
// 	console.log('xxxx');
// 	for(var i = 1; i < 3; i++){
// 		cmd = 'curl "https://kenh14s.cnnd.vn/Handler/List/GetZoneData.ashx?c=getdatadulich&cid=190&page=' + i + '&size=10" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: http://kenh14.vn/doi-song/du-lich.chn" -H "Origin: http://kenh14.vn" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" --compressed >> abc/json' + i +'.txt ';
// 		shell.exec(cmd);
// 		console.log(i);
// 	} 
// 	console.log("out");

// });

// ====================== Delete all file in folder then create new files ==============================
app.get("/unlink", function(req, res){
	//remove all JSON files in storage folder then make new JSON files
	rimraf('./storage/*', function () { 
		for(var i = 1; i < 5; i++){
			cmd = 'curl "https://kenh14s.cnnd.vn/Handler/List/GetZoneData.ashx?c=getdatadulich&cid=190&page=' + i + '&size=10" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: http://kenh14.vn/doi-song/du-lich.chn" -H "Origin: http://kenh14.vn" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" --compressed >> storage/json' + i +'.txt ';
			// cmd ='curl "http://kenh14.vn/timeline/laytinmoitronglist-5-2-2-2-2-1-5-0-4-2.chn" -H "Cookie: _ga=GA1.2.708207515.1525247673; __RC=5; __R=3; __tb=0; _gid=GA1.2.745932704.1528684028; __utmz=54548145.1528684029.2.2.utmcsr=google^|utmccn=(organic)^|utmcmd=organic^|utmctr=(not^%^20provided); __IP=1906399077; __UF=2^%^2C4; __utma=54548145.708207515.1525247673.1528793063.1528856647.10; __utmc=54548145; __utmt=1; _admcfr=544281_5; __utmb=54548145.10.10.1528856647; __uif=__uid^%^3A4411749901906399077^%^7C__ui^%^3A2^%^2C4^%^7C__create^%^3A1521174990; _gat_gtag_UA_34575478_51=1" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" -H "Content-Type: application/json; charset=utf-8" -H "Accept: */*" -H "Referer: http://kenh14.vn/fashion.chn" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" --compressed >> storage/json' + i +'.txt ';
			shell.exec(cmd);
			console.log(i);
		} 
		console.log("Done");
		// // Call function Scrapping
		scrapping();

	});

});

// ============================================ Function Scrapping ======================================
function scrapping(){
	var fs = require('fs'),
	files = fs.readdirSync(__dirname + '/storage/');
	files.forEach(async function(file) {
		try{
			// read all file JSON then set contents
			var contents = fs.readFileSync(__dirname + '/storage/' + file, 'utf8');
			var cc = JSON.parse(contents);
			for(let j= 0 ; j< cc.Data.length; j++){
				let currentURL = "http://kenh14.vn/"+cc.Data[j].Url;
				let content = await websiteContent(currentURL);
				// console.log(cc.Data[j].Title);
				// Inssert title and content to database
				let tmpTitle = cc.Data[j].Title;
				//replace all specical character ' to '' then add to DB
				content = content.replace(/'/g, "''");
				let sql  = "INSERT INTO `wp_posts` (`post_content`, `post_title`) values('"+content+"','"+tmpTitle+"')";
				await db.load(sql);
			}
		}catch(err){
			console.log("File not found");
		}
	})
};
// curl "http://kenh14.vn/timeline/laytinmoitronglist-5-2-2-2-2-1-5-0-4-2.chn" -H "Cookie: _ga=GA1.2.708207515.1525247673; __RC=5; __R=3; __tb=0; _gid=GA1.2.745932704.1528684028; __utmz=54548145.1528684029.2.2.utmcsr=google^|utmccn=(organic)^|utmcmd=organic^|utmctr=(not^%^20provided); __IP=1906399077; __UF=2^%^2C4; __utma=54548145.708207515.1525247673.1528793063.1528856647.10; __utmc=54548145; __utmt=1; _admcfr=544281_5; __utmb=54548145.10.10.1528856647; __uif=__uid^%^3A4411749901906399077^%^7C__ui^%^3A2^%^2C4^%^7C__create^%^3A1521174990; _gat_gtag_UA_34575478_51=1" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" -H "Content-Type: application/json; charset=utf-8" -H "Accept: */*" -H "Referer: http://kenh14.vn/fashion.chn" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" --compressed
//======================= function get website content ==================================================
let websiteContent = url => {
	return new Promise((resolve, reject) =>{
		setTimeout(()=>{
			// -------------------
			request(url, function(error, response, body){
				if(error){
					return reject(new Error('Scrapping that bai'))
				}else{
					// decodeEntities: false decode UTF8
					$ =  cheerio.load(body, { decodeEntities: false });
					//find class content of page
					let ct = $(body).find(".klw-new-content");
					resolve(ct.html());
				}
			})
		}, 500);
	});
}
//  ===================== Read JSON files to get url and Scrapping ==========================
app.get('/scrapping',  function(req, res){
	var fs = require('fs'),
	files = fs.readdirSync(__dirname + '/abc/');
	files.forEach(async function(file) {
		try{
			// read all file JSON then set contents
			var contents = fs.readFileSync(__dirname + '/abc/' + file, 'utf8');
			var cc = JSON.parse(contents);
			for(let j= 0 ; j< cc.Data.length; j++){
				let currentURL = "http://kenh14.vn/"+cc.Data[j].Url;
				let content = await websiteContent(currentURL);
				// console.log(cc.Data[j].Title);
				// Inssert title and content to database
				let tmpTitle = cc.Data[j].Title;
				//replace all specical character ' to '' then add to DB
				content = content.replace(/'/g, "''");
				let sql  = "INSERT INTO `wp_posts` (`post_content`, `post_title`) values('"+content+"','"+tmpTitle+"')";
				await db.load(sql);
			}
		}catch(err){
			console.log("File not found or empty");
		}
	})
});

app.get("/regex", function(req, res){
let str = ' some text url:"http:/myURL01", some text url:"http:/myURL02", ..., url:"http:/myURL03", some text';
results = str.match(/http.*?(?=\")/g);
console.log(results);
});



















// ======================  read all file json to get url, and use thí url to scraping website content ================================ 
/*app.get('/readMultiFile', function(req, res){

	var fs = require('fs'),
	files = fs.readdirSync(__dirname + '/abc/');
	files.forEach(function(file) {
		var contents = fs.readFileSync(__dirname + '/abc/' + file, 'utf8');
		var cc = JSON.parse(contents);
		for(let j= 0 ; j< cc.Data.length; j++){
			console.log(cc.Data[j].Url);
			request("http://kenh14.vn/"+cc.Data[j].Url, function(error, response, body){
				if(error){
					console.log(error);
				}else{
					$ = cheerio.load(body);
					var listHTML = $(body).find(".kbwc-title");
					console.log(listHTML.text());
				}
			});
		}
	})
});


app.get('/readMultiFile2', function(req, res){
	var fs = require('fs'),
	files = fs.readdirSync(__dirname + '/abc/');
	files.forEach(function(file) {
		var contents = fs.readFileSync(__dirname + '/abc/' + file, 'utf8');
		var cc = JSON.parse(contents);
		var lol = cc.Data;
		console.log( lol);
	})
})

app.get("/readfile", function(req, res){
	var fs = require('fs');
	fs.readFile('abc/json4.txt', 'utf8', function(err, data) {
		if (err) throw err;
		var res = JSON.parse(data);
		console.log(res.Data[0].Title);

	});
});
*/