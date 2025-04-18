document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.querySelector('#productForm');

    productForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const imageFile = document.querySelector('#product_image').files[0];
        const category = document.querySelector('#category').value;

        if (!imageFile || !category) {
            alert("Please select an image and choose a category!");
            return;
        }

        const formData = new FormData();
        formData.append('product_image', imageFile); // ✅ Match this with backend
        formData.append('category', category);

        try {
            const response = await fetch('/api/admin/add/product', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                productForm.reset();
            } else {
                alert(result.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
