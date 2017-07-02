const map = require('./mapping.js');
const jsdom = require("jsdom")
const { JSDOM } = jsdom;

const urlBase = "https://www.drugs.com/imprints.php"

this.searchPill = function(imprint, color, shape, callback) {
	let dom = JSDOM.fromURL(
		urlBase + createSubUrl(imprint, color, shape))
			.then(dom => parsePillInfo(dom, callback));
}


// for drugs.com
function createSubUrl(imprint, color, shape) {
	// 0 or non is null
	if (color == null) color = 0;
	if (shape == null) shape = 0;
	return "?imprint=" + imprint + "&color=" + color + "&shape=" + shape;
}

// Pill Object
function Pill(name, strength, imprint, color, shape, image) {
	var self = {};
	self.name = name;
	self.strength = strength;
	self.imprint = imprint;
	self.color = color;
	self.shape = shape;
	self.image = image;
	return self;
}

function parsePillInfo(dom, callback) {
	var imgs = dom.window.document.getElementsByClassName("pid-img")
	var details = dom.window.document.getElementsByClassName("pid-details")

	if (imgs.length == 0 || details.length == 0) {
		return callback(undefined)
	} else {
		var pills = []
		for (var i = 0; i < imgs.length; i++) {
			const tagA = details[i].getElementsByTagName("a")
			const tagP = details[i].getElementsByTagName("p")[0].innerHTML.split("<br>").map(function(x) {
				return x.replace(/<(\w+)\b[^<>]*>[\s\S]*?<\/\1>/g, '').replace("\n", '').trim()
			})

			const name = tagA[0].innerHTML
			const strength = tagP[1]
			const imprint = tagA[1].innerHTML
			const color = tagP[3]
			const shape = tagP[4]
			const img = imgs[i].getElementsByTagName("img")[0].src
			
			const p = Pill(name, strength, imprint, color, shape, img);
			pills.push(p)
		}
		return callback(pills)
	}
}

// this.searchPill("G2", 0, 0, function(out) {
// 	console.log(out)
// })