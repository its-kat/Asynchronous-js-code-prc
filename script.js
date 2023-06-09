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
  countriesContainer.style.opacity = 1;
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
// btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;

3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;

4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);

5. After the second image has loaded, pause execution for 2 seconds again;

6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/* const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    // loading event append to DOM
    newImg.addEventListener('load', function () {
      imgContainer.append(newImg);
      // resolve promise
      resolve(newImg);
    });
    //catch errors
    newImg.addEventListener('error', function () {
      reject(new Error('🛑 Image not found 🛑'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(error => {
    console.log(error);
  });
 */

///////////////////////////////////////
// Consuming Promises with Async/Await

//
//same as
// fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
//   console.log(res)
// );

// const getPosition_2 = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI_2 = async function () {
//   try {
//     //Geolocation
//     const pos = await getPosition_2();
//     const { latitude: lat, longtitude: lng } = pos.coords;

//     //Reverse geocoding
//     const resGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();

//     //Country Data
//     const cntry = simplifyCountry(`${dataGeo.countryName}`);

//     const res = await fetch(`https://restcountries.com/v2/name/${cntry}`);
//     if (!resGeo.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${cntry}`;
//   } catch (err) {
//     console.error(`${err}💥 `);
//     renderCountry(`💥 ${err.message}`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };

// console.log(`1: Will get location`);

// // whereAmI_2()
// //   .then(city => console.log(`2: ${city}`))
// //   .catch(err => console.error(`${err.message}💥`))
// //   .finally(() => console.log(`3: Finished getting location`));

// (async function () {
//   try {
//     const city = await whereAmI_2();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`${err.message}💥`);
//   }
//   console.log(`3: Finished getting location`);
// })();

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
//     // console.log([data1.capital, data2.capital, data3.capital]);
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);

//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

///////////////////////////////////////
// Promise Combinators

// Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//     getJSON(`https://restcountries.com/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v2/name/tanzania`),
//   timeout(5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled ES2020

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // Promise.any
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';

2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')

3. Check out the 'imgs' array in the console! Is it like you expected?

4. Use a promise combinator function to actually get the images from the array 😉

5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀

*/
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    // loading event append to DOM
    newImg.addEventListener('load', function () {
      imgContainer.append(newImg);
      // resolve promise
      resolve(newImg);
    });
    //catch errors
    newImg.addEventListener('error', function () {
      reject(new Error('🛑 Image not found 🛑'));
    });
  });
};

// Part 1:
const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgEl = await Promise.all(imgs);

    // console.log(imgs, imgEl);

    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
