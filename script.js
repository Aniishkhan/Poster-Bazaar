// Toggle the navbar visibility with sliding animation
document.getElementById('navbar-toggle').addEventListener('click', function () {
    const navbarItems = document.querySelector('.navbar-items');
    if (navbarItems.classList.contains('show')) {
        // Hide the navbar with a sliding animation
        navbarItems.style.left = '-100%';
        setTimeout(() => navbarItems.classList.remove('show'), 300); // Remove `show` class after animation
    } else {
        // Show the navbar with a sliding animation
        navbarItems.classList.add('show');
        navbarItems.style.left = '0';
    }
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






// Change navbar background on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled'); // Add the class when scrolling
    } else {
        navbar.classList.remove('scrolled'); // Remove the class when at the top
    }
});








document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to all WhatsApp buttons
    document.querySelectorAll('.whatsapp-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card'); // Get the parent product card
            const price = productCard.getAttribute('data-price'); // Get the product price
            const image = productCard.getAttribute('data-image'); // Get the product image URL
            const productName = productCard.querySelector('h4').innerText; // Get product name

            // Create the WhatsApp message
            const whatsappMessage = `
Hello, I am interested in purchasing the following product:
- Product: ${productName}
- Price: Rs ${price}
- Image: ${image}

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
