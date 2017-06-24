const map = require('./mapping.js');
const jsdom = require("jsdom")
const { JSDOM } = jsdom;

const urlBase = "https://www.drugs.com/imprints.php"

this.searchPill = function(imprint, color, shape, callback) {
	let dom = JSDOM.fromURL(
		urlBase + createSubUrl(imprint, color, shape))
			.then(dom => parseImage(dom, callback));
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

function parseImage(dom, callback) {
	const imgs = dom.window.document.getElementsByClassName("pid-img")
	if (imgs.length == 0) {
		return callback(undefined)
	} else {
		var out = []
		for (var i = 0; i < imgs.length; i++) {
			out.push(imgs[i].getElementsByTagName("img")[0].src)
		}
		return callback(out)
	}
}

