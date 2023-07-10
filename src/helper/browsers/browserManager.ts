import { LaunchOptions, chromium, firefox, webkit } from "playwright-core";

//This will list the available browser for testing
//You can also change whether you want it to be executed in a headless mode or not
const options: LaunchOptions = {
    headless: true
}
export const invokeBrowser = () => {
    const browserType = process.env.npm_config_BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }

}