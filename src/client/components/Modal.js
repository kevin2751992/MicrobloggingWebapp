
import { BlogPost } from '../service/blogservice';
import { BlogPosts } from './blogPosts';
const moment = require('moment');

export class Modal {
  constructor (blogService) {
    console.log('hi');
    this.blogservice = blogService;
    // set Modal on show
    const modal = document.getElementById('modal');
    modal.classList.add('show');

    // -----CloseHandler----> Close Modal on Click
    document.getElementById('closeModal').addEventListener('click', () => {
      console.log('close');
      this.closeModal();
    });
    // -----Submit----> Create new BlogPost
    document.getElementById('post').addEventListener('click', () => {
      console.log('submit');
      const blogPosts = new BlogPosts();
      // MetaData
      // Timestamp
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      var dateTime = date + ' ' + time;
      console.log('Date:', dateTime);
      // Author
      const userName = document.getElementById('user').innerHTML;
      console.log('User:', userName);
      const userImg = document.getElementById('userImg').src;
      console.log('UserImgUrl:', userImg);

      // BlogPost
      // Title
      const title = document.getElementById('blogtitle').value;
      console.log('Title:', title);
      if (title === '') {
        window.alert('Title cannot be left blanc');
      }
      // Content
      const blogBody = document.getElementById('contentInput').value;
      console.log('Body:', blogBody);
      if (blogBody === '') {
        window.alert('Body cannot be left blanc');
      }

      // ---------------------------IMGUpload-------------------------//
      const radioImg = document.getElementById('radioImg').checked;
      const imgID = '';
      let imgFile = [];
      // IF the RadioIMG is checked start Img Upload
      if (radioImg) {
        imgFile = document.getElementById('file').files[0];

        // If we habe a img attached to the blogPost, then first upload the img and wait for the returned id of the server
        if (imgFile) {
          const file = {
            id: imgID,
            file: imgFile
          };

          this.blogservice.uploadImg(file).then(response => {
            // If we received the id create the BlogPost and use the service to post the blogpost to the server
            console.log('receivedID', response.id);
            const createdBlogPost = new BlogPost(
              {
                title: title,
                text: blogBody,
                img: 'http://localhost:8080/' + response.id
              },
              { created: moment(dateTime).format('DD.MM.YYYY, h:mm:ss ') },
              { name: userName, avatarUrl: userImg },
              { longitude: '', latitude: '' }

            );
            this.blogservice.postData(createdBlogPost);
            blogPosts.createSingleBlogPost(createdBlogPost);
            this.closeModal();
          });
        }
      }

      // -------------------------GEOLOCATION---------------/////
      const radioGeo = document.getElementById('radioGeo').checked;
      if (radioGeo) {
        // Use navigation Obj to return geolocation if supported
        if (navigator.geolocation) {
          // get Longitude and Latitude
          navigator.geolocation.getCurrentPosition((pos) => {
            console.log('current pos', pos);
            const createdBlogPost = new BlogPost(
              {
                title: title,
                text: blogBody,
                img: ''
              },
              { created: moment(dateTime).format('DD.MM.YYYY, h:mm:ss ') },
              { name: userName, avatarUrl: userImg },
              { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
            );
            this.blogservice.postData(createdBlogPost);
            blogPosts.createSingleBlogPost(createdBlogPost);
            this.closeModal();
          });
        }
      } else {
        const createdBlogPost = new BlogPost(
          {
            title: title,
            text: blogBody,
            img: ''
          },
          { created: moment(dateTime).format('DD.MM.YYYY, h:mm:ss ') },
          { name: userName, avatarUrl: userImg },
          { latitude: '', longitude: '' }
        );
        this.blogservice.postData(createdBlogPost);
        blogPosts.createSingleBlogPost(createdBlogPost);
        this.closeModal();
      }

      // Error handling
    });
    // ---RadioHandler Show and hide File updload
    document.getElementById('radioGeo').addEventListener('change', (event) => {
      console.log('radio', event.target.value);
      if (event.target.value === 'geo') {
        document.getElementById('imgInput').classList.remove('show');
        document.getElementById('imgInput').classList.add('hide');
      }
    });
    document.getElementById('radioImg').addEventListener('change', (event) => {
      console.log('changed');
      if (event.target.value === 'img') {
        console.log('show img upload');
        document.getElementById('imgInput').classList.remove('hide');
        document.getElementById('imgInput').classList.add('show');
      }
    });
  }

  closeModal () {
    document.getElementById('modal').classList.remove('show');
    document.getElementById('modal').classList.add('hide');
  }
}
