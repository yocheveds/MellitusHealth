window.MellitusBLE = window.MellitusBLE || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });
    // To customize the Generic theme, use the DevExtreme Theme Builder (http://js.devexpress.com/ThemeBuilder)
    // For details on how to use themes and the Theme Builder, refer to the http://js.devexpress.com/Documentation/Guide/#themes article

    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });
    });

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !MellitusBLE.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "android":
                navigator.app.exitApp();
                break;
            case "win":
                MSApp.terminateApp('');
                break;
        }
    }

    MellitusBLE.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MellitusBLE,
        layoutSet: DevExpress.framework.html.layoutSets[MellitusBLE.config.layoutSet],
        navigation: MellitusBLE.config.navigation,
        commandMapping: MellitusBLE.config.commandMapping
    });

    DevExpress.viz.currentTheme('android5.light');

    MellitusBLE.app.router.register(":view/:id", { view: "home", id: undefined });
    MellitusBLE.app.on("navigatingBack", onNavigatingBack);
    MellitusBLE.app.navigate();
});
