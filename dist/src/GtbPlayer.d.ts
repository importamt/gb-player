import { AxiosResponse } from "axios";
/**
 * Golang[WebrtcToWeb Server] to Botem Player ...
 *
 */
export declare class GtbPlayer {
    /**
     * Static method, variable area
     */
    static DEFAULT_WEBRTC_SERVER_URI: string;
    static DEFAULT_USER_NAME: string;
    static DEFAULT_PASSWORD: string;
    private stream;
    private webRtcServerUri;
    private userName;
    private password;
    /**
     * constructor - 생성자
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    constructor(webRtcServerUri?: string, userName?: string, password?: string);
    /**
     * getStreams - Stream 배열의 이름, 주소, 옵션값 등을 얻는다.
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static getStreams(webRtcServerUri?: string, userName?: string, password?: string): Promise<AxiosResponse<any>>;
    /**
     * getStream - Stream 아이디를 통해 이름, 주소, 옵션값 등을 얻는다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static getStream(streamId: string, webRtcServerUri?: string, userName?: string, password?: string): Promise<AxiosResponse<any>>;
    /**
     * addStream - Stream 을 WebRtc Server 에 등록한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static addStream(streamId: string, webRtcServerUri?: string, userName?: string, password?: string): Promise<AxiosResponse<any>>;
    /**
     * editStream - Stream 정보를 WebRtc Server 에 보내 수정한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static editStream(streamId: string, webRtcServerUri?: string, userName?: string, password?: string): Promise<AxiosResponse<any>>;
    /**
     * reloadStream - Stream 영상을 갱신한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static reloadStream(streamId: string, webRtcServerUri?: string, userName?: string, password?: string): Promise<AxiosResponse<any>>;
    /**
     * deleteStream - Stream 영상을 삭제한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static deleteStream(streamId: string, webRtcServerUri?: string, userName?: string, password?: string): Promise<AxiosResponse<any>>;
    /**
     * addChanel - Stream 에 Channel 을 추가한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param rtspUri - RTSP URI
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param isOnDemand - Stream Server 에서 영상을 항상 준비할 지 요청마다 줄 지 여부
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static addChannel(streamId: string, channelId: string, rtspUri: string, webRtcServerUri?: string, userName?: string, password?: string, isOnDemand?: boolean): Promise<AxiosResponse<any>>;
    /**
     * editChanel - Stream 의 Channel 정보를 수정한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param rtspUri - RTSP URI
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param isOnDemand - Stream Server 에서 영상을 항상 준비할 지 요청마다 줄 지 여부
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static editChannel(streamId: string, channelId: string, rtspUri: string, webRtcServerUri?: string, userName?: string, password?: string, isOnDemand?: boolean): Promise<AxiosResponse<any>>;
    /**
     * reloadChannel - Stream 의 Channel 을 갱신한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static reloadChannel(streamId: string, channelId: string, webRtcServerUri?: string, userName?: string, password?: string): Promise<AxiosResponse<any>>;
    /**
     * deleteChannel - Stream 의 Channel 을 삭제한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static deleteChannel(streamId: string, channelId: string, webRtcServerUri?: string, userName?: string, password?: string): Promise<AxiosResponse<any>>;
    /**
     * playHls - HLS 재생
     * @param videoElementId - ID of HTMLVideoElement
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     */
    static playHls(videoElementId: string, streamId: string, channelId: string, webRtcServerUri?: string): void;
    /**
     * playHls - Webrtc 재생
     * @param videoElementId - ID of HTMLVideoElement
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static playWebrtc(videoElementId: string, streamId: string, channelId: string, webRtcServerUri?: string, userName?: string, password?: string): void;
    private static GET_STREAMS_URL;
    private static GET_STREAM_URL;
    private static ADD_STREAM_URL;
    private static EDIT_STREAM_URL;
    private static RELOAD_STREAM_URL;
    private static DELETE_STREAM_URL;
    private static ADD_CHANNEL_URL;
    private static EDIT_CHANNEL_URL;
    private static RELOAD_CHANNEL_URL;
    private static DELETE_CHANNEL_URL;
    private static HLS_URL;
    private static WEBRTC_URL;
    getStreams(): void;
}
