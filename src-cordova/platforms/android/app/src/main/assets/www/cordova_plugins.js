cordova.define("cordova/plugin_list", function (require, exports, module) {
  module.exports = [
    {
      id: "cordova-plugin-android-permissions.Permissions",
      file: "plugins/cordova-plugin-android-permissions/www/permissions.js",
      pluginId: "cordova-plugin-android-permissions",
      clobbers: ["cordova.plugins.permissions"],
    },
    {
      id: "cordova-plugin-camera.Camera",
      file: "plugins/cordova-plugin-camera/www/CameraConstants.js",
      pluginId: "cordova-plugin-camera",
      clobbers: ["Camera"],
    },
    {
      id: "cordova-plugin-camera.CameraPopoverOptions",
      file: "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      pluginId: "cordova-plugin-camera",
      clobbers: ["CameraPopoverOptions"],
    },
    {
      id: "cordova-plugin-camera.camera",
      file: "plugins/cordova-plugin-camera/www/Camera.js",
      pluginId: "cordova-plugin-camera",
      clobbers: ["navigator.camera"],
    },
    {
      id: "cordova-plugin-camera.CameraPopoverHandle",
      file: "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      pluginId: "cordova-plugin-camera",
      clobbers: ["CameraPopoverHandle"],
    },
    {
      id: "cordova-plugin-inappbrowser.inappbrowser",
      file: "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      pluginId: "cordova-plugin-inappbrowser",
      clobbers: ["cordova.InAppBrowser.open"],
    },
    {
      id: "cordova-plugin-splashscreen.SplashScreen",
      file: "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      pluginId: "cordova-plugin-splashscreen",
      clobbers: ["navigator.splashscreen"],
    },
    {
      id: "cordova-plugin-customurlscheme.LaunchMyApp",
      file: "plugins/cordova-plugin-customurlscheme/www/android/LaunchMyApp.js",
      pluginId: "cordova-plugin-customurlscheme",
      clobbers: ["window.plugins.launchmyapp"],
    },
  ];
  module.exports.metadata = {
    "cordova-plugin-android-permissions": "1.1.5",
    "cordova-plugin-camera": "6.0.1-dev",
    "cordova-plugin-inappbrowser": "5.0.0",
    "cordova-plugin-splashscreen": "6.0.2",
    "cordova-plugin-customurlscheme": "5.0.2",
  };
});
