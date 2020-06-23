import fetch from 'node-fetch';
const moment = require('moment');

class Author {
  constructor (name, avatarUrl) {
    this.name = name;
    this.avatarUrl = avatarUrl;
  }
}
class BlogPost {
  constructor ({ title, text, img }, { created }, { name, avatarUrl }) {
    this.content = { title: title, text: text, img: img };
    this.author = new Author(name, avatarUrl);
    this.meta = { created: created };
  }
}

export class Blogservice {
  constructor () {
    this.blogPosts = [];

    // this.createTestData();
    this.apiEndpoint = 'http://localhost:8080/getBlogEntries';
    // this.getBlogPosts();
  }

  createTestData () {
    for (let i = 1; i < 52; i++) {
      const staticBlogPost = new BlogPost(
        {
          title: 'TestTitle' + i,
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          img: 'https://via.placeholder.com/600'
        },
        { created: moment().startOf(moment(Date.now()).format('DD.MM.YYYY, h:mm:ss ')).fromNow() },
        { name: 'Kevin', avatarUrl: 'https://via.placeholder.com/100' }
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
        console.log('data', data);
        return new Promise((resolve, reject) => {
          const promise = data.map(blogPost => {
            console.log('post', blogPost);

            const mapedPost = new BlogPost(

              {
                title: blogPost.content.title,
                text: blogPost.content.text,
                img: blogPost.content.img
              },
              { created: moment(blogPost.meta.created).format('DD.MM.YYYY, h:mm:ss ') },
              { name: blogPost.author.name, avatarUrl: blogPost.author.avatarUrl }

            );
            console.log('maped', mapedPost);
            return (mapedPost);
          });
          console.log('promise', promise);
          resolve(promise);
        });
      });
  }
}
