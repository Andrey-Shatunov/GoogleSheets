var API_KEY = 'abcdef'

function doGet (e) {
  var output = JSON.stringify({
    status: 'success',
    message: 'It worked'
  })
  var date = Utilities.formatDate(new Date(), 'GMT+5', 'dd/MM/yyyy')
  if (!isAuthorized(e)) {
    return buildErrorResponse('not authorized')
  }
  // return no_id(e) // The URL doesn't have an ?id=345 on the end!
  var ss = SpreadsheetApp.getActiveSpreadsheet() // Выбираем активный спредшит
  var sheet = ss.getSheets()[0] // открываем первую страницу
  var rows = sheet.getLastRow() // кол-во строк
  var cols = sheet.getLastColumn() // кол-во ячеек в строке
  sheet
    .getRange(rows + 1, 1, 1, 2)
    .setFontWeight('normal')
    .setBackground('#ffffff')
    .setValues([[date, e.parameter.sum]])

  return ContentService.createTextOutput(output).setMimeType(
    ContentService.MimeType.JSON
  )

  return ContentService.createTextOutput(output).setMimeType(
    ContentService.MimeType.JSON
  )
}

function isAuthorized (e) {
  return 'key' in e.parameters && e.parameters.key[0] === API_KEY
}

function buildErrorResponse (message) {
  var output = JSON.stringify({
    status: 'error',
    message: message
  })

  return ContentService.createTextOutput(output).setMimeType(
    ContentService.MimeType.JSON
  )
}
