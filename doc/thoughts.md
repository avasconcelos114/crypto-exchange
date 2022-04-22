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
