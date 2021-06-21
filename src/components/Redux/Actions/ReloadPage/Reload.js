import { RELOAD_PAGE } from "../actionTypes";

export const reloadPage = () => ({ type: RELOAD_PAGE });

export const setReload = reload => {
    return {
        type: RELOAD_PAGE,
        payload: {
            reload: reload,
        }
    }
}