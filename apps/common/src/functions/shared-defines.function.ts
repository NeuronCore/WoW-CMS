import { Classes, Gender, Races } from '../enums/shared-defines.enum';

export const getRaceName = (raceID: number) =>
{
    switch (raceID)
    {
        case Races.RACE_HUMAN:
            return 'Human';
        case Races.RACE_ORC:
            return 'Orc';
        case Races.RACE_DWARF:
            return 'Dwarf';
        case Races.RACE_NIGHTELF:
            return 'Night Elf';
        case Races.RACE_UNDEAD_PLAYER:
            return 'Undead';
        case Races.RACE_TAUREN:
            return 'Tauren';
        case Races.RACE_GNOME:
            return 'Gnome';
        case Races.RACE_TROLL:
            return 'Troll';
        case Races.RACE_BLOODELF:
            return 'Blood Elf';
        case Races.RACE_DRAENEI:
            return 'Draenei';
        case Races.RACE_NONE:
            return 'none';
    }

    return '';
};

export const getGender = (genderID: number) =>
{
    switch (genderID)
    {
        case Gender.GENDER_MALE:
            return 'Male';
        case Gender.GENDER_FEMALE:
            return 'Female';
        case Gender.GENDER_NONE:
            return 'None';
    }

    return '';
};

export const getClassName = (classID: number) =>
{
    switch (classID)
    {
        case Classes.CLASS_WARRIOR:
            return 'Warrior';
        case Classes.CLASS_PALADIN:
            return 'Paladin';
        case Classes.CLASS_HUNTER:
            return 'Hunter';
        case Classes.CLASS_ROGUE:
            return 'Rogue';
        case Classes.CLASS_PRIEST:
            return 'Priest';
        case Classes.CLASS_DEATH_KNIGHT:
            return 'Death Knight';
        case Classes.CLASS_SHAMAN:
            return 'Shaman';
        case Classes.CLASS_MAGE:
            return 'Mage';
        case Classes.CLASS_WARLOCK:
            return 'Warlock';
        case Classes.CLASS_DRUID:
            return 'Druid';
        case Classes.CLASS_NONE:
            return 'None';
    }

    return '';
};

export const getFaction = (raceID: number) =>
{
    switch (raceID)
    {
        case Races.RACE_ORC:
        case Races.RACE_UNDEAD_PLAYER:
        case Races.RACE_TAUREN:
        case Races.RACE_TROLL:
        case Races.RACE_BLOODELF:
            return 'Horde';
        case Races.RACE_HUMAN:
        case Races.RACE_DWARF:
        case Races.RACE_NIGHTELF:
        case Races.RACE_GNOME:
        case Races.RACE_DRAENEI:
            return 'Alliance';
    }

    return '';
};
