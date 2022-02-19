export default function unecessaryValidation(param: any) {
    if (typeof param == 'undefined') {
        return '';
    }
    if (param == undefined || param.replace(/ /g, '') == '') {
        return ''
    }

    return param;
}