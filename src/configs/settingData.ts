import { SettingType } from "../graphql/modules/setting/setting.model";

export enum SettingGroupSlug {
  COMMON = "COMMON",
  WEBSITE_SETTING = "WEBSITE_SETTING",
  NFT_SETTING = "NFT_SETTING",
  USER_SETTING = "USER_SETTING",
  CUSTOMER_SETTING = "CUSTOMER_SETTING",
  MINING_SETTING = "MINING_SETTING",
  TOKEN_SETTING = "TOKEN_SETTING",
  LUCKY_NUMBER_GAME_SETTING = "LUCKY_NUMBER_GAME_SETTING",
  APP_VERSION_SETTING = "APP_VERSION_SETTING",
  EXP_SETTING = "EXP_SETTING",
  BLOCKCHAIN_SETTING = "BLOCKCHAIN_SETTING",
  P2P_EXCHANGE = "P2P_EXCHANGE",
  SPORT = "SPORT",
}
export enum SettingKey {
  // Cấu hình chung
  TITLE = "TITLE", // Tiêu đề ứng dụng
  WEBSITE_DOMAIN = "WEBSITE_DOMAIN",
  API_DOMAIN = "API_DOMAIN",
  MEDIA_DOMAIN = "MEDIA_DOMAIN",
  LOGO_URL = "LOGO_URL",
  MAINTENANCE = "MAINTENANCE",

  STAT_MEMBER = "STAT_MEMBER",
  STAT_MINER = "STAT_MINER",
  STAT_STAKER = "STAT_STAKER",
  STAT_HOLDER = "STAT_HOLDER",

  // cấu hình website
  USE_MENU_CATEGORY = "USE_MENU_CATEGORY",
  ADMIN_MENU = "ADMIN_MENU",
  EDITOR_MENU = "EDITOR_MENU",
  MENU_CATEGORIES = "MENU_CATEGORIES",

  //Cấu hình NFT
  ALLOW_SALE = "ALLOW_SALE",
  ALLOW_PKG = "ALLOW_PKG",
  ALLOW_PRIVATE_SALE = "ALLOW_PRIVATE_SALE",

  //CAU HINH CUSTOMER
  CONFIRM_ICP_WALLET = "CONFIRM_ICP_WALLET",

  //CAU HINH MINING
  MINING_BASIC_SPEED = "MINING_BASIC_SPEED",
  MINING_REF_SPEED = "MINING_REF_SPEED",
  MINING_MAX_SPEED = "MINING_MAX_SPEED",
  MAXIMUM_BONUS_ADS_TIMES = "MAXIMUM_BONUS_ADS_TIMES",
  BONUS_ADS_SPEED = "BONUS_ADS_SPEED",

  //TOKEN_SETTING
  INIT_BALANCE_DOX = "INIT_BALANCE_DOX",
  STAKING_FEE = "STAKING_FEE",
  DOX_PRICE = "DOX_PRICE",

  //LUCKY_NUMBER_GAME_SETTING
  LUCKY_NUMBER_MIN_RANDOM_NUMBER = "LUCKY_NUMBER_MIN_RANDOM_NUMBER",
  LUCKY_NUMBER_MAX_RANDOM_NUMBER = "LUCKY_NUMBER_MAX_RANDOM_NUMBER",
  LUCKY_NUMBER_CURRENT_BATCH = "LUCKY_NUMBER_CURRENT_BATCH",
  LUCKY_NUMBER_POOL_DOX = "LUCKY_NUMBER_POOL_DOX",
  LUCKY_NUMBER_BET_AMOUNT_DOX = "LUCKY_NUMBER_BET_AMOUNT_DOX",
  LUCKY_NUMBER_JACKPOT_AMOUNT_DOX = "LUCKY_NUMBER_JACKPOT_AMOUNT_DOX",
  LUCKY_NUMBER_PERCENT_PAYOUT = "LUCKY_NUMBER_PERCENT_PAYOUT",
  LUCKY_NUMBER_LIMIT_POOL_SIZE = "LUCKY_NUMBER_LIMIT_POOL_SIZE",

  //APP_VERSION_SETTING
  APP_IOS_VERSION = "APP_IOS_VERSION",
  APP_ANDROID_VERSION = "APP_ANDROID_VERSION",
  APP_ANDROID_LINK = "APP_ANDROID_LINK",
  APP_IOS_LINK = "APP_IOS_LINK",
  APP_DESCRIPTION_UPDATE = "APP_DESCRIPTION_UPDATE",

