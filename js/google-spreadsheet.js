function makeApiCall() {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1L-dSwgZEvOYMhP3DxloZJ6uyyvNEMH_g3t2bCJAYdY0', // TODO: Update placeholder value.
    // The A1 notation of the values to retrieve.
    range: 'Sheet1', // TODO: Update placeholder value.
  };
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result.values);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function initClient() {
  //Add Your API Key here
  var API_KEY = 'AIzaSyB3fmnHVZ_BnUqiTQBPl6ElYW3SMMYjO80';
  //Add Client ID here
  var CLIENT_ID = '105576825016271382503';
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
