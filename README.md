# NestJS Mongoose

## Description

[Nest](https://github.com/nestjs/nest) playground repository

## Installation

Make sure to have [pnpm](https://pnpm.io) installed, use npm/yarn otherwise

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## TODO

[X] Use configuration module
[X] Create authentication
[ ] Use authorization and route guards
[ ] Create favoriteFoods schema and decouple from users schema
[ ] Add Permissions (RBAC) ACL
[ ] Create another repository with just favoriteFoods and
use Microservices to communicate with favoriteFoods module
