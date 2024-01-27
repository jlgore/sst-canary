import { StackContext, Api, EventBus, Service } from "sst/constructs";
import { generateAssetName } from '../lib/names.ts';

export function API({ stack }: StackContext) {

  
  new Service(stack, "HTTP", {
    path: "service/opencanary/http",
    port: 8080,
    cdk: {
      applicationLoadBalancer: false,
      cloudfrontDistribution: false,
    },
  });


  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
