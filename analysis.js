
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
        const char1 = inflection1.charAt(i);
        const char2 = inflection2.charAt(i);
        if (char1 == "*" || char1 == "-" || char1 == "|") {
            inflection += inflection2.charAt(i);
        } else if (char2 == "*" || char2 == "-" || char2 == "|") {
            inflection += char1;
        } else {
            return null;
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

function findCompatibleInflection(inflection, forms) {
    if (forms[inflection] != undefined) {
        return inflection;
    }
    for (const pInflection in forms) {
        if (isPatternCompatibleWith(pInflection, inflection)) {
            return pInflection;
        }
    }
    return null;
}

function findCompatible(inflection, pattern) {
    if (pattern[inflection] != undefined) {
        return pattern[inflection];
    }
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
    for (const variants of Object.values(forms)) {
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

function analyze(forms, tablePattern, onlySuffix, includeVariants) {
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
        const affixes = variants.map((form) => constructAffix(form, stem, betterForms != null, onlySuffix))
            .filter((affix, index, array) => array.indexOf(affix) == index);
        pattern[inflection] = affixes;
    }

    return { stem: stem, pattern: pattern };
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
        let forms = Object.fromEntries(Object.entries(lexeme.forms).filter(
            ([pattern, _]) => isPatternCompatibleWith(pattern, tablePattern)
        ).map(
            ([pattern, variants]) => [pattern, formsUsedAsList(variants, includeVariants)]
        ));
        const stemAndPattern = analyze(forms, tablePattern, onlySuffix, includeVariants);
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