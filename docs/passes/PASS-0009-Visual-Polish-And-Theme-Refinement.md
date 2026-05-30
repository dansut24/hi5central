# PASS-0009 Visual Polish and Theme Refinement

## Overview

This pass improves the visual style of the Hi5Central dashboard.

The layout from the previous passes is correct, but the first dark/light theme implementation made the interface look too grey and washed out.

---

# Objective

Improve:

```txt
Colour contrast
Card styling
Sidebar styling
Button styling
Dark mode appearance
Light mode appearance
Typography
Visual hierarchy
```

---

# Design Direction

Use a cleaner modern SaaS style:

```txt
Deep navy background
Clean white cards
Violet/blue accent
Sharper text contrast
Subtle borders
Soft shadows
Less grey
More intentional dark panels
```

---

# Visual Problems Identified

```txt
Too much grey
Cards looked muddy
Sidebar lacked contrast
Dark mode felt accidental
Metric cards lacked depth
Remote access panel blended too much
Typography needed stronger hierarchy
```

---

# Files Updated

```txt
apps/web/src/styles/global.css
apps/web/src/components/ui/Button.astro
apps/web/src/components/ui/Card.astro
apps/web/src/components/ui/Badge.astro
apps/web/src/components/ui/StatCard.astro
apps/web/src/pages/index.astro
```

---

# Success Criteria

```txt
Dashboard looks more premium
Light mode looks clean
Dark mode looks intentional
Cards have better contrast
Sidebar looks more polished
Remote panel feels deliberate
Vercel build succeeds
```

---

# Future Work

```txt
Add icons
Add charts
Add animations
Add dark mode toggle
Add tenant branding controls
Add custom accent colours
```
