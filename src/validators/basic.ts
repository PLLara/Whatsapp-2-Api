export default function basicValidation(...params: string[]) {
  for (let index in params) {
    let param = params[index];
    if (typeof param == "undefined") {
      return false;
    }
    if (param == undefined || param.replace(/ /g, "") == "") {
      return false;
    }
  }

  return true;
}
