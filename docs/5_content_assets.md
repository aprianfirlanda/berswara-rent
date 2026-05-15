# Content Assets: Berswara Rent

## 1. Imagery
- **Hero Image:** High-resolution lifestyle shot (baby + premium stroller).
- **Category Thumbnails:**
    - Stroller (e.g., Babyzen Yoyo).
    - Push Walker (e.g., VTech Learning Walker).
    - Push Bike (e.g., Doona Liki Trike).
- **Product Photos:** Multiple angles per product (Front, Side, Folded, etc.) stored in `/public/images/products/`.
- **Product Videos:** Video links (YouTube or other external hosting) to demonstrate usage or folding mechanism.
- **Hygiene Proof:** Photos of cleaning process/sanitizers used.
- **Favicon & Logo:** SVG format for scalability.

## 2. Copywriting
- **Taglines:** 
    - "Rent, Play, Return."
    - "Sewa Stroller & Perlengkapan Bayi Bandung."
    - "Quality baby gear without the clutter."
- **About Us:** Narrative about wanting to help parents access the best gear sustainably.
- **Product Descriptions:** 
    - Mandatory info: Brand, Model, Weight capacity, Age range, Dimensions.
- **FAQ:** Common questions about deposits, late returns, and damage.

## 3. Technical Data (JSON/JS object for Static Site)
- **Inventory List:**
    - ID, Name, Category, Brand, Price/Week, Price/Month, Description, Features, Availability (Boolean).
    - **Media:**
        - `photos`: Array of static paths (e.g., `['/images/p1-1.jpg', '/images/p1-2.jpg']`).
        - `videos`: Array of URLs (e.g., `['https://youtube.com/watch?v=...']`).

## 4. Brand Guidelines
- **Colors:** Soft Pastels (Soft Blue/Sage Green) mixed with clean White/Light Grey.
- **Typography:** Friendly Sans-serif (e.g., Inter or Quicksand).
