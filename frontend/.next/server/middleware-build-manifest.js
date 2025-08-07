self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/index.js"
    ],
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/support": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/support.js"
    ],
    "/tools/karaoke": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/tools/karaoke.js"
    ],
    "/tools/pitch-tempo": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/tools/pitch-tempo.js"
    ],
    "/tools/recorder": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/tools/recorder.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];