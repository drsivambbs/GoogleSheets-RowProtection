# Google Sheets Row Protection Script  

## 📌 Description  
This **Google Apps Script** protects specific rows in a Google Sheet:  
✔ Users can edit only their assigned rows (B-Z) if their email is in Column A.  
✔ **Column A and the first row** (headers) are fully locked for all users.  
✔ **Rows without an email** are fully locked.  
✔ **Prevents users from adding or modifying sheets.**  

## 🚀 How to Use  
1. Open **Google Sheets → Extensions → Apps Script**  
2. Copy & paste the code from `protectRows.gs` and `enforceSheetRestrictions.gs`  
3. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID.  
4. Run `protectRows()` from the Apps Script editor.  

## 🔐 License  
This project is licensed under the **MIT License**.  
