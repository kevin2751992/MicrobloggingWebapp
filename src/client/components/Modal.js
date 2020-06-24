export class Modal {
  constructor () {
    console.log('hi');
    const modal = document.getElementById('modal');
    modal.classList.add('show');

    document.getElementById('closeModal').addEventListener('click', () => {
      console.log('close');
      document.getElementById('modal').classList.remove('show');
      document.getElementById('modal').classList.add('hide');
    });

    document.getElementById('post').addEventListener('click', () => {
      console.log('submit');
    });

    document.getElementById('radioGeo').addEventListener('change', (event) => {
      console.log('radio', event.target.value);
      if (event.target.value === 'geo') {
        document.getElementById('fileUpload').classList.remove('show');
        document.getElementById('fileUpload').classList.add('hide');
      }
    });
    document.getElementById('radioImg').addEventListener('change', (event) => {
      console.log('changed');
      if (event.target.value === 'img') {
        console.log('show img upload');
        document.getElementById('fileUpload').classList.remove('hide');
        document.getElementById('fileUpload').classList.add('show');
      }
    });

    // Use this later for Timestamp StackoverFlow is nice!
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    console.log('Date:', dateTime);
  }
}
