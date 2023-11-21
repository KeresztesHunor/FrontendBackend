import { tagTwo } from "../../htmlUtils.js";

class LoadingBar
{
    constructor(szuloElem)
    {
        szuloElem.append(
            tagTwo("div", { class: "progress w-100" }, [
                tagTwo("div", { class: "progress-bar progress-bar-striped  progress-bar-animated bg-primary w-100", role: "progressbar" })
            ])
        );
    }
}

export default LoadingBar;