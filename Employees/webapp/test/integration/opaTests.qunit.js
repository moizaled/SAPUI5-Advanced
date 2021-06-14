/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"logaligroup10/Employees/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
