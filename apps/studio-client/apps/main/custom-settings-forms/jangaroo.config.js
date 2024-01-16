const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__custom-settings-forms",
    namespace: "com.coremedia.blueprint.studio.csf",
    studioPlugins: [
      {
        mainClass: "com.coremedia.blueprint.studio.csf.CSFStudioPlugin",
        name: "Custom Settings Forms",
      },
    ],
  },
});
