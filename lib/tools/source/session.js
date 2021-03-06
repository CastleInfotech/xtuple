/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true, setTimeout: true, enyo:true */

(function () {
  "use strict";

  XT.Session = {
    /** @scope XT.Session */

    details: {},
    config: {},
    availableSessions: [],
    privileges: {},
    settings: {},
    schema: {},
    extensions: {},

    getAvailableSessions: function () {
      return this.availableSessions;
    },

    getConfig: function () {
      return this.config;
    },

    getDetails: function () {
      return this.details;
    },

    setAvailableSessions: function (value) {
      this.availableSessions = value;
      return this;
    },

    setConfig: function (value) {
      this.config = value;
      return this;
    },

    setDetails: function (value) {
      this.details = value;
      return this;
    },

    validateSession: function (callback) {
      var self = this,
        complete = function (payload) {
          self._didValidateSession.call(self, payload, callback);
        };

      // Poll the session socket.io endpoint for valid session data.
      XT.Request
        .handle("session")
        .notify(complete)
        .send(null);
    },

    _didValidateSession: function (payload, callback) {
      if (payload.code === 1) {
        // If this is a valid session acquisition, go ahead
        // and store the database config details in
        // XT.Session.config, and, more specifically, user
        // properties in XT.Session.details.
        this.setConfig(payload);
        this.setDetails(payload.data);

        if (payload.version && XT.setVersion) {
          // announce to the client what our version is, if we have
          // a way of doing it.
          XT.setVersion(payload.version);
        }

        // Start the client loading process.
        XT.getStartupManager().start();
      } else {
        return XT.Session.logout();
      }

      if (callback && callback instanceof Function) {
        callback();
      }
    },

    start: function () {
      try {
        this.validateSession(function () {
          // Tell the client to show now that we're in startup mode.
          XT.app.show();
        });
      } catch (e) {
        XT.Session.logout();
      }
    }
  };

}());
