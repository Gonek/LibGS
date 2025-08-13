var getToday = () => {
  var date = new Date();
  date.setHours(0,0,0,0);
  return date;
}

var getYesterday = () => {
  return getRelativeDay(-1);
}

var getRelativeDay = (offset, format = undefined) => {
  var date = new Date();
  date.setHours(0,0,0,0);
  date.setDate(date.getDate() + offset);
  if(format){
    return date.toLocaleDateString(format);
  }
  return date;
}

var getFormatedDay = (position) => {
    return `${position < 0 ? '🗃️' : (position > 0 ? '📅' : '🚩')} ${getRelativeDay(position, 'en-GB')}`;
}

var resizeMatrix = (arr, width, height, val = null) => 
  Array.from({ length: height }, (_, i) => {
    return i < arr.length ? resizeArray(arr[i], width, val) : Array.from({ length: width }, () => val);
  });

var resizeArray = (arr, width, val = null) => 
  Array.from({ length: width }, (_, i) => { 
    return i < arr.length ? arr[i] : val 
  });

function uniq(a) {
  return Array.from(new Set(a));
}

function clear(a){
  return a.filter(n => n.some(Boolean));
}

function clearAll(a){
  return a.flat().filter(n => n);
}

function alert(message){
  SpreadsheetApp.getUi().alert(message);
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] === null && b[i] === null){
    } else if(Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (!arraysEqual(a[i], b[i])) return false;
    } else if(a[i] instanceof Map && b[i] instanceof Map) {
      if(!mapEqual(a[i], b[i])) return false;
    } else if(a[i] instanceof Date && b[i] instanceof Date) {
      if(a[i].getTime() !== b[i].getTime()) return false;
    } else if(a[i] instanceof MockClass){
      if (a[i].mockObj !== b[i]) return false;
    } else if (typeof a[i].isEqual === 'function' && typeof b[i].isEqual === 'function'){
      if(!a[i].isEqual(b[i])) return false;
    } else{
      if (a[i] !== b[i]) return false;
    }
  }
  return true;
}

function mapEqual(a, b){
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let [key, aVal] of a) {
      bVal = b.get(key);
      if (bVal === undefined && !b.has(key)) {
          return false;
      } else if (Array.isArray(aVal) && Array.isArray(bVal)) {
          if(!arraysEqual(aVal, bVal)) return false;
      } else {
        if(bVal !== aVal) return false; 
      }
  }
  return true;
}

function getSheetId(){
  alert(SpreadsheetApp.getActiveSheet().getSheetId());
}