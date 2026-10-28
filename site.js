document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
});

// Keep the screenshot links useful even when JavaScript is unavailable.
const screenshots = document.querySelectorAll('[data-lightbox]');
if (screenshots.length && typeof HTMLDialogElement !== 'undefined') {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-dialog';
    dialog.setAttribute('aria-label', 'Project screenshot preview');
    const close = document.createElement('button');
    close.className = 'dialog-close';
    close.type = 'button';
    close.setAttribute('aria-label', 'Close screenshot preview');
    close.textContent = '×';
    const image = document.createElement('img');
    const caption = document.createElement('p');
    dialog.append(close, image, caption);
    document.body.append(dialog);
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target === dialog) {
            const bounds = dialog.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
        }
    });
    screenshots.forEach(link => {
        link.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
            event.preventDefault();
            image.src = link.href;
            image.alt = link.querySelector('img').alt;
            caption.textContent = image.alt;
            dialog.showModal();
        });
    });
}
