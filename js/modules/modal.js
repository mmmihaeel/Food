function showModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('modal__show');
  modal.classList.remove('modal__hide');
  document.body.style.overflow = 'hidden';
  if (modalTimerId){
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
          const modal = document.querySelector(modalSelector);
          modal.classList.add('modal__hide');
          modal.classList.remove('modal__show');
          document.body.style.overflow = '';
        }

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalButtons = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
  
        modalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal(modalSelector, modalTimerId);
          });
        });
        modal.addEventListener('click', (e) => {
          if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
          }
        });

    

        document.addEventListener('keydown', event => {
          if (event.code === "Escape" && modal.classList.contains('modal__show')) {
            closeModal(modalSelector);
          }
        });
  
    

        function showModalWithScroll() {
          if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
             showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalWithScroll);
          }
        }

        window.addEventListener('scroll', showModalWithScroll);
}

export default modal;
export { showModal };
export { closeModal };
