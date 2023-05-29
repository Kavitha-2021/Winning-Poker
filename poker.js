var card = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var suit = ['h', 's', 'd', 'c'] //❤🔶☘💲

var array_cards = [
    {rank: 3, suit:'c'},
    {rank: 8, suit:'d'},
    {rank: 5, suit:'c'},
    {rank: 5, suit:'c'},
    {rank: 6, suit:'d'},
    {rank: 2, suit:'d'},
    {rank: 7, suit:'c'}
]

function checkFlush() {
    var array_cards_suit = []; 
    var duplicate_suits = []; 
    var result = false;
    var rank_data = 0;

    array_cards.forEach(e => {
        array_cards_suit.push(e.suit)
    })

    for(var i = 0; i <= array_cards_suit.length - 1; i++) {
        for(var j = i+1; j <= array_cards_suit.length -1; j++) {
            if(array_cards_suit[i] ==  array_cards_suit[j]) {
                if(!duplicate_suits.includes(array_cards_suit[j])) {
                    duplicate_suits.push(array_cards_suit[j])
                }
            }
        }
    }

    duplicate_suits.forEach(e => {
        var fil = array_cards_suit.filter(el => el == e)
        if(fil && fil.length >= 5) {
            array_cards.filter(ele => {
                if(ele.suit == e)
                rank_data += ele.rank
            })
            result = true
        }
    })

    if(result == true)
    // console.log(rank_data, 'its a flush')
    return {result: result, data: rank_data};
}

function checkRoyal() {
    var array_cards_rank = [];

    array_cards.forEach(e => {
        array_cards_rank.push(e.rank)
    })

    if(array_cards_rank.includes(14) && array_cards_rank.includes(13) && array_cards_rank.includes(12)
    && array_cards_rank.includes(11) && array_cards_rank.includes(10)) {
        // console.log('Its Royal')
        return {result: true, data: 60}
    } else return {result: false, data: 0}
}

function checkRoyalFlush () {
    var isRoyal = checkRoyal();
    var isFlush = checkFlush();
    var ace_suit;

    if(isRoyal.result && isFlush.result) {

        for(let idx = 14; idx > 9; idx--) {
            var filter = array_cards.filter(e => e.rank == idx)
            if(filter && filter.length == 1)
            ace_suit = filter[0].suit
        }

        var ace = array_cards.filter(e => e.rank == 14).findIndex(el => el.suit == ace_suit)
        var king = array_cards.filter(e => e.rank == 13).findIndex(el => el.suit == ace_suit)
        var queen = array_cards.filter(e => e.rank == 12).findIndex(el => el.suit == ace_suit)
        var jack = array_cards.filter(e => e.rank == 11).findIndex(el => el.suit == ace_suit)
        var ten = array_cards.filter(e => e.rank == 10).findIndex(el => el.suit == ace_suit)

        if(ace >= 0 && king >= 0 && queen >=0 && jack >= 0 && ten >=0 ) {
            // console.log('Its a Royal Flush')
            return {result: true, data: 60}
        }
        else return {result: false, data: 0}
    } else return {result: false, data: 0}
}

function checkStraight() {
    var arr_straight = [];
    var each_index = [];
    var each_flag = [];
    var result_data = [];

    if(checkRoyal().result) 
    return false;

    array_cards.forEach(e => {
        if( !arr_straight.includes(e.rank) )
        arr_straight.push(e.rank)
    })
    arr_straight.sort((a, b) => a - b)

    for(var i = 0; i < arr_straight.length; i++) {
        if(arr_straight[i+1] == arr_straight[i]+1 && arr_straight[i+2] == arr_straight[i]+2 &&
        arr_straight[i+3] == arr_straight[i]+3 && arr_straight[i+4] == arr_straight[i]+4) {
            each_index[i] = [arr_straight[i], arr_straight[i+1], arr_straight[i+2], arr_straight[i+3], arr_straight[i+4]]
            each_flag[i] = true
        } else each_flag[i] = false
    }

    if(each_flag.includes(true)) {
        each_index.forEach((e, i) => {
            result_data[i] = e.reduce((p_sum, a) => p_sum + a, 0)
        })
        return {result: true, data: Math.max(...result_data), each: each_index, lowace: false}
    } else if(arr_straight.includes(14) && arr_straight.includes(2) && arr_straight.includes(3) &&
    arr_straight.includes(4) && arr_straight.includes(5) && !arr_straight.includes(6)) {
        return {result: true, data: 15, lowace: true}
    } else return {result: false, data: 0, lowace: false}
}

function checkDuplicate() {
    var array_rank = [];
    var duplicate_cards = [];
    var result = {};
    
    array_cards.forEach(e => {
        array_rank.push(e.rank)
    })

    duplicate_cards = array_rank.filter((item, index) => array_rank.indexOf(item) != index)

    duplicate_cards.forEach(e => {
        var filter = array_rank.filter(el => el == e )
        result[e] = filter.length
    })
    // console.log(result)
    return result;
}

function checkFourKind() {
    var duplicates = checkDuplicate();
    var result_data = 0;
    console.log(duplicates)

    var highvalue = Object.values(duplicates)
    
    if(highvalue.includes(4)) {
        // console.log('4 of kind')
        result_data = Object.keys(duplicates).find(key=> duplicates[key] == 4)
        return {result: true, data: result_data}
    } else return {result: false, data: result_data}
}

function checkFullHouse() {
    var duplicates = checkDuplicate();
    var result_data = [];
    
    var fullhouse = Object.values(duplicates)

    if(fullhouse.includes(3) & fullhouse.includes(2)) {
        // console.log('Full house')
        for(const property in duplicates) {
            if(duplicates[property] == 3) {
                result_data.push(property)
            }
        }
        return { result: true, data: Math.max(...result_data)}
    } else return { result: false, data: 0}
}

