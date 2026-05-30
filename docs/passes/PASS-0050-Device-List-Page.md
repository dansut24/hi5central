# PASS-0050 Device List Page

## Overview

This pass creates the first device inventory page for Hi5Central.

The device list page is the foundation for device management, remote access, patching, backup, and monitoring.

---

# Objective

Create:

```txt
/devices
```

---

# Page Location

```txt
apps/web/src/pages/devices/index.astro
```

---

# Initial Data Source

Placeholder data matching the seeded device inventory.

Future source:

```txt
GET /devices
```

---

# Display Fields

```txt
Device Name
Hostname
Operating System
Status
Agent Version
Last Seen
```

---

# Files Created

```txt
apps/web/src/pages/devices/index.astro
```

---

# Files Updated

```txt
apps/web/src/layouts/DashboardLayout.astro
```

---

# Success Criteria

```txt
Devices page exists
Sidebar links to /devices
Device inventory table displays
Mobile-friendly cards display
Web build passes
```

---

# Future Work

```txt
Live API integration
Search
Filtering
Pagination
Device details page
Remote access launch button
```
