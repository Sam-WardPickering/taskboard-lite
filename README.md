# TaskBoard Lite – Playwright E2E Portfolio Project

TaskBoard Lite is a purpose-built web application created to demonstrate professional end-to-end testing practices using Playwright.

This repository contains:

- A fully functional task management app (HTML, CSS, Vanilla JS)
- A structured Playwright test suite
- Cross-browser execution (Chromium, Firefox, WebKit)
- GitHub Actions CI pipeline
- Page Object Model implementation
- Deterministic test data and local state handling
- Async UI states (loading indicators, toasts, modals)
- Drag-and-drop interaction coverage
- Form validation and negative-path testing
- Filtering, sorting, search, and bulk actions

The application is intentionally framework-free to keep the focus on test engineering and automation structure.

---

## Purpose

This project simulates a realistic product environment and applies professional automation standards, including:

- Clean and maintainable test architecture  
- Stable locator strategy  
- Test isolation and state control  
- Deterministic execution  
- Cross-browser compatibility  
- CI/CD integration  
- Flake-resistant assertions  
- Clear separation of concerns  

The structure reflects how I would approach automation in a production team setting.

---

## Tech Stack

### Application

- HTML5  
- CSS3  
- Vanilla JavaScript  
- LocalStorage for persistence  

### Testing

- Playwright Test  
- Cross-browser matrix (Chromium, Firefox, WebKit)  
- Page Object Model  
- Parallel execution  
- GitHub Actions CI  
- HTML reporting  

---

## Features Covered by Tests

- Authentication flow  
- Session persistence  
- CRUD operations  
- Validation and error handling  
- Async loading states  
- Filtering and search  
- Sorting logic  
- Bulk actions  
- Drag-and-drop reordering  
- Modal edit flows  
- Theme toggle and UI state persistence  
- Toast notifications  

---

## Continuous Integration

This project includes a GitHub Actions workflow that:

- Installs dependencies  
- Installs Playwright browsers  
- Executes tests across browsers  
- Uploads HTML reports as artifacts  

---

## Project Intent

Many portfolio repositories demonstrate simple scripted tests. This project focuses on:

- Test architecture decisions  
- CI/CD integration  
- Cross-browser strategy  
- Stability and flake prevention  
- Maintainability and scalability  

The goal is not just to write tests, but to demonstrate how to engineer a reliable and maintainable test suite.

---

If you are reviewing this repository as a hiring manager, I welcome feedback and discussion around test strategy, structure, and improvements.