  //EXP_SETTING
  EXP_VESTING = "EXP_VESTING",
  EXP_KENO = "EXP_KENO",
  EXP_HIGH_LOW = "EXP_HIGH_LOW",
  EXP_DEPOSIT = "EXP_DEPOSIT",
  EXP_SPORT = "EXP_SPORT",
  EXP_WATCH_TO_EARN = "EXP_WATCH_TO_EARN",

  //BLOCKCHAIN_SETTING
  GAS_FEE = "GAS_FEE",

  P2P_ORDER_TIME = "P2P_ORDER_TIME",
  P2P_EXCHANGE_FEE = "P2P_EXCHANGE_FEE",
  P2P_SERVICE_FEE = "P2P_SERVICE_FEE",
  P2P_SERVICE_FEE_POST_ADS_BUY = "P2P_SERVICE_FEE_POST_ADS_BUY",
  P2P_SERVICE_FEE_POST_ADS_SELL = "P2P_SERVICE_FEE_POST_ADS_SELL",
  P2P_SERVICE_FEE_ORDER_BUY = "P2P_SERVICE_FEE_ORDER_BUY",
  P2P_SERVICE_FEE_ORDER_SELL = "P2P_SERVICE_FEE_ORDER_SELL",

  SPORT_ODD_RATIO = "SPORT_ODD_RATIO",
}

