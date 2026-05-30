PASS-0006 Mobile Responsive Dashboard

Overview

This pass improves the Hi5Central dashboard experience on mobile and tablet devices while preserving the existing desktop layout.

The goal is to ensure the platform feels like a modern mobile application on smaller devices while maintaining the professional desktop experience already established.

⸻

Objective

Improve the dashboard experience on:

Mobile
Tablet
Desktop

⸻

Mobile Layout

Mobile Header

Created:

apps/web/src/components/MobileHeader.astro

Responsibilities:

Show Hi5Central logo
Show page title
Show quick action button
Remain visible on mobile devices
Hide on desktop devices

Purpose:

Provide app-like navigation
Improve screen space usage
Allow quick access to session actions

⸻

Mobile Navigation

Created:

apps/web/src/components/MobileNav.astro

Responsibilities:

Bottom navigation bar
Quick access to primary modules
Mobile-only display

Navigation Items:

Home
Devices
Remote
Patching
More

Purpose:

Improve usability on phones
Reduce navigation clicks
Provide app-style experience

⸻

Device Cards

Created:

apps/web/src/components/DeviceCards.astro

Responsibilities:

Replace desktop table on mobile
Display device status
Display health state
Display patch count
Display user information

Purpose:

Avoid horizontal scrolling
Improve readability
Increase touch usability

⸻

Responsive Rules

Desktop

Layout remains unchanged:

Fixed sidebar
Desktop header
Full device table
Two-column dashboard layout
Sidebar navigation

Purpose:

Preserve existing professional layout
Maximise information density

⸻

Tablet

Layout behaviour:

Responsive spacing
Stacked content where required
Improved readability
Reduced clutter

Purpose:

Provide a comfortable experience on medium-sized screens

⸻

Mobile

Layout behaviour:

No fixed sidebar
Top mobile header
Bottom navigation
Stacked metric cards
Device cards instead of tables
Large touch targets

Purpose:

Provide an application-style experience
Improve navigation
Reduce scrolling complexity

⸻

Implemented Files

Created:

apps/web/src/components/MobileHeader.astro
apps/web/src/components/MobileNav.astro
apps/web/src/components/DeviceCards.astro

Updated:

apps/web/src/pages/index.astro

⸻

Dashboard Behaviour

Mobile

Uses:

MobileHeader
MobileNav
DeviceCards

Displays:

Metrics
Device cards
Remote access panel
Backup panel

⸻

Tablet

Uses:

Responsive metric cards
Responsive spacing
Desktop table where appropriate

⸻

Desktop

Uses:

Desktop sidebar
Desktop header
Device table
Two-column dashboard

⸻

Design Principles

The following principles were applied:

Mobile-first usability
Large touch targets
Readable typography
Consistent spacing
Responsive layout
Modern SaaS styling

Visual Style:

Rounded corners
Soft shadows
White translucent cards
Slate colour palette
Indigo accent colour

⸻

Success Criteria

Achieved:

Desktop layout preserved
Mobile layout improved
Device table removed from mobile view
Device cards implemented
Mobile navigation added
Mobile header added
Responsive spacing improved

⸻

Deliverables

Completed:

MobileHeader component
MobileNav component
DeviceCards component
Responsive dashboard layout
Mobile-friendly device views

⸻

Current Status

Desktop dashboard operational
Mobile dashboard operational
Responsive behaviour implemented
Vercel deployment compatible
Ready for component refactoring pass

⸻

Future Work

Slide-out navigation drawer
Dark mode
Global search
Notifications
Live API integration
Authentication
Tenant-aware routing
Remote access launcher
PWA support
Offline support
