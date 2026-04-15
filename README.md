# 🧭 Ice & Fire Explorer SPA

A mobile-first Single Page Application (SPA) built with Angular 19 and Node.js, using the public **An API of Ice and Fire**.  
The application allows users to browse Game of Thrones data, view details, and manage favorite items.

---

## 🚀 Live Features

- 📜 List view of Game of Thrones data (Houses / Characters / Books depending on API usage)
- 🔍 Search and filter functionality
- 📄 Detailed information page for each item
- ⭐ Favorites system (add / remove items)
- 📱 Mobile-first responsive UI
- 🔄 State management using NgRx
- 🧪 End-to-end testing with Cypress
- 🔐 Optional authentication (Node.js backend)

---

## 🏗️ Project Structure

### Frontend (IceFireUser)
Built with Angular 19

- Angular Standalone Components
- NgRx Store + Effects
- Responsive UI (mobile-first design)
- Cypress for E2E testing
- Jasmine/Karma for unit tests

### Backend (IceFireClient)
Built with Node.js + Express

- REST API built with Express.js
- JWT Authentication (optional feature)
- In-memory user storage (no database required)
- Acts as authentication / user management layer

---

## 🔌 API Used

This project uses the public API:

- https://anapioficeandfire.com

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd your-project-folder