function checkThreeKind() {
    var duplicates = checkDuplicate();
    var result_data = [];

    var threekind = Object.values(duplicates)

    if(threekind.includes(3) && !threekind.includes(2)) {
        // console.log('Three kind')
        for(const propery in duplicates) {
            if(duplicates[propery] == 3)
            result_data.push(parseInt(propery))
        } 
        return {result: true, data: Math.max(...result_data)}
    } else return { result: false, data: 0}
}

function checkTwoPair () {
    var duplicates = checkDuplicate();
    var result_data = 0;

    var twopair = Object.values(duplicates)

    var twopair_len = twopair.filter(e => e == 2)

    if(twopair_len.length >= 2 && !twopair.includes(3)) {
        result_data = Object.keys(duplicates).find(key => duplicates[key] == 2)
        // for(const property in duplicates) {
        //     result_data += parseInt(property)
        // }
        return { result: true, data: result_data}
    } else return { result: false, data: result_data}
}

function checkOnePair() {
    var duplicates = checkDuplicate();
    var result_data = 0

    var onepair = Object.values(duplicates)

    var onepair_len = onepair.filter(e => e == 2)

    if(onepair_len.length == 1 && !onepair.includes(3)) {
        result_data = Object.keys(duplicates).find(key => duplicates[key] == 2)
        // for(const property in duplicates) {
        //     if(duplicates[property] == 2)
        //     result_data = parseInt(property)
        // }
        return { result: true, data: result_data}
    } else return { result: false, data: result_data}
}

function checkStraightFlush() { 
    // var duplicates = checkDuplicate();
    var isStraight = checkStraight()
    var low_ace = isStraight.lowace
    var str_data = isStraight.each
    var isFlush = checkFlush()
    var str_flsh = []
    var i_loop = []
    var result_data = [];
    var check_suit = ''

    if(isStraight && isStraight.result && isFlush && isFlush.result ) {

        str_flsh = array_cards.slice();
        str_flsh.sort((a,b) => a.rank - b.rank)

        if(low_ace) {
            for(var k = 2; k < 6; k++) {
                var filter = str_flsh.filter(e => e.rank == k)
                if(filter && filter.length == 1)
                check_suit = filter[0].suit
            }

            if(check_suit == '')
            check_suit = str_flsh.filter(e => e.rank == 14)[0].suit

            var ace = str_flsh.filter(e => e.rank == 14).findIndex(e => e.suit == check_suit)
            var two = str_flsh.filter(e => e.rank == 2).findIndex(e => e.suit == check_suit)
            var three = str_flsh.filter(e => e.rank == 3).findIndex(e => e.suit == check_suit)
            var four = str_flsh.filter(e => e.rank == 4).findIndex(e => e.suit == check_suit)
            var five = str_flsh.filter(e => e.rank == 5).findIndex(e => e.suit == check_suit)

            if(ace >= 0 && two >=0 && three >=0 && four >= 0 && five >=0 ) {
                // console.log('Its a Low-Ace Straight Flush')
                return {result: true, data: 15}
            }else return {result: false, data: 0}
            
        } else {
            for(var i = 0; i < str_data.length; i++) {
                var each_res = []
                var filter = str_flsh.filter(e => e.rank == str_data[i][0])
                if(filter && filter.length == 1) 
                check_suit = filter[0].suit
                
                for(var j = 0; j < str_data[i].length; j++) {
                    var res = str_flsh.filter(e => e.rank == str_data[i][j] && e.suit == check_suit)
                    if(res.length > 0)
                    each_res.push(res)

                    if(each_res.length >= 5)
                    i_loop.push(true)

                }

                if(each_res.length >=5 && i == str_data.length - 1)
                each_res.forEach(e => { result_data.push(e[0].rank) })
            }
            if(i_loop.includes(true)) {
                // console.log('Its a Straight Flush')
                return {result: true, data: result_data.reduce((p_sum, a) => p_sum + a, 0)}
            } else return {result: false, data: 0}
        }
    } else return {result: false, data: 0}  
}

function checkRank() {
    var isRoyalFlush = checkRoyalFlush()
    if(isRoyalFlush && isRoyalFlush.result)  
        return 'Its a Royal Flush with the sum of'+isRoyalFlush.data

    var isStraightFlush = checkStraightFlush()
    if(isStraightFlush && isStraightFlush.result) 
        return 'Its a Straight Flush with the sum of '+isStraightFlush.data

    var isFourKind = checkFourKind()
    if(isFourKind.result) 
        return 'Its Four of a Kind Card no. '+isFourKind.data

    var isFullHouse = checkFullHouse()
    if(isFullHouse.result) 
        return 'Its FullHouse with '+isFullHouse.data+' as Three pair Card'

    var isFlush = checkFlush()
    if(isFlush && isFlush.result) 
        return 'Its Flush '+isFlush.data

    var isStraight = checkStraight()
    if(isStraight && isStraight.result ) 
        return 'Its a Straight with the sum of'+isStraight.data

    var isThreeKind = checkThreeKind()
    if(isThreeKind.result) 
        return 'Its Three of a kind Card no. '+isThreeKind.data

    var isTwoPair = checkTwoPair()
    if(isTwoPair.result) 
        return 'Its Two Pair Card no.'+isTwoPair.data
    
    var isOnePair = checkOnePair()
    if(isOnePair.result) 
        return 'Its One Pair Card no. '+isOnePair.data

    // return 'High Card'
}

console.log(checkRank())

// console.log(checkStraightFlush());
// console.log(checkStraight())
// checkOnePair();
// checkTwoPair();
// checkThreeKind();
// checkFullHouse();
// checkFourKind();
// checkRoyalFlush();
// checkDuplicate();
// checkFlush();
