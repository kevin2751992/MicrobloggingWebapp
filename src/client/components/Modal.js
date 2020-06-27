export class Modal {
  constructor () {
    console.log('hi');
    // set Modal on show
    const modal = document.getElementById('modal');
    modal.classList.add('show');

    // -----CloseHandler----> Close Modal on Click
    document.getElementById('closeModal').addEventListener('click', () => {
      console.log('close');
      document.getElementById('modal').classList.remove('show');
      document.getElementById('modal').classList.add('hide');
    });
    // -----Submit----> Create new BlogPost
    document.getElementById('post').addEventListener('click', () => {
      console.log('submit');
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

      // Optional Media
      const radioImg = document.getElementById('radioImg').checked;
      console.log('ImgRadio is checked?', radioImg);
      if (radioImg) {
        console.log('IMG is checked');
        const imgFile = document.getElementById('file').files[0];
        // genarateID
        const imgID = imgFile.name + Math.floor(Math.random() * 999999);
        console.log('IMG', imgID);
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
}
