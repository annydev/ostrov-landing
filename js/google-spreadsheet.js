function makeApiCall() {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1L-dSwgZEvOYMhP3DxloZJ6uyyvNEMH_g3t2bCJAYdY0', // TODO: Update placeholder value.
    // The A1 notation of the values to retrieve.
    range: 'Sheet1', // TODO: Update placeholder value.
  };
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
    response.result.values.forEach(function(value) {
      appendOffer(value);
    });
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function initClient() {
  //Add Your API Key here
  var API_KEY = 'AIzaSyB3fmnHVZ_BnUqiTQBPl6ElYW3SMMYjO80';
  //Add Client ID here
  var CLIENT_ID = '553024990043-4qn8a3kfqpb8dtneqg545hrl9bv7uevq.apps.googleusercontent.com';
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    makeApiCall();
  });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}
