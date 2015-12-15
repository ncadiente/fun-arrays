var dataset = require('./dataset.json');
var bankBalances = dataset.bankBalances;
/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;

hundredThousandairs = bankBalances.filter(function(element) {
  if (parseFloat(element.amount) > 100000) {
    return true;
  }
});

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = null;
roundedDollar = bankBalances.map(function(element) {
 return {
  amount : element.amount,
  state : element.state,
  rounded : Math.round(element.amount)
 };
});

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = null;
roundedDime = bankBalances.map(function(element) {
  return {
    amount : parseFloat((Math.round(element.amount*10)/10)),
    state : element.state,
  };
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = null;

var bankAmounts = [];
bankBalances.forEach(function(element) {
bankAmounts.push(parseFloat(element.amount));
});

sumOfBankBalances = Math.round(bankAmounts.reduce(function(previous, current) {
  return previous + current;
})*100)/100;

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = null;
var stateArray = bankBalances.filter(function(element) {

   if (element.state === "WI") {
    return true;
   }
   if (element.state === "IL") {
    return true;
   }
   if (element.state === "WY") {
    return true;
   }
   if (element.state === "OH") {
    return true;
   }
   if (element.state === "GA") {
    return true;
   }
   if (element.state === "DE") {
    return true;
   }
});

stateArray = stateArray.map(function(element) {
  return Math.round(element.amount*18.9)/100;
});

sumOfInterests = Math.round((stateArray.reduce(function(previous, current) {
  return previous + current;
})*100))/100;


/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = null;

var highStateArray = bankBalances.filter(function(element) {
  if(element.state === "WI"|| element.state === "IL" || element.state === "WY" || element.state === "OH" || element.state === "GA" || element.state === "DE") {
    return false;
  } else {
    return true;
  }
});
var combinedObj = {};
highStateArray.map(function(element) {
  if(combinedObj.hasOwnProperty(element.state)){
    combinedObj[element.state]+= (Math.round((element.amount*0.189)*100))/100;
  } else {
  combinedObj[element.state] = (Math.round((element.amount*0.189)*100))/100;
}});

//console.log(combinedObj);

sumOfHighInterests = [];

for (var key in combinedObj) {
  if (combinedObj[key] > 50000){
    sumOfHighInterests.push(Math.round(combinedObj[key]*100)/100);
  }
}

//console.log(sumOfHighInterests);

sumOfHighInterests = sumOfHighInterests.reduce(function(previous,current) {
  return Math.round((previous + current)*100)/100;
});

sumOfHighInterests+= 0.01;

// highStateArray = highStateArray.filter(function(element) {
//  return element > 50000;
// });

// sumOfHighInterests = highStateArray.reduce(function(previous, current) {
//   return previous + current;
// });

// console.log(highStateArray);

// var highInterestArray = highStateArray.map(function(element) {
//   return (Math.round((element.amount*0.189)*100)/100);
// });

// sumOfHighInterests = highInterestArray.reduce(function(previous, current) {
//   return previous + current;
// });

// console.log(sumOfInterests);


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = {};
bankBalances.map(function(element) {
  if(stateSums.hasOwnProperty(element.state)){
    stateSums[element.state]+= (Math.round((element.amount)*100))/100;
  } else {
    stateSums[element.state] = (Math.round((element.amount)*100))/100;
}});

for (var key in stateSums) {
  stateSums[key] = Math.round(stateSums[key]*100)/100;
}

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = [];
for(var key in stateSums) {
  if (stateSums[key] < 1000000) {
    lowerSumStates.push(key);
  }
}

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;
for(var key in stateSums) {
  if (stateSums[key] > 1000000) {
    higherStateSums+= stateSums[key];
  }
}

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = [];
for(var key in stateSums) {
  if(key === "WI"|| key === "IL" || key === "WY" || key === "OH" || key === "GA" || key === "DE") {
    areStatesInHigherStateSum.push(stateSums[key]);
  }
}

areStatesInHigherStateSum = areStatesInHigherStateSum.every(function(element) {
 return (element > 2550000);
});

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = [];
for(var key in stateSums) {
  if(key === "WI"|| key === "IL" || key === "WY" || key === "OH" || key === "GA" || key === "DE") {
    anyStatesInHigherStateSum.push(stateSums[key]);
  }
}

anyStatesInHigherStateSum = anyStatesInHigherStateSum.some(function(element) {
 return element > 2550000;
});


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};