cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-bluetoothle.BluetoothLe",
        "file": "plugins/cordova-plugin-bluetoothle/www/bluetoothle.js",
        "pluginId": "cordova-plugin-bluetoothle",
        "clobbers": [
            "window.bluetoothle"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-bluetoothle": "4.4.3",
    "cordova-plugin-splashscreen": "4.0.1",
    "cordova-plugin-whitelist": "1.2.2"
};
// BOTTOM OF METADATA
});