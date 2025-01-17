const grammaticalCase = "case";
const person = "person";
const number = "number";
const definiteness = "definiteness";
const gender = "gender";
const degree = "degree";
const tense = "tense";
const mood = "mood";
const voice = "voice";
const verbType = "verbType";
const impersonalSubject = "impersonalSubject";
const clippedImperative = "clippedImperative";

const categories = [
    grammaticalCase,
    person,
    number,
    definiteness,
    gender,
    degree,
    tense,
    mood,
    voice,
    verbType,
    impersonalSubject,
    clippedImperative
];

const availableCategories = {
    noun: [grammaticalCase, number, definiteness],
    masculineNoun: [grammaticalCase, number, definiteness],
    feminineNoun: [grammaticalCase, number, definiteness],
    neuterNoun: [grammaticalCase, number, definiteness],
    adjective: [grammaticalCase, number, gender, definiteness, degree],
    verb: [
        grammaticalCase, person, number, gender, definiteness, tense,
        mood, voice, verbType, impersonalSubject, clippedImperative
    ],
    numeral: [grammaticalCase, number, gender],
    ordinal: [grammaticalCase, number, gender],
    personalPronoun: [grammaticalCase, number],
    reflexivePronoun: [grammaticalCase],
    otherPronoun: [grammaticalCase, number, gender],
    definiteArticle: [grammaticalCase, number, gender],
    adverb: [degree]
}

const categoryValueDataText = [
    {"N": "nom", "A": "acc", "D": "dat", "G": "gen"},
    {"1": "fstP", "2": "sndP", "3": "trdP"},
    {"S": "sg", "P": "pl"},
    {"I": "indef", "D": "def"},
    {"M": "masc", "F": "fem", "N": "neu"},
    {"P": "pos", "C": "comp", "S": "super"},
    {"P": "pres", "p": "pst"},
    {"I": "ind", "S": "subj"},
    {"A": "act", "M": "mid"},
    {"I": "impers", "i": "inf", "P": "presPart", "p": "pstPart", "S": "sup", "!": "imp", "O": "opt", "Q": "ques"},
    {"A": "accSub", "D": "datSub", "G": "genSub", "d": "dummySub"},
    {"C": "clipped"}
]

const valueNamesAsInflections = {
    "nom":       "N***********",
    "nf":        "N***********",
    "acc":       "A***********",
    "þf":        "A***********",
    "ack":       "A***********",
    "dat":       "D***********",
    "þgf":       "D***********",
    "gen":       "G***********",
    "ef":        "G***********",
    "1p":        "*1**********",
    "1st":       "*1**********",
    "1":         "*1**********",
    "1a":        "*1**********",
    "1:a":       "*1**********",
    "2p":        "*2**********",
    "2nd":       "*2**********",
    "2":         "*2**********",
    "2a":        "*2**********",
    "2:a":       "*2**********",
    "3p":        "*3**********",
    "3rd":       "*3**********",
    "3":         "*3**********",
    "3e":        "*3**********",
    "3:e":       "*3**********",
    "sg":        "**S*********",
    "et":        "**S*********",
    "sg":        "**S*********",
    "pl":        "**P*********",
    "ft":        "**P*********",
    "indef":     "***I********",
    "ángr":      "***I********",
    "obest":     "***I********",
    "def":       "***D********",
    "meðgr":     "***D********",
    "best":      "***D********",
    "masc":      "****M*******",
    "kk":        "****M*******",
    "mask":      "****M*******",
    "fem":       "****F*******",
    "kvk":       "****F*******",
    "neu":       "****N*******",
    "hk":        "****N*******",
    "pos":       "*****P******",
    "frums":     "*****P******",
    "comp":      "*****C******",
    "miðs":      "*****C******",
    "komp":      "*****C******",
    "super":     "*****S******",
    "efsta":     "*****S******",
    "pres":      "******P*****",
    "nt":        "******P*****",
    "pst":       "******p*****",
    "þt":        "******p*****",
    "pret":      "******p*****",
    "ind":       "*******I****",
    "fsh":       "*******I****",
    "subj":      "*******S****",
    "vth":       "*******S****",
    "konj":      "*******S****",
    "act":       "********A***",
    "germ":      "********A***",
    "akt":       "********A***",
    "mid":       "********M***",
    "miðm":      "********M***",
    "med":       "********M***",
    "impers":    "*********I**",
    "ópers":     "*********I**",
    "inf":       "*********i**",
    "nh":        "*********i**",
    "prespart":  "*********P**",
    "lhnt":      "*********P**",
    "pstpart":   "*********p**",
    "lhþt":      "*********p**",
    "perfpart":  "*********p**",
    "sup":       "*********S**",
    "sagnb":     "*********S**",
    "imp":       "*********!**",
    "bh":        "*********!**",
    "opt":       "*********O**",
    "óh":        "*********O**",
    "ques":      "*********Q**",
    "spurn":     "*********Q**",
    "fråg":      "*********Q**",
    "accsub":    "**********A*",
    "ópersþff":  "**********A*",
    "acksub":    "**********A*",
    "datsub":    "**********D*",
    "ópersþgff": "**********D*",
    "gensub":    "**********G*",
    "óperseff":  "**********G*",
    "dummysub":  "**********d*",
    "ópersgf":   "**********d*",
    "explsub":   "**********d*",
    "clipped":   "***********C",
    "stýbh":     "***********C",
    "klippt":    "***********C",
}

