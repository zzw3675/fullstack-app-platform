// 历史版本钩子：全部逻辑内联（本机 PB 的 JSVM 中顶层函数在处理器内不可见，勿重构回顶层）。
onRecordUpdateRequest(function (e) {
  try {
    var old = (function () { try { return $app.findRecordById("app_data", e.record.id); } catch (err1) { return null; } })();
    if (old) {
      var appv = "";
      try { appv = String(old.get("app") || ""); } catch (err2) {}
      if (!("app_data" === "app_data" && appv === "checklist-activity")) {
        var F = ["id", "app", "content", "who", "owner", "title", "edit_scope", "read_scope", "project", "created", "updated"];
        var data = {};
        F.forEach(function (fn) {
          try { var v = old.get(fn); data[fn] = (v === undefined ? null : v); } catch (err3) { data[fn] = null; }
        });
        var rec = new Record($app.findCollectionByNameOrId("history"));
        rec.set("target_collection", "app_data");
        rec.set("target_id", String(e.record.id));
        var title = "";
        try { title = String(old.get("title") || old.get("name") || ""); } catch (err4) {}
        rec.set("target_title", title);
        if ("app_data" === "app_data") {
          var proj = "";
          try { proj = String(old.get("project") || ""); } catch (err5) {}
          if (!proj && appv === "checklist") proj = String(e.record.id);
          if (proj) rec.set("project", proj);
        }
        rec.set("snapshot", JSON.stringify(data));
        var act = "update";
        try {
          var hv = "";
          try { hv = e.request.header.get("X-History-Action") || ""; } catch (errh1) {}
          if (!hv) {
            try {
              var info = e.requestInfo();
              var hdrs = (info && info.headers) || {};
              hv = hdrs["x_history_action"] || hdrs["X-History-Action"] || hdrs["x-history-action"] || "";
              if (Object.prototype.toString.call(hv) === "[object Array]") hv = hv[0] || "";
            } catch (errh2) {}
          }
          if (String(hv) === "restore") act = "restore";
        } catch (err6) {}
        rec.set("action", act);
        try { if (e.auth && e.auth.id && e.auth.collection().name === "users") rec.set("editor", e.auth.id); } catch (err7) {}
        $app.save(rec);
      }
    }
  } catch (err) { console.log("[history-hook] update snapshot failed: " + String(err)); }
  e.next();
}, "app_data");
onRecordDeleteRequest(function (e) {
  try {
    var old = e.record;
    if (old) {
      var appv = "";
      try { appv = String(old.get("app") || ""); } catch (err2) {}
      if (!("app_data" === "app_data" && appv === "checklist-activity")) {
        var F = ["id", "app", "content", "who", "owner", "title", "edit_scope", "read_scope", "project", "created", "updated"];
        var data = {};
        F.forEach(function (fn) {
          try { var v = old.get(fn); data[fn] = (v === undefined ? null : v); } catch (err3) { data[fn] = null; }
        });
        var rec = new Record($app.findCollectionByNameOrId("history"));
        rec.set("target_collection", "app_data");
        rec.set("target_id", String(e.record.id));
        var title = "";
        try { title = String(old.get("title") || old.get("name") || ""); } catch (err4) {}
        rec.set("target_title", title);
        if ("app_data" === "app_data") {
          var proj = "";
          try { proj = String(old.get("project") || ""); } catch (err5) {}
          if (!proj && appv === "checklist") proj = String(e.record.id);
          if (proj) rec.set("project", proj);
        }
        rec.set("snapshot", JSON.stringify(data));
        var act = "delete";
        
        rec.set("action", act);
        try { if (e.auth && e.auth.id && e.auth.collection().name === "users") rec.set("editor", e.auth.id); } catch (err7) {}
        $app.save(rec);
      }
    }
  } catch (err) { console.log("[history-hook] delete snapshot failed: " + String(err)); }
  e.next();
}, "app_data");
onRecordUpdateRequest(function (e) {
  try {
    var old = (function () { try { return $app.findRecordById("jizhang_records", e.record.id); } catch (err1) { return null; } })();
    if (old) {
      var appv = "";
      try { appv = String(old.get("app") || ""); } catch (err2) {}
      if (!("jizhang_records" === "app_data" && appv === "checklist-activity")) {
        var F = ["id", "d", "kind", "cat", "amt", "note", "who", "trashed", "owner", "project", "created", "updated"];
        var data = {};
        F.forEach(function (fn) {
          try { var v = old.get(fn); data[fn] = (v === undefined ? null : v); } catch (err3) { data[fn] = null; }
        });
        var rec = new Record($app.findCollectionByNameOrId("history"));
        rec.set("target_collection", "jizhang_records");
        rec.set("target_id", String(e.record.id));
        var title = "";
        try { title = String(old.get("title") || old.get("name") || ""); } catch (err4) {}
        rec.set("target_title", title);
        if ("jizhang_records" === "app_data") {
          var proj = "";
          try { proj = String(old.get("project") || ""); } catch (err5) {}
          if (!proj && appv === "checklist") proj = String(e.record.id);
          if (proj) rec.set("project", proj);
        }
        if ("jizhang_records" === "jizhang_records") {
          var jzp = "";
          try { jzp = String(old.get("project") || ""); } catch (err8) {}
          if (jzp) rec.set("project", jzp);
        }
        rec.set("snapshot", JSON.stringify(data));
        var act = "update";
        try {
          var hv = "";
          try { hv = e.request.header.get("X-History-Action") || ""; } catch (errh1) {}
          if (!hv) {
            try {
              var info = e.requestInfo();
              var hdrs = (info && info.headers) || {};
              hv = hdrs["x_history_action"] || hdrs["X-History-Action"] || hdrs["x-history-action"] || "";
              if (Object.prototype.toString.call(hv) === "[object Array]") hv = hv[0] || "";
            } catch (errh2) {}
          }
          if (String(hv) === "restore") act = "restore";
        } catch (err6) {}
        rec.set("action", act);
        try { if (e.auth && e.auth.id && e.auth.collection().name === "users") rec.set("editor", e.auth.id); } catch (err7) {}
        $app.save(rec);
      }
    }
  } catch (err) { console.log("[history-hook] update snapshot failed: " + String(err)); }
  e.next();
}, "jizhang_records");
onRecordDeleteRequest(function (e) {
  try {
    var old = e.record;
    if (old) {
      var appv = "";
      try { appv = String(old.get("app") || ""); } catch (err2) {}
      if (!("jizhang_records" === "app_data" && appv === "checklist-activity")) {
        var F = ["id", "d", "kind", "cat", "amt", "note", "who", "trashed", "owner", "project", "created", "updated"];
        var data = {};
        F.forEach(function (fn) {
          try { var v = old.get(fn); data[fn] = (v === undefined ? null : v); } catch (err3) { data[fn] = null; }
        });
        var rec = new Record($app.findCollectionByNameOrId("history"));
        rec.set("target_collection", "jizhang_records");
        rec.set("target_id", String(e.record.id));
        var title = "";
        try { title = String(old.get("title") || old.get("name") || ""); } catch (err4) {}
        rec.set("target_title", title);
        if ("jizhang_records" === "app_data") {
          var proj = "";
          try { proj = String(old.get("project") || ""); } catch (err5) {}
          if (!proj && appv === "checklist") proj = String(e.record.id);
          if (proj) rec.set("project", proj);
        }
        if ("jizhang_records" === "jizhang_records") {
          var jzp = "";
          try { jzp = String(old.get("project") || ""); } catch (err8) {}
          if (jzp) rec.set("project", jzp);
        }
        rec.set("snapshot", JSON.stringify(data));
        var act = "delete";
        
        rec.set("action", act);
        try { if (e.auth && e.auth.id && e.auth.collection().name === "users") rec.set("editor", e.auth.id); } catch (err7) {}
        $app.save(rec);
      }
    }
  } catch (err) { console.log("[history-hook] delete snapshot failed: " + String(err)); }
  e.next();
}, "jizhang_records");
onRecordUpdateRequest(function (e) {
  try {
    var old = (function () { try { return $app.findRecordById("pages", e.record.id); } catch (err1) { return null; } })();
    if (old) {
      var appv = "";
      try { appv = String(old.get("app") || ""); } catch (err2) {}
      if (!("pages" === "app_data" && appv === "checklist-activity")) {
        var F = ["id", "title", "slug", "icon", "kind", "url", "html", "visibility", "visible_user_ids", "sort", "active", "group", "owner", "trashed", "app_mode", "created", "updated"];
        var data = {};
        F.forEach(function (fn) {
          try { var v = old.get(fn); data[fn] = (v === undefined ? null : v); } catch (err3) { data[fn] = null; }
        });
        var rec = new Record($app.findCollectionByNameOrId("history"));
        rec.set("target_collection", "pages");
        rec.set("target_id", String(e.record.id));
        var title = "";
        try { title = String(old.get("title") || old.get("name") || ""); } catch (err4) {}
        rec.set("target_title", title);
        if ("pages" === "app_data") {
          var proj = "";
          try { proj = String(old.get("project") || ""); } catch (err5) {}
          if (!proj && appv === "checklist") proj = String(e.record.id);
          if (proj) rec.set("project", proj);
        }
        rec.set("snapshot", JSON.stringify(data));
        var act = "update";
        try {
          var hv = "";
          try { hv = e.request.header.get("X-History-Action") || ""; } catch (errh1) {}
          if (!hv) {
            try {
              var info = e.requestInfo();
              var hdrs = (info && info.headers) || {};
              hv = hdrs["x_history_action"] || hdrs["X-History-Action"] || hdrs["x-history-action"] || "";
              if (Object.prototype.toString.call(hv) === "[object Array]") hv = hv[0] || "";
            } catch (errh2) {}
          }
          if (String(hv) === "restore") act = "restore";
        } catch (err6) {}
        rec.set("action", act);
        try { if (e.auth && e.auth.id && e.auth.collection().name === "users") rec.set("editor", e.auth.id); } catch (err7) {}
        $app.save(rec);
      }
    }
  } catch (err) { console.log("[history-hook] update snapshot failed: " + String(err)); }
  e.next();
}, "pages");
onRecordDeleteRequest(function (e) {
  try {
    var old = e.record;
    if (old) {
      var appv = "";
      try { appv = String(old.get("app") || ""); } catch (err2) {}
      if (!("pages" === "app_data" && appv === "checklist-activity")) {
        var F = ["id", "title", "slug", "icon", "kind", "url", "html", "visibility", "visible_user_ids", "sort", "active", "group", "owner", "trashed", "app_mode", "created", "updated"];
        var data = {};
        F.forEach(function (fn) {
          try { var v = old.get(fn); data[fn] = (v === undefined ? null : v); } catch (err3) { data[fn] = null; }
        });
        var rec = new Record($app.findCollectionByNameOrId("history"));
        rec.set("target_collection", "pages");
        rec.set("target_id", String(e.record.id));
        var title = "";
        try { title = String(old.get("title") || old.get("name") || ""); } catch (err4) {}
        rec.set("target_title", title);
        if ("pages" === "app_data") {
          var proj = "";
          try { proj = String(old.get("project") || ""); } catch (err5) {}
          if (!proj && appv === "checklist") proj = String(e.record.id);
          if (proj) rec.set("project", proj);
        }
        rec.set("snapshot", JSON.stringify(data));
        var act = "delete";
        
        rec.set("action", act);
        try { if (e.auth && e.auth.id && e.auth.collection().name === "users") rec.set("editor", e.auth.id); } catch (err7) {}
        $app.save(rec);
      }
    }
  } catch (err) { console.log("[history-hook] delete snapshot failed: " + String(err)); }
  e.next();
}, "pages");
onRecordUpdateRequest(function (e) {
  try {
    var old = (function () { try { return $app.findRecordById("templates", e.record.id); } catch (err1) { return null; } })();
    if (old) {
      var appv = "";
      try { appv = String(old.get("app") || ""); } catch (err2) {}
      if (!("templates" === "app_data" && appv === "checklist-activity")) {
        var F = ["id", "name", "kind", "tkey", "icon", "desc", "html", "url", "slug_hint", "sort", "visibility", "visible_user_ids", "group", "owner", "created", "updated"];
        var data = {};
        F.forEach(function (fn) {
          try { var v = old.get(fn); data[fn] = (v === undefined ? null : v); } catch (err3) { data[fn] = null; }
        });
        var rec = new Record($app.findCollectionByNameOrId("history"));
        rec.set("target_collection", "templates");
        rec.set("target_id", String(e.record.id));
        var title = "";
        try { title = String(old.get("title") || old.get("name") || ""); } catch (err4) {}
        rec.set("target_title", title);
        if ("templates" === "app_data") {
          var proj = "";
          try { proj = String(old.get("project") || ""); } catch (err5) {}
          if (!proj && appv === "checklist") proj = String(e.record.id);
          if (proj) rec.set("project", proj);
        }
        rec.set("snapshot", JSON.stringify(data));
        var act = "update";
        try {
          var hv = "";
          try { hv = e.request.header.get("X-History-Action") || ""; } catch (errh1) {}
          if (!hv) {
            try {
              var info = e.requestInfo();
              var hdrs = (info && info.headers) || {};
              hv = hdrs["x_history_action"] || hdrs["X-History-Action"] || hdrs["x-history-action"] || "";
              if (Object.prototype.toString.call(hv) === "[object Array]") hv = hv[0] || "";
            } catch (errh2) {}
          }
          if (String(hv) === "restore") act = "restore";
        } catch (err6) {}
        rec.set("action", act);
        try { if (e.auth && e.auth.id && e.auth.collection().name === "users") rec.set("editor", e.auth.id); } catch (err7) {}
        $app.save(rec);
      }
    }
  } catch (err) { console.log("[history-hook] update snapshot failed: " + String(err)); }
  e.next();
}, "templates");
onRecordDeleteRequest(function (e) {
  try {
    var old = e.record;
    if (old) {
      var appv = "";
      try { appv = String(old.get("app") || ""); } catch (err2) {}
      if (!("templates" === "app_data" && appv === "checklist-activity")) {
        var F = ["id", "name", "kind", "tkey", "icon", "desc", "html", "url", "slug_hint", "sort", "visibility", "visible_user_ids", "group", "owner", "created", "updated"];
        var data = {};
        F.forEach(function (fn) {
          try { var v = old.get(fn); data[fn] = (v === undefined ? null : v); } catch (err3) { data[fn] = null; }
        });
        var rec = new Record($app.findCollectionByNameOrId("history"));
        rec.set("target_collection", "templates");
        rec.set("target_id", String(e.record.id));
        var title = "";
        try { title = String(old.get("title") || old.get("name") || ""); } catch (err4) {}
        rec.set("target_title", title);
        if ("templates" === "app_data") {
          var proj = "";
          try { proj = String(old.get("project") || ""); } catch (err5) {}
          if (!proj && appv === "checklist") proj = String(e.record.id);
          if (proj) rec.set("project", proj);
        }
        rec.set("snapshot", JSON.stringify(data));
        var act = "delete";
        
        rec.set("action", act);
        try { if (e.auth && e.auth.id && e.auth.collection().name === "users") rec.set("editor", e.auth.id); } catch (err7) {}
        $app.save(rec);
      }
    }
  } catch (err) { console.log("[history-hook] delete snapshot failed: " + String(err)); }
  e.next();
}, "templates");
