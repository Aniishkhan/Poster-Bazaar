


        // light & dark mode swich js
        const toggleButton = document.getElementById('modeToggle');
        const themeLink = document.getElementById('themeStylesheet');
        const modeIcon = document.getElementById('modeIcon');

       
        let isDarkMode = localStorage.getItem('theme') === 'dark';
        themeLink.href = isDarkMode ? './styleeee.css' : './styleeee2.css';
        modeIcon.textContent = isDarkMode ? '🌙' : '🌞'; 

        toggleButton.addEventListener('click', () => {
            if (isDarkMode) {
                themeLink.href = './styleeee2.css';
                localStorage.setItem('theme', 'light');
                modeIcon.textContent = '🌞'; // sun for light
            } else {
                themeLink.href = './styleeee.css';
                localStorage.setItem('theme', 'dark');
                modeIcon.textContent = '🌙'; // moon for dark
            }
            isDarkMode = !isDarkMode;
        });





const listItems = document.querySelectorAll('.navigation ul li');
const indicator = document.querySelector('.indicator');

listItems.forEach((li, index) => {
  li.addEventListener('click', function () {
    listItems.forEach(item => item.classList.remove('active')); // Remove 'active' from all items
    li.classList.add('active'); // Add 'active' to the clicked item

    // Calculate indicator position
    const indicatorPosition = index * 70; // 70px is the width of each menu item
    indicator.style.transform = `translateX(${indicatorPosition}px)`; // Move indicator
  });
});






// function filterProjects(query) {
//     const items = document.querySelectorAll('.list');
//     items.forEach(item => {
//         const text = item.textContent.toLowerCase();
//         item.parentElement.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
//     });
// }



const sliderWrapper = document.getElementById('product-slider-wrapper');
// const prevBtn = document.getElementById('prev-btn');
// const nextBtn = document.getElementById('next-btn');
// const pagination = document.getElementById('pagination');

// Total items and width per item
const totalItems = sliderWrapper.children.length;
const itemWidth = sliderWrapper.children[0].offsetWidth + 15; // Add gap
let currentIndex = 0;

// Update pagination display
// function updatePagination() {
//     pagination.textContent = `${currentIndex + 1} / ${totalItems}`;
//     prevBtn.disabled = currentIndex === 0;
//     nextBtn.disabled = currentIndex === totalItems - 1;
// }

// Scroll to specific item
function scrollToIndex(index) {
    sliderWrapper.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
    });
    currentIndex = index;
    updatePagination();
}

// // Navigation button events
// prevBtn.addEventListener('click', () => {
//     if (currentIndex > 0) scrollToIndex(currentIndex - 1);
// });

// nextBtn.addEventListener('click', () => {
//     if (currentIndex < totalItems - 1) scrollToIndex(currentIndex + 1);
// });

// // Initialize
// updatePagination();





document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to all WhatsApp buttons
    document.querySelectorAll('.whatsapp-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card'); // Get the parent product card
            const price = productCard.getAttribute('data-price'); // Get the product price

            // Get the product image URL
            const image = productCard.getAttribute('data-image');

            const productName = productCard.querySelector('h4').innerText; // Get product name

            // Construct the full image URL
            const imageURL = new URL(image, window.location.origin).href;

            // Create the WhatsApp message
            const whatsappMessage = `
Hello, I am interested in purchasing the following product:
- Product: ${productName}
- Price: Rs ${price}
- Image Link: ${imageURL}

Please provide further details.`;

            // Encode the message for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage.trim());

            // Replace with your WhatsApp number
            const whatsappNumber = "9351136553";

            // Open WhatsApp with the generated URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
        });
    });
});




// detail page open
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navItems = document.querySelector(".nav-items");
    menuToggle.addEventListener("click", function () {
        navItems.classList.toggle("active");
    });
});

async function fetchNewBooks() {
    try {
        const response = await fetch('/getNewBooks');  
        const data = await response.json();
        console.log("Fetched Books:", data);

        const newBooksContainer = document.getElementById("newBooksContainer");
        newBooksContainer.innerHTML = "";

        data.books.forEach(book => {
            if (!book || !book._id || !book.title) {
                console.warn("Skipping invalid book:", book);
                return;
            }

            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            bookCard.innerHTML = `
                <img class="book-image" src="${book.bookImage || 'default.jpg'}" alt="${book.title}">
                <div class="rating-overlay">
                    ${generateStars(book.averageRating)}
                    <span class="avg-text">(${book.averageRating || 0} ⭐)</span>
                </div>
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author || 'Unknown'}</div>
                <div class="book-price">
                    ₹${book.price || 0} <span class="offer-price">₹${book.offerPrice || book.price || 0}</span>
                </div>
                <button class="add-cart">Add to Cart</button>
            `;

            bookCard.querySelector(".book-image").addEventListener("click", () => {
                window.location.href = `/newbookDetelies.html?id=${book._id}`;
            });

            bookCard.querySelector(".add-cart").addEventListener("click", (e) => {
                e.stopPropagation();
                addToCart(book._id, book.title, book.bookImage, book.price);
                alert("Book added to cart!");
            });

            newBooksContainer.appendChild(bookCard);
        });

    } catch (err) {
        console.error("Error fetching books:", err);
        alert("Failed to load new books.");
    }
}

function generateStars(rating) {
    rating = parseFloat(rating) || 0;
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += `<i class="fas fa-star" style="color: gold;"></i>`;
        } else if (i - rating < 1) {
            stars += `<i class="fas fa-star-half-alt" style="color: gold;"></i>`;
        } else {
            stars += `<i class="far fa-star" style="color: gold;"></i>`;
        }
    }
    return stars;
}

function addToCart(id, title, image, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, image, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartNotification();
}

function updateCartNotification() {
    const cartBadge = document.querySelector("sup#cart-count");
    if (!cartBadge) return;
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQuantity;
    cartBadge.style.display = totalQuantity === 0 ? "none" : "inline-block";
}

document.addEventListener("DOMContentLoaded", () => {
    fetchNewBooks();
    updateCartNotification();
});
  