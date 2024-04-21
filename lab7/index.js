const mbHelper = require('mountebank-helper');

// https://www.cbr-xml-daily.ru/daily_json.js
const exchange = {
    'AUD': 60.9802,
    'AZN': 54.9658,
    'AMD': 23.7259,
    'BYN': 28.628,
    'USD': 93.4419,
    'EUR': 99.7264,
};

const availableCurrency = ['AUD', 'AZN', 'AMD', 'BYN', 'USD', 'EUR'];

const imposter = new mbHelper.Imposter({ 'imposterPort': 3000 });

const response = {
    'uri': 'all',
    'verb': 'GET',
    'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify(exchange),
    }
};

let exchangeAUD = exchange;
let value = exchange['AUD'];

availableCurrency.forEach(function (item) {
    exchangeAUD[item] = (exchangeAUD[item] / value).toFixed(4);
});

const responseAUD = {
    'uri': 'AUD',
    'verb': 'GET',
    'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify(exchangeAUD),
    }
};

let exchangeAZN = exchange;
value = exchange['AZN'];

availableCurrency.forEach(function (item) {
    exchangeAZN[item] = (exchangeAUD[item] / value).toFixed(4);
});

const responseAZN = {
    'uri': 'AZN',
    'verb': 'GET',
    'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify(exchangeAZN),
    }
};

let exchangeAMD = exchange;
value = exchange['AMD'];

availableCurrency.forEach(function (item) {
    exchangeAMD[item] = (exchangeAMD[item] / value).toFixed(4);
});

const responseAMD = {
    'uri': 'AMD',
    'verb': 'GET',
    'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify(exchangeAMD),
    }
};

let exchangeBYN = exchange;
value = exchange['BYN'];

availableCurrency.forEach(function (item) {
    exchangeBYN[item] = (exchangeBYN[item] / value).toFixed(4);
});

const responseBYN = {
    'uri': 'BYN',
    'verb': 'GET',
    'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify(exchangeBYN),
    }
};

let exchangeUSD = exchange;
value = exchange['USD'];

availableCurrency.forEach(function (item) {
    exchangeUSD[item] = (exchangeUSD[item] / value).toFixed(4);
});

const responseUSD = {
    'uri': 'USD',
    'verb': 'GET',
    'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify(exchangeUSD),
    }
};

let exchangeEUR = exchange;
value = exchange['EUR'];

availableCurrency.forEach(function (item) {
    exchangeEUR[item] = (exchangeEUR[item] / value).toFixed(4);
});

const responseEUR = {
    'uri': 'EUR',
    'verb': 'GET',
    'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify(exchangeEUR),
    }
};

imposter.addRoute(response);
imposter.addRoute(responseAUD);
imposter.addRoute(responseAZN);
imposter.addRoute(responseAMD);
imposter.addRoute(responseBYN);
imposter.addRoute(responseUSD);
imposter.addRoute(responseEUR);


mbHelper.startMbServer(2525)
    .then(function () {
        imposter.postToMountebank()
            .then(() => {
                console.log('Imposter Posted! Go to http://localhost:3000/all');
            });
    });