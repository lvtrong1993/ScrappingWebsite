var express =  require('express');
var app = express();
var request = require("request");
var cheerio = require("cheerio");
var shell = require('shelljs');
var rimraf = require("rimraf");
var fs = require('fs');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./view");
app.listen(3001);
db = require('./db/db');

// ==================================Function Run scrapping ====================
// app.get('/run', function(req, res){
	//read file config 
	function run(){
		fs.readFile('./config.txt', 'utf8', function(err, data) {
			if (err) throw err;
		// console.log(data);
		try{
			//get catelogry id and number of page
			let indexConfig  = data.lastIndexOf('category');
			let config = data.substring(indexConfig);
			let arrOtion = config.split(',');
			let categoryID = ((arrOtion[0].split(':'))[1]).replace(/ /g,'');
			let numberOfPage = ((arrOtion[1].split(':'))[1]).replace(/ /g,'');

			if(isNaN(categoryID) == false && isNaN(numberOfPage) == false){
				if(categoryID > 0 && categoryID <5 && numberOfPage > 0){
				// scrapping here
				//remove all JSON files in storage folder then make new JSON files 
				rimraf('./storage/*', function () { 
					for(let p = 1; p < numberOfPage; p++){
						if(categoryID == 1)
							cmd ='curl "http://kenh14.vn/timeline/laytinmoitronglist-'+p+'-0-0-0-0-0-5-0-0-0.chn" -H "Cookie: _ga=GA1.2.708207515.1525247673; __RC=5; __R=3; __tb=0; _gid=GA1.2.745932704.1528684028; __utmz=54548145.1528684029.2.2.utmcsr=google^|utmccn=(organic)^|utmcmd=organic^|utmctr=(not^%^20provided); __IP=1906399077; __UF=2^%^2C4; __utmc=54548145; _admcfr=544281_5; ASP.NET_SessionId=cauc5ihmpyrfuyyhtll02tcd; __utma=54548145.708207515.1525247673.1528870767.1528875381.13; adm_cpd_vplus_476553=36862; __utmt=1; _gat_GaGiaiTri=1; __utmb=54548145.12.10.1528875381; __uif=__ui^%^3A2^%^2C4^%^7C__uid^%^3A4411749901906399077^%^7C__create^%^3A1521174990; _gat_gtag_UA_34575478_51=1" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" -H "Content-Type: application/json; charset=utf-8" -H "Accept: */*" -H "Referer: http://kenh14.vn/fashion.chn" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" --compressed >> storage/json' + p +'.txt';
						if(categoryID == 2)
							cmd= 'curl "http://kenh14.vn/timeline/laytinmoitronglist-'+p+'-0-0-0-1-1-92-0-0-0.chn" -H "Cookie: _ga=GA1.2.708207515.1525247673; __RC=5; __R=3; __tb=0; _gid=GA1.2.745932704.1528684028; __utmz=54548145.1528684029.2.2.utmcsr=google^|utmccn=(organic)^|utmcmd=organic^|utmctr=(not^%^20provided); __IP=1906399077; __UF=2^%^2C4; __utmc=54548145; _admcfr=544281_5; __utma=54548145.708207515.1525247673.1528856647.1528861709.11; _gat_GaGiaiTri=1; _gat_gtag_UA_34575478_51=1; __utmt=1; __utmb=54548145.4.10.1528861709; __uif=__ui^%^3A2^%^2C4^%^7C__uid^%^3A4411749901906399077^%^7C__create^%^3A1521174990" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" -H "Content-Type: application/json; charset=utf-8" -H "Accept: */*" -H "Referer: http://kenh14.vn/fashion.chn" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" --compressed >> storage/json' + p +'.txt';
						if(categoryID == 3)
							cmd = 'curl "http://kenh14.vn/timeline/laytinmoitronglist-'+p+'-0-0-0-0-0-118-0-0-0.chn" -H "Cookie: _ga=GA1.2.708207515.1525247673; __RC=5; __R=3; __tb=0; _gid=GA1.2.745932704.1528684028; __utmz=54548145.1528684029.2.2.utmcsr=google^|utmccn=(organic)^|utmcmd=organic^|utmctr=(not^%^20provided); __IP=1906399077; __UF=2^%^2C4; __utmc=54548145; _admcfr=544281_5; ASP.NET_SessionId=cauc5ihmpyrfuyyhtll02tcd; __utma=54548145.708207515.1525247673.1528870767.1528875381.13; adm_cpd_vplus_476553=36862; _gat_gtag_UA_34575478_51=1; __utmt=1; __utmb=54548145.13.10.1528875381; __uif=__uid^%^3A4411749901906399077^%^7C__ui^%^3A2^%^2C4^%^7C__create^%^3A1521174990" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" -H "Content-Type: application/json; charset=utf-8" -H "Accept: */*" -H "Referer: http://kenh14.vn/sport.chn" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" --compressed >> storage/json' + p +'.txt';
						if(categoryID == 4)
							cmd = 'curl "http://kenh14.vn/timeline/laytinmoitronglist-'+p+'-2-1-1-1-1-3-0-0-0.chn" -H "Cookie: _ga=GA1.2.708207515.1525247673; __RC=5; __R=3; __tb=0; _gid=GA1.2.745932704.1528684028; __utmz=54548145.1528684029.2.2.utmcsr=google^|utmccn=(organic)^|utmcmd=organic^|utmctr=(not^%^20provided); __IP=1906399077; __UF=2^%^2C4; __utmc=54548145; _admcfr=544281_5; ASP.NET_SessionId=cauc5ihmpyrfuyyhtll02tcd; __utma=54548145.708207515.1525247673.1528870767.1528875381.13; adm_cpd_vplus_476553=36862; __utmt=1; _gat_gtag_UA_34575478_51=1; _gat_GaGiaiTri=1; __utmb=54548145.14.10.1528875381; __uif=__ui^%^3A2^%^2C4^%^7C__uid^%^3A4411749901906399077^%^7C__create^%^3A1521174990" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" -H "Content-Type: application/json; charset=utf-8" -H "Accept: */*" -H "Referer: http://kenh14.vn/musik.chn" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" --compressed >> storage/json' + p +'.txt';
						shell.exec(cmd);
						console.log(p);
					}
					scrapping2();
				});
}else{
	console.log("Category ID or number of Page failed");
}
				// scrapping here
			}else{
				console.log("config Error");
			}
		}catch(error){
			console.log("config Error");
		}


	});
}

