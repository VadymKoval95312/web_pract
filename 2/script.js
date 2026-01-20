document.addEventListener("DOMContentLoaded", function () {
    const device = 'desktop';
    const buttons = document.querySelectorAll('.preview-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            setLivePreviewFrameSize(this);
            setActiveResponsiveButton(this);
        });
    });
    function setActiveResponsiveButton(button) {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
    function getDataPreviewSizeAttr(button) {
        return button.getAttribute("data-preview-size");
    }
    function setLivePreviewFrameSize(button) {
        const size = getDataPreviewSizeAttr(button);
        const iframe = document.getElementById('livePreviewFrame');
        const scrollbarWidth = getScrollbarWidth();
        iframe.style.width = size.includes("%") ? size : `${parseInt(size, 10) + scrollbarWidth}px`;
    }
    function getScrollbarWidth() {
        const testElement = document.createElement("div");
        testElement.style.width = "100px";
        testElement.style.height = "100px";
        testElement.style.overflow = "scroll";
        document.body.appendChild(testElement);
        const width = testElement.offsetWidth - testElement.clientWidth;
        document.body.removeChild(testElement);
        return width;
    }
    detectActiveResponsiveButton();
    function detectActiveResponsiveButton() {
        const activeButton = document.querySelector(`#preview${device.charAt(0).toUpperCase() + device.slice(1)}Btn`);
        activeButton.click();
    }
});
