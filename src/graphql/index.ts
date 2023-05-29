import { ApolloServer, gql } from "apollo-server-express";
import { Express } from "express";
import { Server } from "http";
import _ from "lodash";
import minifyGql from "minify-graphql-loader";
import morgan from "morgan";
import path from "path";

import { Request } from "../base/baseRoute";
import { configs } from "../configs";
import { ErrorHelper, UtilsHelper } from "../helpers";
import { Logger } from "../loaders/logger.loader";
import { onContext } from "./context";
import { LogHelper } from "../helpers/log.helper";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import { GraphQLUpload } from "graphql-upload";

export default async (app: Express) => {
  const typeDefs = [
    gql`
      scalar Mixed
      scalar Upload
      ${DateTimeTypeDefinition}

      type Query {
        _empty: String
      }
      type Mutation {
        _empty: String
      }
      type Subscription {
        _empty: String
      }
      input QueryGetListInput {
        limit: Int
        offset: Int
        page: Int
        order: Mixed
        filter: Mixed
        search: String
      }

      type Pagination {
        limit: Int
        offset: Int
        page: Int
        total: Int
      }
    `,
  ];

  let resolvers = {
    Upload: GraphQLUpload,
  };
  let defaultFragment: any = {};

  const ModuleFiles = UtilsHelper.walkSyncFiles(path.join(__dirname, "modules"));
  ModuleFiles.filter((f: any) => /(.*).schema.js$/.test(f)).map((f: any) => {
    const { default: schema } = require(f);
    typeDefs.push(schema);
  });
  ModuleFiles.filter((f: any) => /(.*).resolver.js$/.test(f)).map((f: any) => {
    const { default: resolver } = require(f);
    resolvers = _.merge(resolvers, resolver);
  });
  ModuleFiles.filter((f: any) => /(.*).fragment.js$/.test(f)).map((f: any) => {
    const { default: fragment } = require(f);
    defaultFragment = _.merge(defaultFragment, fragment);
  });
  ModuleFiles.filter((f: any) => /(.*).graphql.js$/.test(f)).map((f: any) => {
    const {
      default: { resolver, schema },
    } = require(f);
    if (schema) typeDefs.push(schema);
    if (resolver) resolvers = _.merge(resolvers, resolver);
    resolvers = _.merge(resolvers, DateTimeResolver);
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // playground: true,
    introspection: true,
    context: onContext,
    debug: configs.debug,
    formatError(err) {
      try {
        console.log("format error", err.message);
        Logger.error(err.message, {
          metadata: {
            stack: err.stack,
            name: err.name,
            message: err.message,
            extensions: err.extensions,
          },
        });
        if (err.extensions && !err.extensions.exception.info) {
          ErrorHelper.logUnknowError(err);
        }
      } catch (err) {}
      return err;
    },
    // subscriptions: {
    //   onConnect: (connectionParams, webSocket) => connectionParams,
    // },
  });

  const skipRequestOption = {
    skip: (req: Request) => (_.get(req, "body.query") || "").includes("IntrospectionQuery"),
  };

  const defaultFragmentFields = Object.keys(defaultFragment);
  morgan.token("gql-query", (req: Request) => req.body.query);
  app.use(
    "/graphql",
    (req, res, next) => {
      if (req.body && req.body.query) {
        let minify = minifyGql(req.body.query);
        for (const field of defaultFragmentFields) {
          minify = minify.replace(
            new RegExp(field + "( |})", "g"),
            field + defaultFragment[field] + "$1"
          );
        }
        req.body.query = minify;
      }
      next();
    },
    morgan(LogHelper.createMorganGraphqlToken, skipRequestOption)
  );

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: (origin, callback) => {
        callback(null, true);

        // const whitelist = WHITE_LIST_DOMAINS;
        // if (!origin || whitelist.findIndex((domain) => origin.startsWith(domain)) !== -1) {
        //   callback(null, true);
        // } else {
        //   callback(new Error('Not allowed by CORS'));
        // }
      },
    },
  });
  // server.installSubscriptionHandlers(httpServer);
  LogHelper.logString(
    "🌞🌞🌞 Running Apollo Server on Path:",
    `${configs.domain}${server.graphqlPath}\n`
  );
};
