'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/*
account object:
owner: name of owner
movements: array of fake movements for transfers
interestRate: a multiplier for fake interest
pin: the password for the user
movementDate: a dates list that corralates to the movements array.
currency: type of currency
localy: local country code
*/
const account1 = {
  owner: 'Amit Paz',
  movements: [5000, 3200, 4200, 6969, -2500, -4000, -1000, 200],
  interestRate: 1.2, // %
  pin: 2703,
  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB', // de-DE
  transfers: {
    USD: 1.26,
    RUB: 119.52,
    IRR: 53186.14,
    MXN: 21.08,
    ILS: 4.78,
  },
};

const account2 = {
  owner: 'Matvei Stupachenko',
  movements: [-1500, -300, -150, -790, -3210, -1000, 30, -30],
  interestRate: 1.5,
  pin: 1101,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
  transfers: {
    USD: 0.011,
    GBP: 0.0084,
    IRR: 445.0,
    MXN: 0.18,
    ILS: 0.04,
  },
};

const account3 = {
  owner: 'Asif Sakazo',
  movements: [2158920, 420, 69, -3000, -38000, -46999, -90000, -460],
  interestRate: 0.7,
  pin: 1011,
  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
  ],
  currency: 'IRR',
  locale: 'fa-IR', // de-DE
  transfers: {
    USD: 0.000024,
    RUB: 0.0022,
    GBP: 0.000019,
    MXN: 0.0004,
    ILS: 0.00009,
  },
};

const account4 = {
  owner: 'Guy Brodesky',
  movements: [420, 69, -6969, 420, 10, 30, 5, 3],
  interestRate: 1,
  pin: 406,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'MXN',
  locale: 'es-MX',
  transfers: {
    USD: 0.06,
    RUB: 5.67,
    IRR: 2523.22,
    GBP: 0.047,
    ILS: 0.23,
  },
};

const account5 = {
  owner: 'Reem Assaf',
  movements: [30000, -15000, 73, 544, -120, 300, 900, -30],
  interestRate: 3.5,
  pin: 2605,
  movementsDates: [
    '2022-07-09T21:31:17.178Z',
    '2022-07-19T07:42:02.383Z',
    '2023-07-19T09:15:04.904Z',
    '2023-07-20T10:17:24.185Z',
    '2023-07-26T14:11:59.604Z',
    '2023-08-20T17:01:17.194Z',
    '2023-08-22T23:36:17.929Z',
    '2023-08-24T10:51:36.790Z',
  ],
  currency: 'ILS',
  locale: 'he-IL', // de-DE
  transfers: {
    USD: 0.26,
    RUB: 24.98,
    IRR: 11115.29,
    MXN: 4.41,
    GBP: 0.21,
  },
};

// array of all the accounts
const accounts = [account1, account2, account3, account4, account5];

// Elements from index.html
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// preset virables
let currentAccount, intervalLogout, intervalDate;

// Object that contains all DATE related Funtions.
const dateManager = {
  // this function will format provided dates in nice strings.
  formatDate: function (type = 'dateTime', date = new Date()) {
    const options = {
      dateTime: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
      date: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      },
      timeHM: {
        hour: 'numeric',
        minute: 'numeric',
      },
      timeMS: {
        minute: 'numeric',
        second: 'numeric',
      },
    };
    return new Intl.DateTimeFormat(currentAccount.locale, options[type]).format(
      date
    );
  },
  // simple function to display the current date
  displayDate: function () {
    const updateDate = function () {
      labelDate.textContent = dateManager.formatDate();
    };
    updateDate();
    if (intervalDate) clearInterval(intervalDate);
    intervalDate = setInterval(updateDate, 1 * 1000);
  },
  // calculates 2 dates (generally 1 date and the current date)
  //and provides outputs for each scenario
  calcDays: function (date1, date2 = new Date()) {
    // the calculation for the days passed between the dates
    const daysPassed = Math.round(
      Math.abs((date2 - date1) / (1000 * 60 * 60 * 24))
      // chain of conditions for each scenario
    );
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'yesterday';
    if (daysPassed > 1 && daysPassed <= 7) return `${daysPassed} days ago`;
    return this.formatDate('date', date1);
  },
};

const formatCur = function (value, acc) {
  const options = {
    style: 'currency',
    currency: `${acc.currency}`,
  };
  return Intl.NumberFormat(acc.locale, options).format(value);
};

//displays movements from given account data
const displayMovements = function (acc, sort = false) {
  //clears existing data
  containerMovements.innerHTML = '';

  // if the user enables sorting then the function will change the displayed movements
  const sorted = sort
    ? acc.movements.slice(0).sort((a, b) => a - b)
    : acc.movements;
  //loops through data and inserts it into html template
  sorted.forEach(function (mov, i) {
    const moveType = mov < 0 ? 'withdrawal' : 'deposit';
    const date = dateManager.calcDays(new Date(acc.movementsDates[i]));
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${moveType}">${
      i + 1
    } ${moveType}</div>
          <div class="movements__date">${date}</div>
          <div class="movements__value">${formatCur(mov, acc)}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//calculates and displays the balance of the user.
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, mov) => sum + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc);
};

