const map = require('./mapping.js');
const jsdom = require("jsdom")
const { JSDOM } = jsdom;

const urlBase = "https://www.drugs.com/imprints.php"

this.searchPill = function(imprint, color, shape) {
	let dom = JSDOM.fromURL(urlBase + createSubUrl(imprint, color, shape)).then(dom => parseImage(dom));
}


// for drugs.com
function createSubUrl(imprint, color, shape) {
	// 0 means null
	if (color == null) color = 0;
	if (shape == null) shape = 0;
	return "?imprint=" + imprint + "&color=" + color + "&shape=" + shape;
}

// Pill Object
function Pill(name, strength, imprint, color, shape, img) {
	var self = {};
	self.name = name;
	self.imprint = imprint;
	self.color = color;
	self.shape = shape;
	self.img = img;
	return self;
}


function parseImage(dom) {
	const imgs = dom.window.document.getElementsByClassName("pid-img")
	// for (var i = 0; i < imgs.length; i++) {
	// 	console.log(imgs[i].getElementsByTagName("img")[0].src)
	// }
	return imgs[0].getElementsByTagName("img")[0].src
}

// usage
// this.searchPill("G234", 2, 3);