let Spreadsheet = function(){
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

	const init = async function(auth, doc){
		GoogleSpreadsheet = gss;
		console.log("Authenticating...");
		await doc.useServiceAccountAuth(auth);
		console.log("Loading Sheet...");
		await doc.getInfo();
		
		docInfo = info;
				
		for (let ws of info.worksheets) {
		  // logAll(`Worksheet ${ws.id} (${ws.title})`, ws);

		  if (ws.title === "Categories") {
			catWorksheet = ws;
			catMaxRow = ws.rowCount;
		  } else if (ws.title === "Inventory") {
			invWorksheet = ws;
			invMaxRow = ws.rowCount;
		  }
		}
		
		await catWorksheet.loadCells({ 
			"startRowIndex": 1, 
			"endRowIndex": 1, 
			"startColumnIndex": 1, 
			"endColumnIndex": 26
		});
				
		catNumCols = catWorksheet.cellStats.nonEmpty;

		for (let i=0; i<catNumCols; i++) {
			catHeaderNameToIndex[catWorksheet.getCell(1,1+i).value] = i;
			catHeaderIndexToName[i] = catWorksheet.getCell(1,1+i).value;
		}

		// Short names
		catHeaderNameToIndex["cat"] = catHeaderNameToIndex["Category"];
		catHeaderNameToIndex["desc"] = catHeaderNameToIndex["Description"];
		
		console.log("Done.");
	}
};


export {Spreadsheet};
 
 