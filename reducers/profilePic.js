export default function (pic = [], action) {
    if (action.type == "savePic") {
      pic = [...pic, action.pic];
      console.log("--------------Reducer pic:", pic);
      return pic;
    } else {
      return pic;
    }
  }