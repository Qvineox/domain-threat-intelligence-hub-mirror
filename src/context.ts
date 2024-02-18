import Store from "@/store/store.ts";
import {createContext} from "react";

const store = new Store()

interface State {
    store: Store
}

export const Context = createContext<State>({
    store: store
})