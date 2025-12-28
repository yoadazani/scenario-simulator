module.exports = [
    {
        "$id": "1",
        "key": "StatusTypes",
        "value": [
            {
                "id": 1,
                "value": "_OPEN",
                "color": "#E64E4B",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Spatials/Markers/status_open.png",
                "hebrewValue": "פתוח"
            },
            {
                "id": 2,
                "value": "_CLOSED",
                "color": "#A7D155",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Spatials/Markers/status_closed.png",
                "hebrewValue": "סגור"
            },
            {
                "id": 3,
                "value": "_CANCELLED",
                "color": null,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Spatials/Markers/status_cancelled.png",
                "hebrewValue": "מבוטל"
            }
        ]
    },
    {
        "$id": "2",
        "key": "EventTypes",
        "value": [
            {
                "id": 1,
                "value": "_HAZARDOUS_MATERIAL",
                "category": 1,
                "weight": null,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Hazardous.svg",
                "order": 0.0,
                "hebrewValue": "חומ''ס"
            },
            {
                "id": 2,
                "value": "_CHEMICAL_RESISTANT",
                "category": 1,
                "weight": null,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/ChimestryDurable.svg",
                "order": 1.0,
                "hebrewValue": "כימי עמיד"
            },
            {
                "id": 3,
                "value": "_CHEMICAL_VOLATILE",
                "category": 1,
                "weight": 3,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/ChimestryVolatile.svg",
                "order": 2.0,
                "hebrewValue": "כימי נדיף"
            },
            {
                "id": 4,
                "value": "_DESTRACTION",
                "category": 1,
                "weight": null,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Destroy.png",
                "order": 3.0,
                "hebrewValue": "הרס"
            },
            {
                "id": 5,
                "value": "_PERIPHERAL_DAMAGE",
                "category": 1,
                "weight": 4,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/CapriciousDamage.svg",
                "order": 3.0,
                "hebrewValue": "נזק היקפי"
            },
            {
                "id": 6,
                "value": "_FIRE",
                "category": 1,
                "weight": 3,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Fire.svg",
                "order": 4.0,
                "hebrewValue": "שריפה"
            },
            {
                "id": 7,
                "value": "_FUNCTIONAL_CONTINUITY",
                "category": 1,
                "weight": 4,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Other.svg",
                "order": 5.0,
                "hebrewValue": "רציפות תפקודית"
            },
            {
                "id": 8,
                "value": "_BIOLOGICAL",
                "category": 1,
                "weight": null,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Biological.svg",
                "order": 6.0,
                "hebrewValue": "ביולוגי"
            },
            {
                "id": 9,
                "value": "_RADIOLOGICAL",
                "category": 1,
                "weight": null,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Radiology.svg",
                "order": 7.0,
                "hebrewValue": "רדיולוגי"
            },
            {
                "id": 10,
                "value": "הפס\"ד",
                "category": 1,
                "weight": null,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Other.svg",
                "order": 8.0,
                "hebrewValue": "הפס\"ד"
            },
            {
                "id": 13,
                "value": "_MEDICAL",
                "category": 1,
                "weight": 4,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Medical.svg",
                "order": 6.0,
                "hebrewValue": "רפואי"
            },
            {
                "id": 14,
                "value": "_ARAN",
                "category": 1,
                "weight": 4,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Aran.svg",
                "order": 6.0,
                "hebrewValue": "אר\"ן"
            },
            {
                "id": 15,
                "value": "_FAHA",
                "category": 1,
                "weight": 4,
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Faha.svg",
                "order": 7.0,
                "hebrewValue": "פח\"ע"
            }
        ]
    },
    {
        "$id": "3",
        "key": "EventsGeneratorTypes",
        "value": [
            {
                "id": 1,
                "value": "_TKK",
                "hebrewValue": "טק\"ק"
            },
            {
                "id": 2,
                "value": "_RKK",
                "hebrewValue": "רק\"ק"
            },
            {
                "id": 3,
                "value": "_TERRORISM",
                "hebrewValue": "טרור"
            },
            {
                "id": 4,
                "value": "_ACCIDENT",
                "hebrewValue": "תאונה"
            },
            {
                "id": 5,
                "value": "_NATURAL_DISASTER",
                "hebrewValue": "אסון טבע"
            },
            {
                "id": 6,
                "value": "_FREGMENTS_INTERCEPTION",
                "hebrewValue": "שברי ירוט"
            },
            {
                "id": 7,
                "value": "_UNKNOWN",
                "hebrewValue": "לא ידוע"
            },
            {
                "id": 8,
                "value": "_OTHER",
                "hebrewValue": "טרם נקבע"
            },
            {
                "id": 9,
                "value": "_MULTI",
                "hebrewValue": "רב מוקדי"
            }
        ]
    },
    {
        "$id": "4",
        "key": "EventsDamageLevels",
        "value": [
            {
                "id": 1,
                "value": "_UNKNOWN",
                "hebrewValue": "לא ידוע"
            },
            {
                "id": 2,
                "value": "_VERY_EASY",
                "hebrewValue": "קל מאד"
            },
            {
                "id": 3,
                "value": "_EASY",
                "hebrewValue": "קל"
            },
            {
                "id": 4,
                "value": "_MEDIUM",
                "hebrewValue": "בינוני"
            },
            {
                "id": 5,
                "value": "_HEAVY",
                "hebrewValue": "כבד"
            },
            {
                "id": 6,
                "value": "_VERY_HEAVY",
                "hebrewValue": "כבד מאד"
            }
        ]
    },
    {
        "$id": "5",
        "key": "EventsLifeSavingPotential",
        "value": [
            {
                "id": 1,
                "value": "_UNKNOWN",
                "hebrewValue": "לא ידוע"
            },
            {
                "id": 2,
                "value": "_ZERO",
                "hebrewValue": "אפסי"
            },
            {
                "id": 3,
                "value": "_LOW",
                "hebrewValue": "נמוך"
            },
            {
                "id": 4,
                "value": "_MEDIUM",
                "hebrewValue": "בינוני"
            },
            {
                "id": 5,
                "value": "_HIGH",
                "hebrewValue": "גבוה"
            }
        ]
    },
    {
        "$id": "6",
        "key": "EventsReporterOrgSources",
        "value": [
            {
                "id": 1,
                "value": "_PIKUD",
                "hebrewValue": "פיקוד"
            },
            {
                "id": 2,
                "value": "_LOCAL_MUNICIPALITY",
                "hebrewValue": "רשות מקומית"
            },
            {
                "id": 3,
                "value": "_FIRE",
                "hebrewValue": "כב\"ה"
            },
            {
                "id": 4,
                "value": "_MADA",
                "hebrewValue": "מד\"א"
            },
            {
                "id": 5,
                "value": "_POLICE",
                "hebrewValue": "משטרה"
            }
        ]
    },
    {
        "$id": "7",
        "key": "BuildingTypes",
        "value": [
            {
                "id": 1,
                "value": "_HOSPITALS",
                "hebrewValue": "בתי חולים"
            },
            {
                "id": 2,
                "value": "_UNKNOWN",
                "hebrewValue": "לא ידוע"
            },
            {
                "id": 3,
                "value": "_EDUCATION",
                "hebrewValue": "מוסד חינוכי"
            },
            {
                "id": 4,
                "value": "_SPECIAL",
                "hebrewValue": "מוסד מיוחד"
            },
            {
                "id": 5,
                "value": "_PRIVATE",
                "hebrewValue": "פרטי"
            },
            {
                "id": 6,
                "value": "_PUBLIC",
                "hebrewValue": "ציבורי"
            },
            {
                "id": 7,
                "value": "_ENERGY",
                "hebrewValue": "תשתית אנרגיה"
            },
            {
                "id": 8,
                "value": "_NATIONAL",
                "hebrewValue": "תשתית לאומית אחרת"
            },
            {
                "id": 9,
                "value": "_TRANSPORAT",
                "hebrewValue": "תשתית תחבורה"
            },
            {
                "id": 10,
                "value": "_COMMUNICATION",
                "hebrewValue": "תשתית תקשורת"
            }
        ]
    },
    {
        "$id": "8",
        "key": "AssignmentsTypes",
        "value": [
            {
                "id": 1,
                "value": "_TREATMENT",
                "hebrewValue": "טיפול"
            },
            {
                "id": 2,
                "value": "_REPORT",
                "hebrewValue": "דיווח"
            },
            {
                "id": 3,
                "value": "_BLOCKING",
                "hebrewValue": "חסימה"
            },
            {
                "id": 4,
                "value": "_PATROL",
                "hebrewValue": "סיור"
            },
            {
                "id": 5,
                "value": "_ASSISTANCE",
                "hebrewValue": "סיוע"
            },
            {
                "id": 6,
                "value": "_PLANNING",
                "hebrewValue": "תכנון"
            },
            {
                "id": 7,
                "value": "_OTHER",
                "hebrewValue": "אחר"
            }
        ]
    },
    {
        "$id": "9",
        "key": "AssignmentsStatusesTypes",
        "value": [
            {
                "id": 1,
                "value": "_PROGRESS",
                "color": "#FFB347",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Assignments/progress.png",
                "order": 0,
                "hebrewValue": "בטיפול"
            },
            {
                "id": 2,
                "value": "_DONE",
                "color": "#A7D155",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Assignments/done.png",
                "order": 0,
                "hebrewValue": "בוצע"
            },
            {
                "id": 3,
                "value": "_CANCELLED",
                "color": "#95A5A6",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Assignments/Default.png",
                "order": 0,
                "hebrewValue": "מבוטל"
            },
            {
                "id": 4,
                "value": "_READ",
                "color": "#95A5A6",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Assignments/read.png",
                "order": 0,
                "hebrewValue": "נקרא"
            },
            {
                "id": 5,
                "value": "_CLOSED",
                "color": "#95A5A6",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Assignments/close.png",
                "order": 0,
                "hebrewValue": "סגור"
            },
            {
                "id": 6,
                "value": "_OPEN",
                "color": "#E64E4B",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Assignments/open.png",
                "order": 0,
                "hebrewValue": "פתוח"
            }
        ]
    },
    {
        "$id": "10",
        "key": "ImportanceTypes",
        "value": [
            {
                "id": 1,
                "value": "_LOW",
                "hebrewValue": "נמוכה"
            },
            {
                "id": 2,
                "value": "_MEDIUM",
                "hebrewValue": "רגילה"
            },
            {
                "id": 3,
                "value": "_HIGH",
                "hebrewValue": "גבוהה"
            }
        ]
    },
    {
        "$id": "11",
        "key": "ExternalSourceTypes",
        "value": [
            {
                "id": 1,
                "value": "_MILITARY_SHUAL",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Markers/MilitaryFox.png",
                "hebrewValue": "שוע\"ל צבאי"
            },
            {
                "id": 2,
                "value": "_POLICE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Markers/Police.png",
                "hebrewValue": "משטרה"
            },
            {
                "id": 3,
                "value": "_FIRE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Markers/Fire.png",
                "hebrewValue": "כב\"ה"
            },
            {
                "id": 4,
                "value": "_CRM",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Markers/CRM.png",
                "hebrewValue": "C.R.M"
            },
            {
                "id": 5,
                "value": "_MADA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Events/Markers/MADA.png",
                "hebrewValue": "מד\"א"
            }
        ]
    },
    {
        "$id": "12",
        "key": "OfficialsTypes",
        "value": [
            {
                "id": 1,
                "value": "_PIKUD_COMMANDER",
                "hebrewValue": "מפקד פיקוד"
            },
            {
                "id": 2,
                "value": "_DISTRICT_COMMANDER",
                "hebrewValue": "מפקד מחוז"
            },
            {
                "id": 3,
                "value": "_SUB_DISTRICT_COMMANDER",
                "hebrewValue": "מפקד נפה"
            },
            {
                "id": 4,
                "value": "_MAGAD",
                "hebrewValue": "מג\"ד"
            },
            {
                "id": 5,
                "value": "_MP",
                "hebrewValue": "מ\"פ"
            },
            {
                "id": 6,
                "value": "_MM",
                "hebrewValue": "מ\"מ"
            },
            {
                "id": 7,
                "value": "_MAFKATZ",
                "hebrewValue": "מפקד צוות"
            },
            {
                "id": 8,
                "value": "_AGAM_OFFICIAL",
                "hebrewValue": "קצין אגם"
            },
            {
                "id": 9,
                "value": "_LOGISTIC_OFFICIAL",
                "hebrewValue": "קצין לוגיסטיקה"
            },
            {
                "id": 10,
                "value": "_TENE_OFFICIAL",
                "hebrewValue": "קצין טנ\"א"
            },
            {
                "id": 11,
                "value": "_HR_OFFICIAL",
                "hebrewValue": "קצין משא\"ן"
            },
            {
                "id": 12,
                "value": "_ABACH_OFFICIAL",
                "hebrewValue": "קצין אב\"כ"
            },
            {
                "id": 13,
                "value": "_HOMAS_OFFICIAL",
                "hebrewValue": "קצין חומ\"ס"
            },
            {
                "id": 14,
                "value": "_TIKSHUV_OFFICIAL",
                "hebrewValue": "קצין תקשוב"
            },
            {
                "id": 15,
                "value": "_INTELLIGENCE_OFFICIAL",
                "hebrewValue": "קצין מודיעין"
            },
            {
                "id": 16,
                "value": "_MEDICAL_OFFICIAL",
                "hebrewValue": "קצין רפואה"
            },
            {
                "id": 17,
                "value": "_POPULATION_OFFICIAL",
                "hebrewValue": "קצין אוכלוסייה"
            }
        ]
    },
    {
        "$id": "13",
        "key": "EllipsesStatuses",
        "value": [
            {
                "id": 1,
                "value": "_OPEN",
                "hebrewValue": "פתוח"
            },
            {
                "id": 2,
                "value": "_INTERCEPTED",
                "hebrewValue": "יורט"
            },
            {
                "id": 3,
                "value": "_ABORTED",
                "hebrewValue": "מבוטל"
            },
            {
                "id": 4,
                "value": "_CLOSED",
                "hebrewValue": "סגור"
            }
        ]
    },
    {
        "$id": "14",
        "key": "EventsDynamicStatus",
        "value": [
            {
                "id": 1,
                "value": "_NOT_STARTED",
                "hebrewValue": "טרם טופל"
            },
            {
                "id": 2,
                "value": "_ACTIVE",
                "hebrewValue": "צוות"
            },
            {
                "id": 3,
                "value": "_ON_EXECUTE",
                "hebrewValue": "בטיפול"
            },
            {
                "id": 4,
                "value": "_EXECUTE_FINISHED",
                "hebrewValue": "טיפול הסתיים"
            }
        ]
    },
    {
        "$id": "15",
        "key": "ForceInternalTypes",
        "value": [
            {
                "id": 23,
                "value": "_RESCUE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/rescue.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "חילוץ"
            },
            {
                "id": 24,
                "value": "_MEDICINE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/medical.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "רפואה"
            },
            {
                "id": 25,
                "value": "_HEADQUERTERS",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/DiamondFrame.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "מפקדה"
            },
            {
                "id": 26,
                "value": "_LOGISTIC",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Logistics.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "לוגיסטיקה"
            },
            {
                "id": 27,
                "value": "_BKAN",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Bakan.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "בק\"ן"
            },
            {
                "id": 28,
                "value": "_ANOCH",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Anuch.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "אנו\"ח"
            },
            {
                "id": 29,
                "value": "_POPULATION",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Population.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "אוכלוסיה"
            },
            {
                "id": 30,
                "value": "_TNA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Tene.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "טנ\"א"
            },
            {
                "id": 31,
                "value": "_MSHAN",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Mashan.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "משא\"ן"
            },
            {
                "id": 32,
                "value": "_TIKSHOV",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Tiksuv.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "תקשוב"
            },
            {
                "id": 33,
                "value": "_ENGINEERING",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Engineering.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "הנדסה"
            },
            {
                "id": 103,
                "value": "INFANTRY",
                "symbol": null,
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "חי\"ר"
            },
            {
                "id": 104,
                "value": "_BUNDLE",
                "symbol": null,
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "אגד"
            },
            {
                "id": 105,
                "value": "_FORWARD_COMMAND",
                "symbol": null,
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "חפ\"ק"
            }
        ]
    },
    {
        "$id": "16",
        "key": "ForceExternalTypes",
        "value": [
            {
                "id": 6,
                "value": "_FIRE_ENGINE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/FireEngine.svg",
                "permissionType": 4,
                "source": null,
                "hebrewValue": "כבאית"
            },
            {
                "id": 7,
                "value": "_MILITARY_FORCE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/MilitaryForce.svg",
                "permissionType": 2,
                "source": null,
                "hebrewValue": "פיקוד העורף"
            },
            {
                "id": 9,
                "value": "_POLICE_CAR",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/PoliceCar.svg",
                "permissionType": 3,
                "source": null,
                "hebrewValue": "ניידת משטרה"
            }
        ]
    },
    {
        "$id": "17",
        "key": "ForceTypes",
        "value": [
            {
                "id": 2,
                "value": "_AMBULANCE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "אמבולנס"
            },
            {
                "id": 9,
                "value": "_POLICE_CAR",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/PoliceCar.svg",
                "permissionType": 3,
                "source": 2,
                "hebrewValue": "ניידת משטרה"
            },
            {
                "id": 6,
                "value": "_FIRE_ENGINE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/FireEngine.svg",
                "permissionType": 4,
                "source": 3,
                "hebrewValue": "כבאית"
            },
            {
                "id": 23,
                "value": "_RESCUE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/rescue.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "חילוץ"
            },
            {
                "id": 24,
                "value": "_MEDICINE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/medical.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "רפואה"
            },
            {
                "id": 25,
                "value": "_HEADQUERTERS",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/DiamondFrame.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "מפקדה"
            },
            {
                "id": 26,
                "value": "_LOGISTIC",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Logistics.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "לוגיסטיקה"
            },
            {
                "id": 27,
                "value": "_BKAN",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Bakan.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "בק\"ן"
            },
            {
                "id": 28,
                "value": "_ANOCH",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Anuch.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "אנו\"ח"
            },
            {
                "id": 29,
                "value": "_POPULATION",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Population.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "אוכלוסיה"
            },
            {
                "id": 30,
                "value": "_TNA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Tene.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "טנ\"א"
            },
            {
                "id": 31,
                "value": "_MSHAN",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Mashan.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "משא\"ן"
            },
            {
                "id": 32,
                "value": "_TIKSHOV",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Tiksuv.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "תקשוב"
            },
            {
                "id": 33,
                "value": "_ENGINEERING",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Engineering.svg",
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "הנדסה"
            },
            {
                "id": 103,
                "value": "INFANTRY",
                "symbol": null,
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "חי\"ר"
            },
            {
                "id": 104,
                "value": "_BUNDLE",
                "symbol": null,
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "אגד"
            },
            {
                "id": 105,
                "value": "_FORWARD_COMMAND",
                "symbol": null,
                "permissionType": 2,
                "source": 1,
                "hebrewValue": "חפ\"ק"
            },
            {
                "id": 107,
                "value": "REGULAR",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "רגיל"
            },
            {
                "id": 108,
                "value": "_MOTOBIKE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "אופנוע"
            },
            {
                "id": 109,
                "value": "_BLODBIKE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "ניידת דם"
            },
            {
                "id": 110,
                "value": "_ELICOPTER",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "מסוק"
            },
            {
                "id": 111,
                "value": "_PERSONAL",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "כונן אישי"
            },
            {
                "id": 112,
                "value": "_HAPAK",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "חפ\"ק"
            },
            {
                "id": 113,
                "value": "_TAHARAN",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "תאר\"ן"
            },
            {
                "id": 114,
                "value": "_GI_PSUPERVAIZER",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "ג'יפ סופרוייזר"
            },
            {
                "id": 115,
                "value": "_ATV",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "טרקטורון"
            },
            {
                "id": 116,
                "value": "_SEGWAY",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "סגווי"
            },
            {
                "id": 117,
                "value": "_BICYCLE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "אופניים"
            },
            {
                "id": 118,
                "value": "_PRIVATE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "פרטי"
            },
            {
                "id": 119,
                "value": "_MOTOBYCENATAN",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "אופנוע נט\"ן"
            },
            {
                "id": 120,
                "value": "_BIMBA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "בימבה"
            },
            {
                "id": 121,
                "value": "_BOAT",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "סירה"
            },
            {
                "id": 122,
                "value": "_RETEM",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/Forces/Ambulance.svg",
                "permissionType": 2,
                "source": 5,
                "hebrewValue": "רת\"ם"
            }
        ]
    },
    {
        "$id": "18",
        "key": "ForceStatusTypes",
        "value": [
            {
                "id": 1,
                "value": "_NOT_ASSIGNED",
                "source": 1,
                "hebrewValue": "לא מצוות"
            },
            {
                "id": 2,
                "value": "_ASSIGNED",
                "source": 1,
                "hebrewValue": "מצוות"
            },
            {
                "id": 3,
                "value": "_IN_PROGRESS",
                "source": 1,
                "hebrewValue": "בביצוע משימה"
            },
            {
                "id": 4,
                "value": "_LAUNCH",
                "source": 5,
                "hebrewValue": "שיגור"
            },
            {
                "id": 5,
                "value": "_ROAD",
                "source": 5,
                "hebrewValue": "בדרך"
            },
            {
                "id": 6,
                "value": "_INPLACE",
                "source": 5,
                "hebrewValue": "במקום"
            },
            {
                "id": 7,
                "value": "_HOSPITAL",
                "source": 5,
                "hebrewValue": "מפנה לבי\"ח"
            },
            {
                "id": 8,
                "value": "_TARGET",
                "source": 5,
                "hebrewValue": "ביעד"
            },
            {
                "id": 9,
                "value": "_FREE",
                "source": 5,
                "hebrewValue": "פנוי"
            }
        ]
    },
    {
        "$id": "19",
        "key": "ForceRecuirtmentStatus",
        "value": [
            {
                "id": 1,
                "value": "סדיר - פעיל",
                "hebrewValue": "סדיר - פעיל"
            },
            {
                "id": 2,
                "value": "סדיר - לא פעיל",
                "hebrewValue": "סדיר - לא פעיל"
            },
            {
                "id": 3,
                "value": "מילואים - מגויס",
                "hebrewValue": "מילואים - מגויס"
            },
            {
                "id": 4,
                "value": "מילואים - לא מגויס",
                "hebrewValue": "מילואים - לא מגויס"
            }
        ]
    },
    {
        "$id": "20",
        "key": "OperationalQualifications",
        "value": [
            {
                "id": 1,
                "value": "_HIGH",
                "hebrewValue": "כשיר"
            },
            {
                "id": 2,
                "value": "_MEDIUM",
                "hebrewValue": "כשיר חלקית"
            },
            {
                "id": 3,
                "value": "_LOW",
                "hebrewValue": "בחזרה לכשירות"
            },
            {
                "id": 4,
                "value": "_UNFIT",
                "hebrewValue": "לא כשיר"
            }
        ]
    },
    {
        "$id": "21",
        "key": "FreesketchSymbols",
        "value": [
            {
                "id": 1,
                "value": "_AMBULANCE",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_AMBULANCE.svg",
                "width": 32,
                "height": 32,
                "order": 200.0,
                "hebrewValue": "אמבולנס"
            },
            {
                "id": 2,
                "value": "_BAAL_TAFKID",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_BAAL_TAFKID.svg",
                "width": 32,
                "height": 32,
                "order": 400.0,
                "hebrewValue": "בעל תפקיד"
            },
            {
                "id": 3,
                "value": "_BOR",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_BOR.svg",
                "width": 32,
                "height": 32,
                "order": 2000.0,
                "hebrewValue": "בור"
            },
            {
                "id": 4,
                "value": "_CHANYON",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_CHANYON.svg",
                "width": 32,
                "height": 32,
                "order": 2200.0,
                "hebrewValue": "חניון"
            },
            {
                "id": 5,
                "value": "_CHAPAK",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_CHAPAK.svg",
                "width": 32,
                "height": 32,
                "order": 1100.0,
                "hebrewValue": "חפ\"ק"
            },
            {
                "id": 6,
                "value": "_CHASHMAL",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_CHASHMAL.svg",
                "width": 32,
                "height": 32,
                "order": 1600.0,
                "hebrewValue": "חשמל"
            },
            {
                "id": 7,
                "value": "_CHASIMA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_CHASIMA.svg",
                "width": 32,
                "height": 32,
                "order": 3000.0,
                "hebrewValue": "חסימה"
            },
            {
                "id": 8,
                "value": "_GDUD",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_GDUD.svg",
                "width": 32,
                "height": 32,
                "order": 3700.0,
                "hebrewValue": "גדוד"
            },
            {
                "id": 9,
                "value": "_KABAIT",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_KABAIT.svg",
                "width": 32,
                "height": 32,
                "order": 300.0,
                "hebrewValue": "כבאית"
            },
            {
                "id": 10,
                "value": "_KITA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_KITA.svg",
                "width": 32,
                "height": 32,
                "order": 3400.0,
                "hebrewValue": "כיתה"
            },
            {
                "id": 11,
                "value": "_KOACH_CHILUTZ",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_KOACH_CHILUTZ.svg",
                "width": 32,
                "height": 32,
                "order": 500.0,
                "hebrewValue": "כוח חילוץ"
            },
            {
                "id": 12,
                "value": "_KOACH_HANDASA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_KOACH_HANDASA.svg",
                "width": 32,
                "height": 32,
                "order": 1400.0,
                "hebrewValue": "כוח הנדסה"
            },
            {
                "id": 13,
                "value": "_KOACH_LOGISTI",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_KOACH_LOGISTI.svg",
                "width": 32,
                "height": 32,
                "order": 1300.0,
                "hebrewValue": "כוח לוגיסטי"
            },
            {
                "id": 14,
                "value": "_KOACH_REFUI",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_KOACH_REFUI.svg",
                "width": 32,
                "height": 32,
                "order": 600.0,
                "hebrewValue": "כוח רפואה"
            },
            {
                "id": 15,
                "value": "_LAKUD_CHALAL_MEMUSPAR",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_LAKUD_CHALAL_MEMUSPAR.svg",
                "width": 32,
                "height": 32,
                "order": 2500.0,
                "hebrewValue": "לכוד חלל ממוספר"
            },
            {
                "id": 16,
                "value": "_LAKUD_CHALAL_SHECHULATZ",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_LAKUD_CHALAL_SHECHULATZ.svg",
                "width": 32,
                "height": 32,
                "order": 2600.0,
                "hebrewValue": "לכוד חלל שחולץ"
            },
            {
                "id": 17,
                "value": "_LAKUD_MEMUSPAR",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_LAKUD_MEMUSPAR.svg",
                "width": 32,
                "height": 32,
                "order": 2300.0,
                "hebrewValue": "לכוד ממוספר"
            },
            {
                "id": 18,
                "value": "_LAKUD_SHECHULATZ",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_LAKUD_SHECHULATZ.svg",
                "width": 32,
                "height": 32,
                "order": 2400.0,
                "hebrewValue": "לכוד שחולץ"
            },
            {
                "id": 19,
                "value": "_MACHLAKA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_MACHLAKA.svg",
                "width": 32,
                "height": 32,
                "order": 3500.0,
                "hebrewValue": "מחלקה"
            },
            {
                "id": 20,
                "value": "_MACHOZ_UGDA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_MACHOZ_UGDA.svg",
                "width": 32,
                "height": 32,
                "order": 3900.0,
                "hebrewValue": "מחוז\\אוגדה"
            },
            {
                "id": 21,
                "value": "_MAGNAN",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_MAGNAN.svg",
                "width": 32,
                "height": 32,
                "order": 2900.0,
                "hebrewValue": "מגנן"
            },
            {
                "id": 22,
                "value": "_MANOF",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_MANOF.svg",
                "width": 32,
                "height": 32,
                "order": 900.0,
                "hebrewValue": "מנוף"
            },
            {
                "id": 23,
                "value": "_MASHLAT",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_MASHLAT.svg",
                "width": 32,
                "height": 32,
                "order": 1000.0,
                "hebrewValue": "משל\"ט"
            },
            {
                "id": 24,
                "value": "_MAZON",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_MAZON.svg",
                "width": 32,
                "height": 32,
                "order": 1900.0,
                "hebrewValue": "מזון"
            },
            {
                "id": 25,
                "value": "_MERKAZ_MISHPACHOT",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_MERKAZ_MISHPACHOT.svg",
                "width": 32,
                "height": 32,
                "order": 3100.0,
                "hebrewValue": "מרכז משפחות"
            },
            {
                "id": 26,
                "value": "_MIFKADA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_MIFKADA.svg",
                "width": 32,
                "height": 32,
                "order": 1200.0,
                "hebrewValue": "מפקדה"
            },
            {
                "id": 27,
                "value": "_NAFA_CHATIVA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_NAFA_CHATIVA.svg",
                "width": 32,
                "height": 32,
                "order": 3800.0,
                "hebrewValue": "נפה\\חטיבה"
            },
            {
                "id": 28,
                "value": "_NAYEDET_MISHTARA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_NAYEDET_MISHTARA.svg",
                "width": 32,
                "height": 32,
                "order": 100.0,
                "hebrewValue": "ניידת משטרה"
            },
            {
                "id": 29,
                "value": "_NEKUDAT_ISUF_CHALALIM",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_NEKUDAT_ISUF_CHALALIM.svg",
                "width": 32,
                "height": 32,
                "order": 2800.0,
                "hebrewValue": "נקודת איסוף חללים"
            },
            {
                "id": 30,
                "value": "_NEKUDAT_PINUI_REFUI",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_NEKUDAT_PINUI_REFUI.svg",
                "width": 32,
                "height": 32,
                "order": 2700.0,
                "hebrewValue": "נקודת פינוי רפואי"
            },
            {
                "id": 31,
                "value": "_PIKUD",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_PIKUD.svg",
                "width": 32,
                "height": 32,
                "order": 4000.0,
                "hebrewValue": "פיקוד"
            },
            {
                "id": 32,
                "value": "_PIR_MAALIT",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_PIR_MAALIT.svg",
                "width": 32,
                "height": 32,
                "order": 2100.0,
                "hebrewValue": "פיר מעלית"
            },
            {
                "id": 33,
                "value": "_PLUGA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_PLUGA.svg",
                "width": 32,
                "height": 32,
                "order": 3600.0,
                "hebrewValue": "פלוגה"
            },
            {
                "id": 34,
                "value": "_RECHEV_TZVAI",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_RECHEV_TZVAI.svg",
                "width": 32,
                "height": 32,
                "order": 700.0,
                "hebrewValue": "רכב צבאי"
            },
            {
                "id": 35,
                "value": "_SAKANA",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_SAKANA.svg",
                "width": 32,
                "height": 32,
                "order": 1500.0,
                "hebrewValue": "סכנה"
            },
            {
                "id": 36,
                "value": "_SHETACH_KINUS",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_SHETACH_KINUS.svg",
                "width": 32,
                "height": 32,
                "order": 3200.0,
                "hebrewValue": "שטח כינוס"
            },
            {
                "id": 37,
                "value": "_TASHTIT_GAZ",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_TASHTIT_GAZ.svg",
                "width": 32,
                "height": 32,
                "order": 1800.0,
                "hebrewValue": "תשתית גז"
            },
            {
                "id": 38,
                "value": "_TASHTIT_MAYIM",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_TASHTIT_MAYIM.svg",
                "width": 32,
                "height": 32,
                "order": 1700.0,
                "hebrewValue": "תשתית מים"
            },
            {
                "id": 39,
                "value": "_TZEVET",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_TZEVET.svg",
                "width": 32,
                "height": 32,
                "order": 3300.0,
                "hebrewValue": "צוות"
            },
            {
                "id": 40,
                "value": "_ZAMA_KLI_HANDASI",
                "symbol": "./myAssets/images/EntitiesObjectsTypesIcons/FreesketchSymbols/_ZAMA_KLI_HANDASI.svg",
                "width": 32,
                "height": 32,
                "order": 800.0,
                "hebrewValue": "צמ\"ה - כלי הנדסי"
            }
        ]
    }
]