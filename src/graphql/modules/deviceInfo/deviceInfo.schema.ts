import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllDeviceInfo(q: QueryGetListInput): DeviceInfoPageData
    getOneDeviceInfo(id: ID!): DeviceInfo
  }

  extend type Mutation {
    createDeviceInfo(data: CreateDeviceInfoInput!): DeviceInfo
    updateDeviceInfo(id: ID!, data: UpdateDeviceInfoInput!): DeviceInfo
    deleteOneDeviceInfo(id: ID!): DeviceInfo
    deleteManyDeviceInfo(ids: [ID]): Int
    regisDevice(deviceId: String, deviceToken: String): DeviceInfo
    unRegisDevice(deviceId: String!): Boolean
  }

  input CreateDeviceInfoInput {
    _empty: Mixed
  }

  input UpdateDeviceInfoInput {
    _empty: Mixed
  }

  type DeviceInfo {
    id: String
    userId: ID
    deviceId: String
    deviceToken: String
    createdAt: DateTime
    updatedAt: DateTime

    user: User
  }

  type DeviceInfoPageData {
    data: [DeviceInfo]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
