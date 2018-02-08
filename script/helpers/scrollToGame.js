import scrollToElement from 'scroll-to-element';

export default (id) => {
    const element = document.querySelector(`#game-${id}`);
    const rect = element.getBoundingClientRect();

    if (rect.top < 0 || rect.bottom > window.innerHeight) {
        scrollToElement(element, { ease: 'inOutQuad', align: 'middle' });
    }
};
