## crypto-view

This application allows users to visualise live crypto trades. 

It's built as a lightweight mobile first webapp. 

View it live [https://crypto-view-377cc.web.app/](https://crypto-view-377cc.web.app/)


## Install
Clone this repo locally and run
```
npm install
```


## Run
Start in development mode with
```
npm start
```

## Build
To run the production version run 
```
npm build
```

## Tests
Some Jest unit tests are included. To run them you will need to have Jest installed globally
```
npm install -g jest
```

You can then run the tests with
```
npm test
```

## Data normalisation
The orderbook recreates a real world problem that we encounter often, not all values of the orderbook will be `float` or `int` - some will be exponential notation. 

As the are price values I made some assumptions to help normalise data
- high value exponential should truncate to first order e.g. `e250000` as `e2`
- high negative exponential values are set to `0`

I observed the data growing to some large exponentials so I made a best call here. It may be incorrect but it would be possible to alter the behaviour as required relatively easily. 

From my observations, these issue affected price and not volume so I chose to only serialize price values. 

## Error boundary
I left a comment in `src/features/orderbook/OrderBook.js` that can be commented to test Error Boundary handling. 
I am an advocate of clean code, speaking for itself without comments however I thought this would help for demonstration purposes.


## Future improvements
As part of the requirements, a fixed set of packages could be used. This made it difficult to add adequate tests so a good extension would be to:
* setup `babel-jest` and add more unit tests
* install `enzyme` for component integration tests
* setup `cucumberJS` and `pupputeer` for E2E BDD acceptance tests

Without babel jest, it is difficult to cover many components with tests as it cannot process ES6 imports properly. For example when testing OrderBook helpers
```
test('isBid: Should return true for bid else false', () => {
  expect(isBid("bid")).toBe(true);
  expect(isBid("ask")).toBe(true);
  expect(null).toBe(true);
});

Cannot find module 'tools/sum' from 'src/features/orderbook/helpers.js'

Require stack:
  src/features/orderbook/helpers.js
  src/features/orderbook/helpers.test.js
Cannot find module 'tools/sum' from 'src/features/orderbook/helpers.js'
```

Furthermore, not adding new packages meant a lack of proper SVG parsing so I added an inline SVG in `Header`