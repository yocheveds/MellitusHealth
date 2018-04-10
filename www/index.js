window.MellitusBLE = window.MellitusBLE || {};

$(function() {
    

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

    DevExpress.viz.currentTheme('generic.light.compact');

    MellitusBLE.app.router.register(":view/:id", { view: "home", id: undefined });
    MellitusBLE.app.on("navigatingBack", onNavigatingBack);
    MellitusBLE.app.navigate();
});
