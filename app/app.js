/* TaskBoard Lite - plain JS app designed for Playwright E2E tests */

const STORAGE = {
  theme: 'tbl_theme',
  session: 'tbl_session',
  tasks: 'tbl_tasks',
  order: 'tbl_order',
};

const els = {
  loginCard: q('[data-testid="login-card"]'),
  appCard: q('[data-testid="app-card"]'),
  userPill: q('[data-testid="user-pill"]'),
  userName: q('[data-testid="user-name"]'),
  loginForm: q('[data-testid="login-form"]'),
  loginEmail: q('[data-testid="login-email"]'),
  loginPassword: q('[data-testid="login-password"]'),
  loginError: q('[data-testid="login-error"]'),
  loginSubmit: q('[data-testid="login-submit"]'),
  logout: q('[data-testid="logout"]'),
  themeToggle: q('[data-testid="theme-toggle"]'),

  filterAll: q('[data-testid="filter-all"]'),
  filterActive: q('[data-testid="filter-active"]'),
  filterCompleted: q('[data-testid="filter-completed"]'),
  search: q('[data-testid="search"]'),
  sort: q('[data-testid="sort"]'),

  createForm: q('[data-testid="create-form"]'),
  createTitle: q('[data-testid="create-title"]'),
  createDue: q('[data-testid="create-due"]'),
  createPriority: q('[data-testid="create-priority"]'),
  createError: q('[data-testid="create-error"]'),
  createSubmit: q('[data-testid="create-submit"]'),

  counter: q('[data-testid="counter"]'),
  bulkComplete: q('[data-testid="bulk-complete"]'),
  clearCompleted: q('[data-testid="clear-completed"]'),
  list: q('[data-testid="task-list"]'),
  empty: q('[data-testid="empty"]'),
  loading: q('[data-testid="loading"]'),

  editBackdrop: q('[data-testid="edit-backdrop"]'),
  editModal: q('[data-testid="edit-modal"]'),
  editForm: q('[data-testid="edit-form"]'),
  editTitle: q('[data-testid="edit-title"]'),
  editDue: q('[data-testid="edit-due"]'),
  editPriority: q('[data-testid="edit-priority"]'),
  editCompleted: q('[data-testid="edit-completed"]'),
  editSave: q('[data-testid="edit-save"]'),
  editCancel: q('[data-testid="edit-cancel"]'),
  editError: q('[data-testid="edit-error"]'),

  toasts: q('[data-testid="toasts"]'),
};

let state = {
  user: null,
  filter: 'all', // all | active | completed
  search: '',
  sort: 'created_desc',
  tasks: [],
  order: [],
  editingId: null,
};

boot();

function boot() {
  loadTheme();
  loadSession();
  loadTasks();

  bindLogin();
  bindAppControls();
  render();

  // Seed tasks for first run? leave empty for tests.
  // state.tasks = seedTasks(); saveTasks();
}

function bindLogin() {
  els.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showError(els.loginError, null);

    const email = els.loginEmail.value.trim();
    const password = els.loginPassword.value;

    if (!email || !email.includes('@')) return showError(els.loginError, 'Enter a valid email.');
    if (!password || password.length < 6) return showError(els.loginError, 'Password must be at least 6 characters.');

    await withLoading(async () => {
      // Fake auth with predictable failure case for testing
      await delay(netDelay());
      if (email.toLowerCase().includes('fail')) {
        throw new Error('Invalid credentials.');
      }
      state.user = { email, name: email.split('@')[0] };
      localStorage.setItem(STORAGE.session, JSON.stringify(state.user));
      toast('Signed in', `Welcome, ${state.user.name}`, 'ok');
    }).catch((err) => showError(els.loginError, err.message));

    render();
  });

  els.logout.addEventListener('click', () => {
    localStorage.removeItem(STORAGE.session);
    state.user = null;

    // Hard reset UI-related state (optional but professional)
    state.filter = 'all';
    state.search = '';
    state.sort = 'created_desc';
    els.search.value = '';
    els.sort.value = 'created_desc';

    // Clear stale username immediately
    els.userName.textContent = '';

    toast('Signed out', 'Session cleared', 'ok');
    render();
  });
}

