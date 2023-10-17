const menuEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");
const menuHamIcon = document.querySelector(".menu");
const menuCarritoIcon = document.querySelector(".navbar-shopping-cart");
const productDetailClosedIcon = document.querySelector(".product-detail-close");
const mobileMenu = document.querySelector(".mobile-menu");
const shoppingCartContainer = document.querySelector("#shoppingCartContainer");
const cardsContainer = document.querySelector('.cards-container');
const productDetailContainer = document.querySelector("#productDetail");

menuHamIcon.addEventListener('click', toggleMobileMenu);
menuEmail.addEventListener('click', toggleDesktopMenu);
menuCarritoIcon.addEventListener('click', toggleCarritoAside);
productDetailClosedIcon.addEventListener('click', closeProductDetailAside);


function toggleDesktopMenu(){

    const isAsideClosed = shoppingCartContainer.classList.contains('inactive');


    if (!isAsideClosed) {
        shoppingCartContainer.classList.add("inactive");
   
      }

    desktopMenu.classList.toggle("inactive");
}

// A la hora de presionar la barra menu, el icono de detalle producto desaparece
function toggleMobileMenu(){

    const isAsideClosed = shoppingCartContainer.classList.contains('inactive');


    if (!isAsideClosed) {
        shoppingCartContainer.classList.add("inactive");
   
      }
    
    closeProductDetailAside()

    mobileMenu.classList.toggle("inactive");
}


// A la hora de presionar el icono carrito, desaparece la barra menu
function toggleCarritoAside(){

    const isMobileMenuClosed = mobileMenu.classList.contains('inactive');
    const isMenuEmailClosed = menuEmail.classList.contains('inactive');
    const isProductDetailClosed = productDetailContainer.classList.contains('inactive');

    if (!isMobileMenuClosed) {
     mobileMenu.classList.add("inactive");

    }

    if (!isMenuEmailClosed) {
    desktopMenu.classList.add("inactive");

    }

    if (!isProductDetailClosed) {
        productDetailContainer.classList.add("inactive");

    }

   shoppingCartContainer.classList.toggle("inactive");
}

function openProductDetailAside(){
    shoppingCartContainer.classList.add("inactive");

    productDetailContainer.classList.remove('inactive');
}

function closeProductDetailAside(){
    productDetailContainer.classList.add('inactive');
}

const productList = [];

productList.push({
    name: 'Bike',
    price: 120,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
})

productList.push({
    name: 'Celular',
    price: 320,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
})

productList.push({
    name: 'Laptop',
    price: 520,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
})

productList.push({
    name: 'Laptop',
    price: 520,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
})

function renderProducts(arr) {
    for (product of arr){
        /* Creamos elementos y su clase 
        -- div>img+div>(div>p+p)+figure>img */
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        /* img+div> */
        const productImg = document.createElement('img')
        productImg.setAttribute('src', product.image);
        productImg.addEventListener('click', openProductDetailAside);
    
        /* +div>(div>p+p)+figure>img */
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
        
        /* >(div>p+p) */
        const productInfoDiv = document.createElement('div');
    
        const productPrice = document.createElement('p');
        productPrice.innerText = '$ ' + product.price;
    
        const productName = document.createElement('p');
        productName.innerText = product.name;
    
        productInfoDiv.appendChild(productPrice);
        productInfoDiv.appendChild(productName);
    
        /* +figure>img */
        const productInfoFigure = document.createElement('figure');
    
        const productImgCart = document.createElement('img');
        productImgCart.setAttribute('src', './icons/bt_add_to_cart.svg');
    
        productInfoFigure.appendChild(productImgCart);
    
        productInfo.appendChild(productInfoDiv);
        productInfo.appendChild(productInfoFigure);
    
        productCard.appendChild(productImg);
        productCard.appendChild(productInfo);
    
        /* Metemos todo en la variable principal */
        cardsContainer.appendChild(productCard);
    }
}

renderProducts(productList);
