import * as makeClient from "discord-rich-presence";
import {app} from "electron";
import Config from "../utils/Config";

export default class DiscordManager {
    private readonly client: any;

    constructor(appID: string) {
        if (!Config.readConfigValue("puristMode")) {
            this.client = makeClient(appID);
        }
    }

    public setIdleStatus(): void {
        if (!this.client) return;
        this.client.updatePresence({
            details: "Managing Mods",
            largeImageKey: "logo",
            smallImageKey: "idle",
            largeImageText: "Version " + app.getVersion(),
            smallImageText: "Not playing anything"
        });
    }

    public setPlayingStatus(folderName: string): void {
        if (!this.client) return;
        this.client.updatePresence({
            details: "In Game",
            state: folderName,
            startTimestamp: Date.now(),
            largeImageKey: "logo",
            smallImageKey: "playing",
            largeImageText: "Version " + app.getVersion(),
            smallImageText: "Playing DDLC"
        });
    }
}