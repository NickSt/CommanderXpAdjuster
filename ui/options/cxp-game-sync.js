import ModOptions from '/cxp-commander-xp-adjuster/ui/options/mod-options.js';

const CXP_MOD_ID = "cxp-commander-xp-adjuster";

/**
 * Syncs Global Options settings to the gameplay database GlobalParameters.
 * This runs when a game session is initialized (scope="game").
 */
function syncCXPSettings() {
    console.warn("CXP [GameSync]: Initializing settings bridge...");

    const globalValue = ModOptions.load(CXP_MOD_ID, "globalXP") || 0;

    const mapping = [
        { opt: "armyXP", param: "CXP_RATE_ARMY" },
        { opt: "fleetXP", param: "CXP_RATE_FLEET" },
        { opt: "airXP", param: "CXP_RATE_AIR_SQUADRON" },
        { opt: "aerodromeXP", param: "CXP_RATE_AERODROME" },
        { opt: "otherXP", param: "CXP_RATE_OTHER" },
    ];

    mapping.forEach(item => {
        let value = ModOptions.load(CXP_MOD_ID, item.opt);

        // Inherit from Global if the individual setting is 0/unset,
        // but only if Global itself is non-zero.
        if (value === null || value === 0) {
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