//calculates deposits, withdrawals and interest and displays them in summary.
const displaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(deposits, acc);

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(withdrawals, acc);

  const interest = acc.movements
    .filter(mov => mov > 0)
    //each user has a different interest rate.
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumInterest.textContent = formatCur(interest, acc);
};
// a function that calls all function that relate to UI updates at once.
const updateUI = function (acc) {
  displayBalance(acc);
  displayMovements(acc);
  displaySummary(acc);
  dateManager.displayDate();
  if (intervalLogout) clearInterval(intervalLogout);
  intervalLogout = startTimerCountDown();
};

//takes the full names of the account owner and creates a username.
const createUserNames = function (accountsArr) {
  accountsArr.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUserNames(accounts);

const startTimerCountDown = function () {
  const timerFn = function () {
    labelTimer.textContent = dateManager.formatDate('timeMS', timer);
    if (timer === 0) {
      clearInterval(intervalLogout);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    timer -= 1000;
  };

  let timer = 5 * (1000 * 60);

  timerFn();
  intervalLogout = setInterval(timerFn, 1000);
  return intervalLogout;
};

//fake login
// currentAccount = account5;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
//checks if user credentials are correct and display the ui accordingly
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc =>
      acc.username === inputLoginUsername.value &&
      acc.pin === +inputLoginPin.value
  );
  //if credentials correct: display ui, remove focus from login form,
  //display welcome message, updates all parameters to current user.
  if (currentAccount !== undefined) {
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
    labelWelcome.textContent = `Good Evening ${
      currentAccount.owner.split(' ')[0]
    }!`;
    document.querySelector(
      '.balance__label'
    ).textContent = `Current balance (${currentAccount.currency})`;
    updateUI(currentAccount);
  }
});

//transfer money between accounts.
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  //finding account that user wants to transfer to.
  const transferAcc = accounts.find(
    acc => inputTransferTo.value === acc.username
  );
  //checking if account has enough balance to transfer,
  //if the user is valid and if the transfered value is not negative
  if (
    transferAmount <= currentAccount.balance &&
    transferAcc !== undefined &&
    transferAmount > 0 &&
    currentAccount !== transferAcc
  ) {
    // updating movements for both account
    currentAccount.movements.push(transferAmount * -1);
    transferAcc.movements.push(
      transferAmount * currentAccount.transfers[transferAcc.currency]
    );
    // push dates onto movements
    currentAccount.movementsDates.push(new Date().toISOString());
    transferAcc.movementsDates.push(new Date().toISOString());
    //updating the ui based on the changes to movements
    updateUI(currentAccount);
    //making the transfer ui empty and out of focus.
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
  }
});

//close account and hide UI
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const accountIndex = accounts.findIndex(
    acc =>
      inputCloseUsername.value == acc.username &&
      +inputClosePin.value === acc.pin
  );
  if (accountIndex !== -1) {
    accounts.splice(accountIndex);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    inputClosePin.value = inputCloseUsername.value = '';
    inputClosePin.blur();
    inputCloseUsername.blur();
  }
});

//request loan.
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    setTimeout(() => {
      updateUI(currentAccount);
    }, 2 * 1000);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sort = sort ? false : true;
  displayMovements(currentAccount, sort);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));


const arr = [23, 11, 64];
console.log(arr.at(-2));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const move of movements) {
  if (move > 0) {
    console.log(`you just got an extra: ${move}$!`);
  }
  if (move < 0) {
    console.log(`you just spent ${Math.abs(move)}$!`);
  }
}

console.log(`-----------------------------------`);
movements.forEach(function (move) {
  if (move > 0) {
    console.log(`you just got an extra: ${move}$!`);
  }
  if (move < 0) {
    console.log(`you just spent ${Math.abs(move)}$!`);
  }
});


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


//coding challenge #1
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaFixed = [...dogsJulia];
  dogsJuliaFixed.splice(-2);
  dogsJuliaFixed.splice(0, 1);
  const dogsArr = [...dogsJuliaFixed, ...dogsKate];
  dogsArr.forEach(function (age, i) {
    console.log(
      `Dog number ${i + 1} is ${
        age >= 3 ? 'an adult' : 'a puppy'
      }, and is ${age} years old`
    );
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('---------------------------------');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


const movementsEuro = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.09;
const movementsUSD = movementsEuro.map(mov => Math.round(mov * euroToUsd));

console.log(movementsUSD);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const movementsDescriptions = movements.map(move =>
  move > 0
    ? `you just got an extra: ${move}$!`
    : `you just spent ${Math.abs(move)}$!`
);
console.log(movementsDescriptions);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const balance = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balance);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const maxMov = movements.reduce(
  (acc, curr) => (acc < curr ? (acc = curr) : acc),
  movements[0]
);
console.log(maxMov);


const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (agesArr) {
  const humanAge = agesArr.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const moreThan18 = humanAge.filter(age => age >= 18);
  const average =
    moreThan18.reduce((acc, curr) => acc + curr) / moreThan18.length;
  console.log(`Original Array: ${agesArr}
Converted to Human: ${humanAge}
Adult Ages: ${moreThan18}
Average Adult Age: ${average}`);
};
calcAverageHumanAge(ages1);
console.log('------------------');
calcAverageHumanAge(ages2);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const finished = movements
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, mov) => acc + mov);
console.log(finished);


