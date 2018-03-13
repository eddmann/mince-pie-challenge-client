# Mince Pie Challenge Client

[![Build Status](https://travis-ci.org/eddmann/mince-pie-challenge-client.svg?branch=master)](https://travis-ci.org/eddmann/mince-pie-challenge-client)

📝 [API](https://github.com/eddmann/mince-pie-challenge-api-serverless) - 🏗️ [Client Infrastructure](https://github.com/eddmann/mince-pie-challenge-client-terraform)

This client demonstrates the use of:

- [React](https://reactjs.org/) for presentational logic.
- [Redux](https://redux.js.org/) and [redux-thunk](https://github.com/gaearon/redux-thunk) for state management.
- [React Router](https://reacttraining.com/react-router/) is used to manage URL-based navigation transitions.
- The application is managed using [create-react-app](https://github.com/facebook/create-react-app).
- Containerising the dependencies using [Docker](https://www.docker.com/community-edition) and [Docker Compose](https://docs.docker.com/compose/).
- Authentication is supplied by the [Amazon Cognito Identity SDK](https://github.com/aws/amazon-cognito-identity-js).
- Testing is achieved using [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/).
- [Semantic UI](https://react.semantic-ui.com/) for component styling.

## Usage

You are able to easily interact with the Docker container using the provided `Makefile`.

```
$ make build
$ make test
$ make start
```

## Deployment

This client can be deployed on Amazon S3, with `www` redirection and CloudFront to manage asset caching and HTTPS connections.
You can access the [Terraform](https://www.terraform.io/) resource definitions to achieve this [here](https://github.com/eddmann/mince-pie-challenge-client-terraform).
