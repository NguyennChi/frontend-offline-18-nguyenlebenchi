const URL_BASE = 'https://apiforlearning.zendvn.com/api/v2/'

// lib

// format day
dayjs.extend(window.dayjs_plugin_relativeTime);

// func conunt str
function countWords(str) {
    const arr = str.split(' ');
  
    return arr.filter(word => word !== '').length;
  }
// func remove str by n elem

let removeStr = (str,limit)=>{
    return str.split(' ').slice(0, limit).join(' ')
}
// // Menu
fetch(`${URL_BASE}categories_news`)
  .then((response) => response.json())
  .then((data) => {
    const categories = data.data
    // console.log(categories)
    // duyệt categories
    let contentHTML = '';
    let xhtml = ''
    categories.forEach((category, index) => {
        if (index < 2) {
            contentHTML += `<li class="nav-item">
            <a class="nav-link" href="${category.link}">${category.name}</a>
        </li>`
        } else {
            xhtml +=  `<a class="dropdown-item" href="${category.link}">${category.name}</a> `
        }
       
    });
    if (xhtml!== '') {
        xhtml = `<li class="nav-item dropdown ">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Danh mục khác <span class="fa fa-angle-down"></span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" >
                        ${xhtml}
                    </div>
            </li>`
    }
    document.getElementById('main-menu').innerHTML= contentHTML + xhtml
  });
// caterory
  fetch(`${URL_BASE}categories_news/featured?limit=4`)
  .then((response) => response.json())
  .then((data) => {
    const items = data.data
    // console.log(categories)
    // duyệt categories
    const Icons = ['fa fa-bath', 'fa fa-female', 'fa fa-cutlery', 'fa fa-pie-chart']
    let contentHTML = '';
    items.forEach((item,index) => {   
            contentHTML += `<div class="col-lg-3 col-6 grids-feature">
            <a href="${item.link}">
                <div class="area-box">
                    <span class="${Icons[index]}"></span>
                    <h4 class="title-head"> ${item.name}</h4>
                </div>
            </a>
        </div>` 
    });
   
    document.getElementById('main-category').innerHTML= contentHTML
  });
// bài viết mới nhẩt
  fetch(`${URL_BASE}articles?limit=3`)
  .then((response) => response.json())
  .then((data) => {
    const items = data.data
    let contentHTML = '';
    items.forEach((item,index) => {  
        const pubDate = dayjs(item.publish_date).fromNow();
       
            contentHTML += `<div class="col-lg-4 col-md-6 mt-lg-0 mt-4">
            <div class="top-pic${index+1}" style="background: url(${item.thumb}) no-repeat center center; background-style: cover" >
                <div class="card-body blog-details">
                    <a href="#blog-single.html" class="blog-desc"> ${item.title}
                    </a>
                    <div class="author align-items-center">
                        <img src="assets/images/a3.jpg" alt="" class="img-fluid rounded-circle" />
                        <ul class="blog-meta">
                            <li>
                                <a href="author.html">${item.author}</a> </a>
                            </li>
                            <li class="meta-item blog-lesson">
                                <span class="meta-value">${pubDate} </span>. <span
                                    class="meta-value ml-2"><span class="fa fa-clock-o"></span> 1 min</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
           ` 
    });
   
    document.getElementById('article-new').innerHTML= contentHTML
  });
// Bài viết xem nhiều
  fetch(`${URL_BASE}articles/popular?limit=3`)
  .then((response) => response.json())
  .then((data) => {
    const items = data.data
    let contentHTML = '';
    items.forEach((item,index) => { 
        let categories_name = item.category.name
        let content = item.description
        let nuContent = countWords(content)
        let shotDecript = ''
        if (nuContent>20) {
            shotDecript = removeStr(content,20)
        }
        const pubDate = dayjs(item.publish_date).fromNow();
        const fullDate = dayjs(item.publish_date).format('DD/MM/YYYY') 
            contentHTML += `<div class="col-lg-4 col-md-6 item">
            <div class="card">
                <div class="card-header p-0 position-relative">
                    <a href="#blog-single.html">
                        <img class="card-img-bottom d-block radius-image-full" src="${item.thumb}"
                            alt="${item.link}" style="height:200px; object-fit: cover; ">
                    </a>
                    
                </div>
                <div class="card-body blog-details">
                <span class="label-blue">${categories_name}</span>
                    <a href="#blog-single.html" class="blog-desc text">${item.title}
                    </a>
                    <p class="">${shotDecript}... <span class="fx-14"><a href=">${item.link}">xem</span></p>
                    <div class="author align-items-center">
                        <img src="assets/images/a1.jpg" alt="" class="img-fluid rounded-circle" />
                        <ul class="blog-meta">
                            <li>
                                <a href="author.html">${item.author}</a> </a>
                            </li>
                            <li class="meta-item blog-lesson">
                                <span class="meta-value"> ${fullDate} </span>. <span
                                    class="meta-value ml-2"><span class="fa fa-clock-o"></span>  ${pubDate}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
           ` 
    });
   
    document.getElementById('seen-article').innerHTML= contentHTML
  });
// Bài viết tổng hợp
fetch(`${URL_BASE}articles?limit=4`)
.then((response) => response.json())
.then((data) => {
  const items = data.data
  let contentHTML = '';
  items.forEach((item,index) => { 
      const pubDate = dayjs(item.publish_date).fromNow();
      const fullDate = dayjs(item.publish_date).format('DD/MM/YYYY') 
          contentHTML += `<div class="col-lg-6 mt-4">
          <div class="bg-clr-white hover-box">
              <div class="row">
                  <div class="col-sm-5 position-relative">
                      <a href="#blog-single.html" class="image-mobile">
                          <img class="card-img-bottom d-block radius-image-full" src="${item.thumb}" style="height:100%; object-fit: cover;"
                              alt="Card image cap">
                      </a>
                  </div>
                  <div class="col-sm-7 card-body blog-details align-self">
                      <a href="#blog-single.html" class="blog-desc">${item.title}
                      </a>
                      <div class="author align-items-center">
                          <img src="assets/images/a3.jpg" alt="" class="img-fluid rounded-circle" />
                          <ul class="blog-meta">
                              <li>
                                  <a href="author.html">${item.author}</a> </a>
                              </li>
                              <li class="meta-item blog-lesson">
                                  <span class="meta-value"> ${fullDate} </span>. <span
                                      class="meta-value ml-2"><span class="fa fa-clock-o"></span> ${pubDate} </span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
         ` 
  });
 
  document.getElementById('total-new').innerHTML= contentHTML
});