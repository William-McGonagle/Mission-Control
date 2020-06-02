function rktStringify(data) {

  output = "";

  for (var header in data.headers) {

    output += header + ": " + data.headers[header] + "\n";

  }

  output += "\n\n";

  for (var i = 0; i < data.segments.length; i++) {

    for (var segment in data.segments[i]) {

      output += segment + ": " + data.segments[i][segment] + "\n";

    }

    output += "\n";

  }

  return output;

}

function rktParse (stringData) {

  var output = {
    "headers": {},
    "segments": []
  };

  var headerSplit = stringData.split("\n\n\n");
  var fullHeaders = headerSplit[0].split("\n");

  for (var i = 0; i < fullHeaders.length; i++) {

    var subSplit = fullHeaders[i].split(": ");

    output.headers[subSplit[0]] = masterParse(subSplit[1]);

  }

  var fullSegments = headerSplit[1].split("\n\n");

  for (var i = 0; i < fullSegments.length; i++) {

    var segment = {};
    var segmentSplit = fullSegments[i].split("\n");

    for (var j = 0; j < segmentSplit.length; j++) {

      var subSplit = segmentSplit[j].split(": ");

      if (subSplit[0] != undefined && subSplit[1] != undefined) segment[subSplit[0]] = masterParse(subSplit[1]);

    }

    output.segments.push(segment);

  }

  return output;

}

function masterParse(string) {

  let stringFloat = parseFloat(string);
  if (!isNaN(stringFloat)) return stringFloat;

  let stringInt = parseInt(string);
  if (!isNaN(stringInt)) return stringInt;

  return string;

}

exports.rktStringify = rktStringify;
exports.parse = rktParse;
exports.masterParse = masterParse;
