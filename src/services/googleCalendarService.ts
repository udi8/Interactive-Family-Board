// Google Calendar Integration
// Requires Google API Client ID configured in Settings

export async function initGoogleCalendar(clientId: string): Promise<boolean> {
  try {
    await loadGapiScript();
    await window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId,
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      });
    });
    return true;
  } catch {
    return false;
  }
}

export async function getCalendarEvents(calendarId: string = 'primary') {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59);

  try {
    const response = await window.gapi.client.calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    return response.result.items || [];
  } catch {
    return [];
  }
}

function loadGapiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.gapi) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google API'));
    document.head.appendChild(script);
  });
}

// Type declarations for gapi
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gapi: any;
  }
}
