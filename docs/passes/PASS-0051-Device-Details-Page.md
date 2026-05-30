# PASS-0051 Device Details Page

## Overview

This pass introduces the first device details page.

The device details page becomes the central hub for all future device management features.

---

# Objective

Create:

```txt
/devices/[id]
```

---

# Initial Data Source

Placeholder data matching seeded devices.

Future source:

```txt
GET /devices/:id
```

---

# Device Information

Display:

```txt
Device Name
Hostname
Operating System
Status
Agent Version
Last Seen
Public IP
Local IP
```

---

# Action Buttons

Display:

```txt
Remote Control
Terminal
File Manager
PowerShell
Restart
Shutdown
```

Buttons are placeholders in this pass.

---

# Files Created

```txt
apps/web/src/pages/devices/[id].astro
```

---

# Files Updated

```txt
apps/web/src/pages/devices/index.astro
```

---

# Success Criteria

```txt
Device details route exists
Device cards link to details page
Web build passes
```

---

# Future Work

```txt
Live API integration
Remote control launch
Terminal launch
Services
Processes
Event Logs
Software Inventory
Windows Updates
Policies
```
