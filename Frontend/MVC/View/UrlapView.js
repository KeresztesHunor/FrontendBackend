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
        const INPUT_MEZOK = [];
        FORM_ELEM.children(".form-group").children("input").toArray().forEach(inputMezoElem => {
            const INPUT_MEZO_ELEM = $(inputMezoElem);
            const INPUT_MEZO_LEIRO_PATTERN = formLeiro[INPUT_MEZO_ELEM.attr("name")].pattern;
            switch (INPUT_MEZO_ELEM.attr("type"))
            {
                case "text":
                    INPUT_MEZO_ELEM.attr("pattern", INPUT_MEZO_LEIRO_PATTERN);
                    break;
                case "number":
                    INPUT_MEZO_ELEM.attr("min", INPUT_MEZO_LEIRO_PATTERN.min);
                    INPUT_MEZO_ELEM.attr("max", INPUT_MEZO_LEIRO_PATTERN.max);
                    break;
            }
            INPUT_MEZO_ELEM.prop("required", true);
            INPUT_MEZOK.push({
                inputElem: INPUT_MEZO_ELEM,
                name: INPUT_MEZO_ELEM.attr("name"),
                type: INPUT_MEZO_ELEM.attr("type")
            });
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