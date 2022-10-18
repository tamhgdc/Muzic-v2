import axiosClient from "./axios-client";
import { MusicType, StateResponse, ParamsUrl } from "type";

const newMusicAPI = {
    getNewMusic(params: ParamsUrl): Promise<StateResponse<MusicType>> {
        const url = "music/new-music";
        return axiosClient.get(url, { params });
    },
    getTopViewsMusic(params: ParamsUrl): Promise<StateResponse<MusicType>> {
        const url = "music/top-views";
        return axiosClient.get(url, { params });
    },
};
export default newMusicAPI;
