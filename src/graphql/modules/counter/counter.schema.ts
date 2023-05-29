import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllCounter(q: QueryGetListInput): CounterPageData
    getOneCounter(id: ID!): Counter
  }

  extend type Mutation {
    createCounter(data: CreateCounterInput!): Counter
    updateCounter(id: ID!, data: UpdateCounterInput!): Counter
    deleteOneCounter(id: ID!): Counter
    deleteManyCounter(ids: [ID]): Int
  }

  input CreateCounterInput {
    name: String
    value: Int
  }

  input UpdateCounterInput {
    name: String
    value: Int
  }

  type Counter {
    id: String
    name: String
    createdAt: DateTime
    updatedAt: DateTime

    value: Int
  }

  type CounterPageData {
    data: [Counter]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
