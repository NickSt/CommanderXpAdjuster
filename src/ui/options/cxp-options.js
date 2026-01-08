import '/core/ui/options/screen-options.js';
import { C as CategoryType, O as Options, a as OptionType } from '/core/ui/options/editors/index.chunk.js';
import ModOptions from '/cxp-commander-xp-adjuster/ui/options/mod-options.js';

const xpOptionsMain = [
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

const xpOptionsIndividual = [
    { label: 'LOC_CXP_USE_GLOBAL', value: -1 },
    ...xpOptionsMain
];

const CXP_MOD_ID = "cxp-commander-xp-adjuster";

const CXPOptions = new class {
    load(id, defaultVal = 0) {
        const val = ModOptions.load(CXP_MOD_ID, id);
        return val !== null ? val : defaultVal;
    }
    save(id, val) {
        ModOptions.save(CXP_MOD_ID, id, val);
    }

    get globalXP() { return this.load("globalXP", 0); }
    set globalXP(v) { this.save("globalXP", v); }

    get armyXP() { return this.load("armyXP", -1); }
    set armyXP(v) { this.save("armyXP", v); }

    get fleetXP() { return this.load("fleetXP", -1); }
    set fleetXP(v) { this.save("fleetXP", v); }

    get airXP() { return this.load("airXP", -1); }
    set airXP(v) { this.save("airXP", v); }

    get aerodromeXP() { return this.load("aerodromeXP", -1); }
    set aerodromeXP(v) { this.save("aerodromeXP", v); }

    get otherXP() { return this.load("otherXP", -1); }
    set otherXP(v) { this.save("otherXP", v); }
};

Options.addInitCallback(() => {
    const addDropdown = (id, label, desc, options, getter, setter) => {
        Options.addOption({
            category: CategoryType.Mods,
            group: "cxp_settings",
            type: OptionType.Dropdown,
            id: id,
            initListener: (info) => {
                const currentVal = getter();
                info.selectedItemIndex = options.findIndex(o => o.value === currentVal);
                if (info.selectedItemIndex === -1) info.selectedItemIndex = 0;
            },
            updateListener: (_info, valueIndex) => {
                setter(options[valueIndex].value);
            },
            label: label,
            description: desc,
            dropdownItems: options,
        });
    };

    // Master Selector
    addDropdown("cxp-global-xp", "LOC_CXP_PARAM_GLOBAL", "LOC_CXP_PARAM_GLOBAL_DESC", xpOptionsMain, () => CXPOptions.globalXP, (v) => CXPOptions.globalXP = v);

    // Separator (No-op checkbox or similar if labels are broken, but let's just use spacing)

    addDropdown("cxp-army-xp", "LOC_CXP_PARAM_ARMY", "LOC_CXP_PARAM_ARMY_DESC", xpOptionsIndividual, () => CXPOptions.armyXP, (v) => CXPOptions.armyXP = v);
    addDropdown("cxp-fleet-xp", "LOC_CXP_PARAM_FLEET", "LOC_CXP_PARAM_FLEET_DESC", xpOptionsIndividual, () => CXPOptions.fleetXP, (v) => CXPOptions.fleetXP = v);
    addDropdown("cxp-air-xp", "LOC_CXP_PARAM_AIR_SQUADRON", "LOC_CXP_PARAM_AIR_SQUADRON_DESC", xpOptionsIndividual, () => CXPOptions.airXP, (v) => CXPOptions.airXP = v);
    addDropdown("cxp-aero-xp", "LOC_CXP_PARAM_AERODROME", "LOC_CXP_PARAM_AERODROME_DESC", xpOptionsIndividual, () => CXPOptions.aerodromeXP, (v) => CXPOptions.aerodromeXP = v);
    addDropdown("cxp-other-xp", "LOC_CXP_PARAM_OTHER", "LOC_CXP_PARAM_OTHER_DESC", xpOptionsIndividual, () => CXPOptions.otherXP, (v) => CXPOptions.otherXP = v);
});

export default CXPOptions;