// });


// ====================== Delete all file in folder then create new files ==============================
app.get("/unlink", function(req, res){
	//remove all JSON files in storage folder then make new JSON files
	rimraf('./storage/*', function () { 
		for(var i = 1; i < 2; i++){
			// cmd = 'curl "https://kenh14s.cnnd.vn/Handler/List/GetZoneData.ashx?c=getdatadulich&cid=190&page=' + i + '&size=10" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: http://kenh14.vn/doi-song/du-lich.chn" -H "Origin: http://kenh14.vn" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" --compressed >> storage/json' + i +'.txt ';
			//cmd = 'curl "http://kenh14.vn/timeline/laytinmoitronglist-'+i+'-2-1-1-1-1-5-0-4-1.chn" -H "Cookie: _ga=GA1.2.708207515.1525247673; __RC=5; __R=3; __tb=0; _gid=GA1.2.745932704.1528684028; __utmz=54548145.1528684029.2.2.utmcsr=google^|utmccn=(organic)^|utmcmd=organic^|utmctr=(not^%^20provided); __IP=1906399077; __UF=2^%^2C4; __utmc=54548145; _admcfr=544281_5; _gat_GaGiaiTri=1; __utma=54548145.708207515.1525247673.1528856647.1528861709.11; __utmt=1; _gat_gtag_UA_34575478_51=1; __utmb=54548145.3.10.1528861709; __uif=__ui^%^3A2^%^2C4^%^7C__uid^%^3A4411749901906399077^%^7C__create^%^3A1521174990" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" -H "Content-Type: application/json; charset=utf-8" -H "Accept: */*" -H "Referer: http://kenh14.vn/fashion.chn" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" --compressed >> storage/json' + i +'.txt';
			cmd= 'curl "http://kenh14.vn/timeline/laytinmoitronglist-1-0-0-0-1-1-92-0-0-0.chn" -H "Cookie: _ga=GA1.2.708207515.1525247673; __RC=5; __R=3; __tb=0; _gid=GA1.2.745932704.1528684028; __utmz=54548145.1528684029.2.2.utmcsr=google^|utmccn=(organic)^|utmcmd=organic^|utmctr=(not^%^20provided); __IP=1906399077; __UF=2^%^2C4; __utmc=54548145; _admcfr=544281_5; __utma=54548145.708207515.1525247673.1528856647.1528861709.11; _gat_GaGiaiTri=1; _gat_gtag_UA_34575478_51=1; __utmt=1; __utmb=54548145.4.10.1528861709; __uif=__ui^%^3A2^%^2C4^%^7C__uid^%^3A4411749901906399077^%^7C__create^%^3A1521174990" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36" -H "Content-Type: application/json; charset=utf-8" -H "Accept: */*" -H "Referer: http://kenh14.vn/fashion.chn" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" --compressed >> storage/json' + i +'.txt';
			shell.exec(cmd);
			console.log(i);
		} 
		console.log("Done");
		// // Call function Scrapping
		scrapping2();

	});

});

