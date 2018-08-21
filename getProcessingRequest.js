function doGet (e) {
  var output = JSON.stringify({
    status: 'success',
    message: 'It worked'
  })
  if (typeof e.parameter.id !== 'undefined') {
    // return no_id(e) // The URL doesn't have an ?id=345 on the end!
    var ss = SpreadsheetApp.getActiveSpreadsheet() // Выбираем активный спредшит
    var sheet = ss.getSheets()[0] // открываем первую страницу
    var rows = sheet.getLastRow() // кол-во строк
    var cols = sheet.getLastColumn() // кол-во ячеек в строке
    sheet
      .getRange(rows + 1, 1, 1, 3)
      .setFontWeight('bold')
      .setBackground('#ffffff')
      .setValues([[e.parameter.id, e.parameter.par1, e.parameter.par2]])

    return ContentService.createTextOutput(output).setMimeType(
      ContentService.MimeType.JSON
    )
  }

  return ContentService.createTextOutput(output).setMimeType(
    ContentService.MimeType.JSON
  )
}
