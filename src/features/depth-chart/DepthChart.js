import React from 'react';

const DepthChart = () => {
  // const data = {
	// 	"sell":
	// 	[
	// 	{"price":9000,"amount":8176},
	// 	{"price":8999.84,"amount":10245},
	// 	{"price":8999.68,"amount":19147},
	// 	{"price":8999.52,"amount":4150},
	// 	{"price":8999.36,"amount":10420},
	// 	{"price":8999.2,"amount":16053},
	// 	{"price":8999.04,"amount":8480},
	// 	{"price":8998.88,"amount":12751},
	// 	{"price":8998.72,"amount":14187},
	// 	{"price":8998.56,"amount":7916}
	// ],
	// "buy":[
	// 	{"price":8749,"amount":8379},
	// 	{"price":8748.74,"amount":18582},
	// 	{"price":8748.48,"amount":9173},
	// 	{"price":8748.22,"amount":13327},
	// 	{"price":8747.96,"amount":1990},
	// 	{"price":8747.7,"amount":3414},
	// 	{"price":8747.44,"amount":12062},
	// 	{"price":8747.18,"amount":19389},
	// 	{"price":8746.92,"amount":8999},
	// 	{"price":8746.66,"amount":8675}
	// ]
	// };

  return(
  <article className="depth-chart">
    <canvas id="depth" width="40rem" height="30rem"></canvas>
  </article>
  );
}
  
export default DepthChart;