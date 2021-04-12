import {Stream} from "./stream";

export interface Response {
    status: number
    payload: string | Stream
}