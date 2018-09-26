const colors = require("../../src/styles/colors");

module.exports = {
  siteTitle: "PersonalBlog - a blog starter for GatsbyJS", // <title>
  shortSiteTitle: "PersonalBlog GatsbyJS Starter", // <title> ending for posts and pages
  siteDescription: "PersonalBlog is a GatsbyJS starter.",
  siteUrl: "https://github.com/creasy2010",
  pathPrefix: "",
  siteImage: "preview.jpg",
  siteLanguage: "zh-cn",
  // author
  authorName: "杨晓东",
  authorTwitterAccount: "xiaoDongYang_",
  // info
  infoTitle: "杨晓东",
  infoTitleNote: "personal blog",
  // manifest.json
  manifestName: "PersonalBlog - share with the world, connect the world!",
  manifestShortName: "PersonalBlog", // max 12 characters
  manifestStartUrl: "/",
  manifestBackgroundColor: colors.background,
  manifestThemeColor: colors.background,
  manifestDisplay: "standalone",
  // contact
  contactEmail: "coder.yang2010@gmail.com",
  // social
  authorSocialLinks: [
    { name: "github", url: "https://github.com/creasy2010" },
    { name: "wechat", url: "/about" }
  ]
};
