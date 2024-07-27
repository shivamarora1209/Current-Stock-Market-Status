CreateChartAPI() ;

let myChart ;
let timePeriod = "5y" ;
let companiesDataArray;
let company ;

async function CreateChartAPI() {
    try {
        const chartRequest = await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata') ;
        if(!chartRequest.ok) {
            throw new Error('Not able to load data') ;
        }
        //Work to be done.
        const chartDataJson = await chartRequest.json() ;
        companiesDataArray = chartDataJson.stocksData[0] ;
        CreateChart("AAPL", timePeriod) ;
    }catch(err) {
        console.log(err) ;
    }
}

function CreateChart(company, time) {
    company = company ;
    const CompanyData = companiesDataArray[company] ;
    const DataTimePeriod = CompanyData[time] ;
    const timeStamp = DataTimePeriod.timeStamp ;
    const value = DataTimePeriod.value ;

    const ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: timeStamp,
        datasets: [{
            data: value,
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });

    const chartDivButtons = document.querySelector('.buttons') ;
    chartDivButtons.innerHTML = '' ;
    const btn1 = document.createElement('button') ;
    btn1.innerText = "1 Month" ;
    chartDivButtons.appendChild(btn1) ;
    btn1.addEventListener('click', () => {
        timePeriod = "1mo"
        if(myChart) {
            myChart.destroy() ;
        }
        CreateChart(company, timePeriod) ;
    });

    const btn2 = document.createElement('button') ;
    btn2.innerText = "3 Months"
    chartDivButtons.appendChild(btn2) ;
    btn2.addEventListener('click', () => {
        timePeriod = "3mo"
        if(myChart) {
            myChart.destroy() ;
        }
        CreateChart(company, timePeriod) ;
    });

    const btn3 = document.createElement('button') ;
    btn3.innerText = "1 Year"
    chartDivButtons.appendChild(btn3) ;
    btn3.addEventListener('click', () => {
        timePeriod = "1y"
        if(myChart) {
            myChart.destroy() ;
        }
        CreateChart(company, timePeriod) ;
    });

    const btn4 = document.createElement('button') ;
    btn4
    btn4.innerText = "5 Years"
    chartDivButtons.appendChild(btn4) ;
    btn4.addEventListener('click', () => {
        timePeriod = "5y"
        if(myChart) {
            myChart.destroy() ;
        }
        CreateChart(company, timePeriod) ;
    });
}


export {CreateChart, myChart} ;