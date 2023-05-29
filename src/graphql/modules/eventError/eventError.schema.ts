import { gql } from "apollo-server-express";
import { EventErrorStatusEnum } from "../../../constants/event.const";

const schema = gql`
  extend type Query {
    getAllEventError(q: QueryGetListInput): EventErrorPageData
    getOneEventError(id: ID!): EventError
  }

  extend type Mutation {
    resolveEventError(id: ID!): EventError
  }

  type EventError {
    id: String,
    type: String!,
    data: Mixed,
    """${Object.keys(EventErrorStatusEnum).join("|")}"""
    errorName: String
    errorStack: Mixed
    errorMessage: String
    status: String,
    createdAt: DateTime
    updatedAt: DateTime
  }

  type EventErrorPageData {
    data: [EventError],
    total: Int
    pagination: Pagination
  }
`;

export default schema;
