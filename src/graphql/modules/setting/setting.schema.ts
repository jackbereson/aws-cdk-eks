import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllSetting(q: QueryGetListInput): SettingPageData
    getOneSetting(id: ID!): Setting
    getOneSettingByKey(key: String!): Setting
    getMemberStats: Stats
  }

  extend type Mutation {
    createSetting(data: CreateSettingInput!): Setting
    updateSetting(id: ID!, data: UpdateSettingInput!): Setting
    deleteOneSetting(id: ID!): Setting
    deleteManySetting(ids: [ID]): Int
  }

  type Stats {
    statHolder: Int
    statMember: Int
    statMiner: Int
    statStaker: Int
  }

  input CreateSettingInput {
    type: String
    name: String
    key: String
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
    groupId: String
  }

  input UpdateSettingInput {
    type: String
    name: String
    key: String
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
    groupId: String
  }

  type Setting {
    id: String
    type: String
    name: String
    key: String
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
    groupId: String
    editMode: String
    createdAt: DateTime
    updatedAt: DateTime
    group: SettingGroup
  }

  type SettingPageData {
    data: [Setting]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
