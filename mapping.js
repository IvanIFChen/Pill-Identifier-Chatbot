var colorMap = {};
var shapeMap = {};

initialize();

this.color = function(str) {
	 return colorMap[str];
}
this.shape = function(str) {
	return shapeMap[str];
}

function initialize() {
	// TODO: possible solutions for converting user's input sting to color code
	//  - Prompt a list of possible color combinations
	// 	  { 
	// 		none, White, Beige, Black, Blue, Brown, Clear, Gold, Gray, Green, Maroon, 
	//      Orange, Peach, Pink, Purple, Red, Tan, Yellow, Teal, White Specks, Dark, 
	// 		Light Green, Turquoise, Lavender, Red Specks, Blue Specks
	//	  }
	//  - bot should take in at most two colors (either cap or no cap),
	//	  swap them and check for similar colors
	//  - or just add all possible keys into the array?
	colorMap["none"] = 0;
	colorMap["White"] = 12;
	colorMap["Beige"] = 14;
	colorMap["Black"] = 73;
	colorMap["Blue"] = 1;
	colorMap["Brown"] = 2;
	colorMap["Clear"] = 3;
	colorMap["Gold"] = 4;
	colorMap["Gray"] = 5;
	colorMap["Green"] = 6;
	colorMap["Maroon"] = 44;
	colorMap["Orange"] = 7;
	colorMap["Peach"] = 74;
	colorMap["Pink"] = 8;
	colorMap["Purple"] = 9;
	colorMap["Red"] = 10;
	colorMap["Tan"] = 11;
	colorMap["White"] = 12;
	colorMap["Yellow"] = 13;
	colorMap["Beige & Red"] = 69;
	colorMap["Black & Green"] = 55;
	colorMap["Black & Teal"] = 70;
	colorMap["Black & Yellow"] = 48;
	colorMap["Blue & Brown"] = 52;
	colorMap["Blue & Gray"] = 45;
	colorMap["Blue & Orange"] = 71;
	colorMap["Blue & Peach"] = 53;
	colorMap["Blue & Pink"] = 34;
	colorMap["Blue & White"] = 19;
	colorMap["Blue & White Specks"] = 26;
	colorMap["Blue & Yellow"] = 21;
	colorMap["Brown & Clear"] = 47;
	colorMap["Brown & Orange"] = 54;
	colorMap["Brown & Peach"] = 28;
	colorMap["Brown & Red"] = 16;
	colorMap["Brown & White"] = 57;
	colorMap["Brown & Yellow"] = 27;
	colorMap["Clear & Green"] = 49;
	colorMap["Dark & Light Green"] = 46;
	colorMap["Gold & White"] = 51;
	colorMap["Gray & Peach"] = 61;
	colorMap["Gray & Pink"] = 39;
	colorMap["Gray & Red"] = 58;
	colorMap["Gray & White"] = 67;
	colorMap["Gray & Yellow"] = 68;
	colorMap["Green & Orange"] = 65;
	colorMap["Green & Peach"] = 63;
	colorMap["Green & Pink"] = 56;
	colorMap["Green & Purple"] = 43;
	colorMap["Green & Turquoise"] = 62;
	colorMap["Green & White"] = 30;
	colorMap["Green & Yellow"] = 22;
	colorMap["Lavender & White"] = 42;
	colorMap["Maroon & Pink"] = 40;
	colorMap["Orange & Turquoise"] = 50;
	colorMap["Orange & White"] = 64;
	colorMap["Orange & Yellow"] = 23;
	colorMap["Peach & Purple"] = 60;
	colorMap["Peach & Red"] = 66;
	colorMap["Peach & White"] = 18;
	colorMap["Pink & Purple"] = 15;
	colorMap["Pink & Red Specks"] = 37;
	colorMap["Pink & Turquoise"] = 29;
	colorMap["Pink & White"] = 25;
	colorMap["Pink & Yellow"] = 72;
	colorMap["Red & Turquoise"] = 17;
	colorMap["Red & White"] = 35;
	colorMap["Red & Yellow"] = 20;
	colorMap["Tan & White"] = 33;
	colorMap["Turquoise & White"] = 59;
	colorMap["Turquoise & Yellow"] = 24;
	colorMap["White & Blue Specks"] = 32;
	colorMap["White & Red Specks"] = 41;
	colorMap["White & Yellow"] = 38;
	colorMap["Yellow & Gray"] = 31;
	colorMap["Yellow & White"] = 36;
	
	shapeMap["none"] = 0;
	shapeMap["Barrel"] = 1;
	shapeMap["Capsule-shape"] = 5;
	shapeMap["Character-shape"] = 6;
	shapeMap["Egg-shape"] = 9;
	shapeMap["Eight-sided"] = 10;
	shapeMap["Elliptical / Oval"] = 11;
	shapeMap["Figure eight-shape"] = 12;
	shapeMap["Five-sided"] = 13;
	shapeMap["Four-sided"] = 14;
	shapeMap["Gear-shape"] = 15;
	shapeMap["Heart-shape"] = 16;
	shapeMap["Kidney-shape"] = 18;
	shapeMap["Rectangle"] = 23;
	shapeMap["Round"] = 24;
	shapeMap["Seven-sided"] = 25;
	shapeMap["Six-sided"] = 27;
	shapeMap["Three-sided"] = 32;
	shapeMap["U-shape"] = 33;

}
