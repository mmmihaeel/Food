function  tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabButtons = document.querySelectorAll(tabsSelector),
          tabContents = document.querySelectorAll(tabsContentSelector),
          tabhWrapper = document.querySelector(tabsParentSelector);
        tabhWrapper.addEventListener('click', event => {
          if (event.target && event.target.classList.contains(tabsSelector.slice(1))) {
            tabButtons.forEach((btn, i) => {
              btn.addEventListener('click', () => {
                hideContent();
                showContent(i);
              });
            });
          }
        });

        function hideContent() {
          tabContents.forEach(content => {
            content.style.display = "none";
          });
          tabButtons.forEach(btn => {
            btn.classList.remove(activeClass);
          });
        }

        function showContent(i) {
          tabContents[i].style.display = "block";
          tabButtons[i].classList.add(activeClass);
        }

        hideContent();
        showContent(0);
}


export default tabs;