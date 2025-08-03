const pkg = require("./package.json");

module.exports = function () {
  const VERSION = pkg.version;

  return {
    expo: {
      name: "pewterfelt-app",
      slug: "pewterfelt-app",
      version: VERSION,
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "com.pewterfelt.app",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.pewterfelt.app",
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false,
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        package: "com.pewterfelt.app",
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [
        "expo-router",
        "expo-font",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
          },
        ],
        [
          "expo-dev-client",
          {
            launchMode: "most-recent",
          },
        ],
      ],
      experiments: {
        typedRoutes: true,
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  };
};
