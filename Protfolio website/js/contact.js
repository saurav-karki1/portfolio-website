// js/contact.js — Submits contact form data to SheetDB (Google Sheets)

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const messageBox = document.getElementById('form-message');

  if (!form || !messageBox) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showMessage('Please fill out all fields before submitting.', 'error');
      return;
    }

    // Prepare visual loading state on button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    fetch('https://sheetdb.io/api/v1/7y4zpeaang9ja', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: object })
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response not ok');
      return response.json();
    })
    .then(() => {
      showMessage('✅ Thank you! Your message has been sent.', 'success');
      form.reset();
    })
    .catch(() => {
      showMessage('❌ Sorry! Something went wrong. Please try again.', 'error');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `form__message ${type}`;
    messageBox.style.display = 'block';

    // Auto-hide messages after 6 seconds
    setTimeout(() => {
      messageBox.style.opacity = '0';
      messageBox.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        messageBox.style.display = 'none';
        messageBox.style.opacity = '1';
      }, 500);
    }, 6000);
  }
});
