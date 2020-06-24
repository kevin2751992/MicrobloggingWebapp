export class Modal {
  constructor () {
    console.log('hi');
    const modal = document.getElementById('modal');
    modal.classList.add('show');

    // Use this later for Timestamp StackoverFlow is nice!
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    console.log('Date:', dateTime);
  }
}
