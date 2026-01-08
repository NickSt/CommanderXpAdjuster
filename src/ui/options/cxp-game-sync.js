import ModOptions from '/cxp-commander-xp-adjuster/ui/options/mod-options.js';

const CXP_MOD_ID = "cxp-commander-xp-adjuster";

/**
 * Syncs Global Options settings to the gameplay database GlobalParameters.
 * This runs when a game session is initialized (scope="game").
 */
function syncCXPSettings() {
    console.warn("CXP [GameSync]: Initializing settings bridge...");

    // Default to 0 (100%) if not set
    const globalVal = ModOptions.load(CXP_MOD_ID, "globalXP");
    const globalValue = (globalVal !== null) ? globalVal : 0;

    const mapping = [
        { opt: "armyXP", param: "CXP_RATE_ARMY" },
        { opt: "fleetXP", param: "CXP_RATE_FLEET" },
        { opt: "airXP", param: "CXP_RATE_AIR_SQUADRON" },
        { opt: "aerodromeXP", param: "CXP_RATE_AERODROME" },
        { opt: "otherXP", param: "CXP_RATE_OTHER" },
    ];

    mapping.forEach(item => {
        let value = ModOptions.load(CXP_MOD_ID, item.opt);

        // If value is -1 (Follow Global) or never set (null), use the Global value.
        if (value === null || value === -1) {
            value = globalValue;
        }

        console.warn(`CXP [GameSync]: Applying ${item.param} = ${value}`);

        try {
            if (typeof GameConfiguration !== 'undefined' && GameConfiguration.setValue) {
                GameConfiguration.setValue(item.param, value);
            }
            else if (typeof Configuration !== 'undefined' && Configuration.setValue) {
                Configuration.setValue(item.param, value);
            }
        } catch (e) {
            console.error(`CXP [GameSync]: Failed to inject ${item.param}: ${e}`);
        }
    });

    console.warn("CXP [GameSync]: Bridge complete.");
}

syncCXPSettings();
