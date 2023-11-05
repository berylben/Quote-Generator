const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");



// Get quotes from API
let apiQuotes = [];

//show loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
} 

//hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
} 
// pick a new quote
function newQuote() {
    loading();
    // show a random quote from apiQuote array
    // console.log(apiQuotes.length)
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // To check if the author field is blank replace with "unkown"
    if (!quote.author) {
        authorText.textContent = "Unknown";
    }else {
        authorText.textContent = quote.author;
    }
    // Check the length of the quote to determine the styling
    if (quote.length > 50 ){
        quoteText.classList.add ("long-quote");
    } else {
        quoteText.classList.remove ("long-quote"); 
    }
    quoteText.textContent = quote.text;
    complete();


}

// GET quote from API
async function getQuote(){
    const apiUrl ='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // newQuote();
        console.log(apiQuotes [15]);  
    


    } catch (error) {
        // catch error

    }
}

// tweet quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.text}`;
    window.open (twitterUrl,'_blank');
}

//  Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuote();

