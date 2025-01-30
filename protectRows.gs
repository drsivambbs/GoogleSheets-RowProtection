function protectRows() {
  var spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var emailColumn = 1; // Column A

  // Remove existing protections
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  protections.forEach(protection => protection.remove());

  // Lock Column A (emails) for all users
  var columnAProtection = sheet.getRange(2, emailColumn, lastRow - 1, 1).protect();
  columnAProtection.setWarningOnly(false);
  columnAProtection.removeEditors(columnAProtection.getEditors());
  columnAProtection.setDescription('Column A is locked for all users.');

  // Lock the first row (header) for all users
  var headerProtection = sheet.getRange(1, 1, 1, sheet.getLastColumn()).protect();
  headerProtection.setWarningOnly(false);
  headerProtection.removeEditors(headerProtection.getEditors());
  headerProtection.setDescription('Header row is locked for all users.');

  // Protect rows B to Z based on Column A
  var unprotectedRanges = []; // Store allowed edit ranges

  for (var row = 2; row <= lastRow; row++) {
    var email = sheet.getRange(row, emailColumn).getValue().toString().trim();
    var rangeToProtect = sheet.getRange(row, 2, 1, 25); // Protect B to Z

    var protection = rangeToProtect.protect();
    protection.setWarningOnly(false);
    protection.removeEditors(protection.getEditors()); // Clear previous editors

    if (email) {
      protection.addEditor(email);
      protection.setDescription('Protected Row ' + row + ' (Email: ' + email + ')');
      unprotectedRanges.push(rangeToProtect);
    } else {
      protection.setDescription('Protected Row ' + row + ' (No Email) - Fully Locked');
    }
  }

  enforceSheetRestrictions(unprotectedRanges);
}
