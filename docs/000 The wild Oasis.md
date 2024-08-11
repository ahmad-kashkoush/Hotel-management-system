in this file I'll document everything I do in this project

1. read [app requirement](app%20requirement.md)
2. create feature categories from them
    - Single responsibility
3. derive pages from feature categories
    - [app pages](app%20pages.md)
4. Tech Decisions
    - choosing React over next because of [Client vs Server rendering](../../React/Client%20vs%20Server%20rendering.md)
    - [React query](../../React/React%20query.md) for managing remote state
    - [Context API](../../React/Context%20API.md) for managing ui
    - [Styled Components Library](../../React/Styled%20Components%20Library.md) for Styling
5. [Modeling State](Modeling%20State.md)
6. Mistake, I've created a bookings table without returning to app requirements
7. design database
8. setup database with postgres
9. Setup supabase table **Row Level sercurity**
10. setup queries & mutations
11. Displayed
12. [React Hook Form](https://www.react-hook-form.com/get-started/)
    1. Submitting
    2. Validation
13. supabase file input
14. [queries & mutation abstraction](../../React/queries%20&%20mutation%20abstraction.md)
15. First Studied [React Patterns](../../React/React%20Patterns.md)
16. refactor Form Modal window
    1. Learnt about [createPortal](../../React/createPortal.md)
    2. using [Compund component pattern](../../React/Compund%20component%20pattern.md)
17. Add all close Modal events
    1. Reviewed [Event Phases](../../Javascript%20Jonas/permenantNote/Event%20Phases.md)
18. check [Client vs Server rendering](../../React/Client%20vs%20Server%20rendering.md) to render
    1. **Client-render** Cabins
    2. **Server-render** bookings
19. Built a pagination component
    1. With Server Rendering
        - pre-fetched next page with react query to improve performance
20. User Authentication: [Authentication](../../React/Authentication.md), [Authorization](../../React/Authorization.md)
21. Created a form to update user info, and avatar
22. Learnt [How to build charts](../../React/How%20to%20build%20charts.md)
23. Built _AreaChart_, _PieChart_
24. Build a Pie chart show number of night group
25. made default theme depend on [Default color scheme](../../React/get%20default%20color%20scheme.md)

## Future TODO

- [ ] add create booking
- [ ] add edit booking
- [ ] add checkin, checkout times
- [ ] implement different prices for cabins depending on day
- [ ] add a restaurant page
- [ ] on Checkout: add a pdf invoice send to user email

---

[Nostalgic Hotel Readme](Nostalgic%20Hotel%20Readme.md)
