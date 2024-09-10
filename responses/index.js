// Send a successful response from the function
function sendResponse(data) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

// Send an error response from the function
function sendError(statusCode, errorMessage) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      errorMessage,
    }),
  };
}

module.exports = { sendResponse, sendError };
