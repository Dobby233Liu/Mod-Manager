import Install from "./types/Install";
import {join as joinPath} from "path";
import Config from "./config";
import {readdirSync, readFileSync} from "fs";

export default class InstallList {

    /**
     * Reads the install directory and returns information on each install
     * @returns Install[] a list of installs
     */
    static getInstallList(): Install[] {
        // find and read the folders
        const installFolder: string = joinPath(Config.readConfigValue("installFolder"), "installs");

        console.log("Reading installs from " + installFolder);

        const installs = readdirSync(installFolder);
        let returned: Install[] = [];

        for (let folder of installs) {
            const dataFilePath: string = joinPath(installFolder, folder, "install.json");

            try {
                const fileContents: string = readFileSync(dataFilePath, "utf8");
                const data: any = JSON.parse(fileContents);
                if (data.name) {
                    returned.push(new Install(data.name, folder, data.globalSave));
                }
            } catch (e) {
                console.warn("Failed to read install data from " + dataFilePath, e);
                // do nothing, the folder should be ignored
            }
        }

        return returned;
    }
}