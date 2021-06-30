// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onInit() {


            var oView = this.getView();
            //           var i18nBundle = oView.getModel("i18n").getResourceBundle();

  //           var oJSON = {
  //               employeeId: "12345",
  //               countryKey: "UK",
  //               listCountry: [
 //                    {
//                         key: "US",
       //                  text: i18nBundle.getText("countryUS")
       //              },
       //              {
       //                 key: "UK",
       //                  text: i18nBundle.getText("countryUK")
       //              },
       //              {
      //                   key: "ES",
      //                   text: i18nBundle.getText("countryES")
      //               },
     //            ]
     //        };

   //            oJsonModel.setData(oJSON);

     //        oView.setModel(oJSON, "jsonCountries");

            var oJsonModelEmpl = new sap.ui.model.json.JSONModel();

            
            oJsonModelEmpl.loadData("./localService/mockdata/Employees.json", false);
            // oJsonModel.attachRequestCompleted(function (oEventModel) {

            //     console.log(JSON.stringify(oJsonModel.getData()));

            // });
            oView.setModel(oJsonModelEmpl, "jsonEmployees");

            var oJsonModelCountry = new sap.ui.model.json.JSONModel();

            //   oJsonModel.setData(oJSON);
            oJsonModelCountry.loadData("./localService/mockdata/Countries.json", false);
            // oJsonModel.attachRequestCompleted(function (oEventModel) {

            //     console.log(JSON.stringify(oJsonModel.getData()));

            // });
            oView.setModel(oJsonModelCountry, "jsonCountries");


            var oJsonModelConfig = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });

            oView.setModel(oJsonModelConfig, "jsonModelConfig");


        }

        function onFilter() {


            var oJsonContries = this.getView().getModel("jsonCountries").getData();

            var filters = [];

            if (oJsonContries.EmployeeId !== "") {

                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJsonContries.EmployeeId));

            }

            if (oJsonContries.CountryKey !== "") {

                filters.push(new Filter("Country", FilterOperator.EQ, oJsonContries.CountryKey));

            }

            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");

            oBinding.filter(filters);

        }

        function onClearFilter() {

            var oModel = this.getView().getModel("jsonCountries");
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");

        }

        function showPostalCode(oEvent) {

            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext("jsonEmployees");
            var objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);
        }

        function onShowCity() {

            var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
            oJSONModelConfig.setProperty("/visibleCity", true);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", true);

        }

        function onHideCity() {

            var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
            oJSONModelConfig.setProperty("/visibleCity", false);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", false);

        }

        function showOrders(oEvent) {

            var ordersTable = this.getView().byId("ordersTable");

            ordersTable.destroyItems();

            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext("jsonEmployees");
            var objectContext = oContext.getObject();
            var orders = objectContext.Orders;

            var ordersItems = [];

            for (var i in orders) {

                ordersItems.push(new sap.m.ColumnListItem({

                    cells: [
                        new sap.m.Label({ text: orders[i].OrderId }),
                        new sap.m.Label({ text: orders[i].Freight }),
                        new sap.m.Label({ text: orders[i].ShipAddress })
                    ]

                }));
            }

            var newTable = new sap.m.Table({

                with: "auto",
                columns: [

                    new sap.m.Column({

                        header: new sap.m.Label({ text: "{i18n>OrderId}" })

                    }),

                    new sap.m.Column({

                        header: new sap.m.Label({ text: "{i18n>Freight}" })

                    }),

                    new sap.m.Column({

                        header: new sap.m.Label({ text: "{i18n>ShipAddress}" })

                    }),
                ],
                items: ordersItems


            }).addStyleClass("sapUiSmallMargin");

            ordersTable.addItem(newTable);

            var newTableJSON = new sap.m.Table();

            newTableJSON.setWidth("auto");
            newTableJSON.addStyleClass("sapUiSmallMargin");

            var columnOrderId = new sap.m.Column();
            var labelOrderId = new sap.m.Label();
            labelOrderId.bindProperty("text", "i18n>OrderId");
            columnOrderId.setHeader(labelOrderId);
            newTableJSON.addColumn(columnOrderId);

            var columnFreight = new sap.m.Column();
            var labelFreight = new sap.m.Label();
            labelFreight.bindProperty("text", "i18n>Freight");
            columnFreight.setHeader(labelFreight);
            newTableJSON.addColumn(columnFreight);

            var columnShipAddress = new sap.m.Column();
            var labelShipAddress = new sap.m.Label();
            labelShipAddress.bindProperty("text", "i18n>ShipAddress");
            columnShipAddress.setHeader(labelShipAddress);
            newTableJSON.addColumn(columnShipAddress);

            var columnListItem = new sap.m.ColumnListItem();

            var cellOrderID = new sap.m.Label();
            cellOrderID.bindProperty("text", "jsonEmployees>OrderId");
            columnListItem.addCell(cellOrderID);

            //  var columnListItem = new sap.m.ColumnListItem();
            var cellFreight = new sap.m.Label();
            cellFreight.bindProperty("text", "jsonEmployees>Freight");
            columnListItem.addCell(cellFreight);

            //                        var columnListItem = new sap.m.ColumnListItem();
            var cellShipAddress = new sap.m.Label();
            cellShipAddress.bindProperty("text", "jsonEmployees>ShipAddress");
            columnListItem.addCell(cellShipAddress);

            var oBindingInfo = {

                model: "jsonEmployees",
                path: "Orders",
                template: columnListItem

            };

            newTableJSON.bindAggregation("items", oBindingInfo);
            newTableJSON.bindElement("jsonEmployees>" + oContext.getPath());

            ordersTable.addItem(newTableJSON);

        }

        var Main = Controller.extend("logaligroup10.Employees.controller.MainView", {});

        //       onInit: function ()   {

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

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.onShowCity = onShowCity;
        Main.prototype.onHideCity = onHideCity;
        Main.prototype.showOrders = showOrders;
        return Main;

    });
