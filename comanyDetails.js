CompanySummary() ;
let companyDetailsArray ;
let company = "AAPL" ;

async function CompanySummary() {
    try {
        const bookValueRequest = await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata') ;
        if(!bookValueRequest.ok) {
            throw new Error('Not able to load data') ;
        }

        //Work to be done.
        const bookValueData = await bookValueRequest.json() ;
        companyDetailsArray = bookValueData.stocksProfileData[0] ;
        console.log(companyDetailsArray) ;
        CreateSummary(company) ;
    }catch(err) {
        console.log(err) ;
    }
}

function CreateSummary(company) {
    let value = companyDetailsArray[company] ;
    console.log(value) ;
    const stockSummary = document.getElementsByClassName('stock-summary')[0] ;
    stockSummary.innerHTML = `${value.summary}` ;
}

export {CreateSummary} ;