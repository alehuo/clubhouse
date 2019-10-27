import { action } from "typesafe-actions";
import { CLOSE_MENU, OPEN_MENU } from "../constants";

export const openMenu = () => action(OPEN_MENU);
export const closeMenu = () => action(CLOSE_MENU);
