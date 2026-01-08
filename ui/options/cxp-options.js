import '/core/ui/options/screen-options.js';
import { C as CategoryType, O as Options, a as OptionType } from '/core/ui/options/editors/index.chunk.js';
import ModOptions from '/cxp-commander-xp-adjuster/ui/options/mod-options.js';

const xpOptions = [
    { label: 'LOC_CXP_XP_0', value: 0 },
    { label: 'LOC_CXP_XP_25', value: 25 },
    { label: 'LOC_CXP_XP_50', value: 50 },
    { label: 'LOC_CXP_XP_75', value: 75 },
    { label: 'LOC_CXP_XP_100', value: 100 },
    { label: 'LOC_CXP_XP_125', value: 125 },
    { label: 'LOC_CXP_XP_150', value: 150 },
    { label: 'LOC_CXP_XP_175', value: 175 },
    { label: 'LOC_CXP_XP_200', value: 200 },
    { label: 'LOC_CXP_XP_225', value: 225 },
    { label: 'LOC_CXP_XP_250', value: 250 },
    { label: 'LOC_CXP_XP_275', value: 275 },
    { label: 'LOC_CXP_XP_300', value: 300 },
    { label: 'LOC_CXP_XP_325', value: 325 },
    { label: 'LOC_CXP_XP_350', value: 350 },
    { label: 'LOC_CXP_XP_375', value: 375 },
    { label: 'LOC_CXP_XP_400', value: 400 },
];

const CXP_MOD_ID = "cxp-commander-xp-adjuster";

const CXPOptions = new class {
    load(id) {
        const val = ModOptions.load(CXP_MOD_ID, id);
        return val !== null ? val : 0;
    }
    save(id, val) {
        ModOptions.save(CXP_MOD_ID, id, val);
    }

    get globalXP() { return this.load("globalXP"); }
    set globalXP(v) {
        this.save("globalXP", v);
        // Do NOT sync individuals here to avoid hammering UI.setOption
        // Syncing will be handled by the game sync script if individual settings are unset,
        // OR we can add a dedicated listener if we want visual sync.
    }

    get armyXP() { return this.load("armyXP"); }
    set armyXP(v) { this.save("armyXP", v); }

    get fleetXP() { return this.load("fleetXP"); }
    set fleetXP(v) { this.save("fleetXP", v); }

    get airXP() { return this.load("airXP"); }
    set airXP(v) { this.save("airXP", v); }

    get aerodromeXP() { return this.load("aerodromeXP"); }
    set aerodromeXP(v) { this.save("aerodromeXP", v); }

    get otherXP() { return this.load("otherXP"); }
    set otherXP(v) { this.save("otherXP", v); }
};

Options.addInitCallback(() => {
    const addXPOption = (id, label, desc, getter, setter) => {
        Options.addOption({
            category: CategoryType.Mods,
            group: "cxp_settings",
            type: OptionType.Dropdown,
            id: id,
            initListener: (info) => {
                const currentVal = getter();
                info.selectedItemIndex = xpOptions.findIndex(o => o.value === currentVal);
                if (info.selectedItemIndex === -1) info.selectedItemIndex = 0;
            },
            updateListener: (_info, valueIndex) => {
                setter(xpOptions[valueIndex].value);
            },
            label: label,
            description: desc,
            dropdownItems: xpOptions,
        });
    };

    // Master Selector
    addXPOption("cxp-global-xp", "LOC_CXP_PARAM_GLOBAL", "LOC_CXP_PARAM_GLOBAL_DESC", () => CXPOptions.globalXP, (v) => CXPOptions.globalXP = v);

    // Note: Removed the Label separator as it might be causing the freeze

    addXPOption("cxp-army-xp", "LOC_CXP_PARAM_ARMY", "LOC_CXP_PARAM_ARMY_DESC", () => CXPOptions.armyXP, (v) => CXPOptions.armyXP = v);
    addXPOption("cxp-fleet-xp", "LOC_CXP_PARAM_FLEET", "LOC_CXP_PARAM_FLEET_DESC", () => CXPOptions.fleetXP, (v) => CXPOptions.fleetXP = v);
    addXPOption("cxp-air-xp", "LOC_CXP_PARAM_AIR_SQUADRON", "LOC_CXP_PARAM_AIR_SQUADRON_DESC", () => CXPOptions.airXP, (v) => CXPOptions.airXP = v);
    addXPOption("cxp-aero-xp", "LOC_CXP_PARAM_AERODROME", "LOC_CXP_PARAM_AERODROME_DESC", () => CXPOptions.aerodromeXP, (v) => CXPOptions.aerodromeXP = v);
    addXPOption("cxp-other-xp", "LOC_CXP_PARAM_OTHER", "LOC_CXP_PARAM_OTHER_DESC", () => CXPOptions.otherXP, (v) => CXPOptions.otherXP = v);
});

export default CXPOptions;
