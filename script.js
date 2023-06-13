'use strict';

// const { get } = require('animejs');

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/* const getCountryData = function (country) {
  //old school way of doing http request in JS
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal'); */

///////////////////////////////////////
/// callback hell

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}" >
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// const getCountryandNeighbour = function (country) {
//   // AJAX call country (1)
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country (1)
//     renderCountry(data);

//     // Get Neighbour country (2)
//     const neighbour = data.borders?.[0];

//     if (!neighbour) return;

//     // AJAX call country (2)
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// getCountryandNeighbour('usa');
// getCountryandNeighbour('portugal');

//callback hell
// setTimeout(() => {
//   console.log('1 second passed');

//   setTimeout(() => {
//     console.log('2 second passed');

//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

///////////////////////////////////////
/// Modern AJAX Calls

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

// call back function
/* const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
}; */
/* 

//refactored ES6 & chain promises (flat chain of promises)

const getCountryData = function (country) {
  //country 1

  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = 'dfdfdsf';

      if (!neighbour) return;

      //country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

*/

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   //country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(...data);
//       const neighbour = data[0].borders ? data[0].borders[0] : undefined;

//       //country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'No neighbours found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   // getCountryData('portugal');
// });

// getCountryData('australia');

///////////////////////////////////////
/// Event Loop Practice

/* console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end'); */

///////////////////////////////////////
/// Build a Promise
/* 
const lotteryPromoise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

//consume promise
lotteryPromoise.then(res => console.log(res)).catch(err => console.error(err));

//promisify the set timeout function and create a wait function. Real world example
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait(1);
  })
  .then(() => console.log('5 seconds passed'));

//callback hell
// setTimeout(() => {
//   console.log('1 second passed');

//   setTimeout(() => {
//     console.log('2 second passed');

//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//create a fulfilled or a rejected promise immediately. Static method on promise constructor
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.log(x));
 */

///////////////////////////////////////
/// Promisifying the Geolocation API

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// console.log('Getting position');

// promisify a callback based API, to a promise based API.
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  //country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(...data);
      // console.log(data);
      const neighbour = data[0].borders ? data[0].borders[0] : undefined;
      // console.log(neighbour);
      //country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'No neighbours found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const simplifyCountry = function (country) {
  const newCountry = country.split(' (')[0];
  return newCountry;
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longtitude: lng } = pos.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error(`(${response.status})`);
      // console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.city === '' || data.countryName === '')
        throw new Error(`city and country doesn't exist.`);

      const country = simplifyCountry(data.countryName);
      getCountryData(country);

      console.log(`You are in ${data.city}, ${country}.`);
    })
    .catch(err => {
      renderError(`Something went wrong, ${err} 💥💥💥`);
      console.error(`Something went wrong, ${err} 💥💥💥`);
    });
};

btn.addEventListener('click', whereAmI);
