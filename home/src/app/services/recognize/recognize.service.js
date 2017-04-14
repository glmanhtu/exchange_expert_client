(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .factory('recognizeService', recognizeService);
    recognizeService.$inject = ['$http','$timeout','DOMAIN_URL', '$rootScope'];

    /* @ngInject */
    function recognizeService($http, $timeout, DOMAIN_URL, $rootScope) {
        var service = {};
        service.exportKeyword = exportKeyword;

        // Store the location where user want to exchange
        $rootScope.locationSearch = "";

        // Check if current typing is done to fetch suggests
        $rootScope.isCompletedSearch = false;

        return service;      

        function exportKeyword(input) {            
            var transform = transformWords(removePreposition(input));
            return splitWords(transform);
        }

        function splitWords(transformed) {
            transformed = transformed.replace(/(\[\w*\])(\[\w*\])/, '$1');
            var keyword = transformed.match(/^[^[]*/)[0];       
            var regex = /\[(\w*)\]([^[]*)?/g;     

            var matches, predicates = [];
            predicates = { "title" : keyword };
            $rootScope.isCompletedSearch = true;
            while (matches = regex.exec(transformed)) {
                var predicate = processingPredicate(matches);
                for (var attribute in predicate) {
                    predicates[attribute] = predicate[attribute];
                }
            }            
            return predicates;
        }

        function processingPredicate(matches) {            
            switch (matches[1]) {
                case "price":
                    return pricePredicate(matches[2]);
                case "location":
                    return locationPredicate(matches[2]);
                case "seller":
                    return sellerPredicate(matches[2]);
                case "[order]newest":
                    return orderPredicate("postDate", false);
            }
        }

        function orderPredicate(field, isAsc) {            
            return {
                "order" : {
                    "by" : field,
                    "isASC" : isAsc
                }
            };
        }

        function sellerPredicate(input) {
            $rootScope.isCompletedSearch = !(!input);
            return {
                "seller" : input
            }
        }

        function pricePredicate(input) {            
            var regex = /\$\s*(\d+)/g;
            var matches, results = [];
            while (matches = regex.exec(input)) {                
                results.push(parseInt(matches[1]));
            }
            console.log("price: " + input);
            console.log(results);
            var from, to;
            if (results.length > 1) {                
                if (results[0] > results[1]) {
                    from = results[1];
                    to = results[0];
                } else {
                    from = results[0];
                    to = results[1];
                }                
            } else if (results.length == 1) {
                var lowers = ['lower', 'smaller'];
                if (new RegExp(lowers.join("|")).test(input)) {
                    from = 0;
                    to = results[0];                    
                } else {                    
                    from = results[0],
                    to = 2147483647             
                }
            }            
            $rootScope.isCompletedSearch = !(!from && !to);
            return {
                "price" : {
                    "from" : from,
                    "to" : to
                }
            };
        }

        function locationPredicate(input) {      
            $rootScope.isCompletedSearch = !(!input);
            $rootScope.locationSearch = input;      
        }

        function transformWords(cleansed_string) {
            if (!cleansed_string) {
                return cleansed_string;
            }
            var x;
            var y;
            var word;
            var stop_word;
            var regex_str;
            var regex;
            var keywords = new Array(
                ['price',  '[price]'], 
                ['lower',   '[price]lower'],            
                ['by', '[seller]'],
                ['near', '[location]'],
                ['from'   , '[seller]'],
                ['new'    , '[order]newest'],  
                ['new'    , '[order]newest'],
                ['newer'  , '[order]newest'],
                ['newest' , '[order]newest'],
                ['around' , '[location]']
            );

            // Split out all the individual words in the phrase
            var words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g)
         
            // Review all the words
            for(x=0; x < words.length; x++) {
                // For each word, check all the stop words
                for(y=0; y < keywords.length; y++) {
                    // Get the current word
                    word = words[x].replace(/\s+|[^a-z]+/ig, "");   // Trim the word and remove non-alpha
                     
                    // Get the stop word
                    stop_word = keywords[y][0];
                     
                    // If the word matches the stop word, remove it from the keywords
                    if(word.toLowerCase() == stop_word) {
                        // Build the regex
                        regex_str = "^\\s*"+stop_word+"\\s*$";      // Only word
                        regex_str += "|^\\s*"+stop_word+"\\s+";     // First word
                        regex_str += "|\\s*"+stop_word+"\\s*$";     // Last word
                        regex_str += "|\\s*"+stop_word+"\\s+";      // Word somewhere in the middle
                        regex = new RegExp(regex_str, "ig");
                     
                        // Remove the word from the keywords
                        cleansed_string = cleansed_string.replace(regex, keywords[y][1]);
                    }
                }
            }
            return cleansed_string.replace(/^\s+|\s+$/g, "");
        }

        // Remove unnecessary stopwords
        function removePreposition(cleansed_string) {
            var x;
            var y;
            var word;
            var stop_word;
            var regex_str;
            var regex;            
            if (!cleansed_string) {
                return cleansed_string;
            }
            var stop_words = new Array(
                'a',
                'about',
                'above',
                'across',
                'after',
                'again',
                'against',
                'all',
                'almost',
                'alone',
                'along',
                'already',
                'also',
                'although',
                'always',
                'among',
                'an',
                'and',
                'another',
                'any',
                'anybody',
                'anyone',
                'anything',
                'anywhere',
                'are',
                'area',
                'areas',        
                'as',
                'ask',
                'asked',
                'asking',
                'asks',
                'at',
                'away',
                'b',
                'back',
                'backed',
                'backing',
                'backs',
                'be',
                'became',
                'because',
                'become',
                'becomes',
                'between',
                'been',
                'before',
                'began',
                'behind',
                'being',
                'beings',
                'best',
                'better',        
                'big',
                'both',
                'but',        
                'c',
                'came',
                'can',
                'cannot',
                'case',
                'cases',
                'certain',
                'certainly',
                'clear',
                'clearly',
                'come',
                'could',
                'd',
                'did',
                'differ',
                'different',
                'differently',
                'do',
                'does',
                'done',
                'down',
                'down',
                'downed',
                'downing',
                'downs',
                'during',
                'e',
                'each',
                'early',
                'either',
                'end',
                'ended',
                'ending',
                'ends',
                'enough',
                'even',
                'evenly',
                'ever',
                'every',
                'everybody',
                'everyone',
                'everything',
                'everywhere',
                'exchange',
                'f',
                'face',
                'faces',
                'fact',
                'facts',
                'far',
                'felt',
                'few',
                'find',
                'finds',
                'first',
                'for',
                'four',        
                'full',
                'fully',
                'further',
                'furthered',
                'furthering',
                'furthers',
                'g',
                'gave',
                'general',
                'generally',
                'get',
                'gets',
                'give',
                'given',
                'gives',
                'go',
                'going',
                'good',
                'goods',
                'got',
                'great',
                'greater',
                'greatest',
                'group',
                'grouped',
                'grouping',
                'groups',
                'h',
                'had',
                'has',
                'have',
                'having',
                'he',
                'her',
                'here',
                'herself',
                'high',
                'high',
                'high',
                'higher',
                'highest',
                'him',
                'himself',
                'his',
                'how',
                'however',
                'i',
                'if',
                'important',
                'in',
                'interest',
                'interested',
                'interesting',
                'interests',
                'into',
                'is',
                'it',
                'its',
                'itself',
                'j',
                'just',
                'k',
                'keep',
                'keeps',
                'kind',
                'knew',
                'know',
                'known',
                'knows',
                'l',
                'large',
                'largely',
                'last',
                'later',
                'latest',
                'least',
                'less',
                'let',
                'lets',
                'like',
                'likely',
                'long',
                'longer',
                'longest',
                'm',
                'made',
                'make',
                'making',
                'man',
                'many',
                'may',        
                'member',
                'members',
                'men',
                'might',
                'more',
                'most',
                'mostly',
                'mr',
                'mrs',
                'much',
                'must',        
                'myself',
                'n',
                'necessary',
                'need',
                'needed',
                'needing',
                'needs',
                'never',
                'next',
                'no',
                'nobody',
                'non',
                'noone',
                'not',
                'nothing',
                'now',
                'nowhere',
                'number',
                'numbers',
                'o',
                'of',
                'off',
                'often',
                'old',
                'older',
                'oldest',
                'on',
                'once',
                'one',
                'only',
                'open',
                'opened',
                'opening',
                'opens',
                'or',
                'order',
                'ordered',
                'ordering',
                'orders',
                'other',
                'others',
                'our',
                'out',
                'over',
                'p',
                'part',
                'parted',
                'parting',
                'parts',
                'per',
                'perhaps',
                'place',
                'places',
                'point',
                'pointed',
                'pointing',
                'points',
                'possible',
                'present',
                'presented',
                'presenting',
                'presents',
                'problem',
                'problems',
                'put',
                'puts',
                'q',
                'quite',
                'r',
                'rather',
                'really',
                'right',
                'right',
                'room',
                'rooms',
                's',
                'said',
                'same',
                'saw',
                'say',
                'says',
                'second',
                'seconds',
                'see',
                'seem',
                'seemed',
                'seeming',
                'seems',
                'sees',
                'several',
                'shall',
                'she',
                'should',
                'show',
                'showed',
                'showing',
                'shows',
                'side',
                'sides',
                'since',
                'small',
                'smaller',
                'smallest',
                'so',
                'some',
                'somebody',
                'someone',
                'something',
                'somewhere',
                'state',
                'states',
                'still',
                'still',
                'such',
                'sure',
                't',
                'take',
                'taken',
                'than',
                'that',
                'the',
                'their',
                'them',
                'then',
                'there',
                'therefore',
                'these',
                'they',
                'thing',
                'things',
                'think',
                'thinks',
                'this',
                'those',
                'though',
                'thought',
                'thoughts',
                'three',
                'through',
                'thus',
                'to',
                'today',
                'together',
                'too',
                'took',
                'toward',
                'turn',
                'turned',
                'turning',
                'turns',
                'two',
                'u',
                'under',
                'until',
                'up',
                'upon',
                'us',
                'use',
                'used',
                'uses',
                'v',
                'very',
                'w',
                'want',
                'wanted',
                'wanting',
                'wants',
                'was',
                'way',
                'ways',
                'we',
                'well',
                'wells',
                'went',
                'were',
                'what',
                'when',
                'where',
                'whether',
                'which',
                'while',
                'who',
                'whole',
                'whose',
                'why',
                'will',
                'with',
                'within',
                'without',
                'work',
                'worked',
                'working',
                'works',
                'would',
                'x',
                'y',
                'year',
                'years',
                'yet',
                'you',
                'young',
                'younger',
                'youngest',
                'your',
                'yours',
                'z'
            );
                 
            // Split out all the individual words in the phrase
            var words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g)
         
            // Review all the words
            for(x=0; x < words.length; x++) {
                // For each word, check all the stop words
                for(y=0; y < stop_words.length; y++) {
                    // Get the current word
                    word = words[x].replace(/\s+|[^a-z]+/ig, "");   // Trim the word and remove non-alpha
                     
                    // Get the stop word
                    stop_word = stop_words[y];
                     
                    // If the word matches the stop word, remove it from the keywords
                    if(word.toLowerCase() == stop_word) {
                        // Build the regex
                        regex_str = "^\\s*"+stop_word+"\\s*$";      // Only word
                        regex_str += "|^\\s*"+stop_word+"\\s+";     // First word
                        regex_str += "|\\s+"+stop_word+"\\s*$";     // Last word
                        regex_str += "|\\s+"+stop_word+"\\s+";      // Word somewhere in the middle
                        regex = new RegExp(regex_str, "ig");
                     
                        // Remove the word from the keywords
                        cleansed_string = cleansed_string.replace(regex, " ");
                    }
                }
            }
            return cleansed_string.replace(/^\s+|\s+$/g, "");
        }
    }
})();