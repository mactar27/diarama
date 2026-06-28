-- Diarama Database Schema

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(255),
    productCount INT DEFAULT 0
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    category VARCHAR(100),
    categorySlug VARCHAR(100),
    image VARCHAR(255),
    images JSON, -- Store array as JSON
    stock INT DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    reviews INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    new BOOLEAN DEFAULT FALSE,
    bestseller BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categorySlug) REFERENCES categories(slug) ON DELETE SET NULL
);

-- Promo Codes table
CREATE TABLE IF NOT EXISTS promo_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount INT NOT NULL,
    type VARCHAR(20) DEFAULT 'percentage',
    minOrder INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    customerEmail VARCHAR(255) NOT NULL,
    customerName VARCHAR(255),
    items JSON NOT NULL,
    subtotal INT NOT NULL,
    discount INT DEFAULT 0,
    shipping INT DEFAULT 2500,
    total INT NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
