
import { BlogPost } from '../service/blogservice';
import { BlogPosts } from './blogPosts';
const moment = require('moment');

export class Modal {
  constructor (blogService, pagination) {
    this.blogservice = blogService;
    this.pagination = pagination;

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

      // Author
      const userName = document.getElementById('user').innerHTML;
      const userImg = document.getElementById('userImg').src;

      // BlogPost
      // Title
      const title = document.getElementById('blogtitle').value;
      console.log('Title:', title);
      if (title === '') {
        window.alert('Title cannot be left blanc');
      }
      // Content
      const blogBody = document.getElementById('contentInput').value;
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
            this.pagination.getPage(1);
            this.blogservice.postData(createdBlogPost);
            blogPosts.createSingleBlogPost(createdBlogPost, 0, true);
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
            this.pagination.getPage(1);
            this.blogservice.postData(createdBlogPost);

            blogPosts.createSingleBlogPost(createdBlogPost, 0, true);
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
        this.pagination.getPage(1);
        this.blogservice.postData(createdBlogPost).then(result => {
          this.closeModal();
        });
        blogPosts.createSingleBlogPost(createdBlogPost, 0, true);
      }

      // Error handling
    });
    // ---RadioHandler Show and hide File updload
    document.getElementById('radioGeo').addEventListener('change', (event) => {
      if (event.target.value === 'geo') {
        document.getElementById('imgInput').classList.remove('show');
        document.getElementById('imgInput').classList.add('hide');
      }
    });
    document.getElementById('radioImg').addEventListener('change', (event) => {
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

    // Reset the Modal to default
    // Title
    document.getElementById('blogtitle').value = 'Title';
    // BlogContent
    document.getElementById('contentInput').value = '';
    document.getElementById('radioGeo').checked = false;

    // if imgRadio was checked  hide input and remove its value
    if (document.getElementById('radioImg').checked) {
      document.getElementById('imgInput').classList.remove('show');
      document.getElementById('imgInput').classList.add('hide');
      if (document.getElementById('file').files[0]) {
        document.getElementById('file').value = '';
      }
    }

    document.getElementById('radioImg').checked = false;
  }
}
