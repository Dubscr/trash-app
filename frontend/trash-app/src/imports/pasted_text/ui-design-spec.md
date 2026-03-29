Design a website UI from scratch in Figma for an already-built trash reporting backend.

Your job is to create the visual design and page layouts only. Do NOT invent extra product features unless absolutely necessary to complete the layout. Stay tightly constrained to the requirements below.

IMPORTANT:
- Adhere to the requirements exactly.
- I am attaching a file named how_program_works.txt. Treat that file as the backend source of truth and reference it for how the backend works, what data exists, what routes/endpoints exist, and what limitations the current system has.
- Do not guess backend behavior that is not supported by how_program_works.txt.
- If a design decision depends on backend functionality, fields, API shape, timestamps, or report data structure, use how_program_works.txt as the authority.
- Do not change the color palette.
- Do not add pages beyond the 4 requested.
- Do not add features such as chat, comments, social feed, achievements, badges, notifications, admin dashboards, filters, search bars, login/signup flows, or settings unless they are absolutely necessary for basic page completeness.
- Keep the UI clean, simple, and realistic to implement.
- Design for a desktop web app first.
- Use placeholder/sample content only where explicitly allowed.
- The final result should feel structured, polished, and buildable, not experimental.

COLOR PALETTE (DO NOT MODIFY):
/* CSS HEX */
--golden-chestnut: #c08552ff;
--ivory: #f6f7ebff;
--lavender-grey: #8693abff;
--charcoal-brown: #343633ff;
--fern: #618b4aff;

GLOBAL STYLING:
- All text must use the fern color.
- Keep the design cohesive across all 4 pages.
- Use the provided palette only unless a neutral is absolutely necessary for visibility.
- Maintain a simple, modern layout that would be easy for a frontend developer to build.

PAGES REQUIRED:
1. HOME / MAIN
2. ABOUT
3. UPLOAD
4. USER PAGE

HEADER (used consistently across pages):
Layout from left to right:
- Left-most: Home button
- Left-middle: Upload button
- Middle-right: User Page button
- Right-most: About button

Header styling:
- Background color: charcoal brown
- Buttons default color: ivory
- Buttons on hover: charcoal brown
- Create visible button states/variants for default and hover
- Keep the header layout exactly in this order

HOME / MAIN PAGE:
Overall structure:
- Header at top
- Main middle section directly under the header
- Footer directly under the main middle section
- No gaps between header, middle section, and footer

Middle section:
- Left side takes up 2/3 of the width: Map
- Right side: Leaderboard
- Leaderboard must be the same height as the map
- Leaderboard background color: ivory
- Map and leaderboard must sit directly next to each other
- This whole section sits directly below the header and directly above the footer

Leaderboard:
- Keep it simple and readable
- Show ranked users and points in a clean vertical list
- Do not add extra widgets unless necessary for basic clarity

Map:
- Treat this as the main visual feature of the homepage
- Design it as a real embedded-map area, not a tiny decorative card
- Since the backend stores latitude and longitude, the map area should visually support location-based trash reports and markers, but do not add extra complex controls unless necessary

FOOTER:
Content:
- Display stats for trash picked up in the last 24 hours
- Include a short, concise label explaining what the stats represent

Footer styling:
- Background color: charcoal brown

Stat categories:
Use this order:
- Plastic
- Paper
- Glass
- Metal
- Organic
- Regular

For each category:
- Show a circle containing the number of pickups in the last 24 hours
- Include an icon representing the category
- Example icon logic:
  - Organic = banana icon
  - Paper = paper icon

Keep the footer visually clean, compact, and easy to scan.

UPLOAD PAGE:
Make this page simple and straightforward.

Required UI:
- A button to upload an image
- An option for the user to select the type of waste
- A submit button

Design notes:
- Keep the layout minimal
- Do not add extra form fields unless absolutely necessary for the layout
- Make the waste-type selector clear and easy to use

ABOUT PAGE:
- Include basic information about the project/app
- Use filler text where needed because this content will be replaced later
- Keep the layout simple and presentable
- Do not over-design this page

USER PAGE:
- Must be scrollable
- Shows all trash submissions by the user
- Ordered from newest at the top to oldest at the bottom

Each submission entry must include:
- Image of the submission
- Top-left of the image: type of trash
- Top-right of the image: date and time

Design notes:
- Make the entries easy to scan in a vertical feed/list layout
- Keep the date/time and trash type visibly overlaid on the image as specified
- Do not add unnecessary metadata

BACKEND-AWARE DESIGN CONSTRAINTS:
Design with these realities in mind:
- The attached how_program_works.txt file is the authority for backend behavior
- The backend currently supports reports with username, image_path, trash_type, latitude, longitude, and a backend-generated timestamp
- The main pages should feel compatible with a trash-reporting system built around those fields
- Do not assume advanced backend features that were not specified
- Keep components realistic for a simple Flask + SQLite app

DELIVERABLE EXPECTATIONS:
Produce:
- A complete desktop design for all 4 pages
- Consistent header and footer styling
- Reusable components where appropriate
- Clean spacing and alignment
- Simple, implementation-friendly layouts

Do NOT:
- Add extra pages
- Change the color palette
- Create an entirely different information architecture
- Add feature creep
- Replace required sections with your own ideas

Priority order:
1. Follow the exact page and layout requirements
2. Use how_program_works.txt whenever backend details matter
3. Keep the design simple and clean
4. Only make minimal design decisions where the instructions leave necessary gaps