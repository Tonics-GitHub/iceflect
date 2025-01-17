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

        filterInflection: "Filter inflection",
        withForm: "with form",

        defaultLemma: "Default: lemma",
        defaultAny: "Default: any",

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
              "<a href=\"https://bin.arnastofnun.is/DMII/infl-system/\" target='_blank'\">here</a>. " +
              "A list of the possible inflections can be found " +
              "<a href=\"https://bin.arnastofnun.is/DMII/LTdata/tagset/\" target='_blank'\">here</a>. " +
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
              "under the tables. The words under that are the 200 most common words adhering to the pattern.<br>" +

              "The filter is used to restrict the analysis to a subset of the words. The inflection field is used " +
              "to specify the inflection to apply the restriction to. It uses the inflection abbreviations used " +
              "in the table headings, in any of the three available languages. " +
              "It is case-insensitive, with periods optional. For example, 'indef nom sg' works. The form field " +
              "specifies which words to include. It allows the same format as is used in the tables, including / for options " +
              "and () for grouping. For example, -ur/-i, -æ...æ-, and -ing(ur/i/) all work.",
        
        noTablesAlert: "No tables to show. Try unchecking 'Exclude pattern with missing forms'.",
        noCompatibleFormsAlert: "No forms are compatible with any table inflections. " + 
                                "Try changing 'undefined' values to a defined value or vary by row/column, or the reverse.",
        tablesTooComplexAlert: "The tables are too complex. " +
                               "Try changing a 'vary by row/column' setting to a single feature.",
        filterParseErrorAlert: "Filter form parse error",
        unknownFeatureAlert: "Unknown feature",
        contradictoryFeaturesAlert: "Contradictory features",
        noWordsLeftAlert: "No words left after filtering"
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

        filterInflection: "Sía beygingu",
        withForm: "með beygingarmynd",

        defaultLemma: "Sjálfgildi: flettimynd",
        defaultAny: "Sjálfgildi: allar",

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
              "Orðin fyrir neðan eru 200 algengustu orðin sem fylgja mynstrinu.<br>" +

              "Sían er notaður til að takmarka greininguna við hlutmengi orðanna. Beygingarreiturinn er notaður " +
              "til að tilgreina beyginguna sem á að beita takmörkuninni á. Hann notar beygingarfræðilegar " +
              "skammstafanir sem eru notaðar í fyrirsögnum taflna, á einhverju af þremur tiltækum tungumálum. " +
              "Hann er ekki háður há- eða lágstöfum, og punktar eru valkvæðir. Til dæmis virkar " +
              "'án gr nf et'. Myndreiturinn tilgreinir hvaða orð á að taka með. Hann leyfir sama snið " +
              "og er notað í töflunum, þar á meðal / fyrir valkosti " + "og () fyrir hópun. " +
              "Til dæmis virka -ur/-i, -æ...æ-, og -ing(ur/i/) öll.",
        
        noTablesAlert: "Engar töflur til að sýna. Reyndu að afmerkja 'Undanskil mynstur sem vantar beygingarmyndir'.",
        noCompatibleFormsAlert: "Engin form eru samhæf við nein töflubeygingar. Reyndu að breyta 'óskilgreindum' " +
                                "gildum í skilgreind gildi eða breyta eftir röðum/dálkum, eða öfugt.",
        tablesTooComplexAlert: "Töflurnar eru of flóknar. " +
                               "Reyndu að breyta 'breytast eftir röð/dálki' stillingu í eina eiginleika.",
        filterParseErrorAlert: "Villa við greiningu á síumynd",
        unknownFeatureAlert: "Óþekkt beygingargildi",
        contradictoryFeaturesAlert: "Mótsagnakennd beygingargildi",
        noWordsLeftAlert: "Engin orð eftir eftir síun"
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

        filterInflection: "Filtrera böjning",
        withForm: "med form",

        defaultLemma: "Standardinställning: lemma",
        defaultAny: "Standardinställning: alla",

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
              "Orden under det är de 200 vanligaste orden som följer mönstret.<br>" +

              "Filtret används för att begränsa analysen till en delmängd av orden. Böjningsfältet används " +
              "för att ange den böjningsform som begränsningen ska tillämpas på. Det använder " +
              "böjningsförkortningarna som används i tabellrubrikerna, på något av de tre tillgängliga språken. " +
              "Det är skiftlägesokänsligt och punkter är valfria. Till exempel, 'obest nom sg' fungerar. " +
              "Formfältet anger vilka ord som ska inkluderas. Det tillåter samma format som används " +
              "i tabellerna, tillsammans med / för alternativ och () för gruppering. Till exempel, både" +
              "-ur/-i, -æ...æ- och -ing(ur/i/) fungerar.",
        
        noTablesAlert: "Inga tabeller att visa. Testa att avmarkera \"Exkludera mönster som saknar former\".",
        noCompatibleFormsAlert: "Inga former är kompatibla med någon tabbellböjning. " + 
                                "Testa att ändra \"odefinierat\"-värden till ett definierat värde eller variera med rad/kolumn, eler det omvända.",
        tablesTooComplexAlert: "Tabellerna är för komplexa. " +
                               "Testa att ändra en \"variera med rad/kolumn\"-inställning till ett enda värde.",
        filterParseErrorAlert: "Syntaxfel i filterform",
        unknownFeatureAlert: "Okänt böjningsvärde",
        contradictoryFeaturesAlert: "Motsägelsefulla böjningsvärden",
        noWordsLeftAlert: "Inga ord kvar efter filtrering"
    }
};