let selectedWordClass = ""
let dataRead = {};

function inflectionAbbrev(inflection) {
    let abbrevs = [];
    for (let i = 0; i < 12; i++) {
        const c = inflection.charAt(i);
        if (c != "*") {
            abbrevs.push(categoryValueDataText[i][c]);
        }
    }
    return abbrevs;
}

function tableStr(pattern, patternInfo, tablePattern, totalFreq) {
    let table = "<table>";
    const freqPercent = (patternInfo.freq / totalFreq * 100)
    const freqStr = freqPercent.toLocaleString(document.documentElement.lang, {maximumFractionDigits: 2});
    table += "<caption>(" + freqStr + "%)<br>";
    table += "<div class=\"wordList\">"
    for (let i = 0; i < patternInfo.lexemes.length; i++) {
        if (i == 200) {
            table += "… (<span data-text='and'></span> ";
            table += patternInfo.lexemes.length - 200;
            table += " <span data-text='more'></span>)";
            break;
        }
        const lexeme = patternInfo.lexemes[i];
        table += "<a href='https://bin.arnastofnun.is/beyging/" + lexeme.id + "' target='_blank'>" + lexeme.lemma + "</a> ";
        //table += "(" + patternInfo.lexemes[i].freq + ") ";
    }
    table += "</div></caption>";
    const rowInflections = allRowCombinations(tablePattern);
    const colInflections = allColCombinations(tablePattern);
    if (colInflections.length > 1 && rowInflections.length > 1) {
        table += "<tr><th></th>";
    }
    if (colInflections.length > 1) {
        if (rowInflections.length == 1) {
            table += "<tr>";
        }
        for (const colInflection of colInflections) {
            table += "<th>";
            for (abbrev of inflectionAbbrev(colInflection)) {
                table += "<span data-text='" + abbrev + "'></span> ";
            }
            table += "</th>";
        }
        table += "</tr>";
    }
    for (const rowInflection of rowInflections) {
        table += "<tr>";
        if (rowInflections.length > 1) {
            table += "<th>";
            for (abbrev of inflectionAbbrev(rowInflection)) {
                table += "<span data-text='" + abbrev + "'></span> ";
            }
            table += "</th>";
        }
        for (const colInflection of colInflections) {
            const inflection = combineInflections(tablePattern, combineInflections(rowInflection, colInflection));
            const affixes = findCompatible(inflection, pattern);
            if (affixes !== null) {
                affixesStr = affixes.map((affix) =>
                    (patternInfo.initialDash ? "-" : "") + affix.replaceAll(/\*/g, "-…-")
                ).join(" / ");
                table += "<td>" + affixesStr;
            } else {
                table += "<td>N/A";
            }
        }
        table += "</tr>";
    }
    table += "</table>";
    return table
}

function allNA(table) {
    for (let row of table.rows) {
        for (let cell of row.getElementsByTagName("td")) {
            if (cell.innerHTML != "N/A") {
                return false;
            }
        }
    }
    return true;
}

