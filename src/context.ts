import AuthStore from "@/store/authStore.ts";
import {createContext} from "react";
import QueueStore from "@/store/queueStore.ts";

const authStore = new AuthStore()
const queueStore = new QueueStore()

interface State {
    auth: AuthStore
    queue: QueueStore
}

export const Context = createContext<State>({
    auth: authStore,
    queue: queueStore,
})