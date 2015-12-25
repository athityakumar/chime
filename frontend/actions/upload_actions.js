var UploadAPIUtils = require("../utils/upload_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var UploadActions = {
  // Request actions

  startDirectUpload: function (prefix, file) {
    UploadActions.fetchSignedUrls(prefix, file);
  },

  fetchSignedUrls: function (prefix, file) {
    UploadAPIUtils.fetchSignedUrls(
      prefix,
      file,
      UploadActions.receiveSignedUrls
    );
  },

  directUploadToS3: function (presignedUrl, file) {
    UploadAPIUtils.directUploadToS3(
      presignedUrl,
      file,
      UploadActions.receiveUploadProgress,
      UploadActions.receiveUploadSuccess
    );
  },

  // Response actions

  receiveSignedUrls: function (response, file) {
    var presignedUrl = response.presigned_url;
    var publicUrl = response.public_url;

    AppDispatcher.dispatch({
      actionType: ActionTypes.PUBLIC_URL_RECEIVED,
      response: response
    });

    UploadActions.directUploadToS3(presignedUrl, file);
  },

  receiveUploadProgress: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.DIRECT_UPLOAD_PROGRESS_RECEIVED,
      response: response
    });
  },

  receiveUploadSuccess: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.DIRECT_UPLOAD_SUCCESS_RECEIVED,
      response: response
    });
  },

  // Non-API actions

  resetUploadStore: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RESET_UPLOAD_STORE
    });
  }
};

module.exports = UploadActions;
