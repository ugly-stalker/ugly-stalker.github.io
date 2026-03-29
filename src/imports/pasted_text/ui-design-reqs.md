UI Design Requirements — lawrencecwy.com

Layout & Structure

Single page, full viewport height — no scrolling
Three zones: header, chat area, input area
Responsive — works on desktop, tablet, and mobile
No navigation menu — nothing to navigate to
Footer sits below input area — minimal, unobtrusive


Header

Name: Lawrence Chung — prominent, left aligned
Title: Technical Product & Delivery Lead — smaller, muted
Right side: CV download link + LinkedIn icon
Thin border or divider separating header from chat area
No logo, no profile photo, no nav links


Pre-Chat State (before user starts chatting)

Intro message displayed as first chat bubble — AI side
Name and company input fields displayed below intro bubble
Fields are inline, side by side on desktop, stacked on mobile
Single CTA button: Start chatting →
Small GDPR one-liner below fields — muted, small font
Fields and button disappear entirely once user submits — no trace
If user skips fields and just clicks the button — that's fine, proceed anyway
Smooth transition animation when pre-chat state disappears and chat begins


Chat Area

Scrollable message history
Two bubble types — AI (left aligned) and user (right aligned)
AI bubble: darker background, left side
User bubble: accent green, right side
Timestamps optional — lean towards no, keeps it clean
AI name or avatar above first AI bubble only — not repeated every message
Smooth scroll to latest message automatically
Loading indicator while AI is responding — subtle typing animation, three dots
Messages render markdown — bold, line breaks at minimum


Tag Questions

Displayed as clickable pill tags below the chat area, above the input box
8 tags — two rows of four on desktop, scrollable row on mobile
Clicking a tag populates it as a user message and sends immediately
Tags remain visible throughout the conversation — can click multiple times
When limit is reached, tags swap to: Email · LinkedIn · Download CV
Tags use the accent green border style — consistent with site palette


Input Area

Single text input — full width
Placeholder text: Ask me anything...
Send button — right side of input, icon only (arrow or similar)
Enter key sends message
Input clears after sending
Input and send button disabled when AI is responding
Input and send button disabled when limit is reached
Disabled state placeholder: Message limit reached — get in touch directly
Multi-line input — expands up to 3 lines, then scrolls


Limit State

No error messages or HTTP error codes ever shown to user
IP limit message renders as normal AI chat bubble
Global cap message renders as normal AI chat bubble
Both messages include clickable email and LinkedIn links inside the bubble
Input box disables gracefully with placeholder explaining why
Tag pills swap to contact CTAs
No page refresh, no redirect — everything happens within the chat interface


Name & Company Capture

Two fields: Name (placeholder: Your name) and Company (placeholder: Your company)
Both optional — no validation, no required fields
Fields sit inside or directly below the intro bubble
On submit — fields and button fade out, chat begins
If name provided — AI uses it naturally in first response
If company provided — logged silently, optionally referenced by AI if relevant
Data stored in D1 with every subsequent message from that session


Visual Design

Dark colour scheme — deep near-black background
Primary accent: green (#3dd68c)
Secondary accent: lighter green (#a8f0c6)
Typography: Syne for headings, Space Mono for code/terminal/tags
Subtle grid background — low opacity, not distracting
Noise texture overlay — very subtle depth
No images, no illustrations, no icons beyond simple SVG
Consistent with the homepage HTML already designed


Footer

Minimal — single line
Left: © 2026 Lawrence Chung · London
Right: Privacy · LinkedIn · lawrencecwy@gmail.com
Privacy links to a simple separate privacy page
No other content