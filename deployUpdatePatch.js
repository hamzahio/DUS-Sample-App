var fetch = require("node-fetch");
var componentMap = require("./output/ComponentMap.json");
var updatePatch = require("./output/UpdatePatch.json");
fetch("http://172.20.10.6:8080/addComponents", {
  method: "POST",
  body: JSON.stringify({
    components: componentMap
  }),
  headers: { "Content-Type": "application/json" }
}).then(function(res) {
  console.log(res.status);
});
Object.keys(updatePatch).forEach(function(appVersion) {
  console.log(updatePatch[appVersion]);
  fetch("http://172.20.10.6:8080/updateGraph?appVersion=" + appVersion, {
    method: "POST",
    body: JSON.stringify({
      updateGraph: updatePatch[appVersion]
    }),
    headers: { "Content-Type": "application/json" }
  }).then(function(res) {
    console.log("updateGraph", appVersion, res.status);
  });
});
