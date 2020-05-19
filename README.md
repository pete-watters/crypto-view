## crypto-view

This application allows users to visualise live crypto trades. 

It's built as a lightweight mobile first webapp. 


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