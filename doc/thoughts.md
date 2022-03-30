## First things first

### Thank you! :tada:

First of all thank you for extending me the opportunity to partake in this code assignment This
looks like a fairly interesting one and I'm looking forward to tackling it as carefully as I can :)

## About the Project

### Development Environment

- nvm (to avoid issues with different active node versions across local environment)
- Craco (to add directory aliasing when using imports)
- Prettier & ESLint (to ensure consistency when it comes to code styling)

### Project Structure

```
. src
  ㄴ api // handling of network requests using axios
  ㄴ components // where components are created in a unit level

```

## General Thoughts and Considerations

### Branching rules?

Since this is a short term project I'll be writing down tasks over at `tasks.md` and creating
feature branches to be merged with the `develop` branch. And submit the assignment with a final
`develop` -> `main` branch PR.

### TDD?

While test-driven development may be difficult to accomplish with tight deadlines in real-life
projects, I will strive to tackle this project on a TDD basis because

- It would be nice to use this opportunity to challenge myself further
- Assuming this is a real life application, utmost care needs to be given in all areas related to
  payment, since any fault with the application directly results in loss of revenue

### Migrate to TypeScript?

It would probably be nice to have due to auto-completion and basic type checking against the
`cards-dictionary.json` response However it would likely be best to proceed without due to:

- The project already having been set up without it
- It would introduce overhead due to needing utility methods to be able to run unit tests properly
- The project itself being small in scope and requirements

### State Management?

While in larger scale projects one would use redux / redux-toolkit to manage the application state
and make use of built-in debugging functionalities to ensure the state changes as expected over time
