# PRODUCT REQUIREMENT DOCUMENT (PRD)

# Desana Coffee

### Modern Coffee Shop Landing Page

Version: MVP 1.0

---

# 1. PRODUCT OVERVIEW

Desana Coffee adalah website landing page modern yang dirancang untuk memperkenalkan identitas coffee shop, menampilkan suasana tempat, menu unggulan, fasilitas, dan informasi lokasi dalam satu pengalaman scrolling yang nyaman.

Website menggunakan konsep Single Page Experience (SPA) dengan animasi yang halus dan visual yang hangat untuk menciptakan pengalaman digital yang mencerminkan suasana Desana Coffee.

Salah satu fitur utama website adalah Fullscreen Menu Overlay yang memungkinkan pengunjung menjelajahi seluruh menu tanpa meninggalkan halaman utama.

---

# 2. PRODUCT GOALS

## Business Goals

* Meningkatkan brand awareness Desana Coffee.
* Menampilkan coffee shop secara profesional.
* Menarik pengunjung untuk datang langsung ke lokasi.
* Mempermudah pelanggan melihat menu.
* Meningkatkan klik WhatsApp dan Google Maps.

## User Goals

* Mengenal Desana Coffee.
* Melihat suasana dan fasilitas coffee shop.
* Menjelajahi menu dengan mudah.
* Menemukan lokasi coffee shop.
* Menghubungi coffee shop secara cepat.

---

# 3. TARGET USERS

## Primary Users

* Pelajar
* Mahasiswa
* Freelancer
* Remote Worker
* Komunitas Lokal

## Secondary Users

* Pecinta Kopi
* Keluarga
* Wisatawan Lokal
* Pelanggan Baru dari Media Sosial

---

# 4. BRAND DIRECTION

## Brand Personality

* Warm
* Friendly
* Modern
* Rustic
* Natural
* Community-Oriented

## Color Palette

### Primary

Coffee Brown

#5E2315

### Secondary

Olive Green

#6B6D2C

### Background

Cream Latte

#F6F1E7

### Accent

Coffee Gold

#C79A5B

### Text

Charcoal

#2B211D

---

# 5. TECH STACK

## Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* ShadCN UI
* Framer Motion
* Lucide React

## Backend

* Supabase

### Usage

* Storage Foto
* Data Menu
* Data Gallery
* Testimonial
* Konten Website

## Deployment

Frontend:

* Vercel

Backend:

* Supabase

---

# 6. WEBSITE STRUCTURE

Single Page Landing Page

Home

├── Navbar

├── Hero

├── About

├── Featured Menu

├── Facilities

├── Gallery

├── Testimonials

├── Location

├── CTA

└── Footer

Additional Feature:

└── Fullscreen Menu Overlay

---

# 7. FEATURES

## Navbar

### Content

* Logo Desana Coffee
* About
* Menu
* Gallery
* Location

### Behavior

* Sticky Navbar
* Smooth Scroll Navigation
* Mobile Responsive

---

## Hero Section

### Purpose

Menciptakan kesan pertama yang kuat.

### Content

* Headline
* Subheadline
* CTA Explore Menu
* CTA Visit Us
* Hero Image

### Animation

* Fade In
* Parallax Effect
* Scroll Reveal

---

## About Section

### Purpose

Menjelaskan cerita dan identitas Desana Coffee.

### Content

* Brand Story
* Coffee Philosophy
* Supporting Image

---

## Featured Menu Section

### Purpose

Menampilkan menu andalan.

### Content

* 6 hingga 8 Menu Unggulan
* Foto Menu
* Nama Menu
* Harga

### CTA

Explore Full Menu

---

## Fullscreen Menu Overlay

### Purpose

Menampilkan seluruh katalog menu tanpa berpindah halaman.

### Trigger

Button:

Explore Full Menu

### Behavior

Saat tombol ditekan:

* Overlay memenuhi seluruh layar
* Background landing page menjadi blur
* Menu muncul dengan animasi Framer Motion

### Content

Kategori:

* Coffee
* Non Coffee
* Food & Snacks
* Seasonal Menu

### Menu Card

* Foto Produk
* Nama Produk
* Deskripsi Singkat
* Harga

### Additional Features

* Search Menu
* Category Filter
* Close Button

### Animation

* Scale Expansion
* Fade Transition
* Smooth Open & Close

---

## Facilities Section

### Purpose

Menampilkan fasilitas yang relevan untuk target pengguna.

### Content

* Fast WiFi
* Power Outlet
* Indoor Area
* Outdoor Area
* Parking Area
* Mushola

---

## Gallery Section

### Purpose

Menampilkan suasana coffee shop.

### Content

* Interior
* Menu
* Customer Experience
* Event Activity

### Layout

Masonry Grid

---

## Testimonials Section

### Purpose

Meningkatkan kepercayaan calon pelanggan.

### Content

* Customer Name
* Review
* Rating

---

## Location Section

### Purpose

Membantu pelanggan menemukan lokasi.

### Content

* Address
* Opening Hours
* Google Maps Embed
* WhatsApp Contact

---

## CTA Section

### Purpose

Mendorong pengunjung melakukan tindakan.

### Buttons

* WhatsApp
* Google Maps

---

# 8. USER FLOW

Visitor Opens Website

↓

Hero

↓

About

↓

Featured Menu

↓

Klik Explore Full Menu

↓

Fullscreen Menu Overlay

↓

Close Menu

↓

Gallery

↓

Location

↓

WhatsApp

↓

Visit Coffee Shop

---

# 9. MVP SCOPE

## Included

✅ Single Page Landing Page

✅ Responsive Design

✅ Hero Section

✅ About Section

✅ Featured Menu

✅ Fullscreen Menu Overlay

✅ Facilities Section

✅ Gallery

✅ Testimonials

✅ Location

✅ WhatsApp CTA

✅ Google Maps Embed

✅ Scroll Animation

✅ Framer Motion Animation

✅ SEO Optimization

✅ Mobile First Design

---

## Future Release

❌ Online Ordering

❌ Table Reservation

❌ Membership

❌ Loyalty Program

❌ Payment Gateway

❌ Event Booking

❌ POS Integration

---

# 10. NON-FUNCTIONAL REQUIREMENTS

## Performance

* Lighthouse Performance ≥ 90
* Lighthouse SEO ≥ 90
* Lighthouse Accessibility ≥ 90

## Responsiveness

* Mobile
* Tablet
* Desktop

## Browser Support

* Chrome
* Edge
* Firefox
* Safari

## Loading Time

* First Load < 3 Seconds

---

# 11. SUCCESS METRICS

## Business Metrics

* Peningkatan kunjungan ke coffee shop.
* Peningkatan klik WhatsApp.
* Peningkatan klik Google Maps.
* Peningkatan followers media sosial.

## Technical Metrics

* Performance Score ≥ 90
* SEO Score ≥ 90
* Accessibility Score ≥ 90
* Mobile Friendly
