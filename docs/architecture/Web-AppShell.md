# Hi5Central Web AppShell

## Purpose

Provide a shared layout for all authenticated pages.

## Components

AppShell

Responsibilities:

- Header
- Mobile navigation
- Desktop navigation
- Page container
- Scroll handling
- Responsive layout

## Pages Using AppShell

- /dashboard
- /devices
- /devices/[id]

## Rules

All authenticated pages must use AppShell.

Do not create standalone page layouts.

Benefits:

- Consistent UI
- Consistent navigation
- Mobile responsiveness
- Shared styling
- Easier future enhancements

## Mobile Requirements

Required viewport:

<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

Without this tag mobile Safari may render pages as desktop-width layouts and scale them down.

## Future

AppShell will eventually host:

- Search
- Notifications
- User profile
- Tenant selector
- Theme support
- Global command palette
