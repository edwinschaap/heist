function start() {
  console.log('starting...');

  var site = 'https://github.com/edwinschaap/heist/raw/gh-pages/index.html';

  var T1, T2minT1, interval;

  function payload(length){
    var r = '';
    for (var i=length; i>0; --i) {
      r += Math.random().toString(36).slice(2,3);
    }
    return r;
  }

  try {
    fetch(site, {
      mode: 'no-cors'
    })
    .then(function(result){
      T1 = performance.now();
      clearInterval(interval);
    })
    .catch(function(e){
      console.log(e);
    });
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(e);
    }
  }

  interval = setInterval(function(){
    var entries = performance.getEntries();
    var lastEntry = entries[entries.length-1];
    if (lastEntry.name == site) {
      T2minT1 = lastEntry.responseEnd - T1;
      console.log(T2minT1);
    }
  });
}
