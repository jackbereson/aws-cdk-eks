import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllActivity(q: QueryGetListInput): ActivityPageData
    getOneActivity(id: ID!): Activity
  }

  extend type Mutation {
    deleteOneActivity(id: ID!): Activity
  }

  type Activity {
    id: String
    userId: String
    customerId: String

    message: String
    type: String
    changedFactor: String

    createdAt: DateTime
    updatedAt: DateTime

    customer: Customer
    user: User
  }

  type ActivityPageData {
    data: [Activity]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
