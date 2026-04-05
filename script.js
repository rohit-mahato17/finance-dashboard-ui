// =============================================
// FinTrack - Finance Dashboard
// Main Application Script
// =============================================

// ----- Mock Transaction Data -----
const defaultTransactions = [
    { id: 1, date: '2026-01-05', description: 'Monthly Salary', amount: 45000, category: 'Salary', type: 'income' },
    { id: 2, date: '2026-01-07', description: 'Grocery Shopping', amount: 2350, category: 'Food & Dining', type: 'expense' },
    { id: 3, date: '2026-01-10', description: 'Electricity Bill', amount: 1800, category: 'Bills & Utilities', type: 'expense' },
    { id: 4, date: '2026-01-12', description: 'Movie Tickets', amount: 600, category: 'Entertainment', type: 'expense' },
    { id: 5, date: '2026-01-15', description: 'Freelance Web Project', amount: 12000, category: 'Freelance', type: 'income' },
    { id: 6, date: '2026-01-18', description: 'Uber Rides', amount: 450, category: 'Transport', type: 'expense' },
    { id: 7, date: '2026-01-20', description: 'New Shoes', amount: 3200, category: 'Shopping', type: 'expense' },
    { id: 8, date: '2026-01-25', description: 'Internet Bill', amount: 999, category: 'Bills & Utilities', type: 'expense' },
    { id: 9, date: '2026-01-28', description: 'Restaurant Dinner', amount: 1450, category: 'Food & Dining', type: 'expense' },
    { id: 10, date: '2026-02-05', description: 'Monthly Salary', amount: 45000, category: 'Salary', type: 'income' },
    { id: 11, date: '2026-02-08', description: 'Gym Membership', amount: 1500, category: 'Health', type: 'expense' },
    { id: 12, date: '2026-02-10', description: 'Online Course - Udemy', amount: 4999, category: 'Education', type: 'expense' },
    { id: 13, date: '2026-02-14', description: 'Valentine Dinner', amount: 2800, category: 'Food & Dining', type: 'expense' },
    { id: 14, date: '2026-02-16', description: 'Freelance Logo Design', amount: 8000, category: 'Freelance', type: 'income' },
    { id: 15, date: '2026-02-18', description: 'Bus Pass', amount: 800, category: 'Transport', type: 'expense' },
    { id: 16, date: '2026-02-20', description: 'Phone Case', amount: 599, category: 'Shopping', type: 'expense' },
    { id: 17, date: '2026-02-22', description: 'Electricity Bill', amount: 2100, category: 'Bills & Utilities', type: 'expense' },
    { id: 18, date: '2026-02-25', description: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'expense' },
    { id: 19, date: '2026-03-05', description: 'Monthly Salary', amount: 45000, category: 'Salary', type: 'income' },
    { id: 20, date: '2026-03-08', description: 'Grocery Shopping', amount: 3100, category: 'Food & Dining', type: 'expense' },
    { id: 21, date: '2026-03-10', description: 'Doctor Visit', amount: 1200, category: 'Health', type: 'expense' },
    { id: 22, date: '2026-03-12', description: 'Investment Returns', amount: 5500, category: 'Investment', type: 'income' },
    { id: 23, date: '2026-03-15', description: 'T-shirt Online', amount: 899, category: 'Shopping', type: 'expense' },
    { id: 24, date: '2026-03-18', description: 'Auto Rickshaw', amount: 350, category: 'Transport', type: 'expense' },
    { id: 25, date: '2026-03-20', description: 'Mobile Recharge', amount: 599, category: 'Bills & Utilities', type: 'expense' },
    { id: 26, date: '2026-03-22', description: 'Freelance App UI', amount: 15000, category: 'Freelance', type: 'income' },
    { id: 27, date: '2026-03-25', description: 'Pizza Order', amount: 750, category: 'Food & Dining', type: 'expense' },
    { id: 28, date: '2026-03-28', description: 'Book Purchase', amount: 450, category: 'Education', type: 'expense' },
    { id: 29, date: '2026-04-01', description: 'Monthly Salary', amount: 48000, category: 'Salary', type: 'income' },
    { id: 30, date: '2026-04-02', description: 'Rent Payment', amount: 12000, category: 'Bills & Utilities', type: 'expense' },
    { id: 31, date: '2026-04-03', description: 'Swiggy Order', amount: 380, category: 'Food & Dining', type: 'expense' },
];

