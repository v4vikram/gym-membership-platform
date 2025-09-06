app/
├── (public)/                # 🌍 Public pages (visible to everyone)
│   ├── layout.jsx
│   ├── page.jsx             # Home page
│   ├── about/
│   │   └── page.jsx
│   ├── gyms/
│   │   └── page.jsx         # Public list of gyms
│   └── contact/
│       └── page.jsx
│
├── (auth)/                 # 🔑 Auth pages (only logged-out users should see)
│   ├── login/
│   │   └── page.jsx
│   └── register/
│       └── page.jsx
│
├── (user)/                # 👤 Logged-in user area (protected)
│   ├── layout.jsx
│   ├── dashboard/
│   │   └── page.jsx
│   └── profile/
│       └── page.jsx
│
├── (gym)/                 # 🏋️ Gym partner area (protected)
│   ├── layout.jsx
│   ├── dashboard/
│   │   └── page.jsx
│   └── visits/
│       └── page.jsx
│
├── (admin)/               # 👑 Admin area (protected)
│   ├── layout.jsx
│   ├── dashboard/
│   │   └── page.jsx
│   └── users/
│       └── page.jsx
│
├── globals.css
└── layout.jsx
