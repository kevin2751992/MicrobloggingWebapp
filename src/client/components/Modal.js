export class Modal {
  constructor () {
    console.log('hi');
    const main = document.getElementById('main');
    const modal = document.createElement('div');
    modal.className = 'modal';
    main.appendChild(modal);
  }
}
