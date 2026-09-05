# Design a **premium, modern Login and Signup UI** for a developer-focused project management SaaS.

### Tech / UI Requirements

Build the interface using:

* **React + TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* Lucide React icons
* Fully responsive design
* Accessible form controls

Use shadcn/ui components wherever appropriate:

* Card
* Button
* Input
* Label
* Checkbox
* Separator
* Alert
* Form
* Dialog where needed

Do not create unnecessary custom components when an appropriate shadcn/ui component exists.

---

## LOGIN

Create a clean, premium authentication page.

Use a centered `Card` with a subtle modern background.

### Header

* Product logo
* Product name
* Heading: **Welcome back**
* Description: **Sign in to continue to your workspace.**

### Authentication

Primary OAuth button:

**Continue with GitHub**

* GitHub icon
* Full width
* Use shadcn `Button`

Then a `Separator` with:

**or continue with email**

Form:

**Email**

* shadcn `Input`
* Placeholder: `you@company.com`

**Password**

* shadcn `Input`
* Password visibility toggle
* Placeholder: `Enter your password`

Below:

* shadcn `Checkbox`: Remember me
* **Forgot password?** link

Primary CTA:

**Sign in**

Bottom text:

**Don't have an account? Create account**

---

## SIGNUP

Use the same design system and layout as Login.

### Header

**Create your account**

"Start building better with your team."

### Authentication

Primary OAuth:

**Continue with GitHub**

Separator:

**or sign up with email**

Form:

**Full name**

**Work email**

**Password**

* Password visibility toggle
* Password strength indicator

**Confirm password**

* Password visibility toggle

Primary CTA:

**Create account**

Bottom:

**Already have an account? Sign in**

---

## VISUAL DESIGN

Make the interface feel like a **premium developer SaaS product**.

Visual inspiration:

* Linear
* Vercel
* Raycast
* Modern shadcn/ui applications

But create a **unique visual identity**, not a copy.

Use:

* Minimal white/neutral background
* Dark charcoal typography
* Subtle borders
* One sophisticated accent color
* `rounded-xl` cards
* Very subtle shadows
* Excellent spacing
* Strong typography hierarchy
* Clean icons
* Smooth hover/focus transitions

Support **light and dark mode** using shadcn's theme system.

Avoid:

* Excessive gradients
* Giant illustrations
* Excessive glassmorphism
* Bright multi-color palettes
* Clutter
* Generic Bootstrap-style forms

---

## INTERACTION STATES

Implement realistic UI states:

### Login

* Default
* Input focused
* Invalid email
* Wrong password
* Loading
* Disabled
* GitHub OAuth loading
* Authentication error
* Success

### Signup

* Empty form
* Invalid email
* Weak password
* Password mismatch
* Existing account
* Loading
* Server error
* Success

Use shadcn `Alert` or inline validation for errors.

---

## RESPONSIVE

### Desktop

Centered authentication card with a sophisticated minimal background.

### Mobile

* Full-width card
* 16–24px horizontal padding
* Large touch-friendly controls
* Logo centered/top
* No unnecessary decorative elements

The Login and Signup pages should feel like **two parts of the same polished authentication system**.

Make the final result **production-ready, accessible, responsive, clean, modern, and visually impressive**.
