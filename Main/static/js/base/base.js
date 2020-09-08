var App = function () {
    var handleInit = function () {
        $(document).ajaxStart(function () {
            App.BlockUI()
        });
        $(document).ajaxStop(function () {
            App.UnBlockUI()
        });
    };
    var handleBlockUI = function () {
        $.unblockUI();
        $.blockUI({
            css: {
                border: "none",
                padding: "15px",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                opacity: 0.5,
                color: "#fff"
            },
            baseZ: 2000
        });
    };
    var handleUnBlockUI = function () {
        $.unblockUI();
    };
    var handleToast = function (message, type) {
        var heading = "Success";
        if(type=="" || type==null){
            type = "success";
        }
        if (type == "error") {
            heading = "Error";
        }
        $.toast({
            heading: heading,
            text: message,
            showHideTransition: "plain",
            icon: type,
            hideAfter: 4000,
        });

    };
    return {
        Init: function () {
            handleInit();
        },
        BlockUI: function () {
            handleBlockUI();
        },
        UnBlockUI: function () {
            handleUnBlockUI();
        },
        Toast: function (message, type) {
            handleToast(message, type);
        }
    }
}();
$(document).ready(function () {
    App.Init();
})