const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (agesArr) {
  const humanAge = agesArr.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const moreThan18 = humanAge.filter(age => age >= 18);
  const average =
    moreThan18.reduce((acc, curr) => acc + curr) / moreThan18.length;
  console.log(`Original Array: ${agesArr}
Converted to Human: ${humanAge}
Adult Ages: ${moreThan18}
Average Adult Age: ${average}`);
};
calcAverageHumanAge(ages1);
console.log('------------------');
calcAverageHumanAge(ages2);
console.log('------------------');

const calcAverageHumanAge2 = function (agesArr) {
  console.log(
    agesArr
      .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
      .filter(age => age >= 18)
      .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0)
  );
};

calcAverageHumanAge2(ages1);
console.log('------------------');
calcAverageHumanAge2(ages2);


const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements.flat().reduce((acc, curr) => acc + curr));

console.log(
  accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
);
console.log(
  [1, 7, 4, 2, 8, 10, 15].sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
  })
);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const stest = false;
movements.sort((a, b) => (stest === true ? a - b : NaN));
console.log(movements);


console.log();
const counts = {};
const array = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
array.forEach(function (x) {
  counts[x] = (counts[x] || 0) + 1;
});
console.log(counts);


const allDepositsBank = function (accountsArr) {
  return accountsArr
    .flatMap(acc => acc.movements.filter(mov => mov > 0))
    .reduce((acc, mov) => acc + mov, 0);
};

console.log(allDepositsBank(accounts));

const depositBigger = function (accountsArr) {
  return accountsArr.flatMap(acc => acc.movements.filter(mov => mov > 1000))
    .length;
};

console.log(depositBigger(accounts));

const depositBiggerReduce = function (accountsArr) {
  return accountsArr.reduce(
    (length, account) =>
      length + account.movements.filter(mov => mov > 1000).length,
    0
  );
};

console.log(depositBiggerReduce(accounts));

const depositBiggerReduce2 = function (accountsArr) {
  return accountsArr
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);
};

console.log(depositBiggerReduce2(accounts));

const createObjectReduce = function (accountsArr) {
  return accountsArr
    .flatMap(acc => acc.movements)
    .reduce(
      (object, mov) => {
        mov > 0 ? (object.deposits += mov) : (object.withdrawals += mov);
        return object;
      },
      { deposits: 0, withdrawals: 0 }
    );
};

console.log(createObjectReduce(accounts));

const convertTitleCase = function (title) {
  const exeptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  return title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exeptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an example'));


const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 338, owners: ['Michael'] },
];

const calculateFood = function (dogsArr) {
  dogsArr.forEach(
    dog => (dog. = Math.trunc(dog.weight ** 0.75 * 28))
  );
};

calculateFood(dogs);

const dogSarahFood = function (dogsArr) {
  return dogsArr.reduce((output, dog) => {
    if (dog.owners.includes('Sarah')) {
      if (
        dog.curFood < dog.recommendedFood * 1.1 &&
        dog.curFood > dog.recommendedFood * 0.9
      ) {
        output = 'The dog is eating properly';
      } else {
        output = 'the dog is eating poorly!';
      }
    }
    return output;
  });
};

console.log(dogSarahFood(dogs));

const dogsOrginizer = function (dogsArr) {
  const { ownersEatTooMuch, ownersEatTooLittle } = dogsArr.reduce(
    (dogsOut, curDog) => {
      if (curDog.curFood >= curDog.recommendedFood * 1.1) {
        dogsOut.ownersEatTooMuch.push(...curDog.owners);
      }
      if (curDog.curFood <= curDog.recommendedFood * 0.9) {
        dogsOut.ownersEatTooLittle.push(...curDog.owners);
      }
      return dogsOut;
    },
    { ownersEatTooMuch: [], ownersEatTooLittle: [] }
  );
  return [ownersEatTooMuch, ownersEatTooLittle];
};

const [ownersEatTooMuch, ownersEatTooLittle] = dogsOrginizer(dogs);

console.log(ownersEatTooLittle);
console.log(ownersEatTooMuch);

const createStringThree = function (Arr, type) {
  const [per1, per2, per3] = Arr;
  console.log(
    `${per1} and ${per2} and ${per3}'s ${
      type === 'much' ? 'dogs eat too much!' : 'dogs eat too little!'
    }`
  );
};

createStringThree(ownersEatTooMuch, 'much');
createStringThree(ownersEatTooLittle);

const dogsShallow = dogs
  .slice(0)
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsShallow);


console.log(Number.parseFloat('3.px'));
*/
