import fetch from 'node-fetch';

const moment = require('moment');
const FormData = require('form-data');

export class Author {
  constructor (name, avatarUrl) {
    this.name = name;
    this.avatarUrl = avatarUrl;
  }
}

export class BlogPost {
  constructor ({ title, text, img, geoId }, { created }, { name, avatarUrl }, { latitude, longitude }) {
    this.content = { title: title, text: text, img: img, geoId: geoId };
    this.author = new Author(name, avatarUrl);
    this.meta = { created: created };
    this.geolocation = { longitude: longitude, latitude: latitude };
  }
}

export class Blogservice {
  constructor () {
    this.blogPosts = [];

    // this.createTestData();
    this.apiEndpoint = 'http://localhost:8080/getBlogEntries';
    this.baseURL = 'http://localhost:8080/';
    // this.getBlogPosts();
  }

  createTestData () {
    for (let i = 1; i < 4; i++) {
      switch (i) {
        case 1:
        {
          const firstPost = new BlogPost(
            {
              title: '7 myths uncovered about trip ideas',
              text: '7 myths uncovered about trip ideas. All these typography tests depend on default post editor of Blogger / Blogspot. Why you never succeed at family trip ideas. Why student tours will change your life.',
              img: 'http://1.bp.blogspot.com/-h2xxeMUGWf0/VfejSy0OG7I/AAAAAAAANis/uzNo-ECQDpA/s1600/business_blackboard-light-man_102K.jpg'
            },
            { created: moment().startOf(moment(Date.now()).format('DD.MM.YYYY, hh:mm:ss ')).fromNow() },
            { name: 'Kevin', avatarUrl: 'http://localhost:8080/assets/profile/kevinmessmer.jpg' },
            { longitude: '', latitude: '' }
          );
          this.blogPosts[i] = firstPost;

          break;
        }
        case 2:
        {
          const secondPost = new BlogPost(
            {
              title: 'Why individual sport is on crack about individual sport',
              text: 'Why individual sport is on crack about individual sport. How individual rights can help you predict the future. Wedding gifts by the numbers. How homemade beauty products can help you live a better life. Expose: youre losing money by not using individual rights. 16 ideas you can steal from gossip magazines. 19 movies with unbelievable scenes about inspirational books. What wikipedia cant tell you about individual rights. The 14 best love test youtube videos. Why the next 10 years of celebrity tattoos will smash the last 10.',
              img: 'http://3.bp.blogspot.com/-Mv279_Mks24/VffXFNGh-ZI/AAAAAAAAPDI/lLDqbn46U1E/s1600/world_new-wall-street-of-world_149K.jpg'
            },
            { created: moment().startOf(moment(Date.now()).format('DD.MM.YYYY, hh:mm:ss ')) },
            { name: 'Kevin', avatarUrl: 'http://localhost:8080/assets/profile/kevinmessmer.jpg' },
            { longitude: '', latitude: '' }
          );
          this.blogPosts[i] = secondPost;
          break;
        }
        case 3: {
          const thirdPost = new BlogPost(
            {
              title: 'How analysis essays are the new analysis essays',
              text: 'How analysis essays are the new analysis essays. The complete beginners guide to education cities. 11 things you dont want to hear about analysis essays. The oddest place you will find analysis templates. What the world would be like if political parties didnt exist. 19 facts about new technologies that will impress your friends. Why your air force portal never works out the way you plan. 6 things that wont happen in education cities. 20 facts about weather radars that will impress your friends. What the beatles could learn from military records.',
              img: 'http://4.bp.blogspot.com/-8QE9Ne9jdXs/VffVe1HBpZI/AAAAAAAAO6g/o55dlrL_i_Y/s1600/travel_oversea-of-happiness_261K.jpg'
            },
            { created: moment().startOf(moment(Date.now()).format('DD.MM.YYYY, hh:mm:ss ')) },
            { name: 'Kevin', avatarUrl: 'http://localhost:8080/assets/profile/kevinmessmer.jpg' },
            { longitude: '', latitude: '' }
          );
          this.blogPosts[i] = thirdPost;
          break;
        }
        default:
          break;
      }
    }
  }

  getBlogPosts () {
    return fetch('http://localhost:8080/getBlogPosts', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
      .then(response => response.json())
      .then(data => {
        return new Promise((resolve, reject) => {
          const promise = data.map(blogPost => {
            // console.log('map item', blogPost);
            const mapedPost = new BlogPost(

              {
                title: blogPost.content.title,
                text: blogPost.content.text,
                img: blogPost.content.img,
                geoId: blogPost.content.geoId

              },
              { created: moment(blogPost.meta.created, 'DD.MM.YYYY,h:mm:ss').format('DD.MM.YYYY, HH:mm:ss ') },
              { name: blogPost.author.name, avatarUrl: blogPost.author.avatarUrl },
              { longitude: blogPost.geolocation.longitude, latitude: blogPost.geolocation.latitude }

            );
            // console.log('maped', mapedPost);
            return (mapedPost);
          });
          resolve(promise);
        });
      });
  }

  getGeoJson (id) {
    return fetch('http://localhost:8080/' + id, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    }).then(response => response.json())
      .then(data => {
        return new Promise((resolve, reject) => {
          if (data) {
            resolve(data);
          }
          reject(Error('Error while fetching geoJson'));
        });
      });
  }

  sortBlogPost (blogPosts) {
    // sice we using map to create the blogpost we have to sort them from old to new.
    // So the last index is the newest in order to have the result that the newst appears as first item (see blogPost.js)
    // nvm not needed anymore maybe for extra sorting feature
    blogPosts = blogPosts.sort(function (blogPostA, blogPostB) {
      if (moment(blogPostA.meta.created, 'DD.MM.YYYY,h:mm:ss').isBefore(moment(blogPostB.meta.created, 'DD.MM.YYYY,h:mm:ss'))) {
        console.log(moment(blogPostA.created, 'DD.MM.YYYY,h:mm:ss'));
        console.log(moment(blogPostB.meta.created, 'DD.MM.YYYY,h:mm:ss'));
        return 1;
      }
      if (moment(blogPostA.meta.created, 'DD.MM.YYYY,h:mm:ss').isAfter(moment(blogPostB.meta.created, 'DD.MM.YYYY,h:mm:ss'))) {
        console.log('a ist später');
        return -1;
      }
      // a muss gleich b sein
      return 0;
    });
    // console.log('sorted', blogPosts);
    return blogPosts;
  }

  uploadImg (img = {}, url = 'http://localhost:8080/uploadImage') {
    var data = new FormData();
    data.append('img', img.file);

    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    }).then(response => response.json())
      .then(id => {
        // console.log('id', id);
        return new Promise((resolve, reject) => {
          if (id) {
            resolve(id);
          } else reject(Error('Ups something went wrong while uploading, no Id was returned from the server'));
        });
      });
  }

  uploadGeoJson (geo = {}, url = 'http://localhost:8080/uploadGeojson') {
    var data = new FormData();
    data.append('geoJson', geo);
    // console.log('data', data);
    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    }).then(response => response.json()).then(id => {
      // console.log('id', id);
      // After upload returns GeoId served by server
      return new Promise((resolve, reject) => {
        if (id) {
          resolve(id);
        } else reject(Error('Ups something went wrong while uploading, no Id was returned from the server'));
      });
    });
  }

  postData (data = {}, url = 'http://localhost:8080/postBlogPost') {
    // Default options are marked with *

    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(result => {
      return result; // parses JSON response into native JavaScript objects
    });
  }
}
