// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('/api/get/product');
//         if (!response.ok) throw new Error("Error fetching product");

//         const { allProduct } = await response.json();
//         if (!allProduct) return console.log("No products found");

//         const categoryMap = {
//             "Home Decor": "product-slider-wrapper11",
//             "Business Specific": "product-slider-wrapper22",
//             "Event & Celebrations": "product-slider-wrapper33",
//             "Custom Design": "product-slider-wrapper44",
//             "Seasonal Themes": "seasonalTheame",
//             "Inspirational & Quotes": "inspirationalQuotes",
//             "Outdoor & Commercial": "outdoorAndCommercial",
//             "Artistic & Abstract": "artistAndAbstract",
//             "Religious & Cultural": "ReligiousCultural"
//         };

//         allProduct.forEach(product => {
//             const wrapperId = categoryMap[product.category];
//             if (!wrapperId) return; // Unknown category
//             const container = document.getElementById(wrapperId);
//             if (!container) {
//                 console.warn(`No container found for ID: ${wrapperId}`);
//                 return;
//             }

//             const imagePath = `/uploads/${product.productImage}`;
//             const productCard = document.createElement('div');
//             productCard.classList.add('product-card');

//             productCard.innerHTML = `
//                 <img src="${imagePath}" style="width:300px; height:300px; object-fit:cover;" alt="${product.productName}">
//             `;

//             container.appendChild(productCard);
//         });

//     } catch (err) {
//         console.error("Error loading products:", err);
//     }
// });




document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/get/product');
        if (!response.ok) throw new Error("Error fetching product");

        const { allProduct } = await response.json();
        if (!allProduct) return console.log("No products found");

        const categoryMap = {
            "Home Decor": "product-slider-wrapper11",
            "Business Specific": "product-slider-wrapper22",
            "Event & Celebrations": "product-slider-wrapper33",
            "Custom Design": "product-slider-wrapper44",
            "Seasonal Themes": "seasonalTheame",
            "Inspirational & Quotes": "inspirationalQuotes",
            "Outdoor & Commercial": "outdoorAndCommercial",
            "Artistic & Abstract": "artistAndAbstract",
            "Religious & Cultural": "ReligiousCultural"
        };

        allProduct.forEach(product => {
            const wrapperId = categoryMap[product.category];
            if (!wrapperId) return;

            const container = document.getElementById(wrapperId);
            if (!container) {
                console.warn(`No container found for ID: ${wrapperId}`);
                return;
            }

            const imagePath = `/uploads/${product.productImage}`;
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.style.cursor = "pointer";

            // ✅ Make entire card or just image clickable
            productCard.innerHTML = `
                <img src="${imagePath}" 
                     style="width:300px; height:300px; object-fit:cover;" 
                     alt="${product.productName}" 
                     data-id="${product._id}">
            `;

            // ✅ Either click on card OR image — both supported
            productCard.addEventListener('click', () => {
                window.location.href = `/Detail-page.html?id=${product._id}`;
            });

            // ✅ (Optional) Click image separately, if needed
            productCard.querySelector('img').addEventListener('click', (e) => {
                e.stopPropagation(); // prevent bubbling if both card & image have events
                const id = e.target.getAttribute('data-id');
                window.location.href = `/Detail-page.html?id=${id}`;
            });

            container.appendChild(productCard);
        });

    } catch (err) {
        console.error("Error loading products:", err);
    }
});
