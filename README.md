# WebTV Brazil - Shopee Affiliate Product Window

This project is a [Next.js](https://nextjs.org) application that serves as a "window" for Shopee products, displaying items from Shopee with affiliate links. It is designed to help you showcase and promote Shopee products, organized by categories, with a modern UI and pagination.

## Features

- 🛒 **Shopee Product Listing**: Displays products from Shopee, including images, descriptions, and prices.
- 🔗 **Affiliate Links**: Each product links to Shopee using your affiliate URL.
- 📂 **Category Browsing**: Products are organized by categories and subcategories.
- 🔍 **Pagination**: Easily navigate through multiple pages of products.
- 🖥️ **Admin Panel**: Manage categories and products through a simple admin interface.
- 🌙 **Dark Theme**: Styled for a modern dark UI using Tailwind CSS 4.1.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

- `src/app/products/[slug]/page.jsx` – Product listing by category
- `src/app/admin` – Admin interface for managing categories and products
- `src/app/components` – UI components (pagination, product grid, etc.)
- `src/app/models` – Mongoose models for products and categories

## Environment Variables

You may need to set up environment variables for your MongoDB connection and Shopee affiliate settings. Create a `.env.local` file:

## Customization

- **Add Categories/Products:** Use the admin panel at `/admin` to manage categories and products.
- **Styling:** Tailwind CSS 4.1 is used for styling. You can easily customize the look and feel.

---

## TODO:
Auth
Handling some exceptions
Implementing a few functionalities.

Made with ❤️ for Shopee affiliates.