function bindAppControls() {
  els.themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE.theme, next);
    toast('Theme updated', `Theme is now ${next}`, 'ok');
  });

  els.filterAll.addEventListener('click', () => setFilter('all'));
  els.filterActive.addEventListener('click', () => setFilter('active'));
  els.filterCompleted.addEventListener('click', () => setFilter('completed'));

  els.search.addEventListener('input', () => {
    state.search = els.search.value;
    renderList();
  });

  els.sort.addEventListener('change', () => {
    state.sort = els.sort.value;
    renderList();
  });

  els.createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showError(els.createError, null);

    const title = els.createTitle.value.trim();
    const due = els.createDue.value || null;
    const priority = els.createPriority.value;

    if (!title) return showError(els.createError, 'Title is required.');
    if (title.length > 60) return showError(els.createError, 'Title must be <= 60 chars.');

    await withLoading(async () => {
      await delay(netDelay());
      const t = {
        id: uid(),
        title,
        due,
        priority,
        completed: false,
        createdAt: Date.now(),
      };
      state.tasks.push(t);
      state.order.unshift(t.id);
      saveTasks();
      els.createTitle.value = '';
      els.createDue.value = '';
      els.createPriority.value = 'med';
      toast('Task added', `"${title}"`, 'ok');
    }).catch((err) => showError(els.createError, err.message));

    renderList();
  });

  els.bulkComplete.addEventListener('click', async () => {
    await withLoading(async () => {
      await delay(netDelay());
      state.tasks.forEach((t) => (t.completed = true));
      saveTasks();
      toast('All completed', 'Marked all tasks complete', 'ok');
    });
    renderList();
  });

  els.clearCompleted.addEventListener('click', async () => {
    await withLoading(async () => {
      await delay(netDelay());
      const before = state.tasks.length;
      state.tasks = state.tasks.filter((t) => !t.completed);
      state.order = state.order.filter((id) => state.tasks.some((t) => t.id === id));
      saveTasks();
      toast('Cleared completed', `${before - state.tasks.length} removed`, 'ok');
    });
    renderList();
  });

  // Edit modal handlers
  els.editCancel.addEventListener('click', closeEdit);
  els.editBackdrop.addEventListener('click', closeEdit);

  els.editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showError(els.editError, null);

    const id = state.editingId;
    const t = state.tasks.find((x) => x.id === id);
    if (!t) return showError(els.editError, 'Task not found.');

    const title = els.editTitle.value.trim();
    if (!title) return showError(els.editError, 'Title is required.');

    await withLoading(async () => {
      await delay(netDelay());
      t.title = title;
      t.due = els.editDue.value || null;
      t.priority = els.editPriority.value;
      t.completed = !!els.editCompleted.checked;
      saveTasks();
      toast('Task updated', `"${t.title}"`, 'ok');
    }).catch((err) => showError(els.editError, err.message));

    closeEdit();
    renderList();
  });
}

function setFilter(next) {
  state.filter = next;
  els.filterAll.classList.toggle('is-active', next === 'all');
  els.filterActive.classList.toggle('is-active', next === 'active');
  els.filterCompleted.classList.toggle('is-active', next === 'completed');
  renderList();
}

function render() {
  const authed = Boolean(state.user);

  // Always set visibility explicitly
  els.loginCard.hidden = authed;
  els.appCard.hidden = !authed;
  els.userPill.hidden = !authed;
  els.logout.hidden = !authed;

  // Always set/clear the username explicitly
  els.userName.textContent = authed ? state.user.name : '';

  // Only render list when authed
  if (authed) renderList();
}

function renderList() {
  if (!state.user) return;

  const tasks = applyView(state.tasks);
  const activeCount = state.tasks.filter((t) => !t.completed).length;
  els.counter.textContent = `${activeCount} active`;

  els.list.innerHTML = '';
  if (tasks.length === 0) {
    els.empty.hidden = false;
    return;
  }
  els.empty.hidden = true;

  for (const t of tasks) {
    const li = document.createElement('li');
    li.className = `item ${t.completed ? 'completed' : ''}`;
    li.setAttribute('data-testid', 'todo-item');
    li.setAttribute('draggable', 'true');
    li.dataset.id = t.id;

    li.innerHTML = `
      <label class="title">
        <input data-testid="todo-item-toggle" type="checkbox" ${t.completed ? 'checked' : ''} />
        <span class="task-text">${escapeHtml(t.title)}</span>
      </label>
      <div class="badges">
        <span class="badge ${t.priority} ${t.priority === 'high' ? 'high' : t.priority === 'low' ? 'low' : ''}" data-testid="badge-priority">${t.priority}</span>
        ${t.due ? `<span class="badge due" data-testid="badge-due">due ${t.due}</span>` : ``}
      </div>
      <div class="actions">
        <button class="ghost" data-testid="edit" type="button">Edit</button>
        <button class="ghost" data-testid="delete" type="button">Delete</button>
      </div>
    `;

    const toggle = li.querySelector('[data-testid="todo-item-toggle"]');
    const editBtn = li.querySelector('[data-testid="edit"]');
    const delBtn = li.querySelector('[data-testid="delete"]');

    toggle.addEventListener('change', async () => {
      await withLoading(async () => {
        await delay(netDelay());
        t.completed = toggle.checked;
        saveTasks();
        toast('Updated', t.completed ? 'Marked complete' : 'Marked active', 'ok');
      });
      renderList();
    });

    editBtn.addEventListener('click', () => openEdit(t.id));
    delBtn.addEventListener('click', async () => {
      await withLoading(async () => {
        await delay(netDelay());
        state.tasks = state.tasks.filter((x) => x.id !== t.id);
        state.order = state.order.filter((id) => id !== t.id);
        saveTasks();
        toast('Deleted', `"${t.title}"`, 'ok');
      });
      renderList();
    });

    bindDnD(li);
    els.list.appendChild(li);
  }
}

