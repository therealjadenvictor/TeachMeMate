/**
 * PAGE TRANSITIONS
 * Handles smooth page navigation with fade-in/fade-out effects
 * Does NOT interfere with Firebase auth, Firestore queries, or navigation logic
 */

(function() {
  'use strict';

  // Configuration
  const TRANSITION_DURATION = 550; // milliseconds
  const READY_DELAY = 50; // small delay before showing page

  // Flag to prevent multiple navigations
  let isNavigating = false;

  /**
   * Show the page with fade-in animation
   */
  function showPage() {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      document.body.classList.add('page-ready');
    }, READY_DELAY);
  }

  /**
   * Navigate to a new page with fade-out animation
   * @param {string} url - The URL to navigate to
   */
  function navigateWithTransition(url) {
    if (isNavigating) return;
    isNavigating = true;

    // Add exit class to trigger fade-out
    document.body.classList.add('page-exit');

    // Navigate after transition completes
    setTimeout(() => {
      window.location.href = url;
    }, TRANSITION_DURATION);
  }

  /**
   * Intercept link clicks and add transition
   * @param {Event} e - Click event
   */
  function handleLinkClick(e) {
    const link = e.target.closest('a');
    
    // Only intercept if:
    // 1. It's an <a> tag
    // 2. It has an href
    // 3. It's not an external link
    // 4. It's not a hash link
    // 5. It's not opening in a new tab
    // 6. It's not a special protocol (mailto:, tel:, etc.)
    if (!link || !link.href) return;
    if (link.target === '_blank') return;
    if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) return;
    if (link.href.startsWith('#')) return;
    
    // Check if it's a same-origin link
    try {
      const linkUrl = new URL(link.href);
      const currentUrl = new URL(window.location.href);
      
      // Only intercept same-origin links
      if (linkUrl.origin !== currentUrl.origin) return;
      
      // Don't intercept if it's the same page
      if (linkUrl.pathname === currentUrl.pathname) return;
      
      // Intercept and add transition
      e.preventDefault();
      navigateWithTransition(link.href);
    } catch (err) {
      // Invalid URL, let browser handle it
      return;
    }
  }

  /**
   * Initialize page transitions
   */
  function init() {
    // Show page on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showPage);
    } else {
      showPage();
    }

    // Intercept link clicks
    document.addEventListener('click', handleLinkClick);

    // Handle browser back/forward buttons
    window.addEventListener('pageshow', (event) => {
      // Reset navigation flag
      isNavigating = false;
      
      // If page is loaded from cache (back/forward), show it immediately
      if (event.persisted) {
        document.body.classList.remove('page-exit');
        document.body.classList.add('page-ready');
      }
    });
  }

  // Expose navigateWithTransition globally for programmatic navigation
  // This allows buttons using window.location.href to use transitions
  window.navigateWithTransition = navigateWithTransition;

  // Initialize when script loads
  init();
})();
