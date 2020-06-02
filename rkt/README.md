# `.rkt` file format
By William McGonagle

## About
The rkt file format is meant to be as simple, fast and human readable as possible as well as being flexible and nice to parse on low power systems. It all starts with a header.
The header starts on the first line of the file, and it continues until there are three carriage returns. THE CARRIAGE RETURNS ARE ONLY ALLOWED TO BE `\n`. Each header attribute is separated by a carriage return, in the style of `attribute: attribute value`. This is incredibly similar to http headers. After the header, comes the segments.
Each segment is separated from one another by two carriage returns. Again, these carriage returns must be `\n`. Then, each attribute inside of the segment is separated by a single carriage return, in the format of `attribute: attribute value`. These segments continue until the end of the file.

## Example

```rkt

RKT: V1
SCALE: 5
LAUNCH_TITLE: Example 1
LAUNCH_DATE: 1591056056


POS_X: 0
POS_Y: 0
POS_Z: 0
ROT_X: 0
ROT_Y: 0
ROT_Z: 0
ROT_W: 0

POS_X: 0
POS_Y: 5
POS_Z: 0
ROT_X: 0
ROT_Y: 0
ROT_Z: 0
ROT_W: 0

```

## Encoding (In Javascript)
```javascript

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

```

## Decoding (In Javascript)

```javascript

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

```

## Credits
The file format was created by William McGonagle and is primarily for recording data over time. The file format was mostly inspired by the OBJ file format, and the HTTP protocol. This project overall was inspired by the incredible work that BPS.space is doing for DIY engineering and small-scale rocketeering. 
