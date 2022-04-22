## Sockets? not this time :(

I initially tried to create an implementation of each socket API from the exchanges, but had to drop
the idea as it became apparent that managing 4 wildly different websockets with their own set of
intervals and PING/PONG messages would require far too much time to be able to finish the entire set
of requirements within the 3 day deadline

## TypeScript?

Dealing with varying payloads from different API servers, and state managed with Redux reminded me
why TypeScript is _usually_ well worth the time invested with adding type safety on component props,
API responses, and redux state.

However due to time constraints I had to opt not to use it for this code task

## Validation

A process that validates whether each pair (`BTC/USD`, etc) is acceptable is sorely needed, as in
its current iteration the app will crash if you type a completely invalid pair (`aoedjae/oeaaef`)

The process I think is most ideal would:

1. fetch a list of valid items from a backend server
2. show suggestions for valid choices as the user types on the input
3. Trigger the `history.push()` event only by the user clicking on a value already established as
   valid by the server

## Route Changes

While the original requirements needed the `http://url.com/{cryptocurrency_pair}/details` URL to
open a modal with latest trade history, we needed a way to know which exchange's data needed to be
shown on screen. As a result I had to change the path parameters to
`/{cryptocurrency_pair}/{exchange}/details`

## CORS Issues

Bitfinex seems to want us to only connect to their API from another server, and has a
`Access-Control-Allow-Origin` header set up which prevented us from accessing it normally from a
browser. This required me to set up a local proxy on setupProxy.js so that local development would
not be hindered.

Ideally we would have a node servers that takes in requests for a given trading pair / exchange, and
returns data in a uniform format so that we would not require as much business logic to parse
through responses.
