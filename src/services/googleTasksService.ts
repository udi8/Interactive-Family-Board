// Google Tasks Integration
// Requires Google API Client ID configured in Settings

export async function getTaskLists() {
  try {
    const response = await window.gapi.client.tasks.tasklists.list();
    return response.result.items || [];
  } catch {
    return [];
  }
}

export async function getTasks(taskListId: string = '@default') {
  try {
    const response = await window.gapi.client.tasks.tasks.list({
      tasklist: taskListId,
      showCompleted: true,
    });
    return response.result.items || [];
  } catch {
    return [];
  }
}

export async function completeTask(taskListId: string, taskId: string) {
  try {
    await window.gapi.client.tasks.tasks.patch({
      tasklist: taskListId,
      task: taskId,
      resource: { status: 'completed' },
    });
    return true;
  } catch {
    return false;
  }
}
