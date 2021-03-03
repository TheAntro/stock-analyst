# stock-analyst
An application providing simple analysis of historical stock data

The Stock Analyst is an API running on Node.js with Express. By default, the application runs on port 5000.
The application needs Node.js installed. Latest version is recommended.

## Installation

To run the application, first install dependencies by running the following command in the root folder:

`npm install`

Then to start the server, run:

`npm run server`

After startup, the API is available on localhost:5000/

## Running analysis

The following stock analytics are available:

### Longest bullish trend within a date range

To retrieve the longest bullish trend within a date range for a stock, send a GET request to:

`localhost:5000/api/local/bull/:filename/:from/:to`

For example, to retrieve longest bullish trend for Apple between 1st of January 2020 and 1st of January 2021, send GET request to:

`localhost:5000/api/local/bull/AAPL.csv/2020-01-01/2021-01-20`

### Dates with the highest trading volume and intraday price change

To retrieve a list of dates ordered by trading volume, and if volumes are equal intraday price changes, send GET request to:

`localhost:5000/api/local/sort/:filename/:from/:to`

For example, for Apple between 1.1.2020 and 1.1.2021:

`localhost:5000/api/local/sort/AAPL.csv/2020-01-01/2021-01-20`

### Best opening price compared to 5 days simple moving average SMA 5

To retrieve list of dates and price change percentage between the days opening price and its SMA 5, orderer by the price change percentage, send GET to:

`localhost:5000/api/local/sma5/:filename/:from/:to`

For example, for Apple between 1.1.2020 and 1.1.2021:

`localhost:5000/api/local/sma5/AAPL.csv/2020-01-01/2021-01-20`

## Analysis files

Historical data for Apple (AAPL.csv), Amazon (AMZN.csv), Facebook (FB.csv), Microsoft (MSFT.csv), and Tesla (TSLA.csv) is included in the project by default.
The default data has been downloaded from Nasdaq.com on March 3rd 2021.

To use your own csv files, save them into the files folder. The format of the csv files needs to correspond to the format of the example files. 

