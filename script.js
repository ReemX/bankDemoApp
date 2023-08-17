'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Reem Assaf',
  movements: [430, 1000, 700, 50, 90, 6969, 420, -1],
  interestRate: 3.5,
  pin: 6969,
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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
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

const displayBalance = function (movements) {
  const balance = movements.reduce((sum, mov) => sum + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

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
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc =>
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
  );
  if (currentAccount !== undefined) {
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
    labelWelcome.textContent = `Good Evening ${
      currentAccount.owner.split(' ')[0]
    }!`;
    displayBalance(currentAccount.movements);
    displayMovements(currentAccount.movements);
    displaySummary(currentAccount);
  }
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
*/
