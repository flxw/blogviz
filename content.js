header = window.document.createElement('div');
header.style.position = 'fixed';
header.style.top = "0";
header.style.width = "100%";
header.style.backgroundColor = 'red';
header.style.zIndex = "9999";
header.innerHTML = "HELLO WORLD"; // your content

wrapper = window.document.createElement('div');
wrapper.style.position = 'relative';
wrapper.style.marginTop = '15px'; // set to same height as header
wrapper.innerHTML = document.body.innerHTML;

document.body.innerHTML = "";
document.body.appendChild(header);
document.body.appendChild(wrapper);