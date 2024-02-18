import {useContext} from "react";
import {Context} from "@/main.tsx";

export default function useRequirePermission(id: number): boolean {
    const {store} = useContext(Context)

    return store.hasPermissionOrAdmin(id)
}