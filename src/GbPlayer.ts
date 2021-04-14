import axios, {AxiosResponse} from "axios";
import {Stream} from "./types/stream";

/**
 * Golang[WebrtcToWeb Server] to Botem Player ...
 *
 */
export class GbPlayer {
    /**
     * Static method, variable area
     */
    static DEFAULT_WEBRTC_SERVER_URI: string = 'http://rino:rino@localhost:8083'
    static DEFAULT_USER_NAME = 'rino'
    static DEFAULT_PASSWORD = 'rino'

    private stream: Stream | null = null
    private webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI
    private userName: string = GbPlayer.DEFAULT_USER_NAME
    private password: string = GbPlayer.DEFAULT_PASSWORD

    /**
     * constructor - 생성자
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    constructor(webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        this.webRtcServerUri = webRtcServerUri
        this.userName = userName
        this.password = password
    }

    /**
     * getStreams - Stream 배열의 이름, 주소, 옵션값 등을 얻는다.
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static getStreams(webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.GET_STREAMS_URL(), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * getStream - Stream 아이디를 통해 이름, 주소, 옵션값 등을 얻는다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static getStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.GET_STREAM_URL(streamId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * addStream - Stream 을 WebRtc Server 에 등록한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static addStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.post(webRtcServerUri + GbPlayer.ADD_STREAM_URL(streamId), {
            name: streamId,
        }, {
            headers: {
                'Content-type': 'application/json'
            },
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * editStream - Stream 정보를 WebRtc Server 에 보내 수정한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static editStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.post(webRtcServerUri + GbPlayer.EDIT_STREAM_URL(streamId), {
            name: streamId,
        }, {
            headers: {
                'Content-type': 'application/json'
            },
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * reloadStream - Stream 영상을 갱신한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static reloadStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.RELOAD_STREAM_URL(streamId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * deleteStream - Stream 영상을 삭제한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static deleteStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.DELETE_STREAM_URL(streamId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

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
    static addChannel(streamId: string, channelId: string, rtspUri: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD, isOnDemand: boolean = true,) {
        return axios.post(webRtcServerUri + GbPlayer.ADD_CHANNEL_URL(streamId, channelId), {
            name: streamId,
            url: rtspUri,
            on_demand: isOnDemand,
            debug: false,
            status: 0,
        }, {
            headers: {
                'Content-type': 'application/json'
            },
            auth: {
                username: userName,
                password: password,
            }
        })
    }

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
    static editChannel(streamId: string, channelId: string, rtspUri: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD, isOnDemand: boolean = true,) {
        return axios.post(webRtcServerUri + GbPlayer.EDIT_CHANNEL_URL(streamId, channelId), {
            name: streamId,
            url: rtspUri,
            on_demand: isOnDemand,
            debug: false,
            status: 0,
        }, {
            headers: {
                'Content-type': 'application/json'
            },
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * reloadChannel - Stream 의 Channel 을 갱신한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static reloadChannel(streamId: string, channelId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.RELOAD_CHANNEL_URL(streamId, channelId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * deleteChannel - Stream 의 Channel 을 삭제한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static deleteChannel(streamId: string, channelId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.DELETE_CHANNEL_URL(streamId, channelId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * playHls - HLS 재생
     * @param videoElementId - ID of HTMLVideoElement
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     */
    static playHls(videoElementId: string, streamId: string, channelId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI) {
        const videoElement: HTMLVideoElement = document.getElementById(videoElementId) as HTMLVideoElement
        videoElement.src = webRtcServerUri + GbPlayer.HLS_URL(streamId, channelId)
        videoElement.play().then()
    }

    /**
     * playHls - Webrtc 재생
     * @param videoElementId - ID of HTMLVideoElement
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static playWebrtc(videoElementId: string, streamId: string, channelId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        const videoElement: HTMLVideoElement = document.getElementById(videoElementId) as HTMLVideoElement
        const webrtc: RTCPeerConnection = new RTCPeerConnection()
        webrtc.onnegotiationneeded = async () => {
            const offer = await webrtc.createOffer();
            await webrtc.setLocalDescription(offer);

            axios.post(webRtcServerUri + GbPlayer.WEBRTC_URL(streamId, channelId), btoa(webrtc.localDescription!.sdp), {
                headers: {'Content-type': 'application/json'},
                auth: {
                    username: userName,
                    password: password,
                }
            }).then((response: AxiosResponse) => {
                try {
                    webrtc.setRemoteDescription(new RTCSessionDescription({
                        type: 'answer',
                        sdp: atob(response.data)
                    }))
                } catch (e) {
                    console.warn(e);
                }
            })
        }

        webrtc.ontrack = function (event) {
            console.log(event.streams.length + ' track is delivered');
            videoElement.srcObject = event.streams[0];
            videoElement.play().then();
        }

        webrtc.addTransceiver('video', {
            direction: 'sendrecv'
        });

        let webrtcSendChannelInterval: NodeJS.Timeout
        const webrtcSendChannel = webrtc.createDataChannel('GtbPLayerChannel');
        webrtcSendChannel.onclose = () => {
            console.log('sendChannel has closed')
            clearInterval(webrtcSendChannelInterval)
        }
        webrtcSendChannel.onopen = () => {
            console.log('sendChannel has opened');
            webrtcSendChannel.send('ping');
            webrtcSendChannelInterval = setInterval(() => {
                webrtcSendChannel.send('ping');
            }, 1000)
        }
        webrtcSendChannel.onmessage = e => console.log(e.data);
        videoElement.addEventListener('loadeddata', () => {
            videoElement.play().then()
            // makePic();
        })
        videoElement.addEventListener('error', () => {
            console.log("VIDEO_ERROR")
        })
    }

    //static uris for RtspToWeb Apis ...
    private static GET_STREAMS_URL = () => '/streams'
    private static GET_STREAM_URL = (streamId: string) => `/stream/${streamId}/info`
    private static ADD_STREAM_URL = (streamId: string) => `/stream/${streamId}/add`
    private static EDIT_STREAM_URL = (streamId: string) => `/stream/${streamId}/edit`
    private static RELOAD_STREAM_URL = (streamId: string) => `/stream/${streamId}/reload`
    private static DELETE_STREAM_URL = (streamId: string) => `/stream/${streamId}/delete`
    private static ADD_CHANNEL_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/add`
    private static EDIT_CHANNEL_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/edit`
    private static RELOAD_CHANNEL_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/reload`
    private static DELETE_CHANNEL_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/delete`
    private static HLS_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/hls/live/index.m3u8`
    private static WEBRTC_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/webrtc?uuid=${streamId}&channel=${channelId}`

    getStreams() {
        GbPlayer.getStreams(this.webRtcServerUri).then(response => {
            console.log("GET STREAM : ", response)
        })
    }
}