// ----- Application State -----
let state = {
    transactions: [],
    currentPage: 'dashboard',
    role: 'admin',
    darkMode: false,
    editingId: null
};

// chart instances (need to keep track for destroying)
let balanceChartInstance = null;
let spendingChartInstance = null;
let comparisonChartInstance = null;
let categoryBarChartInstance = null;

// ----- Initialize the App -----
document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    updateRoleUI();
    renderDashboard();
    renderTransactionsList();
    updateInsights();
});

// ----- Load and Save to localStorage -----
function loadFromStorage() {
    const savedData = localStorage.getItem('fintrack_transactions');
    if (savedData) {
        state.transactions = JSON.parse(savedData);
    } else {
        // first time - use default data
        state.transactions = JSON.parse(JSON.stringify(defaultTransactions));
        saveToStorage();
    }

    // load dark mode preference
    const darkPref = localStorage.getItem('fintrack_darkmode');
    if (darkPref === 'true') {
        state.darkMode = true;
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
        document.getElementById('theme-text').textContent = 'Light Mode';
    }

    // load role
    const savedRole = localStorage.getItem('fintrack_role');
    if (savedRole) {
        state.role = savedRole;
        document.getElementById('role-select').value = savedRole;
    }
}

function saveToStorage() {
    localStorage.setItem('fintrack_transactions', JSON.stringify(state.transactions));
}

// ----- Navigation -----
function navigateTo(page) {
    state.currentPage = page;

    // update active page
    document.querySelectorAll('.page').forEach(function(p) {
        p.classList.remove('active');
    });
    document.getElementById(page + '-page').classList.add('active');

    // update sidebar active link
    document.querySelectorAll('.nav-links li').forEach(function(li) {
        li.classList.remove('active');
        if (li.dataset.page === page) {
            li.classList.add('active');
        }
    });

    // update page title
    const titles = {
        'dashboard': 'Dashboard',
        'transactions': 'Transactions',
        'insights': 'Insights'
    };
    document.getElementById('page-title').textContent = titles[page] || 'Dashboard';

    // close sidebar on mobile
    closeSidebar();

    // refresh data on page switch
    if (page === 'dashboard') {
        renderDashboard();
    } else if (page === 'transactions') {
        renderTransactionsList();
    } else if (page === 'insights') {
        updateInsights();
    }
}

// ----- Sidebar Toggle (mobile) -----
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('show');
}

// ----- Role Management -----
function changeRole(role) {
    state.role = role;
    localStorage.setItem('fintrack_role', role);
    updateRoleUI();
    showToast('Switched to ' + role.charAt(0).toUpperCase() + role.slice(1) + ' role', 'info');
}

function updateRoleUI() {
    if (state.role === 'viewer') {
        document.body.classList.add('role-viewer');
        document.body.classList.remove('role-admin');
    } else {
        document.body.classList.add('role-admin');
        document.body.classList.remove('role-viewer');
    }
}

// ----- Dark Mode -----
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark-mode');

    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');

    if (state.darkMode) {
        icon.classList.replace('fa-moon', 'fa-sun');
        text.textContent = 'Light Mode';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        text.textContent = 'Dark Mode';
    }

    localStorage.setItem('fintrack_darkmode', state.darkMode.toString());

    // re-render charts because colors change
    renderDashboard();
    if (state.currentPage === 'insights') {
        updateInsights();
    }
}

// ----- Calculate Summary -----
function calculateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;

    state.transactions.forEach(function(txn) {
        if (txn.type === 'income') {
            totalIncome += txn.amount;
        } else {
            totalExpenses += txn.amount;
        }
    });

    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

    return { totalIncome, totalExpenses, balance, savingsRate };
}

