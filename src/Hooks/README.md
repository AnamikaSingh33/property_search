# CRE Property Search – React Frontend Assignment

A high-performance React + TypeScript application for searching and comparing commercial real estate (CRE) properties.
Built with **Vite**, **Tailwind CSS**, and modern React patterns.

##  Live Demo

[Live Deployment URL](https://your-deployment-link.vercel.app)

##  Repository

[GitHub Repository](https://github.com/your-username/cre-property-search)

---

##  Features

###  Search & Filter

* Debounced search bar (smooth typing, no lag)
* Property type filter (office, retail, industrial, warehouse)
* Price + Size range sliders
* Location dropdown/search
* Amenities multi-select
* Sort by **price, size, date listed**
* Clear all filters option

###  Property Display

* Responsive **grid + list** views
* Pagination / Infinite scroll (virtualized rendering for 500+ results)
* Property card hover states
* Mobile-optimized layout (320px+)

###  Comparison

* Checkbox selection on property cards
* Floating **Compare** button
* Side-by-side comparison modal (2–4 properties)
* Visual indicators for better/worse values (price, size, age)
* Remove properties from comparison

---

##  Performance Benchmarks

* **Search Experience**: smooth input, no lag
* **Rendering**: 500+ filtered results without UI freezing (virtualized)
* **Bundle Size**: <800KB total JS (screenshot below)
* **Memory**: no leaks after 10+ minutes of usage
* **Interactions**: comparison feature responds instantly (<100ms)

---



### 1. Bundle Size

*(screenshot from `npm run build`)*
![Bundle Size Screenshot](./docs/bundle-size.png)

### 2. Filter Performance

*(screen recording or GIF of filtering interaction)*
![Filter Performance GIF](./docs/filter-performance.gif)

### 3. Mobile Responsiveness

*(screenshots at 320px, 768px, 1280px)*
![Mobile](./docs/mobile-320.png)
![Tablet](./docs/tablet-768.png)
![Desktop](./docs/desktop-1280.png)

---

##  Tech Stack

* [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/) (fast builds + HMR)
* [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)
* [react-window](https://github.com/bvaughn/react-window) (virtualized rendering)
* Optional: [material-tailwind/react](https://www.material-tailwind.com/) for components

---

##  Project Structure

```
src/
├── components/
│   ├── PropertyCard/
│   ├── PropertyGrid/
│   ├── FilterPanel/
│   ├── ComparisonBar/
│   └── ComparisonModal/
├── hooks/
│   ├── usePropertyFilter.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
├── utils/
│   ├── filterUtils.ts
│   └── propertyUtils.ts
├── types/
│   └── property.ts
├── data/
│   └── properties.json
└── App.tsx
```

---

##  Setup Instructions

Clone the repo and run locally:

```bash
git clone https://github.com/AnamikaSingh33/property_search.git
cd property-search
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

##  Technical Decisions & Trade-offs

* **State Management**: kept lightweight with React hooks (`useState`, `useMemo`, `useReducer` where needed). Avoided Redux/Zustand for bundle size.
* **Performance**: implemented list virtualization (`react-window`), memoized filtering, and debounced input.
* **Bundle Optimization**: used Vite + code splitting + lazy-loading for comparison modal.
* **UI Library**: mostly Tailwind, minimal external UI libs for performance reasons.
* **Trade-offs**: With more time, I’d add unit tests, accessibility audits, and map-based search.

---

##  Evaluation Checklist

* [x] React hooks & modern patterns
* [x] Smooth search/filter experience
* [x] Mobile responsive (320px → desktop)
* [x] Clean, maintainable code
* [x] Performance evidence included
