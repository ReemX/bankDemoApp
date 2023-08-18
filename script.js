'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Amit Paz',
  movements: [5000, 3200, 4200, 6969, -2500, -4000, -1000, 200],
  interestRate: 1.2, // %
  pin: 2703,
};

const account2 = {
  owner: 'Matvei Stupachenko',
  movements: [-1500, -300, -150, -790, -3210, -1000, 30, -30],
  interestRate: 1.5,
  pin: 1101,
};

const account3 = {
  owner: 'Asif Sakazo',
  movements: [2158920, 420, 69, -3000, -38000, -46999, -90000, -460],
  interestRate: 0.7,
  pin: 1011,
};

const account4 = {
  owner: 'Guy Brodesky',
  movements: [420, 69, -6969, 420, 10],
  interestRate: 1,
  pin: 406,
};

const account5 = {
  owner: 'Reem Assaf',
  movements: [30000, -15000, 73, 544, -120, 300, 900, -30],
  interestRate: 3.5,
  pin: 2607,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
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
//displays movements from given account data
const displayMovements = function (movements, sort = false) {
  //clears existing data
  containerMovements.innerHTML = '';

  const sorted = sort ? movements.slice(0).sort((a, b) => a - b) : movements;
  //loops through data and inserts it into html template
  sorted.forEach(function (mov, i) {
    const moveType = mov < 0 ? 'withdrawal' : 'deposit';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${moveType}">${
      i + 1
    } ${moveType}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//calculates and displays the balance of the user.
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, mov) => sum + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//calculates deposits, withdrawals and interest and displays them in summary.
const displaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${deposits}€`;

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    //each user has a different interest rate.
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  displayBalance(acc);
  displayMovements(acc.movements);
  displaySummary(acc);
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

let currentAccount;

//checks if user credentials are correct and display the ui accordingly
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc =>
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
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
    updateUI(currentAccount);
  }
});

//transfer money between accounts.
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = inputTransferAmount.value;
  //finding account that user wants to transfer to.
  const transferAcc = accounts.find(
    acc => inputTransferTo.value === acc.username
  );
  //checking if account has enough balance to transfer, if the user is valid and if the transfered value is not negative
  if (
    transferAmount < currentAccount.balance &&
    transferAcc !== undefined &&
    transferAmount > 0 &&
    currentAccount !== transferAcc
  ) {
    // updating movements for both account
    currentAccount.movements.push(transferAmount * -1);
    transferAcc.movements.push(transferAmount);
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
      Number(inputClosePin.value) === acc.pin
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
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sort = sort ? false : true;
  displayMovements(currentAccount.movements, sort);
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
*/