function tableComplexity(tablePattern) {
    let nbrRows = 1;
    let nbrCols = 1;
    for (let i = 0; i < 12; i++) {
        const char = tablePattern.charAt(i);
        if (char == "-") {
            nbrRows *= categoryValues[i].length;
        } else if (char == "|") {
            nbrCols *= categoryValues[i].length;
        }
    }
    return (nbrRows + 1) * (nbrCols + 1);
}

function setLanguage(lang, node) {
    const textElements = node.querySelectorAll("[data-text]");
    for (const textElement of textElements) {
        textElement.innerHTML = translations[lang][textElement.getAttribute("data-text")];
    }
    document.getElementById("filterInflection").setAttribute("placeholder", translations[lang]["defaultLemma"]);
    document.getElementById("filterForm").setAttribute("placeholder", translations[lang]["defaultAny"]);
    document.getElementById("analyzeButton").setAttribute("value", translations[lang]["analyze"]);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
}

async function getJson(wordClass) {
    if (dataRead[wordClass]) {
        return dataRead[wordClass];
    }
    const json = await fetch(`data/${wordClass}.json`).then((response) => response.json());
    dataRead[wordClass] = json;
    return json;
}

function parseInflection(filterInflection) {
    if (filterInflection == "") {
        return null;
    }
    let normalizedStr = filterInflection.replaceAll(".", " ").trim().replace(/\s+/g, " ");
    for (const cvdt of categoryValueDataText) {
        for (const value of Object.values(cvdt)) {
            for (const lang of ["en", "is", "sv"]) {
                const valueTrans = translations[lang][value];
                if (valueTrans.match(" ")) {
                    const normalizedValueTrans = valueTrans.toLowerCase().replaceAll(".", "");
                    normalizedStr = normalizedStr.replace(RegExp(normalizedValueTrans, "i"),
                        normalizedValueTrans.replace(/\s+/g, ""));
                }
            }
        }
    }
    const words = normalizedStr.split(/\s+/);
    let inflection = "************";
    for (let word of words) {
        word = word.toLowerCase();
        singleFeatureInflection = valueNamesAsInflections[word];
        if (singleFeatureInflection == undefined) {
            return { error: "unknownFeature", errorCause: word };
        }
        const newInflection = combineInflections(inflection, singleFeatureInflection);
        if (newInflection == null) {
            const categoryIndex = /[^\*]/.exec(singleFeatureInflection).index;
            const feature1 = categoryValueDataText[categoryIndex][inflection.charAt(categoryIndex)];
            const feature2 = categoryValueDataText[categoryIndex][singleFeatureInflection.charAt(categoryIndex)];
            return { error: "contradictoryFeatures", errorCause: [feature1, feature2] };
        }
        inflection = newInflection;
    }
    return inflection;
}

function parseFilter(filterForm) {
    if (filterForm == "") {
        return /.*/;
    }
    const filters = filterForm.toLowerCase().trim().split(/\s*\/\s*(?![^(]*?\))/); // split on "/" outside of ()
    let regexParts = [];
    for (const filter of filters) {
        const dashStart = filter.startsWith("-");
        const dashEnd = filter.endsWith("-") && filter.length > 1;
        const filterBody = filter.substring(dashStart ? 1 : 0, filter.length - (dashEnd ? 1 : 0));
        regexStrPart = filterBody.replace(/[\-\\^$*+?|[\]{}]/g, "\\$&")
            .replaceAll("...", ".*")
            .replaceAll("…", ".*")
            .replaceAll("/", "|")
            .replace(/\.(?!\*)/g, "\\.");
        const prefix = dashStart ? "" : "^";
        const suffix = dashEnd ? "" : "$";
        regexParts.push(prefix + regexStrPart + suffix);
    }
    regexStr = "(" + regexParts.join("|") + ")";
    try {
        return RegExp(regexStr);
    } catch (_) {
        return null;
    }
}

