const buildCard = (title, description, photoUrl, price, productId) => {
  let cardContainer = document.createElement("div");
  let cardImage = document.createElement("img");
  let cardBody = document.createElement("div");
  let cardTitle = document.createElement("h5");
  let cardText = document.createElement("p");
  let cardPrice = document.createElement("h6");
  let cardButton = document.createElement("a");
  let cardButtonCart = document.createElement("a");
  let cardCartIcon = document.createElement("img");
  //let breakLine = document.createElement("br");*//

  // Add classes to elements
  cardContainer.classList.add("card", "custom-card", "m-2", "p-3");
  cardImage.classList.add("card-img-top", "custom-card-image");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  cardText.classList.add("card-text");
  cardPrice.classList.add("card-price");
  cardButton.classList.add(
    "btn",
    `btn-primary`,
    "d-flex",
    "justify-content-around"
  ); // template strings
  cardButtonCart.classList.add(
    "btn",
    "btn-secondary",
    "d-flex",
    "justify-content-around",
    "mt-3",
    "buttonCart"
  );
  cardCartIcon.classList.add("cart-icon");

  // Add values to the elements
  cardImage.src = photoUrl;
  cardTitle.innerText = title;
  cardText.innerText = `${description}`;
  cardPrice.innerText = `$${price}`;
  cardButton.innerText = "Ver detalles";
  cardButton.href = `/details.html?productId=${productId}`;
  cardButtonCart.innerText = "Agregar al carrito";
  cardCartIcon.src = "/Icons/cart-icon.svg";

  // Build structure
  cardContainer.appendChild(cardImage);
  cardContainer.appendChild(cardBody);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(cardButton);
  //*cardBody.appendChild(breakLine);*//
  cardBody.appendChild(cardButtonCart);

  cardButtonCart.appendChild(cardCartIcon);

  return cardContainer;
};

let mainContent = document.getElementById("main-content");

const createProduct = (title, description, price, imageUrl) => {
  const url = "https://kodekamp2022-default-rtdb.firebaseio.com/products.json";

  const product = {
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  };

  let productId = "";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((product) => {
      productId = product.name;
      window.location.href = `/details.html?productId=${productId}`;
    });
};

const getProduct = (id) => {
  const url = `https://kodekamp2022-default-rtdb.firebaseio.com/products/${productId}.json`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((product) => {
      const card = buildCard(
        product.title,
        product.description,
        product.imageUrl,
        product.price
      );

      mainContent.appendChild(card);
    });
};

const getAllProducts = () => {
  const url = `https://kodekamp2022-default-rtdb.firebaseio.com/products.json`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((products) => {
      for (const key in products) {
        const product = products[key];

        const card = buildCard(
          product.title,
          product.description,
          product.imageUrl,
          product.price,
          key
        );

        mainContent.appendChild(card);
      }
    });
};

const updateProduct = (title, description, price, imageUrl, productId) => {
  const url = `https://kodekamp2022-default-rtdb.firebaseio.com/products/${productId}.json`;

  const product = {
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  };

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => {
    if (res.ok) {
      window.location.href = `/details.html?productId=${productId}`;
    } else {
      console.error(res);
    }
  });
};
