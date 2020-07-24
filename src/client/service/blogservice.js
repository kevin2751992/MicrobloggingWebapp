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
      const staticBlogPost = new BlogPost(
        {
          title: 'TestTitle' + i,
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          img: 'https://via.placeholder.com/600'
        },
        { created: moment().startOf(moment(Date.now()).format('DD.MM.YYYY, h:mm:ss ')).fromNow() },
        { name: 'Kevin', avatarUrl: 'https://via.placeholder.com/100' },
        { longitude: '', latitude: '' }
      );
      this.blogPosts[i] = staticBlogPost;
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
              { created: moment(blogPost.meta.created, 'DD.MM.YYYY,h:mm:ss').format('DD.MM.YYYY, h:mm:ss ') },
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
      if (moment(blogPostA.created, 'DD.MM.YYYY,h:mm:ss').isBefore(moment(blogPostB.meta.created, 'DD.MM.YYYY,h:mm:ss'))) {
        // console.log('a ist früher');
        return 1;
      }
      if (moment(blogPostA.meta.created, 'DD.MM.YYYY,h:mm:ss').isAfter(moment(blogPostB.meta.created, 'DD.MM.YYYY,h:mm:ss'))) {
        // console.log('a ist später');
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
