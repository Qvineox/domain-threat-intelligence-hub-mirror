import {makeAutoObservable} from "mobx";
import {IQueueState} from "@/entities/queue/dialerJob.ts";

const SOCKET_URL = (import.meta.env.VITE_WS_URL === undefined ? "" : import.meta.env.VITE_WS_URL) + '/api/' + import.meta.env.VITE_API_VERSION + '/ws'

const socket = new WebSocket(`${SOCKET_URL}/queue`);

export default class QueueStore {
    isConnected: boolean = false
    isLoading: boolean = true

    state: IQueueState = {
        queued: [],
        sent: [],
        latest: [],
    }

    setIsConnected(value: boolean) {
        this.isConnected = value
    }

    setIsLoading(value: boolean) {
        this.isLoading = value
    }

    setState(value: IQueueState) {
        this.state = value
    }

    onOpen() {
        this.setIsConnected(true)
        this.setIsLoading(true)

        console.log('ws: connection established');
    }

    onClose() {
        this.setIsConnected(false)
        this.setIsLoading(false)

        console.warn('ws: connection closed');
    }

    onMessage(event: MessageEvent) {
        this.setIsConnected(true)
        this.setIsLoading(false)

        this.setState(JSON.parse(event.data) as IQueueState)
    }

    onError(error: Event) {
        this.setIsConnected(false)
        this.setIsLoading(false)

        if (error instanceof ErrorEvent) {
            console.error(`ws: error ${error.message}`)
        }
    }

    constructor() {
        socket.onopen = () => this.onOpen()
        socket.onclose = () => this.onClose()

        socket.onmessage = (evt) => this.onMessage(evt)
        socket.onerror = (evt) => this.onError(evt)

        makeAutoObservable(this);
    }
}