export const SETTING_DATA = [
  {
    slug: SettingGroupSlug.COMMON,
    name: "Common setting",
    desc: "Common setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.string,
        name: "Website Title",
        key: SettingKey.TITLE,
        value: `prodox.io`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Website Domain",
        key: SettingKey.WEBSITE_DOMAIN,
        value: `http://prodox.io/`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "API Domain",
        key: SettingKey.API_DOMAIN,
        value: `https://core.prodox.io/`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Media Domain",
        key: SettingKey.MEDIA_DOMAIN,
        value: `https://core.prodox.io/`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Logo url",
        key: SettingKey.LOGO_URL,
        value: `/images/logo.png`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.boolean,
        name: "Maintenance",
        key: SettingKey.MAINTENANCE,
        value: false,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Member number",
        key: SettingKey.STAT_MEMBER,
        value: 1000,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Miner number",
        key: SettingKey.STAT_MINER,
        value: 0,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Staker number",
        key: SettingKey.STAT_STAKER,
        value: 0,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Holder number",
        key: SettingKey.STAT_HOLDER,
        value: 0,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.WEBSITE_SETTING,
    name: "Website setting",
    desc: "Website setting here",
    icon: "far fa-tachometer-alt",
    readOnly: false,
    settings: [
      {
        type: SettingType.boolean,
        name: "Use menu category",
        key: SettingKey.USE_MENU_CATEGORY,
        value: true,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.NFT_SETTING,
    name: "NFT setting",
    desc: "NFT setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.boolean,
        name: "Allow sale",
        key: SettingKey.ALLOW_SALE,
        value: false,
        isActive: true,
        isPrivate: false,
        readOnly: true,
      },
    ],
  },
  {
    slug: SettingGroupSlug.CUSTOMER_SETTING,
    name: "Customer setting",
    desc: "Customer setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.boolean,
        name: "Confirm ICP wallet Whitelist",
        key: SettingKey.CONFIRM_ICP_WALLET,
        value: false,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.MINING_SETTING,
    name: "Mining setting",
    desc: "Mining setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.number,
        name: "Mining basic speed",
        key: SettingKey.MINING_BASIC_SPEED,
        value: 0.0001,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Mining ref speed",
        key: SettingKey.MINING_REF_SPEED,
        value: 0.00001,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Mining max speed",
        key: SettingKey.MINING_MAX_SPEED,
        value: 0.001,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Maximum Bonus Ads Times",
        key: SettingKey.MAXIMUM_BONUS_ADS_TIMES,
        value: 10,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Bonus Ads speed",
        key: SettingKey.BONUS_ADS_SPEED,
        value: 0.000005,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.TOKEN_SETTING,
    name: "Token setting",
    desc: "Token setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.number,
        name: "Init balance Dox",
        key: SettingKey.INIT_BALANCE_DOX,
        value: 50,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Staking Fee",
        key: SettingKey.STAKING_FEE,
        value: 0.5,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Dox price (DOX/BUSD)",
        key: SettingKey.DOX_PRICE,
        value: "0.01",
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.LUCKY_NUMBER_GAME_SETTING,
    name: "Lucky game setting",
    desc: "Lucky game setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.number,
        name: "Min random number",
        key: SettingKey.LUCKY_NUMBER_MIN_RANDOM_NUMBER,
        value: 1,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Max random number",
        key: SettingKey.LUCKY_NUMBER_MAX_RANDOM_NUMBER,
        value: 999999,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Current Batch",
        key: SettingKey.LUCKY_NUMBER_CURRENT_BATCH,
        value: 1,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Dox lucky number Pool",
        key: SettingKey.LUCKY_NUMBER_POOL_DOX,
        value: 1000,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Dox Bet amount",
        key: SettingKey.LUCKY_NUMBER_BET_AMOUNT_DOX,
        value: 100,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Dox Jackpot amount",
        key: SettingKey.LUCKY_NUMBER_JACKPOT_AMOUNT_DOX,
        value: 90,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.array,
        name: "Percent Payout",
        key: SettingKey.LUCKY_NUMBER_PERCENT_PAYOUT,
        value: [40, 25, 15, 10, 5, 1, 1, 1, 1, 1],
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Limit pool size",
        key: SettingKey.LUCKY_NUMBER_LIMIT_POOL_SIZE,
        value: 1000000,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.APP_VERSION_SETTING,
    name: "App version setting",
    desc: "App version setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.string,
        name: "App ios version",
        key: SettingKey.APP_IOS_VERSION,
        value: "0.0.1",
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "App android version",
        key: SettingKey.APP_ANDROID_VERSION,
        value: "0.0.1",
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "App ios link",
        key: SettingKey.APP_IOS_LINK,
        value: "",
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "App android link",
        key: SettingKey.APP_ANDROID_LINK,
        value: "",
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "App description update",
        key: SettingKey.APP_DESCRIPTION_UPDATE,
        value: "There is a newer version of this app available, would you like to update?",
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.EXP_SETTING,
    name: "Experience",
    desc: "Experience for customer",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.number,
        name: "Vesting exp",
        key: SettingKey.EXP_VESTING,
        value: 1,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Keno exp",
        key: SettingKey.EXP_KENO,
        value: 1,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "High low exp",
        key: SettingKey.EXP_HIGH_LOW,
        value: 2,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Sport exp",
        key: SettingKey.EXP_SPORT,
        value: 5,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Watch to earn exp",
        key: SettingKey.EXP_WATCH_TO_EARN,
        value: 2,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "Deposit exp",
        key: SettingKey.EXP_DEPOSIT,
        value: 2,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.BLOCKCHAIN_SETTING,
    name: "Blockchain setting",
    desc: "Blockchain setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.number,
        name: "Gas fee",
        key: SettingKey.GAS_FEE,
        value: 1000000,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.P2P_EXCHANGE,
    name: "P2p exchange",
    desc: "P2p exchange setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.number,
        name: "Order time (Minutes)",
        key: SettingKey.P2P_ORDER_TIME,
        value: 120,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "P2p Exchange fee (%)",
        key: SettingKey.P2P_EXCHANGE_FEE,
        value: 0,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "P2p Service fee (DOX)",
        key: SettingKey.P2P_SERVICE_FEE,
        value: 50,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "P2p Service fee POST ADS BUY (DOX)",
        key: SettingKey.P2P_SERVICE_FEE_POST_ADS_BUY,
        value: 0,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "P2p Service fee POST ADS SELL (DOX)",
        key: SettingKey.P2P_SERVICE_FEE_POST_ADS_SELL,
        value: 50,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "P2p Service fee ORDER BUY (DOX)",
        key: SettingKey.P2P_SERVICE_FEE_ORDER_BUY,
        value: 0,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.number,
        name: "P2p Service fee ORDER SELL (DOX)",
        key: SettingKey.P2P_SERVICE_FEE_ORDER_SELL,
        value: 50,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },

  {
    slug: SettingGroupSlug.SPORT,
    name: "Sport",
    desc: "Sport setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.number,
        name: "Sport odd ratio",
        key: SettingKey.SPORT_ODD_RATIO,
        value: 1,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
    ],
  },
];