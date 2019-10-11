---
path: "/blog/serverless-with-aws-and-typescript"
date: "2019-10-11"
title: "Serverless with AWS and Typescript"
tags: ["Serverless", "AWS", "Typescript"]
---

This blog post is an introduction level explanation of the Serverless Framework (or just Serverless) using AWS as the cloud provider and typescript as the language of choice. There are many examples and templates of Serverless in node.js but not so many utilizing the strong-typing and enhanced tooling that typescript provides.

Full disclosure I was inspired to write this post after reading through the excellent [book on Serverless](https://github.com/pmuens/serverless-book) by [Philipp Muens](https://github.com/pmuens) a co-creator of serverless.

### What is Serverless?

It probably serves to give a brief overview of what Serverless is and what problem it's trying to solve. If you've found this blog it's likely you may already know and just want to get on with coding so feel free to [skip to that section](#lets-code).

Serverless computing, the execution model Serverless Framework aims to provision, is responsible for executing a piece of code by dynamically allocating the resources required to run it. The serverless computing service takes your functions as input, performs logic, returns your output, and then shuts down. This allows for a per request billing model that aims to provide excellent **value for money** by not charging when not in use. 

Another benefit is that there is little to **no overhead** for provisioning and maintaining servers to run your code. Once configured the platform provider will take care of **scaling** and maintaining your services. A bugbear for some is that serverless computing is not 'without servers' as it suggests. While this is true that a server somewhere must exist on which your code will run the point is you, as a consumer of the service, no longer have to care about the provisioning or maintenance of said servers outside of maybe a YAML or [HCL](https://www.linode.com/docs/applications/configuration-management/introduction-to-hcl/) file.

Serverless (the framework) is, in essence, a command-line tool, that provides scaffolding, workflow automation and best practices for developing and deploying your serverless architecture. It is a provider-agnostic framework for defining the functions and events that make up your service. Once defined, Serverless abstracts away the deployment of your service to your specified target cloud provider. It does this automatically, based on configuration set in a YAML file, provisioning the required infrastructure and deploying the application to it.

### Let's code!

Ok to the fun bit. What we are going to do is create a very basic `Hello World!` HTTP endpoint and showcase the different ways we can achieve this with different plugins, configuration, etc.

#### Setup

The Serverless framework uses [Node.js](http://nodejs.org) under the hood so you will need to install Node.js before you can use Serverless.

If you need to, head over to the [Node.js download page](https://nodejs.org/en/download/) and download the most recent Node.js version for your operating system. Serverless needs at least Node.js version 4. However, you can also use a newer version.

Run the following to confirm Node.js has installed correctly:
```bash
node --version
```

Next up we can use [npm](/xx-glossary/01-glossary.md#npm) (the Node package manager which was installed alongside [Node.js](http://nodejs.org)) to install Serverless.

Open up a terminal and enter:

```bash
npm install - g serverless
```

*<sub>You also can use `yarn` or `npx` here. With yarn you'll be working with a `yarn.lock` instead of a `package-lock.json` and the commands will be different so be aware.</sub>

This downloads the latest Serverless version from the Node.js package registry and installs it globally on our system (The `-g` option ensures that the package is accessible globally).

Let's check if everything was installed successfully.

Enter:

```bash
serverless --version
```

*<sub>You can use sls instead of serverless for all commands</sub>

You should see a version number printed out on the terminal. 

And that's it! Simples. Now we have Serverless installed and we can crack on with creating our service.

#### Creating a service

Our service will run on AWS and will use Node.js/Typescript as the runtime. Serverless creates service scaffolds using [templates](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates) that will speed up the development process.

We have a couple of options here. We can use the `aws-nodejs` template and add Typescript manually, or we can use the `aws-nodejs-typescript` template that already has `webpack` and `tsconfig` all set-up. 

The pay-off with using this template is that we don't have to configure our app to use Typescript. The trade-off is that we hand over control of that configuration (You can always override).

Let's make life easy and use the Typescript template.

Run:

```bash
serverless create --template aws-nodejs-typescript --path hello-world
```

You should see a message from the cli saying that Serverless has successfully created our boilerplate service from the template.

Let's `cd hello-world` and explore what has been created for us!

You should see the following files:
```
├── handler.ts  
├── package.json  
├── serverless.yml  
├── tsconfig.json  
└── webpack.config.js
```
Breaking this down we have:

*  `handler.ts`: The code that will run when the function is invoked (by an event). For us that will be a HTTP get request which I'll get into shortly. 

* `package.json`: Home for all the dependencies management, versioning and build instructions.

* `serverless.yml`: A description of your service. Serverless uses this file to understand what your service resources are and how to set them up for you. Official documentation can be found [here](https://serverless.com/framework/docs/providers/cloudflare/guide/intro/#serverlessyml).


* `tsconfig.json`: Our specification file for compiling typescript. This will be picked up by the webpack plugin before deployment.

* `webpack.config.js`: Webpack is a static module bundler for javascript applications. It works by building a dependency graph mapping every module your project needs and generating one or more bundles. It does not *require* a config file but as we are using a plugin (called `serverless-webpack`) we need to tell it to use `ts-loader` to resolve all files ending in `ts`. There are some other things happening here but this isn't a blog post on [webpack](https://www.valentinog.com/blog/webpack/)!

Taking a closer look at the `serverless.yml` file, it should contain the following:

```yaml
service:
  name: hello-world

plugins:
  - serverless-webpack

provider:
  name: aws
  runtime: nodejs10.x

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          method: get
          path: hello
```

You will most likely have a bunch of comments that you can just remove. This should all be pretty self-explanatory. The main things to note are the use of the `serverless-webpack` [plugin](https://www.npmjs.com/package/serverless-webpack) which allows you to use the latest Javascript syntax and the function definition for our `hello` function. We tell Serverless where to find the function, which is the `hello` function exported in `handler.ts` and the event trigger which is defined as a HTTP get request with the path `/hello`. This will inform Serverless to create an API Gateway HTTP endpoint in AWS which we can use to trigger this function.

OK, let's now look at what our code is doing in `handler.ts`:

```ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}
```

Simply put this function is triggered by an event and returns a response that contains a status code, a message and the event body itself. Let's clean it up a little and leverage Typescript a little more.

```ts
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';

interface HelloResponse {
  statusCode: number;
  body: string
}

export const hello: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context): Promise<HelloResponse> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
      input: event,
    }, null, 2),
  };
}
```

To see this code running you can use Serverless to invoke it locally on your machine:

```bash
serverless invoke local -f hello
```

You should see something along the lines of:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Hello World!\",\n  \"input\": \"\"\n}"
}
```

The event here is not a true APIGatewayEvent hence you don't see much when running locally. To see it in action we will have to deploy our function to AWS. Before running the following command you will need to set up your [AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/) on your machine Serverless can use them.

Run:

```bash
serverless deploy
```

This may take a couple of minutes the first time as Serverless has to provision the necessary resources. It will be quicker in subsequent deployments. You should see prompts on your terminal which will inform you about the deployment process.

To verify it worked we can invoke it in one of two ways:

```bash
serverless invoke -f hello
```
or
```bash
curl -i https://<your-amazon-url>/dev/hello
```
`<your-amazon-url>` will be provided in the prompts you get when you deploy using `serverless deploy`. When running the curl command you are using a true HTTP request to the API Gateway in AWS and you should get the event information in the response. 

Amazing right! You now have a serverless function running in the cloud!

Since our function doesn't do much and this was all just a learning exercise lets go ahead and clean up after ourselves by running the command to remove the service from AWS 🗑️.

```bash
serverless remove
```

This is obviously just scratching the surface of what you can achieve with Serverless Framework and serverless computing in general. I hope to explore more and will share what I learn.

Till then, happy coding!