import { CreateChart, myChart } from "./chart.js";
import { CreateSummary } from "./ComanyDetails.js";

StockListAndValue() ;
let company = "AAPL";
let stocksValuearray ;

async function StockListAndValue() {
    try {
        const summaryRequest = await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata') ;
        if(!summaryRequest.ok) {
            throw new Error('Not able to load data') ;
        }
        //Work to be done.
        const summaryData = await summaryRequest.json() ;
        stocksValuearray = summaryData.stocksStatsData[0] ;
        const asideSec = document.getElementsByClassName("aside")[0] ;

        for(const key in stocksValuearray) {
            if(key !== "_id") {
                const div = document.createElement('div') ;
                div.className = 'asideDiv' ;

                const btn = document.createElement('button') ;
                const text = document.createElement('div') ;

                btn.innerText = key ;
                const value = stocksValuearray[key] ;
                text.innerText = `Book Value:${value.bookValue}, Profit:${Number.parseInt(value.profit*100)}%` ;
                
                div.appendChild(btn) ;
                div.appendChild(text) ;
                asideSec.appendChild(div) ;
                
                btn.addEventListener('click', () => {
                    if(myChart) {
                        myChart.destroy() ;
                    }
                    company = `${key}` ;
                    CreateChart(company, "5y") ;
                    CreateSummary(company) ;
                }) ;
            }
        }
    }catch(err) {
        console.log(err) ;
    }
}

export {company} ;