function filterData(lexemes, filterInflection, filterForm, includeVariants) {
    if (filterInflection == "" && filterForm == "") {
        return lexemes;
    }
    const inflection = parseInflection(filterInflection);
    if (inflection != null && inflection.error != undefined) {
        return inflection;
    }
    const regex = parseFilter(filterForm);
    if (regex == null) {
        return { error: "filterParseError" };
    }
    return lexemes.filter((lexeme) => matchesFilter(lexeme, inflection, regex, includeVariants));

    function matchesFilter(lexeme, inflection, regex, includeVariants) {
        if (inflection == null) {
            return lexeme.lemma.toLowerCase().match(regex);
        }
        inflection = findCompatibleInflection(inflection, lexeme.forms);
        if (inflection == null) {
            return false;
        }
        const forms = lexeme.forms[inflection];
        for (form of formsUsedAsList(forms, includeVariants)) {
            if (form.toLowerCase().match(regex)) {
                return true;
            }
        }
        return false;
    }
}

function showPatterns(patterns, tablePattern) {
    let totalFreq = 0;
    for (const [_, patternInfo] of patterns) {
        totalFreq += patternInfo.freq;
    }
    let tables = "";
    for (const [pattern, patternInfo] of patterns) {
        tables += tableStr(JSON.parse(pattern), patternInfo, tablePattern, totalFreq);
    }
    const tablesElement = document.getElementById("tables");
    tablesElement.innerHTML = tables;
    //navigator.clipboard.writeText(tables); // use when creating new precomputed tables
    //console.log("created tables");
    setLanguage(document.documentElement.lang, tablesElement);
    //console.log("set language");
    if (patterns.length == 0) {
        setTimeout(function() {
            alert(translations[document.documentElement.lang].noTablesAlert);
        }, 0);
    } else if (patterns.length == 1 && allNA(tablesElement.children[0])) {
        setTimeout(function() {
            alert(translations[document.documentElement.lang].noCompatibleFormsAlert);
        }, 0);
    }
}

async function analyzeAndShowPatterns(formData) {
    formDataObj = Object.fromEntries(formData);
    const tablePattern = categories.map((c) => formDataObj[c]).join("");
    if (tableComplexity(tablePattern) >= 256) {
        alert(translations[document.documentElement.lang].tablesTooComplexAlert);
        return;
    }
    document.getElementById("loader").classList.remove("hidden");
    await new Promise((resolve) => setTimeout(resolve, 0));
    let json;
    if (selectedWordClass == "noun") {
        mascJson = await getJson("masculineNoun");
        femJson = await getJson("feminineNoun");
        neuJson = await getJson("neuterNoun");
        json = mascJson.concat(femJson).concat(neuJson);
    } else {
        json = await getJson(selectedWordClass);
    }
    //console.log("read json");
    const hideDefective = formDataObj.hideDefective == "on";
    const onlySuffix = formDataObj.onlySuffix == "on";
    const includeVariants = formDataObj.includeVariants == "on";
    const lexemes = filterData(json, formDataObj.filterInflection, formDataObj.filterForm, includeVariants);
    if (lexemes.error != undefined) {
        const trans = translations[document.documentElement.lang];
        switch (lexemes.error) {
            case "filterParseError":
                alert(trans.filterParseErrorAlert);
                break;
            case "unknownFeature":
                alert(trans.unknownFeatureAlert + ": '" + lexemes.errorCause + "'");
                break;
            case "contradictoryFeatures":
                alert(trans.contradictoryFeaturesAlert + ": "
                    + lexemes.errorCause[0] + " " + trans.and + " " + lexemes.errorCause[1]);
                break;
            default:
                alert("Unknown filter error. This should never happen, so contact me if it does.");
        }
        document.getElementById("loader").classList.add("hidden");
        return;
    } else if (lexemes.length == 0) {
        const trans = translations[document.documentElement.lang];
        alert(trans.noWordsLeftAlert);
        document.getElementById("loader").classList.add("hidden");
        return;
    }
    const patterns = analyzeAll(lexemes, tablePattern, hideDefective, onlySuffix, includeVariants);
    //console.log("analyzed");
    showPatterns(patterns, tablePattern);
    document.getElementById("loader").classList.add("hidden");
}

