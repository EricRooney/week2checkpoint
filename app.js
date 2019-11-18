let team = {
  moneyWon: 0,
  driverIncome: 0,
  baseClick: 1
};
const tunerPrice = 5; //50
const internalsPrice = 5; //20
const boostPrice = 5; //200
const driverPrice = 5; //500

let carUpgrades = {
  tuner: {
    price: tunerPrice,
    quantity: 0,
    multiplier: 3
  },
  internals: {
    price: internalsPrice,
    quantity: 0,
    mulitplier: 1
  },
  boost: {
    price: boostPrice,
    quantity: 0,
    multiplier: 10
  }
};

let teamUpgrades = {
  driver: {
    price: 5,
    quantity: 0,
    multiplier:
      1 +
      (carUpgrades.tuner.multiplier * carUpgrades.tuner.quantity +
        carUpgrades.internals.mulitplier * carUpgrades.internals.quantity +
        carUpgrades.boost.multiplier * carUpgrades.boost.quantity)
  }
};

const wonElem = document.querySelector("#money-won");
const tunerElem = document.querySelector("#tuner-stage");
const internalsElem = document.querySelector("#internals-stage");
const boostElem = document.querySelector("#boost-stage");
const driversElem = document.querySelector("#drivers-hired");
const tunerMultiElem = document.querySelector("#tuner-multiplier");
const internalsMultiElem = document.querySelector("#internals-multiplier");
const boostMultiElem = document.querySelector("#boost-multiplier");
const driverMultiElem = document.querySelector("#driver-multiplier");

tunerMultiElem.innerText = carUpgrades.tuner.multiplier;
internalsMultiElem.innerText = carUpgrades.internals.mulitplier;
boostMultiElem.innerText = carUpgrades.boost.multiplier;
driverMultiElem.innerText = teamUpgrades.driver.multiplier;

function race() {
  team.moneyWon +=
    team.baseClick +
    (carUpgrades.tuner.multiplier * carUpgrades.tuner.quantity +
      carUpgrades.internals.mulitplier * carUpgrades.internals.quantity +
      carUpgrades.boost.multiplier * carUpgrades.boost.quantity);
  wonElem.innerText = team.moneyWon;
}

function buyTuner() {
  if (team.moneyWon >= carUpgrades.tuner.price) {
    team.moneyWon = team.moneyWon - carUpgrades.tuner.price;
    carUpgrades.tuner.quantity++;
    carUpgrades.tuner.price += tunerPrice * carUpgrades.tuner.quantity;
    wonElem.innerText = team.moneyWon;
    tunerElem.innerText = carUpgrades.tuner.quantity;
    tunerMultiElem.innerText = carUpgrades.tuner.multiplier;
  }
}

function buyInternals() {
  if (team.moneyWon >= carUpgrades.internals.price) {
    team.moneyWon = team.moneyWon - carUpgrades.internals.price;
    carUpgrades.internals.quantity++;
    carUpgrades.internals.price += internalsPrice * carUpgrades.tuner.quantity;
    wonElem.innerText = team.moneyWon;
    internalsElem.innerText = carUpgrades.internals.quantity;
  }
}

function buyBoost() {
  if (team.moneyWon >= carUpgrades.boost.price) {
    team.moneyWon = team.moneyWon - carUpgrades.boost.price;
    carUpgrades.boost.quantity++;
    carUpgrades.boost.price += boostPrice * carUpgrades.boost.quantity;
    wonElem.innerText = team.moneyWon;
    boostElem.innerText = carUpgrades.boost.quantity;
  }
}

function collectAutoUpgrades() {
  console.log("made it here");
  team.driverIncome =
    teamUpgrades.driver.quantity *
    (carUpgrades.tuner.multiplier * carUpgrades.tuner.quantity +
      carUpgrades.internals.mulitplier * carUpgrades.internals.quantity +
      carUpgrades.boost.multiplier * carUpgrades.boost.quantity);
  console.log(team.moneyWon);
  console.log(team.driverIncome);
  return team.moneyWon + team.driverIncome;
}

function startInterval() {
  setInterval(collectAutoUpgrades, 3000);
}

function buyDriver() {
  if (team.moneyWon >= teamUpgrades.driver.price) {
    team.moneyWon = team.moneyWon - teamUpgrades.driver.price;
    teamUpgrades.driver.quantity++;
    teamUpgrades.driver.price += driverPrice * teamUpgrades.driver.quantity;
    wonElem.innerText = team.moneyWon;
    driversElem.innerText = teamUpgrades.driver.quantity;
    console.log(teamUpgrades.driver.multiplier);
    startInterval();
  }
}
