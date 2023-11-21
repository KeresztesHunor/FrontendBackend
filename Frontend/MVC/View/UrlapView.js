import { tagDct, tagOne, tagTwo } from "../../htmlUtils.js";

class UrlapView
{
    constructor(szuloElem, formLeiro)
    {
        szuloElem.append(
            tagTwo("form", { class: "border rounded p-2 mb-2" }, [
                tagDct(formLeiro, (kulcs, ertek) => tagTwo("div", { class: "form-group" }, [
                    tagTwo("label", { for: kulcs }, [ertek.label]),
                    tagOne("input", { type: ertek.type, id: kulcs, name: kulcs, placeholder: ertek.placeholder, value: "", title: ertek.title, class: "form-control" })
                ])),
                tagOne("input", { type: "submit", value: "OK", class: "btn btn-primary mt-2" })
            ])
        );
        const FORM_ELEM = szuloElem.children("form");
        FORM_ELEM.children(".form-group").children("input").toArray().forEach(mezo => {
            const MEZO_ELEM = $(mezo);
            const INPUT_MEZO_LEIRO_PATTERN = formLeiro[MEZO_ELEM.attr("name")].pattern;
            switch (MEZO_ELEM.attr("type"))
            {
                case "text":
                    MEZO_ELEM.attr("pattern", INPUT_MEZO_LEIRO_PATTERN);
                    break;
                case "number":
                    MEZO_ELEM.attr("min", INPUT_MEZO_LEIRO_PATTERN.min);
                    MEZO_ELEM.attr("max", INPUT_MEZO_LEIRO_PATTERN.max);
                    break;
            }
            MEZO_ELEM.prop("required", true);
        });
        const INPUT_MEZOK = [];
        FORM_ELEM.find("input").toArray().forEach(inputElem => {
            const INPUT_ELEM = $(inputElem);
            if (INPUT_ELEM.attr("type") !== "submit")
            {
                INPUT_MEZOK.push({
                    inputElem: INPUT_ELEM,
                    name: INPUT_ELEM.attr("name"),
                    type: INPUT_ELEM.attr("type")
                });
            }
        });
        FORM_ELEM.on("submit", event => {
            event.preventDefault();
            if (FORM_ELEM[0].checkValidity()) // ez valamiért csak [0]-val működik
            {
                const DATA = {};
                INPUT_MEZOK.forEach(inputMezo => {
                    DATA[inputMezo.name] = inputMezo.inputElem.val();
                });
                window.dispatchEvent(new CustomEvent("validFormSubmitEvent", {
                    detail: {
                        data: DATA
                    }
                }));
            }
        });
    }
}

export default UrlapView;