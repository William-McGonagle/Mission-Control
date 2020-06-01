var CanvasJS = require('./Chart.min.js');

window.onload = function () {

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    "type":"line",
    "data":{
      "labels":[
        "T+0",
        "T+5",
        "T+10",
        "T+15",
        "T+20",
        "T+25",
        "T+30"
      ],
      "datasets":
      [
        {
          "label": "Apollo 11",
          "data":[
            69,
            51,
            50,
            69,
            32,
            59,
            50
          ],
          "fill":false,
          "borderColor":"rgb(75, 192, 192)",
          "lineTension":0.1,
          "cubicInterpolationMode": "monotone"
        },
        {
          "label": "Apollo 12",
          "data":[
            65,
            59,
            80,
            81,
            56,
            55,
            40
          ],
          "fill":false,
          "borderColor":"rgb(192, 192, 75)",
          "lineTension":0.1,
          "cubicInterpolationMode": "monotone"
        },
        {
          "label": "Apollo 13",
          "data":[
            49,
            29,
            54,
            65,
            47,
            53,
            63
          ],
          "fill":false,
          "borderColor":"rgb(192, 75, 192)",
          "lineTension":0.1,
          "cubicInterpolationMode": "monotone"
        }
      ]
    },
    "options":{

    }
  });

}
