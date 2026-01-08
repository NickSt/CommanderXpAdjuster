-- Commander XP Adjuster - Gameplay.sql
-- Optimized for Dynamic Bridge (Injected via JS)

-- 1. Create GlobalParameters to hold the dynamic scaling values (0 = default/no change)
INSERT OR IGNORE INTO GlobalParameters (Name, Value) VALUES ('CXP_RATE_ARMY', 0);
INSERT OR IGNORE INTO GlobalParameters (Name, Value) VALUES ('CXP_RATE_FLEET', 0);
INSERT OR IGNORE INTO GlobalParameters (Name, Value) VALUES ('CXP_RATE_AIR_SQUADRON', 0);
INSERT OR IGNORE INTO GlobalParameters (Name, Value) VALUES ('CXP_RATE_AERODROME', 0);
INSERT OR IGNORE INTO GlobalParameters (Name, Value) VALUES ('CXP_RATE_OTHER', 0);

-- 2. Define Requirement Sets for each Commander Type
-- These check if a unit has the appropriate TAG.
INSERT OR IGNORE INTO RequirementSets (RequirementSetId, RequirementSetType)
VALUES 
    ('CXP_SET_ARMY',      'REQUIREMENTSET_TEST_ALL'),
    ('CXP_SET_FLEET',     'REQUIREMENTSET_TEST_ALL'),
    ('CXP_SET_AIR',       'REQUIREMENTSET_TEST_ALL'),
    ('CXP_SET_AERO',      'REQUIREMENTSET_TEST_ALL'),
    ('CXP_SET_OTHER',     'REQUIREMENTSET_TEST_ALL');

INSERT OR IGNORE INTO RequirementSetRequirements (RequirementSetId, RequirementId)
VALUES 
    ('CXP_SET_ARMY',      'CXP_REQ_ARMY'),
    ('CXP_SET_FLEET',     'CXP_REQ_FLEET'),
    ('CXP_SET_AIR',       'CXP_REQ_AIR'),
    ('CXP_SET_AERO',      'CXP_REQ_AERO'),
    ('CXP_SET_OTHER',     'CXP_REQ_OTHER');

INSERT OR IGNORE INTO Requirements (RequirementId, RequirementType)
VALUES 
    ('CXP_REQ_ARMY',      'REQUIREMENT_UNIT_TAG_MATCH'),
    ('CXP_REQ_FLEET',     'REQUIREMENT_UNIT_TAG_MATCH'),
    ('CXP_REQ_AIR',       'REQUIREMENT_UNIT_TAG_MATCH'),
    ('CXP_REQ_AERO',      'REQUIREMENT_UNIT_TAG_MATCH'),
    ('CXP_REQ_OTHER',     'REQUIREMENT_UNIT_TAG_MATCH');

-- Tags used: CLASS_COMMANDER, CLASS_COMMANDER_ARMY, etc.
INSERT OR IGNORE INTO RequirementArguments (RequirementId, Name, Value)
VALUES 
    ('CXP_REQ_ARMY',      'Tag', 'CLASS_COMMANDER_ARMY'),
    ('CXP_REQ_FLEET',     'Tag', 'CLASS_COMMANDER_FLEET'),
    ('CXP_REQ_AIR',       'Tag', 'CLASS_COMMANDER_AIR_SQUADRON'),
    ('CXP_REQ_AERO',      'Tag', 'CLASS_COMMANDER_AERODROME'),
    ('CXP_REQ_OTHER',     'Tag', 'CLASS_COMMANDER');

-- 3. Define the Dynamic Modifiers
-- Each modifier pulls its "Amount" from the GlobalParameters table.
INSERT OR IGNORE INTO Modifiers (ModifierId, ModifierType, SubjectRequirementSetId)
VALUES 
    ('CXP_MOD_ARMY',  'MODIFIER_PLAYER_UNITS_ADJUST_EXPERIENCE_MODIFIER', 'CXP_SET_ARMY'),
    ('CXP_MOD_FLEET', 'MODIFIER_PLAYER_UNITS_ADJUST_EXPERIENCE_MODIFIER', 'CXP_SET_FLEET'),
    ('CXP_MOD_AIR',   'MODIFIER_PLAYER_UNITS_ADJUST_EXPERIENCE_MODIFIER', 'CXP_SET_AIR'),
    ('CXP_MOD_AERO',  'MODIFIER_PLAYER_UNITS_ADJUST_EXPERIENCE_MODIFIER', 'CXP_SET_AERO'),
    ('CXP_MOD_OTHER', 'MODIFIER_PLAYER_UNITS_ADJUST_EXPERIENCE_MODIFIER', 'CXP_SET_OTHER');

-- IMPORTANT: Subqueries in ModifierArguments are only evaluated at Game Start or when Parameterized.
-- By using SELECT from GlobalParameters, we link them.
INSERT OR IGNORE INTO ModifierArguments (ModifierId, Name, Value)
VALUES 
    ('CXP_MOD_ARMY',  'Amount', (SELECT Value FROM GlobalParameters WHERE Name = 'CXP_RATE_ARMY')),
    ('CXP_MOD_FLEET', 'Amount', (SELECT Value FROM GlobalParameters WHERE Name = 'CXP_RATE_FLEET')),
    ('CXP_MOD_AIR',   'Amount', (SELECT Value FROM GlobalParameters WHERE Name = 'CXP_RATE_AIR_SQUADRON')),
    ('CXP_MOD_AERO',  'Amount', (SELECT Value FROM GlobalParameters WHERE Name = 'CXP_RATE_AERODROME')),
    ('CXP_MOD_OTHER', 'Amount', (SELECT Value FROM GlobalParameters WHERE Name = 'CXP_RATE_OTHER'));

-- 4. Apply to all Leaders
INSERT OR IGNORE INTO TraitModifiers (TraitType, ModifierId)
SELECT TraitType, 'CXP_MOD_ARMY'  FROM Traits WHERE TraitType LIKE 'TRAIT_LEADER_%';
INSERT OR IGNORE INTO TraitModifiers (TraitType, ModifierId)
SELECT TraitType, 'CXP_MOD_FLEET' FROM Traits WHERE TraitType LIKE 'TRAIT_LEADER_%';
INSERT OR IGNORE INTO TraitModifiers (TraitType, ModifierId)
SELECT TraitType, 'CXP_MOD_AIR'   FROM Traits WHERE TraitType LIKE 'TRAIT_LEADER_%';
INSERT OR IGNORE INTO TraitModifiers (TraitType, ModifierId)
SELECT TraitType, 'CXP_MOD_AERO'  FROM Traits WHERE TraitType LIKE 'TRAIT_LEADER_%';
INSERT OR IGNORE INTO TraitModifiers (TraitType, ModifierId)
SELECT TraitType, 'CXP_MOD_OTHER' FROM Traits WHERE TraitType LIKE 'TRAIT_LEADER_%';
