function start() {
  console.log('starting...');

  var site = 'https://github.com/edwinschaap/heist/raw/gh-pages/index.html';

  fetch(site).then(function(result){
    T1 = performance.now();
  });

  setInterval(function(){
    var entries = performance.getEntries();
    var lastEntry = entries[entries.length-1];
    if (lastEntry.name == site) {
      T2minT1 = lastEntry.responseEnd - T1;
      console.log(T2minT1);
    }
  });
}
