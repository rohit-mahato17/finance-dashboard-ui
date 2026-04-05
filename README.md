# FinTrack - Personal Finance Dashboard

A simple and clean finance dashboard built using **HTML**, **CSS**, and **JavaScript** to help users track and manage their personal financial activity.

## Features

- **Dashboard Overview** - Summary cards showing Total Balance, Income, Expenses, and Savings Rate with interactive charts
- **Balance Trend** - Line chart showing how your balance changes over time
- **Spending Breakdown** - Doughnut chart showing expense distribution by category
- **Transaction Management** - View, add, edit, and delete transactions with full CRUD support
- **Search & Filter** - Search transactions by keyword, filter by category/type, and sort by date or amount
- **Role-Based UI** - Switch between Admin (full access) and Viewer (read-only) roles using a dropdown
- **Insights** - View top spending category, average daily spending, best savings month, and financial tips
- **Dark Mode** - Toggle between light and dark themes
- **Data Persistence** - All data is saved to localStorage so it persists across sessions
- **CSV Export** - Export your transaction data as a CSV file
- **Responsive Design** - Works across desktop, tablet, and mobile screen sizes

## Tech Stack

- HTML5
- CSS3 (vanilla CSS, no frameworks)
- Vanilla JavaScript (no frameworks)
- [Chart.js](https://www.chartjs.org/) v4 - for charts and visualizations
- [Font Awesome](https://fontawesome.com/) v6 - for icons
- [Google Fonts](https://fonts.google.com/) - Poppins font

## How to Run

1. Download or clone the project
2. Open `index.html` in any modern web browser
3. That's it! No build step or server required.

## Project Structure

```
finance-dashboard/
├── index.html      # Main HTML page
├── style.css       # All styles
├── script.js       # Application logic and mock data
└── README.md       # Project documentation (this file)
```

## How It Works

### State Management
The app uses a simple JavaScript object (`state`) to manage all application data including transactions, current page, selected role, and dark mode preference. State changes trigger re-renders of the affected UI components.

### Role-Based Access
- **Admin**: Can view all data, add new transactions, edit existing ones, and delete transactions
- **Viewer**: Can only view data - all add/edit/delete controls are hidden

Roles can be switched using the dropdown in the top bar. This is a frontend-only simulation for demonstration.

### Data Flow
1. On page load, data is loaded from localStorage (or defaults are used)
2. User interactions update the state object
3. State changes trigger DOM updates and chart re-renders
4. Modified data is saved back to localStorage

### Mock Data
The app comes with ~31 pre-loaded transactions spanning January to April 2026 across various categories like Food, Transport, Bills, Salary, Freelance work, etc.

## Browser Support

Tested on latest versions of Chrome, Firefox, and Edge.

## Screenshots

Open the project in a browser to see the dashboard in action!

## Author

**Rohit**
