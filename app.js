function start() {
  console.log('starting...');

  var site = 'https://github.com/edwinschaap/heist/raw/gh-pages/index.html';

  fetchUrl(site, 4000);

  // var T1, T2, T2minT1, interval;

  //
  // try {
  //   fetch(site, {
  //     mode: 'no-cors'
  //   })
  //   .then(function(result){
  //     T1 = performance.now();
  //     clearInterval(interval);
  //   })
  //   .catch(function(e){
  //     console.log(e);
  //   });
  // } catch (e) {
  //   if (e instanceof TypeError) {
  //     console.log(e);
  //   }
  // }

  // interval = setInterval(function(){
  //   var entries = performance.getEntries();
  //   var lastEntry = entries[entries.length-1];
  //   if (lastEntry.name == site) {
  //     T2minT1 = lastEntry.responseEnd - T1;
  //     console.log(T2minT1);
  //   }
  // });
}

function fetchUrl(site, payloadSize) {
  var T1, T2, interval;

  site += '?'+ payload(payloadSize);
  console.log('Fetching '+site);

  console.log('setting interval');
  interval = setInterval(function(){
    var entries = performance.getEntries();
    var lastEntry = entries[entries.length-1];
    if (lastEntry.name == site) {
      T2 = lastEntry.responseEnd;
//      T2minT1 = T2 - T1;
//      console.log(T2minT1);
      console.log('T1: '+T1+', T2: '+T2);
    }
  });

  fetch(site, {
    mode: 'no-cors',
    redirect: 'manual'
  })
  .then(function(result){
    T1 = performance.now();
    setTimeout(function(){
      console.log('clearing interval');
      clearInterval(interval);
    }, 1000);
  })
  .catch(function(e){
    console.log(e);
  });


}

function payload(length){
  var r = '';
  for (var i=length; i>0; --i) {
    r += Math.random().toString(36).slice(2,3);
  }
  return r;
}
