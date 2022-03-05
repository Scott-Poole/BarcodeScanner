const {GoogleSpreadsheet} = require('google-spreadsheet');


const config = require('../config/config.json');
const auth = require('../config/Inventory-System-Auth.json');

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet(config.spreadsheet_id);

let docInfo;
let catWorksheet;
let invWorksheet;
let catNumCols;
let catMaxRow;
let catTable = [];
let invNumCols;
let invMaxRow;
let invTable = [];
let catHeaderNameToIndex = {};
let invHeaderNameToIndex = {};
let catHeaderIndexToName = [];
let invHeaderIndexToName = [];

const init = async function(){
	console.log("Authenticating...");
	await doc.useServiceAccountAuth(auth);
	console.log("Loading Sheets...");
	await doc.getInfo();
	
	docInfo = doc;
	
	const sheetsNames = Array.from(
		{ length: doc.sheetCount },
		(k, v) => doc.sheetsByIndex[v].title
	);
	
	console.log(sheetsNames);
	
	
	
	catWorksheet = doc.sheetsByTitle["Categories"];
	catMaxRow = doc.sheetsByTitle["Categories"].rowCount;
	
	invWorksheet = doc.sheetsByTitle["Inventory"];
	invMaxRow = doc.sheetsByTitle["Inventory"].rowCount;
	
	await catWorksheet.loadHeaderRow();
	const colTitles = catWorksheet.headerValues;
	
	console.log(colTitles);
	
	/*await catWorksheet.loadCells('B2:B20');		
	catNumCols = 10;
	
	for (let i=0; i<catNumCols; i++) {
		catHeaderNameToIndex[catWorksheet.getCell(2,2+i).value] = i;
		catHeaderIndexToName[i] = catWorksheet.getCell(2,2+i).value;
	}

	// Short names
	catHeaderNameToIndex["cat"] = catHeaderNameToIndex["Category"];
	catHeaderNameToIndex["desc"] = catHeaderNameToIndex["Description"];
	*/
	console.log("Done.");
}

init();