function selectWordClass(wordClass) {
    document.getElementById("wordFilter").classList.remove("hidden");
    for (const category of categories) {
        const featureElement = document.getElementById(category + "Picker");
        if (availableCategories[wordClass].includes(category)) {
            featureElement.classList.remove("hidden");
        } else {
            featureElement.children[1].value = "*";
            featureElement.classList.add("hidden");
        }
    }
    selectedWordClass = wordClass;
    document.getElementById("analyzeButton").classList.remove("hidden");
    document.getElementById("defectivePatterns").classList.remove("hidden");
    document.getElementById("onlySuffix").classList.remove("hidden");
    document.getElementById("includeVariants").classList.remove("hidden");
}

function updateSettings(wordClass, features) {
    document.getElementById("wordClass").value = wordClass;
    document.getElementById("filterInflection").value = "";
    document.getElementById("filterForm").value = "";
    selectWordClass(wordClass);
    for (const [category, value] of Object.entries(features)) {
        document.getElementById(category + "Picker").children[1].value = value;
    }
    document.getElementById("defectivePatternsCheckbox").checked = false;
    document.getElementById("onlySuffixCheckbox").checked = false;
    document.getElementById("includeVariantsCheckbox").checked = false;
}

async function viewPrecomputed(settings) {
    switch (settings) {
        case "noun":
            updateSettings("noun", { case: "-", number: "|", definiteness: "|" });
            break;
        case "indefNoun":
            updateSettings("noun", { case: "-", number: "|", definiteness: "I" });
            break;
        case "masculineNoun":
            updateSettings("masculineNoun", { case: "-", number: "|", definiteness: "|" });
            break;
        case "indefMasculineNoun":
            updateSettings("masculineNoun", { case: "-", number: "|", definiteness: "I" });
            break;
        case "feminineNoun":
            updateSettings("feminineNoun", { case: "-", number: "|", definiteness: "|" });
            break;
        case "indefFeminineNoun":
            updateSettings("feminineNoun", { case: "-", number: "|", definiteness: "I" });
            break;
        case "neuterNoun":
            updateSettings("neuterNoun", { case: "-", number: "|", definiteness: "|" });
            break;
        case "indefNeuterNoun":
            updateSettings("neuterNoun", { case: "-", number: "|", definiteness: "I" });
            break;
        case "adjective":
            updateSettings("adjective", { case: "-", number: "-", definiteness: "-", gender: "|", degree: "|" });
            break;
        case "strongPositiveAdjective":
            updateSettings("adjective", { case: "-", number: "-", definiteness: "I", gender: "|", degree: "P" });
            break;
        case "activeVerb":
            updateSettings("verb", { case: "*", person: "-", number: "-", gender: "*", definiteness: "*", degree: "*",
                tense: "|", mood: "|", voice: "A", verbType: "*", impersonalSubject: "*", clippedImperative: "*" });
            break;
        case "activeIndicativeVerb":
            updateSettings("verb", { case: "*", person: "-", number: "-", gender: "*", definiteness: "*", degree: "*",
                tense: "|", mood: "I", voice: "A", verbType: "*", impersonalSubject: "*", clippedImperative: "*" });
            break;
        case "pastParticiple":
            updateSettings("verb", { case: "-", person: "*", number: "-", gender: "|", definiteness: "I", degree: "*",
                tense: "*", mood: "*", voice: "*", verbType: "p", impersonalSubject: "*", clippedImperative: "*" });
            break;
        case "numeral":
            updateSettings("numeral", { case: "-", number: "-", gender: "|" });
            break;
        case "ordinal":
            updateSettings("ordinal", { case: "-", number: "-", gender: "|" });
            break;
        case "persPronoun":
            updateSettings("personalPronoun", { case: "-", number: "|" });
            break;
        case "refPronoun":
            updateSettings("reflexivePronoun", { case: "-" });
            break;
        case "otherPronoun":
            updateSettings("otherPronoun", { case: "-", number: "-", gender: "|" });
            break;
        case "defArticle":
            updateSettings("definiteArticle", { case: "-", number: "-", gender: "|" });
            break;
        case "adverb":
            updateSettings("adverb", { degree: "|" });
            break;
    }
    //console.log("html");
    const html = await fetch(`precomputedTables/${settings}.html`)
            .then((response) => response.text());
    
    //console.log("lang");
    const tablesElement = document.getElementById("tables");
    tablesElement.innerHTML = html;
    setLanguage(document.documentElement.lang, tablesElement);
    //console.log("done");
}