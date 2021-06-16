// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";



        var Main = Controller.extend("logaligroup10.Employees.controller.MainView", {});

        //       onInit: function () {

        //     },

        Main.prototype.onValidate = function () {

            var inputEmployee = this.byId("InputEmployee");

            var valueEmployee = inputEmployee.getValue();

            if (valueEmployee.length === 6) {

                //      inputEmployee.setDescription("valid is ok");
                this.getView().byId("labelCountry").setVisible(true);
                this.getView().byId("slCountry").setVisible(true);

            } else {

                this.getView().byId("labelCountry").setVisible(false);
                this.getView().byId("slCountry").setVisible(false);

                //      inputEmployee.setDescription("valid is not ok");
            }
        };

        return Main;
    });
