function enforceSheetRestrictions(unprotectedRanges) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var allowedSheets = ['Sheet1'];
  var sheets = ss.getSheets();

  // Delete any unauthorized sheets
  sheets.forEach(sheet => {
    if (!allowedSheets.includes(sheet.getName())) {
      ss.deleteSheet(sheet);
    }
  });

  // Protect sheets from structural changes
  sheets.forEach(sheet => {
    var protection = sheet.protect();
    protection.setWarningOnly(false);
    protection.removeEditors(protection.getEditors());

    if (unprotectedRanges.length > 0) {
      protection.setUnprotectedRanges(unprotectedRanges);
    }

    protection.setDescription('Sheet is locked to prevent structure changes.');
  });
}
