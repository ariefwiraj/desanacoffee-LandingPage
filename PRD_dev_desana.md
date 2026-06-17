# AI-READY PRODUCT REQUIREMENT DOCUMENT

# PROJECT

Desana Coffee Website

Version: MVP 2.0

---

# PROJECT OBJECTIVE

Build a modern responsive landing page for Desana Coffee.

The website must:

* Introduce the coffee shop
* Showcase menu and atmosphere
* Increase WhatsApp inquiries
* Increase Google Maps visits
* Load quickly on mobile devices
* Achieve Lighthouse score >= 90

---

# TECHNICAL STACK

Frontend

* React 19
* Vite
* TypeScript
* Tailwind CSS v4
* ShadCN UI
* Framer Motion
* Lucide React

Backend

* Supabase

Deployment

* Vercel

---

# ARCHITECTURE

Pattern:

Frontend SPA

React
→ Supabase Client
→ Supabase Database
→ Supabase Storage

No custom backend required.

All data must be fetched directly from Supabase.

---

# DATABASE SCHEMA

Table: menus

id uuid primary key

name text not null

description text

price integer

category text

image_url text

featured boolean default false

created_at timestamp

---

Table: gallery

id uuid primary key

image_url text

caption text

created_at timestamp

---

Table: testimonials

id uuid primary key

customer_name text

review text

rating integer

avatar_url text

created_at timestamp

---

Table: website_content

id uuid primary key

section_name text

title text

subtitle text

content text

image_url text

---

# DESIGN SYSTEM

Colors

Primary:
#5E2315

Secondary:
#6B6D2C

Background:
#F6F1E7

Accent:
#C79A5B

Text:
#2B211D

Border Radius

Cards:
16px

Buttons:
12px

Typography

Hero Title:
text-5xl

Section Title:
text-4xl

Body:
text-base

Container

max-width:
1280px

Padding:
24px mobile
48px desktop

---

# RESPONSIVE BREAKPOINTS

Mobile:
< 768px

Tablet:
768px - 1023px

Desktop:

> = 1024px

---

# PAGE STRUCTURE

Navbar

Hero

About

Featured Menu

Facilities

Gallery

Testimonials

Location

CTA

Footer

Menu Overlay

---

# FEATURE SPECIFICATIONS

## Navbar

Requirements

* Sticky
* Transparent initially
* Background blur after scroll

Acceptance Criteria

* Navbar visible on all sections
* Smooth scroll navigation works
* Mobile hamburger menu works

---

## Hero Section

Content

* Headline
* Subheadline
* Explore Menu Button
* Visit Us Button
* Hero Image

Animations

* Fade In
* Scroll Reveal

Acceptance Criteria

* Occupies full viewport height
* CTA button visible without scrolling
* Responsive on all screen sizes

---

## Featured Menu

Display

* Maximum 8 featured products

Data Source

menus table

featured = true

Acceptance Criteria

* Products loaded from Supabase
* Skeleton loading displayed
* Error state handled

---

## Fullscreen Menu Overlay

Trigger

Explore Full Menu Button

Behavior

* Full viewport overlay
* Background blur
* ESC closes overlay
* Outside click closes overlay

Features

* Search Menu
* Category Filter
* Product Cards

Categories

Coffee

Non Coffee

Food & Snacks

Seasonal

Acceptance Criteria

* Search filters instantly
* Category filter works
* Smooth open animation
* Smooth close animation

---

## Gallery Section

Data Source

gallery table

Layout

Masonry Grid

Acceptance Criteria

* Responsive masonry layout
* Images lazy loaded
* Modal preview on click

---

## Testimonials Section

Data Source

testimonials table

Acceptance Criteria

* Minimum 3 testimonials shown
* Star ratings visible

---

## Location Section

Content

* Address
* Opening Hours
* Google Maps Embed
* WhatsApp Button

Acceptance Criteria

* Google Maps loads correctly
* WhatsApp button opens chat

---

# STATE MANAGEMENT

Use Zustand.

Stores

menuOverlayStore

galleryStore

---

# PERFORMANCE REQUIREMENTS

Lighthouse Performance >= 90

Lighthouse SEO >= 90

Lighthouse Accessibility >= 90

First Contentful Paint < 2s

Largest Contentful Paint < 2.5s

---

# SEO REQUIREMENTS

Meta Title

Desana Coffee | Coffee Shop Modern

Meta Description

Nikmati kopi terbaik dan suasana nyaman di Desana Coffee.

Open Graph

Required

Twitter Card

Required

JSON-LD Local Business

Required

---

# FOLDER STRUCTURE

src

components

sections

layouts

hooks

lib

services

types

store

pages

assets

---

# BUILD ORDER

Task 1

Project Setup

Task 2

Tailwind Configuration

Task 3

ShadCN Setup

Task 4

Supabase Integration

Task 5

Navbar

Task 6

Hero

Task 7

About

Task 8

Featured Menu

Task 9

Menu Overlay

Task 10

Facilities

Task 11

Gallery

Task 12

Testimonials

Task 13

Location

Task 14

Footer

Task 15

SEO

Task 16

Performance Optimization

Task 17

Deployment

---

# DEFINITION OF DONE

The project is considered complete when:

* All sections implemented
* Responsive on mobile, tablet, desktop
* Lighthouse >= 90
* Supabase integrated
* No TypeScript errors
* No ESLint errors
* Successfully deployed to Vercel