// ----- Render Dashboard -----
function renderDashboard() {
    const summary = calculateSummary();

    // update summary cards
    document.getElementById('total-balance').textContent = formatCurrency(summary.balance);
    document.getElementById('total-income').textContent = formatCurrency(summary.totalIncome);
    document.getElementById('total-expenses').textContent = formatCurrency(summary.totalExpenses);
    document.getElementById('savings-rate').textContent = summary.savingsRate + '%';

    // render charts
    renderBalanceTrend();
    renderSpendingBreakdown();

    // render recent transactions
    renderRecentTransactions();
}

// ----- Balance Trend Chart (Line) -----
function renderBalanceTrend() {
    const ctx = document.getElementById('balance-chart').getContext('2d');

    // calculate monthly data
    const monthlyData = {};
    const sortedTxns = [...state.transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedTxns.forEach(function(txn) {
        const monthKey = txn.date.substring(0, 7); // e.g. "2026-01"
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { income: 0, expense: 0 };
        }
        if (txn.type === 'income') {
            monthlyData[monthKey].income += txn.amount;
        } else {
            monthlyData[monthKey].expense += txn.amount;
        }
    });

    const months = Object.keys(monthlyData).sort();
    let runningBalance = 0;
    const balanceData = [];
    const labels = [];

    months.forEach(function(month) {
        runningBalance += monthlyData[month].income - monthlyData[month].expense;
        balanceData.push(runningBalance);
        labels.push(formatMonthLabel(month));
    });

    // destroy old chart if it exists
    if (balanceChartInstance) {
        balanceChartInstance.destroy();
    }

    const textColor = state.darkMode ? '#ccc' : '#666';
    const gridColor = state.darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    balanceChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Balance',
                data: balanceData,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#6366f1',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    ticks: { color: textColor, callback: function(val) { return '₹' + (val/1000) + 'k'; } },
                    grid: { color: gridColor }
                },
                x: {
                    ticks: { color: textColor },
                    grid: { display: false }
                }
            }
        }
    });
}

// ----- Spending Breakdown Chart (Doughnut) -----
function renderSpendingBreakdown() {
    const ctx = document.getElementById('spending-chart').getContext('2d');

    // get spending by category
    const categorySpending = {};
    state.transactions.forEach(function(txn) {
        if (txn.type === 'expense') {
            if (!categorySpending[txn.category]) {
                categorySpending[txn.category] = 0;
            }
            categorySpending[txn.category] += txn.amount;
        }
    });

    const categories = Object.keys(categorySpending);
    const amounts = categories.map(function(cat) { return categorySpending[cat]; });

    const colors = [
        '#6366f1', '#ef4444', '#10b981', '#f59e0b',
        '#8b5cf6', '#14b8a6', '#f97316', '#3b82f6'
    ];

    if (spendingChartInstance) {
        spendingChartInstance.destroy();
    }

    const textColor = state.darkMode ? '#ccc' : '#666';

    spendingChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: colors.slice(0, categories.length),
                borderWidth: 2,
                borderColor: state.darkMode ? '#1a1a2e' : '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        padding: 12,
                        font: { size: 12, family: 'Outfit' }
                    }
                }
            }
        }
    });
}

