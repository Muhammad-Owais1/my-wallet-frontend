const images = {
  usFlag: require("../assets/images/us-flag.png"),
  ukFlag: require("../assets/images/uk-flag.png"),
  canadaFlag: require("../assets/images/canada-flag.png"),
  amountBannerImg: require("../assets/images/amount-banner-img.png"),
  sendMoney: require("../assets/images/send-money.png"),
  receiveMoney: require("../assets/images/receive-money.png"),
  moreIcon: require("../assets/images/more.png"),
} as const;

export type ImageKeys = keyof typeof images;

export default images;
