#!/bin/sh

./node_modules/.bin/webpack -d -p --config webpack.config.cordova.js

INDEX="./Cordova/www/js/index.js"

rm -rf $INDEX

FILE_PREFIX="
var app = {\n
    // Application Constructor\n
    initialize: function() {\n
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);\n
    },\n\n

    // deviceready Event Handler\n
    //\n
    // Bind any cordova events here. Common events are:\n
    // 'pause', 'resume', etc.\n
    onDeviceReady: function() {\n
"

FILE_SUFFIX="
    }\n
  }\n\n

app.initialize();
"

echo $FILE_PREFIX > $INDEX
cat ./Cordova/www/js/bundle.js >> $INDEX
echo $FILE_SUFFIX >> $INDEX
