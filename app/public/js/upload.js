$(document).ready(function() {
	var startDate;
	var endDate;
	var itemName;
	var itemDesc;
	var sDate;
	var eDate;
	var sTime;
	var currentURL = window.location.origin;
	$.ajax({url: currentURL + "/api/current", method: "GET"})
		.done(function(result) {
			if(result[0])
			{
				var date = new Date(result[0].startdate*1000);
				$("#timeStart").text(date);
				date = new Date(result[0].enddate*1000);
				$("#timeEnd").text(date);
				$("#name").text(result[0].itemname);
				$("#desc").text(result[0].itemdesc);
			}
		});
	$(function() {
		sDate = $("#startDate").datepicker();
		eDate = $("#endDate").datepicker();
	});
	$("#submit").on('click', function() {
		startDate = sDate.val();
		endDate = eDate.val();
		itemName = $("#itemName").val();
		itemDesc = $("#itemDesc").val();
		var info = {startDate: startDate, endDate: endDate, itemName: itemName, itemDesc: itemDesc};
		var currentURL = window.location.origin;
		$.ajax({
		  type: "POST",
		  url: currentURL + "/api/add",
		  data: info,
		  success: function(result) {console.log("Success")},
		  dataType: "text"
		});
	});
});