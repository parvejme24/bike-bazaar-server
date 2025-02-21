# Bike Store API

## Overview

This project implements a **Bike Store API** using **Express**, **TypeScript**, and **MongoDB** with **Mongoose** to manage bike products, orders, and customer interactions. The API supports basic CRUD operations for products, order management with inventory updates, and calculates total sales revenue using MongoDB’s aggregation pipeline. Data validation is implemented using Mongoose schemas and Zod for added security.

---

## Features

1. **CRUD Operations for Bike Products**:

   - Create, Read, Update, and Delete bike products.
   - Product data validation using Mongoose schema validation and Zod.
   - Filtering and sorting bikes by categories, price range, or brand.

2. **Order Management**:

   - Customers can place orders for bikes.
   - Inventory management updates when orders are placed.
   - Track orders using customer email and order IDs.

3. **Revenue Calculation**:

   - Calculate total sales revenue based on all orders using MongoDB's aggregation pipeline.

4. **Error Handling**:
   - Handles various error scenarios such as insufficient stock, validation errors, and product not found.

---

## Installation & Scripts

The following npm scripts are available for development, building, and running the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/parvejme24/a2-bike-store.git
   ```
