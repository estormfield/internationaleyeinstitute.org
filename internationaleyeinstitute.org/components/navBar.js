const navBar = `
<ul class="sidenav">
  <li><a href="index.html">Home</a> </li>
  <li><a href="vision.html">Our Vision</a></li>
  <li class="dropdown">
      <a href="javascript:void(0)" class="dropbtn">About Us</a>
      <div class="dropdown-content">
          <a href="history.html">History</a>
          <a href="board.html">Board of Directors</a>
          <a href="donors.html">Donors</a>
      </div>
  </li>
  <li><a href="newsletters/index.html">Newsletters</a></li>
  <li class="dropdown">
      <a href="javascript:void(0)" class="dropbtn">How To Help</a>
      <div class="dropdown-content">
          <a href="help.html">Donate to IEI</a>
          <a href="donate-scholarship.html">Donate to Scholarship Fund</a>        
      </div>
  </li>
  <li><a href="contact.html">Contact Us</a> </li>
  <li class="dropdown">
      <a href="javascript:void(0)" class="dropbtn">Photos</a>
      <div class="dropdown-content">
          <a href="photos.html">Photos 2014</a>
          <a href="photos-early.html">Photos - Early</a>        
      </div>
  </li>
</ul>`;

var stylesheet = `<link href="./components/navBar.css" rel="stylesheet"  />`
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    "beforeend",
    stylesheet);

var doc = document.getElementsByTagName('nav');
doc[0].innerHTML = navBar;
