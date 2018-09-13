function myFunction(e) {
  ScriptApp.newTrigger('handleEdit')
     .forSpreadsheet(SpreadsheetApp.getActive())
     .onEdit()
     .create();
}

function handleEdit(e){
  Logger.clear()
  var range = e.range;
  // Проверяем изменили ли мы первую колонку
  Logger.log(range.getColumn())
  if(range.getColumn() === 2.0) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var s = ss.getSheets()[0];//ss.getActiveRange().getSheet()
    var range2 =  s.getRange(range.getRowIndex(),3); 
    var data = getData(range.getValue(),range2.getValue()) // Получаем id закупки
    //var ss = SpreadsheetApp.getActiveSpreadsheet(); // Выбираем активный спредшит
    var sheet = ss.getSheets()[0]; // открываем первую страницу
    Logger.log('Полученные данные: \n' + JSON.stringify(data))
    for(var i = 2; i <= data.length + 2; i++) {
      var columnIndex = getColumnNrByName(sheet, data[i-2]['col'])
      if (!columnIndex) continue
      Logger.log('Запись в ячейки:')
      Logger.log('Колонка: ' + columnIndex + '| Строка: ' + range.getRowIndex() + '| Название: ' + data[i-2]['col'])
      Logger.log('Данные:' + data[i-2]['value'])
      Logger.log('\n')
      if(data[i-2] && data[i-2]['value']) {
        var rangeInput = sheet.getRange(range.getRowIndex(), columnIndex);
        var values = rangeInput.setValue(data[i-2]['value']);
      }
    }
  }
}
  
function getData(id, pl) {
  var response = UrlFetchApp.fetch('TENDER/parse?id=' + id+'&pl='+pl).getContentText()
  response = JSON.parse(response);
  return response
}

function getColumnNrByName(sheet, name) {
  var range = sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var values = range.getValues();
  
  for (var row in values) {
    for (var col in values[row]) {
      if (values[row][col] == name) {
        return parseInt(col) + 1.0;
      }
    }
  }
  return false
}
