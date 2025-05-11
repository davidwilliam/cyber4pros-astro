export function showToast(message, type = 'success') {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const toast = document.createElement('div');
  toast.className = `${bgColor} text-white px-4 py-2 rounded shadow animate-fade-in-up`;
  toast.innerText = message;

  const container = document.getElementById('toast-container');
  if (!container) {
    console.warn('Toast container not found!');
    return;
  }

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
