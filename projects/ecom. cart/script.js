// assignment add remove button in cart and also update the price at the same time 
document.addEventListener('DOMContentLoaded',()=>{
    const ProductListDisplay = document.getElementById('product-list')
    const CartItemsDisplay = document.getElementById("cart-items");
    const EmptyCartMess = document.getElementById("empty-cart");
    const CartTotalDisplay = document.getElementById("cart-total");
    const TotalPriceDisplay = document.getElementById("total-price");
    const CheckOutBtn = document.getElementById("checkout-btn");

    let productStorage = JSON.parse(localStorage.getItem("product Details") || []);
    const cart = JSON.parse(localStorage.getItem("cart" )) || []
// products creation 
    const products = [
        { id : 1 , name : 'Item 1', price : 49.55},
        { id : 2 , name : 'Item 2', price : 44.55},
        { id : 3 , name : 'Item 3', price : 23.55},
        { id : 4 , name : 'Item 4', price : 23.55},
        { id : 5 , name : 'Item 5', price : 23.55},
    ]
    saveProduct();
    function saveProduct() {
      if(!products) return ;
      localStorage.setItem("product Details", JSON.stringify(products));
      renderLocalStorage(productStorage)
    }
    
    // local stored variable are rendering 
    function renderLocalStorage(data){
        data.forEach((e) => renderproduct(e));
    }
// products render is called 
    products.forEach(e => renderproduct(e))
    
    
    
    
// actual function who will render this product for local + program code at same time 
    function renderproduct(product){
        if (
          !product ||
          ProductListDisplay.innerHTML.includes(product.name) // prevent duplicate rendering  condition if the product div already containing the product
        )
          return;

        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = ` <span>${product.name} - $ ${product.price.toFixed(2)}</span>
        <button data-id = ${product.id}>Add to Cart </button>`
        ProductListDisplay.appendChild(productDiv)
    }
    
    ProductListDisplay.addEventListener('click',(e) => {
        if(e.target.tagName === "BUTTON"){
        const productId = (parseInt(e.target.getAttribute('data-id'))); // grab the element through getattribute and parsing in to integer 
        const  value = products.find(e => e.id === productId)
        cart.push(value)
        rendercart(value)
        }
    })
      function rendercart(product) {
              let totalprice = 0;
              const cartDiv = document.createElement("div");
              cartDiv.innerHTML = `<span >${product.name} - $ ${product.price.toFixed(2)}</span> <button data-id = ${product.id} style ="background-color:red" >remove</button>`;

              cart.forEach((item) => {
                totalprice += item.price;
              });
              console.log(cart);
              TotalPriceDisplay.innerText = `$${totalprice.toFixed(2)}`;

              cartDiv.classList.add("product");
              CartItemsDisplay.appendChild(cartDiv);
              EmptyCartMess.classList.add("hidden");
              CartTotalDisplay.classList.remove("hidden");
       }



       CartItemsDisplay.addEventListener("click", (e) => {
              if (e.target.tagName === "BUTTON") {
                TotalPriceDisplay.innerText = "";
                let totalprice = 0;

                console.log(e.target.parentNode); // It selects the  div of current clicked item 
                const productId = parseInt(e.target.getAttribute("data-id")); 
                const Item = cart.find((e) => e.id === productId);
                cart.pop(Item)
                console.log(cart)
                cart.forEach((item) => {
                  totalprice += item.price;
                });

                TotalPriceDisplay.innerText = `$${totalprice.toFixed(2)}`; // price updation 
                if(!cart.length){
                  CartTotalDisplay.classList.add("hidden");
                  EmptyCartMess.classList.remove("hidden");
                }
                e.target.parentNode.remove();
              }
        });


})