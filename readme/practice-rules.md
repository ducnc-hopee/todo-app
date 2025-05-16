
### COMMON
- Organized folder structure (`src/`, `assets/`, `utils/`, `styles/`, etc.)

### Git flow
- **Create your branch**: Create by your name => 'joel', 'kiran', 'huan'

- **Commit frequently**: Make small, frequent commits with meaningful messages.
  - Commit whenever you finish a small, isolated function or piece of logic. This makes it easier to understand changes and debug if something goes wrong.
  - Example commit message: `"Added function to validate form input"`, `added header section`

### HTML
- Semantic HTML5 elements
- Structured and accessible layout
- Separate components or sections where applicable

### CSS
- Use [BEM (Block Element Modifier)](http://getbem.com/introduction/) methodology for class naming  
  Example: `.button`, `.button--primary`, `.card__title`
- Keep styles modular and reusable
- Split styles by purpose: base, layout, components
- Don't style with id selector.

### JS
- Modern ES6+ syntax
- Use [npm](https://www.npmjs.com/) for package management to install library
- Organize code into small, **reusable functions**.
- Place **helper functions** in `src/utils/`
```js
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}
```

### Best practice
- DRY: Don’t Repeat Yourself
- KISS: Keep It Simple, Stupid
- Separate concerns: keep logic, UI, and styling decoupled
- Keep your code readable, small, and testable

### Project structure
```
project/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── styles/
│   │   └── main.css
│   ├── utils/
│   ├── pages/
│   ├── index.js
│   └── index.html
├── package.json
├── webpack.config.js
└── README.md
```

### Review
- Once your feature is complete, create a pull request (PR) for code review.
- Reviewers should focus on:
  - Code clarity and structure.
  - Possible improvements in performance.
  - Correctness and edge case handling.

- Review strategy: Cross review
  Joel -> Huan -> Kiran -> Joel