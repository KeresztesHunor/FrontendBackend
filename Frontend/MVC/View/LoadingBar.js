import { tagTwo } from "../../htmlUtils.js";

class LoadingBar
{
    constructor(szuloElem)
    {
        szuloElem.append(
            tagTwo("div", { class: "loading-bar" }, [
                tagTwo("div"),
                tagTwo("div", { class: "bg-primary" }),
                tagTwo("div")
            ])
        );
    }
}

export default LoadingBar;