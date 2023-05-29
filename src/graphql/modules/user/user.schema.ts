import { gql } from "apollo-server-express";
import { UserRole } from "./user.model";

const schema = gql`
extend type Query {
  getAllUser(q: QueryGetListInput): UserPageData
  getOneUser(id: ID!): User
  # Add Query
  userGetMe: User
}

extend type Mutation {
  createUser(data: CreateUserInput!): User
  updateUser(id: ID!, data: UpdateUserInput!): User
  deleteOneUser(id: ID!): User
    # Add Mutation
  signinUserByEmail(email: String!): UserLoginData
}

type UserLoginData {
  user: User
  token: String
}

input CreateUserInput {
  name: String
  email: String
  password: String
  phone: String
  walletAddress: String
  avatar: String
  role: String
}

input UpdateUserInput {
  name: String
  email: String
  password: String
  phone: String
  walletAddress: String
  avatar: String
  role: String
  status: String
}

input UserUpdateMeInput {
  name: String
  phone: String
  address: String
  avatar: String
  provinceId: String
  districtId: String
  wardId: String
  """${Object.values(UserRole).join("|")}"""
  role: String
}

type User {
  code: String
  id: String
  email: String
  role: String
  agencyName: String
  name: String
  phone: String
  address: String
  avatar: String
  balance: Float
  point: Int
  serviceStatus: String
  lastLoginAt: DateTime
  activedAt: DateTime
  expiredDateCount: Int
  referralCode: String
  status: String
  serviceId: String
  serviceHistoryId: String
  serviceCode: String
  createdAt: DateTime
  updatedAt: DateTime
}


type UserPageData {
  data: [User]
  total: Int
  pagination: Pagination
}
`;

export default schema;
