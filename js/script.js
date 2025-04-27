/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// Global variable to initialize the timer for auto-refreshing quotes
let timer;

// Global variable to store indices of quotes that have already been displayed
let quotesGiven = [];

// Array of quote objects (replace with your own creative quotes)
const quotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    source: "Steve Jobs",
    citation: "Stanford Commencement Address",
    year: 2005
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    source: "Winston Churchill"
  },
  {
    quote: "The best way to predict the future is to create it.",
    source: "Peter Drucker",
    tags: "business, innovation"
  },
  {
    quote: "You miss 100% of the shots you don’t take.",
    source: "Wayne Gretzky",
    year: 1983
  },
  {
    quote: "The only limit to our realization of tomorrow is our doubts of today.",
    source: "Franklin D. Roosevelt"
  }
];

// Function to get a random number between 0 and max (exclusive)
const getRandNum = (max) => Math.floor(Math.random() * max);

// Function to get a random quote
const getRandomQuote = () => {
  let quotesLength = quotes.length;
  let quotesGivenLength = quotesGiven.length;
  let quotesGivenLastItem = quotesGiven[quotesGivenLength - 1];
  let randNum = getRandNum(quotes.length);

  // Clear quotesGiven array when all quotes have been cycled through and ensure new quote is different from the last one
  if (quotesGivenLength === quotesLength && quotesGivenLastItem !== randNum) { 
    quotesGiven = []; 
  }
  
  // If the current quote hasn't been displayed, push the index to quotesGiven and return the quote
  if (quotesGiven.indexOf(randNum) === -1) { 
    quotesGiven.push(randNum);
    return quotes[randNum]; 
  }
  
  // Recursively call the function to get a new quote if the current one is already displayed
  return getRandomQuote();
};

// Function to return a random RGB color for the background
const getRGB = () => `rgb(${getRandNum(255)}, ${getRandNum(255)}, ${getRandNum(255)})`;

// Function to print the random quote
const printQuote = () => {
  // Clear interval before starting a new one
  clearInterval(timer);

  // Get the element to insert the quote into and retrieve a random quote
  const quoteBox = document.querySelector('#quote-box');
  let quote = getRandomQuote();

  // Build the HTML string to insert the quote
  let string = `
    <p class="quote">${quote.quote}</p>
    <p class="source">${quote.source}
      ${quote.citation ? `<span class="citation">${quote.citation}</span>` : ''}
      ${quote.year ? `<span class="year">${quote.year}</span>` : ''}
      ${quote.tags ? `<span class="tags">${quote.tags}</span>` : ''}
    </p>
  `;

  // Change the background color to a random RGB value
  document.body.style.backgroundColor = getRGB();

  // Insert the quote into the quote-box
  quoteBox.innerHTML = string;

  // Set a timer to refresh the quote every 4 seconds
  timer = setInterval(printQuote, 4000);
};

/***
 * Click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
 ***/
document.getElementById('load-quote').addEventListener("click", printQuote, false);

// Automatically refresh quote every 15 seconds
setInterval(printQuote, 15000);
