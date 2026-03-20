// Facebook Pixel + GA4 tracking utilities
// FB Pixel: 1138476730496072
// GA4: G-LZ0RYC1V3B

export const FB_PIXEL_ID = '1138476730496072';
export const GA4_ID = 'G-LZ0RYC1V3B';

// ===== Facebook Pixel =====
export function fbEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

export function fbCustomEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
}

// ===== Google Analytics 4 =====
export function gaEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// ===== Combined Event Helpers =====

/** User clicks "立即預約免費諮詢" button */
export function trackInitiateBooking() {
  fbEvent('InitiateCheckout', { content_name: '企業諮詢預約' });
  gaEvent('begin_checkout', { items: [{ item_name: '企業諮詢預約' }] });
}

/** User selects a date on the calendar */
export function trackSelectDate(date) {
  fbEvent('Schedule', { event_date: date });
  gaEvent('select_date', { date });
}

/** User selects a time slot */
export function trackSelectSlot(date, slot) {
  fbCustomEvent('SelectTimeSlot', { date, slot });
  gaEvent('select_slot', { date, slot });
}

/** User chooses "請主動跟我聯繫" (skip date) */
export function trackRequestContact() {
  fbCustomEvent('RequestCallback');
  gaEvent('request_callback');
}

/** User submits enterprise consultation form (with date) */
export function trackLeadWithDate({ name, email, company, date, slot }) {
  fbEvent('Lead', {
    content_name: '企業諮詢',
    content_category: 'consultation_with_date',
    value: 0,
    currency: 'TWD',
  });
  fbEvent('Schedule', { event_date: date });
  gaEvent('generate_lead', {
    event_category: 'consultation',
    event_label: `${date} ${slot}`,
    value: 0,
    currency: 'TWD',
  });
}

/** User submits enterprise consultation form (skip date) */
export function trackLeadSkipDate({ name, email, company }) {
  fbEvent('Lead', {
    content_name: '企業諮詢',
    content_category: 'consultation_callback',
    value: 0,
    currency: 'TWD',
  });
  fbEvent('Contact');
  gaEvent('generate_lead', {
    event_category: 'consultation',
    event_label: 'callback_requested',
    value: 0,
    currency: 'TWD',
  });
}

/** User registers for free lecture */
export function trackFreeLectureSignup({ name, email }) {
  fbEvent('Lead', {
    content_name: '免費講座',
    content_category: 'free_lecture',
    value: 0,
    currency: 'TWD',
  });
  fbEvent('CompleteRegistration', { content_name: '免費講座' });
  gaEvent('sign_up', {
    method: 'free_lecture',
  });
}

/** User clicks LINE official account link */
export function trackLineClick(source = 'unknown') {
  fbCustomEvent('ClickLINE', { source });
  gaEvent('click_line', { source });
}

/** Section view tracking */
export function trackSectionView(sectionName) {
  fbEvent('ViewContent', { content_name: sectionName });
  gaEvent('view_section', { section_name: sectionName });
}