// ----- Recent Transactions (Dashboard) -----
function renderRecentTransactions() {
    const tbody = document.getElementById('recent-tbody');
    const emptyDiv = document.getElementById('recent-empty');

    const sorted = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recent = sorted.slice(0, 5);

    if (recent.length === 0) {
        tbody.innerHTML = '';
        emptyDiv.style.display = 'block';
        return;
    }

    emptyDiv.style.display = 'none';
    let html = '';

    recent.forEach(function(txn) {
        const amountClass = txn.type === 'income' ? 'amount-positive' : 'amount-negative';
        const sign = txn.type === 'income' ? '+' : '-';
        html += `
            <tr>
                <td>${formatDate(txn.date)}</td>
                <td>${txn.description}</td>
                <td>${txn.category}</td>
                <td class="${amountClass}">${sign}${formatCurrency(txn.amount)}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// ----- Transactions List (Full Page) -----
function renderTransactionsList() {
    applyFilters();
}

function applyFilters() {
    const searchVal = document.getElementById('search-input').value.toLowerCase();
    const categoryVal = document.getElementById('category-filter').value;
    const typeVal = document.getElementById('type-filter').value;
    const sortVal = document.getElementById('sort-select').value;

    // filter transactions
    let filtered = state.transactions.filter(function(txn) {
        let matchSearch = txn.description.toLowerCase().includes(searchVal) ||
                          txn.category.toLowerCase().includes(searchVal);
        let matchCategory = categoryVal === 'all' || txn.category === categoryVal;
        let matchType = typeVal === 'all' || txn.type === typeVal;
        return matchSearch && matchCategory && matchType;
    });

    // sort
    const [sortField, sortOrder] = sortVal.split('-');
    filtered.sort(function(a, b) {
        if (sortField === 'date') {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        } else {
            return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
        }
    });

    // render table
    const tbody = document.getElementById('transactions-tbody');
    const noResults = document.getElementById('no-results');
    const txnEmpty = document.getElementById('txn-empty');

    if (state.transactions.length === 0) {
        tbody.innerHTML = '';
        noResults.style.display = 'none';
        txnEmpty.style.display = 'block';
        return;
    }

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        noResults.style.display = 'block';
        txnEmpty.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    txnEmpty.style.display = 'none';

    let html = '';
    filtered.forEach(function(txn) {
        const amountClass = txn.type === 'income' ? 'amount-positive' : 'amount-negative';
        const sign = txn.type === 'income' ? '+' : '-';
        html += `
            <tr>
                <td>${formatDate(txn.date)}</td>
                <td>${txn.description}</td>
                <td>${txn.category}</td>
                <td><span class="type-badge ${txn.type}">${txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}</span></td>
                <td class="${amountClass}">${sign}${formatCurrency(txn.amount)}</td>
                <td class="admin-col">
                    <div class="action-btns">
                        <button class="btn btn-edit" onclick="openEditModal(${txn.id})" title="Edit">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="btn btn-danger" onclick="deleteTransaction(${txn.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// ----- Add / Edit / Delete Transactions -----
function openAddModal() {
    state.editingId = null;
    document.getElementById('modal-title').textContent = 'Add Transaction';
    document.getElementById('transaction-form').reset();
    // set date to today
    document.getElementById('txn-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('modal-overlay').classList.add('active');
}

function openEditModal(id) {
    const txn = state.transactions.find(function(t) { return t.id === id; });
    if (!txn) return;

    state.editingId = id;
    document.getElementById('modal-title').textContent = 'Edit Transaction';
    document.getElementById('txn-date').value = txn.date;
    document.getElementById('txn-desc').value = txn.description;
    document.getElementById('txn-amount').value = txn.amount;
    document.getElementById('txn-category').value = txn.category;
    document.getElementById('txn-type').value = txn.type;
    document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    state.editingId = null;
}

function saveTransaction(e) {
    e.preventDefault();

    const date = document.getElementById('txn-date').value;
    const description = document.getElementById('txn-desc').value.trim();
    const amount = parseInt(document.getElementById('txn-amount').value);
    const category = document.getElementById('txn-category').value;
    const type = document.getElementById('txn-type').value;

    if (!date || !description || !amount || !category) {
        showToast('Please fill all fields', 'error');
        return;
    }

    if (state.editingId !== null) {
        // editing existing transaction
        const index = state.transactions.findIndex(function(t) { return t.id === state.editingId; });
        if (index !== -1) {
            state.transactions[index] = {
                id: state.editingId,
                date: date,
                description: description,
                amount: amount,
                category: category,
                type: type
            };
            showToast('Transaction updated!', 'success');
        }
    } else {
        // adding new transaction
        const newId = state.transactions.length > 0
            ? Math.max(...state.transactions.map(t => t.id)) + 1
            : 1;

        state.transactions.push({
            id: newId,
            date: date,
            description: description,
            amount: amount,
            category: category,
            type: type
        });
        showToast('Transaction added!', 'success');
    }

    saveToStorage();
    closeModal();
    renderDashboard();
    renderTransactionsList();
    if (state.currentPage === 'insights') {
        updateInsights();
    }
}

function deleteTransaction(id) {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    state.transactions = state.transactions.filter(function(t) { return t.id !== id; });
    saveToStorage();
    renderDashboard();
    renderTransactionsList();
    showToast('Transaction deleted', 'info');
}

// ----- Insights -----
function updateInsights() {
    const expenses = state.transactions.filter(t => t.type === 'expense');
    const incomes = state.transactions.filter(t => t.type === 'income');

    // top spending category
    const catSpending = {};
    expenses.forEach(function(txn) {
        catSpending[txn.category] = (catSpending[txn.category] || 0) + txn.amount;
    });

    let topCat = '-';
    let topAmount = 0;
    for (let cat in catSpending) {
        if (catSpending[cat] > topAmount) {
            topAmount = catSpending[cat];
            topCat = cat;
        }
    }
    document.getElementById('top-category').textContent = topCat;
    document.getElementById('top-category-amount').textContent = formatCurrency(topAmount);

    // average daily spending
    if (expenses.length > 0) {
        const dates = expenses.map(t => new Date(t.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const daysDiff = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1);
        const totalExp = expenses.reduce((sum, t) => sum + t.amount, 0);
        const avgDaily = Math.round(totalExp / daysDiff);
        document.getElementById('avg-spending').textContent = formatCurrency(avgDaily);
    } else {
        document.getElementById('avg-spending').textContent = '₹0';
    }

    // total transactions count
    document.getElementById('total-txns').textContent = state.transactions.length;
    document.getElementById('txn-split').textContent = incomes.length + ' income · ' + expenses.length + ' expense';

    // best month (highest savings)
    const monthlyStats = {};
    state.transactions.forEach(function(txn) {
        const m = txn.date.substring(0, 7);
        if (!monthlyStats[m]) monthlyStats[m] = { income: 0, expense: 0 };
        if (txn.type === 'income') monthlyStats[m].income += txn.amount;
        else monthlyStats[m].expense += txn.amount;
    });

    let bestMonth = '-';
    let bestSavings = -Infinity;
    for (let m in monthlyStats) {
        const savings = monthlyStats[m].income - monthlyStats[m].expense;
        if (savings > bestSavings) {
            bestSavings = savings;
            bestMonth = m;
        }
    }
    document.getElementById('best-month').textContent = formatMonthLabel(bestMonth);
    document.getElementById('best-month-savings').textContent = 'Saved ' + formatCurrency(Math.max(0, bestSavings));

    // render insight charts
    renderComparisonChart(monthlyStats);
    renderCategoryBarChart(catSpending);

    // generate tips
    generateTips();
}

// ----- Monthly Comparison Chart (Bar) -----
function renderComparisonChart(monthlyStats) {
    const ctx = document.getElementById('comparison-chart').getContext('2d');

    const months = Object.keys(monthlyStats).sort();
    const incomeData = months.map(m => monthlyStats[m].income);
    const expenseData = months.map(m => monthlyStats[m].expense);
    const labels = months.map(m => formatMonthLabel(m));

    if (comparisonChartInstance) comparisonChartInstance.destroy();

    const textColor = state.darkMode ? '#ccc' : '#666';
    const gridColor = state.darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    comparisonChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: '#2ecc71',
                    borderRadius: 5
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: '#e74c3c',
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: textColor, font: { family: 'Outfit' } }
                }
            },
            scales: {
                y: {
                    ticks: { color: textColor, callback: function(v) { return '₹' + (v/1000) + 'k'; } },
                    grid: { color: gridColor }
                },
                x: {
                    ticks: { color: textColor },
                    grid: { display: false }
                }
            }
        }
    });
}

