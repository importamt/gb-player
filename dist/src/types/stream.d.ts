import { Channel } from "./channel";
export interface Stream {
    name: string;
    channels: {
        [channelIndex: string]: Channel;
    };
}
