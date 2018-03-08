var shape = document.getElementById("shape"),
    baseColor = document.getElementById("baseColor"),
    pattern = document.getElementById("pattern"),
    patternColor = document.getElementById("patternColor"),
    variant = document.getElementById("variant");

function calcVariant(shape, pattern, baseColor, patternColor) {
	return (patternColor << 24) | (baseColor << 16) | (pattern << 8) | shape;
}

function calcValues(variant) {
	var shape = variant & 0xFF;
	variant >>>= 8;
	var pattern = variant & 0xFF;
	variant >>>= 8;
	var baseColor = variant & 0xFF;
	variant >>>= 8;
	var patternColor = variant & 0xFF;
	
	if (shape < 0 || shape > 1
		|| pattern < 0 || pattern > 5
		|| baseColor < 0 || baseColor > 15
		|| patternColor < 0 || patternColor > 15) return null;
	
	return {
		shape: shape,
		pattern: pattern,
		baseColor: baseColor,
		patternColor: patternColor,
	};
}

function displayVariant() {
	variant.className = "";
	variant.value = calcVariant(
		+shape.value, +pattern.value, +baseColor.value, +patternColor.value);
}

function displayValues() {
	var values = calcValues(+variant.value);
	if (!values) {
		variant.className = "invalid";
	} else {
		variant.className = "";
		shape.value = values.shape;
		pattern.value = values.pattern;
		baseColor.value = values.baseColor;
		patternColor.value = values.patternColor;
	}
}

shape.onchange = pattern.onchange =
	baseColor.onchange = patternColor.onchange = displayVariant;
variant.oninput = displayValues;
variant.onclick = variant.select.bind(variant);
