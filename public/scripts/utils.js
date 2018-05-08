/**
* @file utils.js
* Utility methods to convert category/status codes to corresponding string representation and date formatting. @file 
*/

function getCategoryFromId(categoryId) {
	switch (categoryId) {
		case 0:
		return "Land";
		case 1:
		return "Water";
		case 2:
		return "Air";
		case 3:
		return "Fire";
		default:
		return "";
	}
}

function getStatusFromId(statusId) {
	switch (statusId) {
		case 0:
		return "Reported";
		case 1:
		return "Acknowledged";
		case 2:
		return "Work in Progress";
		case 3:
		return "Resolved";
		default:
		return "";
	}
}

function getFormattedDateString(inputDateStr) {
	//Input date string format: YYYY-MM-DDTHH:MM:SSZ
	var date = Date.parse(inputDateStr); 
	return moment(date).format('MMMM DD YYYY, h:mm a');
}