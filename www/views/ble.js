MellitusBLE.ble = function (params) {
    "use strict";

    var foundDevices = [];

    //Helper Functions

    function addDevice(name, address) {

        //var button = document.createElement("button");
        //button.style.width = "100%";
        //button.style.padding = "10px";
        //button.style.fontSize = "16px";
        //button.textContent = name + "-" + address;
        //button.name = name;
        //button.className = "foo";

        //button.addEventListener("click", function () {
        //    startConnect(this.textContent);
        //    //DevExpress.ui.notify("Clicked on " + this.id, "success", 1000);
        //    //var nameItems = this.textContent.split("-");
        //    //var address = nameItems[1].trim();
        //    //Application1.connect(address);


        //    //document.getElementById("services").innerHTML = "";
        //    // connect(address);
        //});

        $("#bleView").dxButton({
            text: name + "-" + address,
            type: "success",
            onClick: function (e) {
                alert("hi");
            }
        });

      
//        document.getElementById("bleView").appendChild(button);
    }

    function initializeResult() {
        DevExpress.ui.notify("The initializeResult is called", "success", 1000);
    }

    function handleError(error) {
        var msg;

        if (error.error !== null && error.message !== null) {

            var errorItems = [];

            if (error.service) {
                errorItems.push("service: " + (uuids[error.service] || error.service));
            }

            if (error.characteristic) {
                errorItems.push("characteristic: " + (uuids[error.characteristic] || error.characteristic));
            }

            msg = "Error on " + error.error + ": " + error.message + (errorItems.length && " (" + errorItems.join(", ") + ")");
        }

        else {
            msg = error;
        }

        console.log(msg, "error");

        if (error.error === "read" && error.service && error.characteristic) {
            reportValue(error.service, error.characteristic, "Error: " + error.message);
        }
    }

    function readSuccess(result) {
        if (result.status === "read") {
            reportValue(result.service, result.characteristic, window.atob(result.value));
        }
    }

    function reportValue(serviceUuid, characteristicUuid, value) {
        console.log(serviceUuid + "." + characteristicUuid + " = " + value);
    }

    //initialize

    function initializeSuccess(result) {
        if (result.status === "enabled") {
            DevExpress.ui.notify("Bluetooth is enabled", "success", 1000);

            console.log("Bluetooth is enabled.");
            console.log(result.message);
        }

        else {

            DevExpress.ui.notify("Bluetooth is NOT enabled", "success", 1000);

            console.log("Bluetooth is not enabled:", "status");
            console.log(result, "status");
        }
    }

    //getAdapterInfo
    function getAdapterInfoResult(params) {
        var i = 1;
        i = i + 1;
        DevExpress.ui.notify("The getAdapterInfoResult is called " + params.name + " " + params.address, "success", 1000);

    }


    //scan

    function startScan() {
        DevExpress.ui.notify("startScan", "normal", 1000);

        console.log("Starting scan for devices...", "status");

        foundDevices = [];

        if (window.cordova.platformId === "windows") {

            bluetoothle.retrieveConnected(retrieveConnectedSuccess, handleError, {});
        }
        else {
            bluetoothle.startScan(startScanSuccess, handleError, { services: [] });
        }
    }

    function startScanSuccess(result) {
        //console.log("startScanSuccess(" + result.status + ")");

        if (result.status === "scanStarted") {
            console.log("Scanning for devices (will continue to scan until NiProBGM is found)...", "status");
        }
        else if (result.status === "scanResult")
        {
            if (foundDevices.some(function (device) { return device.name === result.name; }) === false) {
                console.log('FOUND DEVICE:' + result.name);
                foundDevices.push(result);
                if (result !== null && result.name !== null && result.name.includes("NiproBGM") === true) {
                    addDevice(result.name, result.address);
                    stopScan(stopScanSuccess, handleError);
                }
            }
        }
    }

    function stopScan() {
        DevExpress.ui.notify("stopScan w/Promise", "failure", 1000);
        new Promise(function (resolve, reject) {
            console.log("stopScan");
            bluetoothle.stopScan(resolve, reject);

        }).then(stopScanSuccess, handleError);
    }

    function stopScanSuccess() {

        if (!foundDevices.length) {

            console.log("NO DEVICES FOUND");
        }
        else {

            console.log("stopScanSuccess - Found a total of " + foundDevices.length + " devices.");
        }
    }


    //stop scan
    //function stopScan()
    //{
    //    DevExpress.ui.notify("stopScan", "failure", 1000);



    //    if(foundDevices.length ===0)
    //        alert("Bluetooth device not found. Please turn your bluetooth device on!");

    //    bluetoothle.stopScan(stopScanSuccess, handleError);
    //}


    //connection section
    function retrieveConnectedSuccess(result) {

        //console.log("retrieveConnectedSuccess()");
        //console.log(result);

        //result.forEach(function (device) {

        //    addDevice(device.name, device.address);

        //});
    }

    function startConnect(text) {
        DevExpress.ui.notify("startConnect " + text, "success", 1000);
        console.log("startConnect " + text);
        var nameItems = text.split("-");
        var address = nameItems[1].trim();
        connect(address);
    }

    function connect(address) {
        DevExpress.ui.notify("connect " + address, "success", 1000);

        console.log('Connecting to device: ' + address);

        if (cordova.platformId === "windows") {
            getDeviceServices(address);

        }
        else {

            new Promise(function (resolve, reject) {

                bluetoothle.connect(resolve, reject, { address: address });

            }).then(connectSuccess, handleError);

        }
    }



    function connectSuccess(result) {

        console.log("connectSuccess - " + result.status);

        if (result.status === "connected") {

            getDeviceServices(result.address);
        }
        else if (result.status === "disconnected") {

            console.log("Disconnected from device: " + result.address, "status");
        }
    }


    //add service

    function discoverSuccess(result) {

        console.log("Discover returned with status: " + result.status);

        if (result.status === "discovered") {

            // Create a chain of read promises so we don't try to read a property until we've finished
            // reading the previous property.

            var readSequence = result.services.reduce(function (sequence, service) {

                return sequence.then(function () {

                    return addService(result.address, service.uuid, service.characteristics);
                });

            }, Promise.resolve());

            // Once we're done reading all the values, disconnect
            readSequence.then(function () {

                new Promise(function (resolve, reject) {

                    bluetoothle.disconnect(resolve, reject,
                        { address: result.address });

                }).then(connectSuccess, handleError);

            });

        }
    }

    function characteristicsSuccess(result) {

        console.log("characteristicsSuccess()");
       console.log(result);

        if (result.status === "characteristics") {

            return addService(result.address, result.service, result.characteristics);
        }
    }



            

    var bleButtonClick = function () {

        var buttons = document.getElementsByClassName("foo");

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].parentNode.removeChild(buttons[i]);
        }


        var params = {
            "request": true,
            "statusReceiver": false,
            "restoreKey": "bluetoothleplugin"
        };
        bluetoothle.initialize(initializeSuccess, params);
        bluetoothle.getAdapterInfo(getAdapterInfoResult);
        startScan();


    };

   
    //write

    //bluetoothle.write(get.records, writeError, params);
    //bluetoothle.write(get.allrecords, writeError, params);

    //var string = "Write Hello World";
    //var bytes = bluetoothle.stringToBytes(string);
    //var encodedString = bluetoothle.bytesToEncodedString(bytes);


    //var returnObj = { "status": "written", "service": "180F", "characteristic": "2A19", "value": "V3JpdGUgSGVsbG8gV29ybGQ=", "address": "ABC123" };
    //var bytes = bluetoothle.encodedStringToBytes(returnObj.value);
    //var string = bluetoothle.bytesToString(bytes); //This should equal Write Hello World

     




    var viewModel = {

        bleButtonOptions: {
            text: 'BLE Scan',
            type: 'success',
            onClick: bleButtonClick
        },
        isLoadPanelVisible: ko.observable(false)

        

    };

   
    return viewModel;
};