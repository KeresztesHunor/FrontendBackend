export function tagTwo(tag, parameters = {}, content = [])
{
    let txt = "";
    content.forEach(item => {
        txt += item;
    });
    return `${tagOne(tag, parameters)}${txt}</${tag}>`;
}

export function tagLst(list, callback = (item, index) => item)
{
    let txt = "";
    list.forEach((item, index) => {
        txt += callback(item, index);
    });
    return txt;
}

export function tagDct(dict, callback)
{
    let txt = "";
    Object.keys(dict).forEach(key => {
        txt += callback(key, dict[key]);
    });
    return txt;
}

export function tagOne(tag, parameters = {})
{
    return `<${tag}${tagDct(parameters, (key, value) => ` ${key}="${value}"`)}>`;
}