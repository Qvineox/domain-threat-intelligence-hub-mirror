import {Ref} from "react";
import {Group} from "three";

export type WebNode = {
    id: number
    name: string
    color: string
    ref: Ref<Group>
}

