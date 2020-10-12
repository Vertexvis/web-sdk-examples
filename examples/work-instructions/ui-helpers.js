export const setInstructions = (title, message) => {
  const instructions = document.querySelector('#instructions');
  instructions.innerHTML = renderInstructions(title || '', message || '');
};

export const renderSuccessAlert = (title, message) => {
  return `<div class="rounded-md bg-green-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm leading-5 font-medium text-green-800">
        ${title}
      </h3>
      <div class="mt-2 text-sm leading-5 text-green-700">
        <p>
          ${message}
        </p>
      </div>
    </div>
  </div>
</div>`;
};

export const renderWarningAlert = (title, message) => {
  return `<div class="rounded-md bg-yellow-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <!-- Heroicon name: exclamation -->
      <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm leading-5 font-medium text-yellow-800">
        ${title}
      </h3>
      <div class="mt-2 text-sm leading-5 text-yellow-700">
        <p>
          ${message}
        </p>
      </div>
    </div>
  </div>
</div>`;
};

export const renderInfoTip = (message) => {
  return `<div class="max-w-sm w-full bg-white shadow-md rounded-md pointer-events-auto">
    <div class="rounded-md shadow-xs overflow-hidden">
      <div class="p-4">
        <div class="flex items-center">
          <div class="flex-1 flex justify-between">
            <p class="flex-1 text-sm leading-5 font-medium text-gray-900">
              ${message || ''}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
              <!-- Heroicon name: x -->
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

export const renderInstructions = (title, message) => {
  return `<p class="text-sm leading-5 text-gray-700">
        <span class="font-medium">${title}:&nbsp;</span>
        ${message}
      </p>`;
};