// ----- Category Bar Chart -----
function renderCategoryBarChart(catSpending) {
    const ctx = document.getElementById('category-bar-chart').getContext('2d');

    const categories = Object.keys(catSpending);
    const amounts = categories.map(c => catSpending[c]);

    const colors = ['#6366f1', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#14b8a6', '#f97316', '#3b82f6'];

    if (categoryBarChartInstance) categoryBarChartInstance.destroy();

    const textColor = state.darkMode ? '#ccc' : '#666';
    const gridColor = state.darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    categoryBarChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Spending',
                data: amounts,
                backgroundColor: colors.slice(0, categories.length),
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: textColor, callback: function(v) { return '₹' + (v/1000) + 'k'; } },
                    grid: { color: gridColor }
                },
                y: {
                    ticks: { color: textColor, font: { size: 12 } },
                    grid: { display: false }
                }
            }
        }
    });
}

// ----- Generate Financial Tips -----
function generateTips() {
    const tipsList = document.getElementById('tips-list');
    const summary = calculateSummary();
    let tips = [];

    if (summary.totalExpenses > summary.totalIncome * 0.8) {
        tips.push("Your expenses are over 80% of your income. Consider cutting down on non-essential spending.");
    }

    if (summary.savingsRate > 30) {
        tips.push("Great job! You're saving more than 30% of your income. Keep it up!");
    } else if (summary.savingsRate > 0) {
        tips.push("Try to increase your savings rate to at least 20-30% for better financial health.");
    }

    // check top category
    const expenses = state.transactions.filter(t => t.type === 'expense');
    const catSpending = {};
    expenses.forEach(t => { catSpending[t.category] = (catSpending[t.category] || 0) + t.amount; });

    const topCats = Object.entries(catSpending).sort((a, b) => b[1] - a[1]);
    if (topCats.length > 0) {
        const pct = Math.round((topCats[0][1] / summary.totalExpenses) * 100);
        if (pct > 40) {
            tips.push(`${topCats[0][0]} accounts for ${pct}% of your expenses. Look for ways to reduce this.`);
        }
    }

    // entertainment check
    if (catSpending['Entertainment'] && catSpending['Entertainment'] > summary.totalExpenses * 0.15) {
        tips.push("Entertainment spending is relatively high. Consider free or low-cost alternatives.");
    }

    // generic tips if nothing specific
    if (tips.length < 2) {
        tips.push("Set up an emergency fund with 3-6 months of expenses for financial security.");
        tips.push("Track your daily expenses to identify areas where you can save more.");
    }

    // always add this one
    tips.push("Review your subscriptions regularly and cancel ones you don't use.");

    let html = '';
    tips.forEach(function(tip) {
        html += `<li><i class="fas fa-check-circle"></i> ${tip}</li>`;
    });
    tipsList.innerHTML = html;
}

// ----- Export to CSV -----
function exportCSV() {
    if (state.transactions.length === 0) {
        showToast('No transactions to export', 'error');
        return;
    }

    let csv = 'Date,Description,Amount,Category,Type\n';

    state.transactions.forEach(function(txn) {
        csv += `${txn.date},"${txn.description}",${txn.amount},${txn.category},${txn.type}\n`;
    });

    // create download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fintrack_transactions.csv';
    a.click();
    URL.revokeObjectURL(url);

    showToast('CSV exported successfully!', 'success');
}

// ----- Toast Notification -----
function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + (type || 'info');

    // hide after 3 seconds
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

// ----- Utility Functions -----
function formatCurrency(amount) {
    return '₹' + Math.abs(amount).toLocaleString('en-IN');
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate().toString().padStart(2, '0');
    return day + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

function formatMonthLabel(monthKey) {
    if (!monthKey || monthKey === '-') return '-';
    const [year, month] = monthKey.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(month) - 1] + ' ' + year;
}
