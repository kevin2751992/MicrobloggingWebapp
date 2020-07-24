
import { BlogPost } from '../service/blogservice';
const moment = require('moment');

export class Modal {
  constructor (blogService, pagination, blogposts) {
    this.blogservice = blogService;
    this.pagination = pagination;
    this.blogPosts = blogposts;

    // set Modal on show
    const modal = document.getElementById('modal');
    modal.classList.add('show');

    // -----CloseHandler----> Close Modal on Click
    document.getElementById('closeModal').addEventListener('click', () => {
      this.closeModal();
    });
    // -----Submit----> Create new BlogPost
    document.getElementById('post').addEventListener('click', () => {
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
      const radioGeo = document.getElementById('radioGeo').checked;
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

            const createdBlogPost = new BlogPost(
              {
                title: title,
                text: blogBody,
                img: 'http://localhost:8080/' + response.id,
                geoId: ''
              },
              { created: moment(dateTime).format('DD.MM.YYYY, h:mm:ss ') },
              { name: userName, avatarUrl: userImg },
              { longitude: '', latitude: '' }

            );
            this.pagination.getPage(1);
            this.blogservice.postData(createdBlogPost);
            this.blogPosts.createSingleBlogPost(createdBlogPost, 0, true);
            // window.location.reload();
            this.closeModal();
          });
        }
      } else if (radioGeo) {
        // -------------------------GEOLOCATION---------------/////
        // Get GeoJsonFile
        const geoJsonFile = document.getElementById('geoFile').files[0];

        if (geoJsonFile) {
          // create BlogPost with GeoJsonfile
          this.blogservice.uploadGeoJson(geoJsonFile).then(response => {
            const createdBlogPost = new BlogPost(
              {
                title: title,
                text: blogBody,
                img: '',
                geoId: response.id
              },
              { created: moment(dateTime).format('DD.MM.YYYY, h:mm:ss ') },
              { name: userName, avatarUrl: userImg },
              { latitude: '', longitude: '' }
            );

            this.blogservice.postData(createdBlogPost).then(result => {
              // window.location.reload();
              this.closeModal();
            });

            this.blogPosts.createSingleBlogPost(createdBlogPost, 0, true);
            this.pagination.getPage(1);
          });
        }
      } else {
        // If no addition Media was selected create just a plain BlogPost
        const createdBlogPost = new BlogPost(
          {
            title: title,
            text: blogBody,
            img: '',
            geoId: ''
          },
          { created: moment(dateTime).format('DD.MM.YYYY, h:mm:ss ') },
          { name: userName, avatarUrl: userImg },
          { latitude: '', longitude: '' },
          []
        );
        this.pagination.getPage(1);
        this.blogservice.postData(createdBlogPost).then(result => {
          // window.location.reload();
          this.closeModal();
        });
        this.blogPosts.createSingleBlogPost(createdBlogPost, 0, true);
      }

      // Error handling to add check for extensions and so on ... if we have the time
    });
    // ---RadioHandler Show and hide File/Geo updload
    document.getElementById('radioGeo').addEventListener('change', (event) => {
      if (event.target.value === 'geo') {
        document.getElementById('imgInput').classList.remove('show');
        document.getElementById('imgInput').classList.add('hide');
        document.getElementById('geoInput').classList.remove('hide');
        document.getElementById('geoInput').classList.add('show');
      }
    });
    document.getElementById('radioImg').addEventListener('change', (event) => {
      if (event.target.value === 'img') {
        document.getElementById('imgInput').classList.remove('hide');
        document.getElementById('imgInput').classList.add('show');

        document.getElementById('geoInput').classList.remove('show');
        document.getElementById('geoInput').classList.add('hide');
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

    // if imgRadio was checked  hide input and remove its value
    if (document.getElementById('radioImg').checked) {
      document.getElementById('imgInput').classList.remove('show');
      document.getElementById('imgInput').classList.add('hide');
      if (document.getElementById('file').files[0]) {
        document.getElementById('file').value = '';
      }
    }

    // if geoRadio was checked  hide input and remove its value
    if (document.getElementById('radioGeo').checked) {
      document.getElementById('geoInput').classList.remove('show');
      document.getElementById('geoInput').classList.add('hide');
      if (document.getElementById('geoFile').files[0]) {
        document.getElementById('geoFile').value = '';
      }
    }

    document.getElementById('radioImg').checked = false;
    document.getElementById('radioGeo').checked = false;
  }
}
