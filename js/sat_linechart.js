function createGraph() {
$(document).ready(function(){
	$.ajax({
		url : "https://min-api.cryptocompare.com/data/histohour?fsym=COLX&tsym="+currency.value+"&limit=720",
        data: "rows=600",
        dataType: 'json',
		success : function(results){
			var xgbp = [];
			var ydate = [];
			var lastupdated = [];

			lastupdated.push(convertTimestamp(results.Data[results.Data.length-1].time));
			//console.log(Object.values(results));
			//console.log(Object.values(lastupdated));
			$('#time_span').html("Last 30 days in GBP - Last update: "+lastupdated);
			//console.log(Object.values(xgbp));
			console.log(Object.values(currency.value));
			//console.log(Object.values(ydate));
			for(var i in results.Data) {
				xgbp.push(results.Data[i].close);
				ydate.push(convertTimestamp(results.Data[i].time));
			}
			//console.log(Object.values(xgbp));
			//console.log(Object.values(ydate));
			var chartdata = {
                labels: ydate,
				datasets: [
					{
						label: currency.value,
						fill: true,
						lineTension: 0.1,
						backgroundColor: "#343a40",
						data: xgbp
					}
				]
			};

			var ctx = $("#mycanvas");

			var LineGraph = new Chart(ctx, {
                responsive: true,
				type: 'line',
				data: chartdata,
                options: {
                    elements: { point: { radius: 0 } },
                    legend: { display: false},
                    scales: {
                        xAxes: [{
                                    gridLines: {
                                        display:false
                                    },
                                    ticks: {
                                        display: false
                                    }
                                }],
                        yAxes: [{
                                    gridLines: {
                                        display:false
                                    }
                                }]
                        }
                }
			}

		);
		},
		error : function(results) {

		}
	});
});
}