function formatURL(arrURL){
	let arrNewURL = [];
	if(arrURL.length > 0){
		for(let aL = 0; aL < arrURL.length ; aL++){
			index  = arrURL[aL].indexOf('/'),
			strOut = arrURL[aL].substr(index);
			tmpIndex = strOut.indexOf("'"),
			strOut2 = strOut.substring(0, tmpIndex);
			if(strOut2.length > 1)
				arrNewURL.push(strOut2);
		}
	}
	return arrNewURL;
}
// ========================================== Function Scrapping 2 - without JSON =======================
function scrapping2(){
	
	var files = fs.readdirSync(__dirname + '/storage/');
	files.forEach(async function(file) {
		try{
			// read all file JSON then set contents
			var contents = fs.readFileSync(__dirname + '/storage/' + file, 'utf8');
			//href=\'/
			arrURL = contents.match(/knswli-title.*?(?=h3>)/g);
			// console.log(arrURL);
			let newURL = formatURL(arrURL);
			// console.log(newURL);
			// console.log(arrURL);
			for(let j= 0 ; j< newURL.length; j++){
				let currentURL = "http://kenh14.vn/"+newURL[j];

				let webContent = await websiteContent(currentURL);
				// console.log(cc.Data[j].Title);
				// Inssert title and content to database
				// let tmpTitle = cc.Data[j].Title;
				//replace all specical character ' to '' then add to DB
				let tmpTitle = webContent[0].replace(/'/g, "''");
				let tmpContent = webContent[1].replace(/'/g, "''");
				// let sql  = "INSERT INTO `wp_posts` (`post_content`) values('"+content2+"')";
				let sql  = "INSERT INTO `wp_posts` (`post_content`, `post_title`) values('"+tmpContent+"','"+tmpTitle+"')";
				await db.load(sql);
			}
		}catch(err){
			console.log("File not found");
		}
	})
};

// scrapping2();
run();











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
					let tt =  $(body).find(".kbwc-title"); 
					let arrResult = [tt.text(), ct.html()];
					resolve(arrResult);
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

// function scrapping2(){
	
// 	var files = fs.readdirSync(__dirname + '/storage/');
// 	files.forEach(async function(file) {
// 		try{
// 			// read all file JSON then set contents
// 			var contents = fs.readFileSync(__dirname + '/storage/' + file, 'utf8');
// 			//href=\'/
// 			arrURL = contents.match(/href=\'.*?(?=\')/g);
// 			// console.log(arrURL);
// 			let newURL = formatURL(arrURL);
// 			console.log(newURL);
// 			// console.log(arrURL);
// 			for(let j= 0 ; j< newURL.length; j++){
// 				let currentURL = "http://kenh14.vn/"+newURL[j];

// 				let webContent = await websiteContent(currentURL);
// 				// console.log(cc.Data[j].Title);
// 				// Inssert title and content to database
// 				// let tmpTitle = cc.Data[j].Title;
// 				//replace all specical character ' to '' then add to DB
// 				let tmpTitle = webContent[0].replace(/'/g, "''");
// 				let tmpContent = webContent[1].replace(/'/g, "''");
// 				// let sql  = "INSERT INTO `wp_posts` (`post_content`) values('"+content2+"')";
// 				let sql  = "INSERT INTO `wp_posts` (`post_content`, `post_title`) values('"+tmpContent+"','"+tmpTitle+"')";
// 				await db.load(sql);
// 			}
// 		}catch(err){
// 			console.log("File not found");
// 		}
// 	})
// };