function applyView(tasks) {
  const ordered = orderTasks(tasks);
  const filtered = ordered.filter((t) => {
    if (state.filter === 'active') return !t.completed;
    if (state.filter === 'completed') return t.completed;
    return true;
  });

  const q = state.search.trim().toLowerCase();
  const searched = q ? filtered.filter((t) => t.title.toLowerCase().includes(q)) : filtered;

  const sorted = [...searched].sort((a, b) => {
    if (state.sort === 'created_desc') return b.createdAt - a.createdAt;
    if (state.sort === 'due_asc') return (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31');
    if (state.sort === 'priority_desc') return pri(b.priority) - pri(a.priority);
    return 0;
  });

  return sorted;
}

function pri(p) { return p === 'high' ? 3 : p === 'med' ? 2 : 1; }

function orderTasks(tasks) {
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const ordered = [];
  for (const id of state.order) if (byId.has(id)) ordered.push(byId.get(id));
  // include any tasks not in order (safety)
  for (const t of tasks) if (!state.order.includes(t.id)) ordered.push(t);
  return ordered;
}

function openEdit(id) {
  state.editingId = id;
  const t = state.tasks.find((x) => x.id === id);
  if (!t) return;

  els.editTitle.value = t.title;
  els.editDue.value = t.due || '';
  els.editPriority.value = t.priority;
  els.editCompleted.checked = !!t.completed;
  showError(els.editError, null);

  els.editBackdrop.hidden = false;
  els.editModal.hidden = false;
}

function closeEdit() {
  state.editingId = null;
  els.editBackdrop.hidden = true;
  els.editModal.hidden = true;
}

async function withLoading(fn) {
  els.loading.hidden = false;
  try {
    await fn();
  } finally {
    els.loading.hidden = true;
  }
}

function toast(title, message, kind = 'ok') {
  const t = document.createElement('div');
  t.className = `toast ${kind === 'err' ? 'err' : 'ok'}`;
  t.innerHTML = `<div class="t">${escapeHtml(title)}</div><div class="m">${escapeHtml(message)}</div>`;
  els.toasts.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

function showError(el, msg) {
  if (!msg) {
    el.hidden = true;
    el.textContent = '';
    return;
  }
  el.hidden = false;
  el.textContent = msg;
}

function loadTheme() {
  const theme = localStorage.getItem(STORAGE.theme) || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
}

function loadSession() {
  const raw = localStorage.getItem(STORAGE.session);
  if (!raw) return;
  try {
    state.user = JSON.parse(raw);
  } catch { /* ignore */ }
}

function loadTasks() {
  const raw = localStorage.getItem(STORAGE.tasks);
  const rawOrder = localStorage.getItem(STORAGE.order);
  try {
    state.tasks = raw ? JSON.parse(raw) : [];
    state.order = rawOrder ? JSON.parse(rawOrder) : state.tasks.map((t) => t.id);
  } catch {
    state.tasks = [];
    state.order = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE.tasks, JSON.stringify(state.tasks));
  localStorage.setItem(STORAGE.order, JSON.stringify(state.order));
}

function netDelay() {
  // deterministic-ish range for tests; you can override via localStorage for “slow network” scenarios.
  const ms = Number(localStorage.getItem('tbl_net_delay_ms') || '120');
  return Math.max(0, Math.min(ms, 1500));
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function q(sel) {
  const el = document.querySelector(sel);
  if (!el) throw new Error(`Missing element: ${sel}`);
  return el;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[c]);
}

/* Drag and drop reorder */
function bindDnD(li) {
  li.addEventListener('dragstart', (e) => {
    li.classList.add('dragging');
    e.dataTransfer.setData('text/plain', li.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
  });
  li.addEventListener('dragend', () => li.classList.remove('dragging'));

  li.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = els.list.querySelector('.dragging');
    if (!dragging || dragging === li) return;

    const rect = li.getBoundingClientRect();
    const after = (e.clientY - rect.top) > rect.height / 2;
    els.list.insertBefore(dragging, after ? li.nextSibling : li);
  });

  li.addEventListener('drop', async (e) => {
    e.preventDefault();
    // Persist order
    const ids = Array.from(els.list.querySelectorAll('[data-testid="todo-item"]')).map((x) => x.dataset.id);
    state.order = ids;
    saveTasks();
    toast('Reordered', 'Task order saved', 'ok');
  });
}