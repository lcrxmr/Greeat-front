export default function (txt = '', action) {
    if (action.type == "saveTxt") {
      txt = action.txt;
      console.log("--------------Reducer txt:", txt);
      return txt;
    } else {
      return txt;
    }
  }