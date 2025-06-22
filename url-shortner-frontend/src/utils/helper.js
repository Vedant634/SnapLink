import { subDomainList } from "./constant"

export const getApps = () => {
    const subdomain = getSubDomain(window.location.hostname)

    const mainApp = subDomainList.find((app)=> app.main)
   if (subdomain === "") return mainApp.app;

    const apps = subDomainList.find((app) => subdomain === app.subdomain);

    return apps ? apps.app : mainApp.app;
}

export const getSubDomain = (location) => {
    const loactionParts = location.split(".")
    const isLocalhost = loactionParts.slice(-1)[0] === "localhost"
    const sliceTill = isLocalhost ? -1 : -2
    return loactionParts.slice(0,sliceTill).join("")
}