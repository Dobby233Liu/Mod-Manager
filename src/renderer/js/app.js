if (!localStorage.getItem("last_tab")) {
    localStorage.setItem("last_tab", "home");
}

Vue.config.devtools = false;
Vue.config.productionTip = false;

const app = new Vue({
    "el": "#app",
    "data": {
        "tab": localStorage.getItem("last_tab"),
        "tabs": {
            "home": {"name": "Home", "icon": "home", "component": "ddmm-home-tab"},
            "mods": {"name": "Mods", "icon": "list", "component": "ddmm-mods-tab"},
            "sayonika": {"name": "Sayonika", "icon": "download"},
            "settings": {"name": "Settings", "icon": "cog"},
            "about": {"name": "About", "icon": "info", "component": "ddmm-about-tab"}
        },
        "recommended_mods": {},
        "banner": {},
        "ddmm_version": ddmm.version,
        "mod_list": [],
        "install_list": []
    },
    "methods": {
        "switchTab": function (tab) {
            localStorage.setItem("last_tab", tab);
            this.tab = tab;
        }
    }
});

firebase.database().ref("/global/recommended_mods").once("value").then(response => {
    app.recommended_mods = response.val();
});

firebase.database().ref("/global/banner").once("value").then(response => {
    app.banner = response.val();
});

ddmm.on("mod list", mods => {
    console.log("Received " + mods.length  + " mods.");
    app.mod_list = mods;
});

ddmm.on("install list", installs => {
    console.log("Received " + installs.length + " installs.");
    app.install_list = installs;
});

ddmm.refreshModList();
ddmm.refreshInstallList();