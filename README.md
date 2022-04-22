# Crypto Exchange App
## Thoughts
#### Sockets? not this time :(

I initially tried to create an implementation of each socket API from the exchanges, but had to drop
the idea as it became apparent that managing 4 wildly different websockets with their own set of
intervals and PING/PONG messages would require far too much time to be able to finish the entire set
of requirements within the 3 day deadline

#### TypeScript?

Dealing with varying payloads from different API servers, and state managed with Redux reminded me
why TypeScript is _usually_ well worth the time invested with adding type safety on component props,
API responses, and redux state.

However due to time constraints I had to opt not to use it for this code task

#### Validation

A process that validates whether each pair (`BTC/USD`, etc) is acceptable is sorely needed, as in
its current iteration still accepts a completely invalid pair (`aoedjae/oeaaef`)

The process I think is most ideal would:

1. fetch a list of valid items from a backend server
2. show suggestions for valid choices as the user types on the input
3. Trigger the `history.push()` event only by the user clicking on a value already established as
   valid by the server

#### Route Changes

While the original requirements needed the `http://url.com/{cryptocurrency_pair}/details` URL to
open a modal with latest trade history, we needed a way to know which exchange's data needed to be
shown on screen. As a result I had to change the path parameters to
`/{cryptocurrency_pair}/{exchange}/details`

#### CORS Issues

Bitfinex seems to want us to only connect to their API from another server, and has a
`Access-Control-Allow-Origin` header set up which prevented us from accessing it normally from a
browser. This required me to set up a local proxy on setupProxy.js so that local development would
not be hindered.

Ideally we would have a node servers that takes in requests for a given trading pair / exchange, and
returns data in a uniform format so that we would not require as much business logic to parse
through responses.

---

## Requirements
Our goal is to create a simple web app that provides quick access to the current market prices of
selected cryptocurrency pairs.

Targeted Exchanges with open APIs:

### Binance - https://www.binance.com/en

### Bitfinex - https://www.bitfinex.com/

### Huobi - https://www.huobi.com/en-us/

### Kraken - https://www.kraken.com/

The initial screen should consist of search functionality where the user can **type** the
cryptocurrency pair of interest, for example - `BTC/USD`, `BTC/USDT`, `ETH/USD`, etc.

The application should **crawl** the data from **all** the exchanges listed above and visualise the
current market price for each of them, e.g. Binance: 1 BTC = $40,000 USDT.

The application should consider the case **the pair is not supported on selected exchange and
communicate it properly in the interface.**

### The user should be able to:

- Search for a particular cryptocurrency exchange pair.
- Get the results and being able to sort them by price.
- Click on the price to view additional historical information about the last few trades (sell/buy)
  on that exchange, visualized in a modal window.
- Initiate the search functionality by opening the application through url containing the pair
  string: `http://url.com/{cryptocurrency_pair}/`, and opening the detail view on a pair by
  `http://url.com/{cryptocurrency_pair}/details`

UX, styling and attention to detail is up to you.

**Bonus**: While staying on the results page, update the market prices automatically in a reasonable
time intervals.

### What can be used:

- ReactJS
- Redux
- Webpack
- Any other library considered necessary

---

Please upload your complete source code to a GitHub repo.

### How we will test your code:

1. `git clone`
2. `yarn && yarn start`
