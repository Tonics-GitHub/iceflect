
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
        grammaticalCase, person, number, gender, definiteness, degree,
        tense, mood, voice, verbType, impersonalSubject, clippedImperative
    ],
    numeral: [grammaticalCase, number, gender],
    ordinal: [grammaticalCase, number, gender],
    personalPronoun: [grammaticalCase, number],
    reflexivePronoun: [grammaticalCase],
    otherPronoun: [grammaticalCase, number, gender],
    definiteArticle: [grammaticalCase, number, gender],
    adverb: [degree]
}

const categoryValues = [
    ["N", "A", "D", "G"],
    ["1", "2", "3"],
    ["S", "P"],
    ["I", "D"],
    ["M", "F", "N"],
    ["P", "C", "S"],
    ["P", "p"],
    ["I", "S"],
    ["A", "M"],
    ["I", "i", "P", "p", "S", "!", "O", "Q"],
    ["A", "D", "G", "d"],
    ["C"]
]

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

let selectedWordClass = ""
let dataRead = {};

function selectWordClass(wordClass) {
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

function allCombinationsRec(char, tablePattern, idx, currComb, combs) {
    if (idx == -1) {
        combs.push(currComb);
        return;
    }
    if (tablePattern.charAt(idx) != char) {
        allCombinationsRec(char, tablePattern, idx - 1, "*" + currComb, combs);
    } else {
        for (const value of categoryValues[idx]) {
            allCombinationsRec(char, tablePattern, idx - 1, value + currComb, combs);
        }
    }
}

function allRowCombinations(tablePattern) {
    allCombs = [];
    allCombinationsRec("-", tablePattern, 11, "", allCombs);
    return allCombs;
}

function allColCombinations(tablePattern) {
    allCombs = [];
    allCombinationsRec("|", tablePattern, 11, "", allCombs);
    return allCombs;
}

function combineInflections(inflection1, inflection2) {
    inflection = "";
    for (let i = 0; i < 12; i++) {
        char1 = inflection1.charAt(i);
        if (char1 == "*" || char1 == "-" || char1 == "|") {
            inflection += inflection2.charAt(i);
        } else {
            inflection += char1;
        }
    }
    return inflection;
}

function isPatternCompatibleWith(pattern, tablePattern) {
    for (let i = 0; i < 12; i++) {
        const c = pattern.charAt(i);
        const tc = tablePattern.charAt(i);
        if (tc != "-" && tc != "|" && c != tc && c != "*") {
            return false;
        }
    }
    return true;
}

function findCompatible(inflection, pattern) {
    for (const pInflection in pattern) {
        if (isPatternCompatibleWith(pInflection, inflection)) {
            return pattern[pInflection];
        }
    }
    return null;
}

function minLength(forms) {
    let min = Number.MAX_VALUE;
    for (form of forms) {
        if (form.length < min) {
            min = form.length;
        }
    }
    return min;
}

function makeStem(forms, minLen) {
    let stem = "";
    for (let i = 0; i < minLen; i++) {
        let allSame = true;
        const c = forms[0].charAt(i).toLowerCase();
        for (let j = 1; j < forms.length; j++) {
            if (c != forms[j].charAt(i).toLowerCase()) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            stem += c;
        } else {
            stem += "*";
        }
    }
    return stem.replace(/\*+$/, "");
}

function isJVOrVowel(char) {
    return "aáeéiíjoóuúvyýæö".indexOf(char.toLowerCase()) > -1;
}

function formsUsedAsList(forms, includeVariants) {
    if (forms instanceof Array && includeVariants) {
        return forms;
    } else if (forms instanceof Array) {
        return [forms[0]];
    } else {
        return [forms];
    }
}

function areAllJVOrVowelAt(forms, idx) {
    for (const [_, variants] of Object.entries(forms)) {
        for (const form of variants) {
            if (!isJVOrVowel(form.charAt(idx))) {
                return false;
            }
        }
    }
    return true;
}

function combineAt(forms, idx) {
    let altForms = {};
    let changed = false;
    for (let [inflection, variants] of Object.entries(forms)) {
        altForms[inflection] = [];
        for (const form of variants) {
            if (form.length > idx + 1 && isJVOrVowel(form.charAt(idx + 1), idx)) {
                changed = true;
                const combinedChar = String.fromCharCode(form.charCodeAt(idx) * 256 + form.charCodeAt(idx + 1));
                const altForm = form.substring(0, idx) + combinedChar + form.substring(idx + 2);
                altForms[inflection].push(altForm);
            } else {
                altForms[inflection].push(form);
            }
        }
    }
    if (changed) {
        return altForms;
    }
    return null;
}

function decode(affix) {
    for (let i = 0; i < affix.length; i++) {
        const charCode = affix.charCodeAt(i);
        if (charCode > 255) {
            const decoded = String.fromCharCode(charCode / 256) + String.fromCharCode(charCode % 256);
            return affix.substring(0, i) + decoded + affix.substring(i + 1);
        }
    }
    return affix;
}

function analyze(lexeme, tablePattern, onlySuffix, includeVariants) {
    let forms = Object.fromEntries(Object.entries(lexeme.forms).filter(
        ([pattern, _]) => isPatternCompatibleWith(pattern, tablePattern)
    ).map(
        ([pattern, variants]) => [pattern, formsUsedAsList(variants, includeVariants)]
    ));
    if (Object.keys(forms).length === 0) {
        return {pattern: {}};
    }
    const formValues = Object.values(forms).flat();
    const minLen = minLength(formValues);
    let stem = makeStem(formValues, minLen);
    let stemLen = stem.replaceAll("*", "").length;
    let betterForms = null;
    for (let i = 0; i < minLen; i++) {
        if (areAllJVOrVowelAt(forms, i)) {
            const altForms = combineAt(forms, i);
            if (altForms) {
                let altStem = makeStem(Object.values(altForms).flat(), minLen);
                let altStemLen = altStem.replaceAll("*", "").length;
                if (altStemLen > stemLen) {
                    stem = altStem;
                    stemLen = altStemLen;
                    betterForms = altForms;
                }
            }
        }
    }
    if (betterForms != null) {
        forms = betterForms;
    }

    /*forms = Object.fromEntries(Object.entries(forms).filter(
        ([pattern, _]) => isPatternCompatibleWith(pattern, tablePattern)
    ));*/

    function constructAffix(form, stem, hasBetterForms, onlySuffix) {
        const formLC = form.toLowerCase();
        let affix = "";
        for (let i = 0; i < stem.length; i++) {
            if (stem.charAt(i) == "*") {
                affix += formLC.charAt(i);
            } else {
                affix += "*";
            }
        }
        affix += form.substring(stem.length);
        affix = affix.replace(/^\*+/, "").replaceAll(/\*+/g, "*");
        if (hasBetterForms) {
            affix = decode(affix);
        }
        return onlySuffix ? affix.match(/[^\*]*$/)[0] : affix;
    }

    pattern = {};
    for (let [inflection, variants] of Object.entries(forms)) {
        affixes = variants.map((form) => constructAffix(form, stem, betterForms != null, onlySuffix));
        pattern[inflection] = affixes;
    }

    return {stem: stem, pattern: pattern};
}

function isDefective(pattern, tablePattern) {
    const rowInflections = allRowCombinations(tablePattern);
    const colInflections = allColCombinations(tablePattern);
    for (const rowInflection of rowInflections) {
        for (const colInflection of colInflections) {
            const inflection = combineInflections(tablePattern, combineInflections(rowInflection, colInflection));
            const affix = findCompatible(inflection, pattern);
            if (affix == null) {
                return true;
            }
        }
    }
    return false;
}

function analyzeAll(lexemes, tablePattern, excludeDefective, onlySuffix, includeVariants) {
    let patterns = new Map();
    for (const lexeme of lexemes) {
        const stemAndPattern = analyze(lexeme, tablePattern, onlySuffix, includeVariants);
        const patternObj = stemAndPattern.pattern;
        const pattern = JSON.stringify(patternObj, Object.keys(patternObj).sort());
        if (patterns.has(pattern)) {
            patternInfo = patterns.get(pattern);
            patternInfo.lexemes.push(lexeme);
            patternInfo.freq += lexeme.freq;
            patternInfo.initialDash = true;
        } else if (!excludeDefective || !isDefective(patternObj, tablePattern)) {
            const stem = stemAndPattern.stem;
            const initialDash = stem === undefined || (stem !== "" && (onlySuffix || stem[0] !== "*"));
            patterns.set(pattern, {freq: lexeme.freq, lexemes: [lexeme], initialDash: initialDash});
        }
    }
    for (const patternInfo of patterns.values()) {
        patternInfo.lexemes.sort((a, b) => b.freq - a.freq);
    }
    return [...patterns.entries()].sort((a, b) => b[1].freq - a[1].freq);
}

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

async function getJson(wordClass) {
    if (dataRead[wordClass]) {
        return dataRead[wordClass];
    }
    const json = await fetch(`data/${wordClass}.json`).then((response) => response.json());
    dataRead[wordClass] = json;
    return json;
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
    const patterns = analyzeAll(json, tablePattern, hideDefective, onlySuffix, includeVariants);
    //console.log("analyzed");
    showPatterns(patterns, tablePattern);
    document.getElementById("loader").classList.add("hidden");
}

function updateSettings(wordClass, features) {
    document.getElementById("wordClass").value = wordClass;
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

function setLanguage(lang, node) {
    const textElements = node.querySelectorAll("[data-text]");
    for (const textElement of textElements) {
        textElement.innerHTML = translations[lang][textElement.getAttribute("data-text")];
    }
    document.getElementById("analyzeButton").setAttribute("value", translations[lang]["analyze"]);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
}

const translations = {
    en: {
        title: "Icelandic inflectional patterns",
        wordClassToAnalyze: "Word class to analyze:",
        selectAWordClass: "Select a word class",
        viewPrecomputedTables: "View precomputed tables:",

        noun: "noun",
        masculineNoun: "masculine noun",
        feminineNoun: "feminine noun",
        neuterNoun: "neuter noun",
        adjective: "adjective",
        verb: "verb",
        numeral: "numeral",
        ordinal: "ordinal",
        personalPronoun: "personal pronoun",
        reflexivePronoun: "reflexive pronoun",
        otherPronoun: "other pronoun",
        definiteArticle: "definite article",
        adverb: "adverb",

        indefNoun: "indefinite noun",
        indefMasculineNoun: "indefinite masculine noun",
        indefFeminineNoun: "indefinite feminine noun",
        indefNeuterNoun: "indefinite neuter noun",
        strongPositiveAdjective: "Strong positive adjective",
        activeVerb: "Active verb",
        activeIndicativeVerb: "Active indicative verb",
        pastParticiple: "Past participle",

        undefined: "undefined",
        varyByRow: "vary by row",
        varyByColumn: "vary by column",

        caseLabel: "Case:",
        personLabel: "Person:",
        numberLabel: "Number:",
        definitenessLabel: "Definiteness:",
        genderLabel: "Gender:",
        degreeLabel: "Degree of comparison:",
        tenseLabel: "Tense:",
        moodLabel: "Mood:",
        voiceLabel: "Voice:",
        verbTypeLabel: "Non-finite verb form:",
        impersonalSubjectLabel: "Impersonal subject:",
        clippedImperativeLabel: "Clipped imperative:",

        excludeDefectivePatterns: "Exclude patterns with missing forms",
        onlyAnalyzeSuffixes: "Only analyze suffixes",
        includeVariantForms: "Include variant forms",

        nominative: "nominative",
        accusative: "accusative",
        dative: "dative",
        genitive: "genitive",
        first: "1st",
        second: "2nd",
        third: "3rd",
        singular: "singular",
        plural: "plural",
        definite: "definite",
        indefinite: "indefinite",
        masculine: "masculine",
        feminine: "feminine",
        neuter: "neuter",
        positive: "positive",
        comparative: "comparative",
        superlative: "superlative",
        present: "present",
        past: "past",
        indicative: "indicative",
        subjunctive: "subjunctive",
        active: "active",
        mediopassive: "mediopassive",
        impersonal: "impersonal",
        infinitive: "infinitive",
        presentParticiple: "present participle",
        pastParticiple: "past participle",
        supine: "supine",
        imperative: "imperative",
        optative: "optative",
        questionForm: "question form",
        accusativeSubject: "accusative subject",
        dativeSubject: "dative subject",
        genitiveSubject: "genitive subject",
        dummySubject: "dummy subject",
        clippedImperative: "clipped imperative",

        analyze: "Analyze",

        nom: "Nom.",
        acc: "Acc.",
        dat: "Dat.",
        gen: "Gen.",
        fstP: "1st",
        sndP: "2nd",
        trdP: "3rd",
        sg: "Sg.",
        pl: "Pl.",
        indef: "Indef.",
        def: "Def.",
        masc: "Masc.",
        fem: "Fem.",
        neu: "Neu.",
        pos: "Pos.",
        comp: "Comp.",
        super: "Super.",
        pres: "Pres.",
        pst: "Pst.",
        ind: "Ind.",
        subj: "Subj.",
        act: "Act.",
        mid: "Mid.",
        impers: "Impers.",
        inf: "Inf.",
        presPart: "Pres. part.",
        pstPart: "Pst. part.",
        sup: "Sup.",
        imp: "Imp.",
        opt: "Opt.",
        ques: "Ques.",
        accSub: "Acc. sub.",
        datSub: "Dat. sub.",
        genSub: "Gen. sub.",
        dummySub: "Dummy sub.",
        clipped: "Clipped",

        and: "and",
        more: "more",

        info: "On this page you can define and view tables of inflectional patterns for Icelandic words. " +
              "Start with clicking some of the buttons on the left to view precomputed tables. " +
              "This should give you an idea about how to use the drop-down menus to define " +
              "your own table structures. " +
              "The word classes and inflectional categories used can be found " +
              "<a href=\"https://bin.arnastofnun.is/DMII/infl-system/ target='_blank'\">here</a>. " +
              "A list of the possible inflections can be found " +
              "<a href=\"https://bin.arnastofnun.is/DMII/LTdata/tagset/ target='_blank'\">here</a>. " +
              "Note that this page consistently uses the terms \"indefinite\" and \"definite\" to refer " +
              "to the strong and weak forms of adjectives respectively. Dealing with verb conjugation, " +
              "especially when the last three inflectional categories are involved, " +
              "can currently be clunky and inflexible. This will hopefully be fixed in the future.<br>" +

              "The affixes of a pattern consist of characters that differ between the relevant inflectional " +
              "forms, i.e. those described in the tables. This means that the resulting affixes may change " +
              "depending on how the tables are defined. " +
              "<b>The analysis is very imperfect and should be taken with a grain of salt.</b> " +
              "The patterns are sorted in order of frequency of which a word adhering to the pattern " +
              "appears in Icelandic texts, out of all words analyzed. This is the percentage found " +
              "under the tables. The words under that are the 200 most common words adhering to the pattern.",
        
        noTablesAlert: "No tables to show. Try unchecking 'Exclude pattern with missing forms'.",
        noCompatibleFormsAlert: "No forms are compatible with any table inflections. " + 
                                "Try changing 'undefined' values to a defined value or vary by row/column, or the reverse.",
        tablesTooComplexAlert: "The tables are too complex. " +
                               "Try changing a 'vary by row/column' setting to a single feature."
    },
    is: {
        title: "Íslensk beygingarmynstur",
        wordClassToAnalyze: "Orðflokkur til að greina:",
        selectAWordClass: "Veldu orðflokk",
        viewPrecomputedTables: "Sýn fyrirútreiknaðar töflur:",

        noun: "nafnorð",
        masculineNoun: "karlkynsnafnorð",
        feminineNoun: "kvenkynsnafnorð",
        neuterNoun: "hvorugkynsnafnorð",
        adjective: "lýsingarorð",
        verb: "sagnorð",
        numeral: "töluorð",
        ordinal: "raðtal",
        personalPronoun: "persónufornafn",
        reflexivePronoun: "afturbeygt fornafn",
        otherPronoun: "annað fornafn",
        definiteArticle: "laus greinir",
        adverb: "atviksorð",

        indefNoun: "nafnorð án greinis",
        indefMasculineNoun: "karlkynsnafnorð án greinis",
        indefFeminineNoun: "kvenkynsnafnorð án greinis",
        indefNeuterNoun: "hvorugkynsnafnorð án greinis",
        strongPositiveAdjective: "Sterkt frumstig lýsingarorð",
        activeVerb: "germyndarsögn",
        activeIndicativeVerb: "germyndarframsögusögn",
        pastParticiple: "lýsingarháttur þátíðar",

        undefined: "óskilgreint",
        varyByRow: "breyt eftir röð",
        varyByColumn: "breyt eftir dálki",

        caseLabel: "Fall:",
        personLabel: "Persóna:",
        numberLabel: "Tala:",
        definitenessLabel: "Ákveðni:",
        genderLabel: "Kyn:",
        degreeLabel: "Stig:",
        tenseLabel: "Tíð:",
        moodLabel: "Háttur:",
        voiceLabel: "Mynd:",
        verbTypeLabel: "Aðrar sagnbeygingar:",
        impersonalSubjectLabel: "Ópersónuleg sagnbeyging:",
        clippedImperativeLabel: "Stýfður boðháttur:",

        excludeDefectivePatterns: "Undanskil mynstur sem vantar beygingarmyndir",
        onlyAnalyzeSuffixes: "Greina aðeins viðskeyti",
        includeVariantForms: "Fela í sér afbrigði af beygingarmyndum",

        nominative: "nefnifall",
        accusative: "þolfall",
        dative: "þágufall",
        genitive: "eignarfall",
        first: "1.",
        second: "2.",
        third: "3.",
        singular: "eintala",
        plural: "fleirtala",
        definite: "með greini",
        indefinite: "án greinis",
        masculine: "karlkyn",
        feminine: "kvenkyn",
        neuter: "hvorugkyn",
        positive: "frumstig",
        comparative: "miðstig",
        superlative: "efsta stig",
        present: "nútið",
        past: "þátið",
        indicative: "framsöguháttur",
        subjunctive: "viðtengingarháttur",
        active: "germynd",
        mediopassive: "miðmynd",
        impersonal: "ópersónulegt",
        infinitive: "nafnháttur",
        presentParticiple: "lýsingarháttur nútíðar",
        pastParticiple: "lýsingarháttur þátíðar",
        supine: "sagnbót",
        imperative: "boðháttur",
        optative: "óskháttur",
        questionForm: "spurnarmynd",
        accusativeSubject: "þolfallsfrumlag",
        dativeSubject: "þágufallsfrumlag",
        genitiveSubject: "egnarfallsfrumlag",
        dummySubject: "gervifrumlag",
        clippedImperative: "stýfður boðháttur",

        analyze: "Grein",

        nom: "Nf.",
        acc: "Þf.",
        dat: "Þgf.",
        gen: "Ef.",
        fstP: "1.",
        sndP: "2.",
        trdP: "3.",
        sg: "Et.",
        pl: "Ft.",
        indef: "án gr.",
        def: "með gr.",
        masc: "Kk.",
        fem: "Kvk.",
        neu: "Hk.",
        pos: "Frums.",
        comp: "Miðs.",
        super: "Efsta",
        pres: "Nt.",
        pst: "Þt.",
        ind: "Fsh.",
        subj: "Vth.",
        act: "Germ.",
        mid: "Miðm.",
        impers: "Ópers.",
        inf: "Nh.",
        presPart: "Lh. nt.",
        pstPart: "Lh. þt.",
        sup: "Sagnb.",
        imp: "Bh.",
        opt: "Óh.",
        ques: "Spurn.",
        accSub: "Ópers. þff.",
        datSub: "Ópers. þgff.",
        genSub: "Ópers. eff.",
        dummySub: "Ópers. gf.",
        clipped: "Stý. bh.",

        and: "og",
        more: "fleiri",

        info: "Á þessari síðu geturðu skilgreint og skoðað töflur með beygingarmynstrum fyrir íslensk orð. " +
              "Byrjaðu á því að smella á hnappana til vinstri til að skoða fyrirfram skilgreindar töflur, " +
              "sem ættu að gefa þér hugmynd um hvernig fellivalmyndirnar eru notaðar til að skilgreina eigin töflur. " +
              "Flokkar orða og beygingarflokka sem eru notaðir finnast " +
              "<a href=\"https://bin.arnastofnun.is/malfraedi/\" target='_blank'>hér</a>. " +
              "Listi yfir allar mögulegar beygingar er " +
              "<a href=\"https://bin.arnastofnun.is/mark/\" target='_blank'>hér</a>. " +
              "Athugaðu að þessi síða notar orðin \"án greinis\" og \"með greini\" fyrir " +
              "sterk og veik form lýsingarorða, í þeirri röð. Beyging sagnorða, " +
              "sérstaklega síðustu þrír beygingarflokkarnir, " +
              "getur verið klunnaleg og óþjált að nota. Vonandi verður þetta lagað með tímanum.<br>" +
              "Aðskeytin fyrir mynstur samanstanda af táknum sem eru mismunandi milli viðkomandi " +
              "beygingarmynda, þ.e. þeirra sem eru lýst í töflunum. Þetta þýðir að aðskeytin geta " +
              "breyst eftir því hvernig töflurnar eru skilgreindar. " +
              "<b>Greiningin er langt frá því að vera fullkomin og ætti að taka með fyrirvara.</b> " +
              "Mynstrin eru flokkuð eftir því hve oft orð sem fylgja mynstrinu koma fyrir í íslenskum textum, " +
              "miðað við öll greind orð. Þetta er það hlutfall sem gefið er upp undir töflunum. " +
              "Orðin fyrir neðan eru 200 algengustu orðin sem fylgja mynstrinu.",

        
        noTablesAlert: "Engar töflur til að sýna. Reyndu að afmerkja 'Undanskil mynstur sem vantar beygingarmyndir'.",
        noCompatibleFormsAlert: "Engin form eru samhæf við nein töflubeygingar. Reyndu að breyta 'óskilgreindum' " +
                                "gildum í skilgreind gildi eða breyta eftir röðum/dálkum, eða öfugt.",
        tablesTooComplexAlert: "Töflurnar eru of flóknar. " +
                               "Reyndu að breyta 'breytast eftir röð/dálki' stillingu í eina eiginleika."
    },
    sv: {
        title: "Isländska böjningsmönster",
        wordClassToAnalyze: "Ordklass att analysera:",
        selectAWordClass: "Välj en ordklass",
        viewPrecomputedTables: "Visa förberäknade tabeller:",

        noun: "substantiv",
        masculineNoun: "maskulint substantiv",
        feminineNoun: "feminint substantiv",
        neuterNoun: "neutralt substantiv",
        adjective: "adjektiv",
        verb: "verb",
        numeral: "kardinaltal",
        ordinal: "ordinaltal",
        personalPronoun: "personligt pronomen",
        reflexivePronoun: "reflexivt pronomen",
        otherPronoun: "annat pronomen",
        definiteArticle: "bestämd artikel",
        adverb: "adverb",

        indefNoun: "obestämt substantivt",
        indefMasculineNoun: "obestämt maskulint substantiv",
        indefFeminineNoun: "obestämt feminint substantiv",
        indefNeuterNoun: "obestämt neutralt substantiv",
        strongPositiveAdjective: "starkt positivt adjektiv",
        activeVerb: "aktivt verb",
        activeIndicativeVerb: "aktivt indikativt verb",
        pastParticiple: "perfekt particip",

        undefined: "odefinierat",
        varyByRow: "variera med rad",
        varyByColumn: "variera med kolumn",

        caseLabel: "Kasus:",
        personLabel: "Person:",
        numberLabel: "Numerus:",
        definitenessLabel: "Bestämdhet:",
        genderLabel: "Genus:",
        degreeLabel: "Komparationsgrad:",
        tenseLabel: "Tempus:",
        moodLabel: "Modus:",
        voiceLabel: "Diates:",
        verbTypeLabel: "Icke-finita verbformer:",
        impersonalSubjectLabel: "Opersonligt subjekt:",
        clippedImperativeLabel: "Klippt imperativ:",

        excludeDefectivePatterns: "Exkludera mönster som saknar former",
        onlyAnalyzeSuffixes: "Analysera bara suffix",
        includeVariantForms: "Inkludera alternativa former",

        nominative: "nominativ",
        accusative: "ackusativ",
        dative: "dativ",
        genitive: "genitiv",
        first: "1:a",
        second: "2:a",
        third: "3:e",
        singular: "singularis",
        plural: "pluralis",
        definite: "bestämd",
        indefinite: "obestämd",
        masculine: "maskulinum",
        feminine: "femininum",
        neuter: "neutrum",
        positive: "positiv",
        comparative: "komparativ",
        superlative: "superlativ",
        present: "presens",
        past: "preteritum",
        indicative: "indikativ",
        subjunctive: "konjunktiv",
        active: "aktiv",
        mediopassive: "mediopassiv",
        impersonal: "opersonlig",
        infinitive: "infinitiv",
        presentParticiple: "presens particip",
        pastParticiple: "perfekt particip",
        supine: "supinum",
        imperative: "imperativ",
        optative: "optativ",
        questionForm: "frågeform",
        accusativeSubject: "ackusativt subjekt",
        dativeSubject: "dativt subjekt",
        genitiveSubject: "genitivt subjekt",
        dummySubject: "expletivt subjekt",
        clippedImperative: "klippt imperativ",

        analyze: "Analysera",

        nom: "Nom.",
        acc: "Ack.",
        dat: "Dat.",
        gen: "Gen.",
        fstP: "1:a",
        sndP: "2:a",
        trdP: "3:e",
        sg: "Sg.",
        pl: "Pl.",
        indef: "Obest.",
        def: "Best.",
        masc: "Mask.",
        fem: "Fem.",
        neu: "Neu.",
        pos: "Pos.",
        comp: "Komp.",
        super: "Super.",
        pres: "Pres.",
        pst: "Pret.",
        ind: "Ind.",
        subj: "Konj.",
        act: "Akt.",
        mid: "Med.",
        impers: "Impers.",
        inf: "Inf.",
        presPart: "Pres. part.",
        pstPart: "Perf. part.",
        sup: "Sup.",
        imp: "Imp.",
        opt: "Opt.",
        ques: "Fråg.",
        accSub: "Ack. sub.",
        datSub: "Dat. sub.",
        genSub: "Gen. sub.",
        dummySub: "Expl. sub.",
        clipped: "Klippt",

        and: "och",
        more: "fler",

        info: "På denna sida kan du definiera och se tableller med böjningsmönster för isländska ord. " +
              "Börja med att klicka på knapparna till vänster för att se fördefinierade tabeller, " +
              "vilket borde ge dig en idé om hur rullgardinsmenyerna används för att definiera egna tabeller. " +
              "Ordklasserna och böjningskategorierna som används hittas " +
              "<a href=\"https://bin.arnastofnun.is/DMII/infl-system/\" target='_blank'\">här</a>. " +
              "En lista över alla möjliga böjningar hittas " +
              "<a href=\"https://bin.arnastofnun.is/DMII/LTdata/tagset/\" target='_blank'\">här</a>. " +
              "Notera att denna sida använder orden \"obestämd\" och \"bestämd\" för " +
              "adjektivens starka respektive svaga former. Verbböjningen, " +
              "framför allt de tre sista böjningskategorierna, " +
              "kan vara klumpiga och oflexibla att använda. Detta kommer förhoppningsvis fixas så småningom.<br>" +
              "Affixen för ett mönster består av tecken som skiljer sig åt mellan de relavanta " +
              "böjningsformerna, alltså de som beskrivs av tabellerna. Detta betyder att affixen kan " +
              "förändras beroende på hur tabellerna är definierade. " +
              "<b>Analysen är långt ifrån perfekt och bör tas ned en nypa salt.</b> " +
              "Mönstren sorteras efter hur ofta ett ord som följer mönstret förekommer i isländska texter, " +
              "av alla analyserade ord. Detta är den procentsats som anges under tabellerna. " +
              "Orden under det är de 200 vanligaste orden som följer mönstret.",
        
        noTablesAlert: "Inga tabeller att visa. Testa att avmarkera \"Exkludera mönster som saknar former\".",
        noCompatibleFormsAlert: "Inga former är kompatibla med någon tabbellböjning. " + 
                                "Testa att ändra \"odefinierat\"-värden till ett definierat värde eller variera med rad/kolumn, eler det omvända.",
        tablesTooComplexAlert: "Tabellerna är för komplexa. " +
                               "Testa att ändra en \"variera med rad/kolumn\"-inställning till ett enda värde."
    }
};