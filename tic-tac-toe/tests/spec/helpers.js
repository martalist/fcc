function checkIfEmpty(arr) {
  return arr.reduce( function(a, b) {
    if (Array.isArray(b)) { var newB = checkIfEmpty(b); return (a && newB); }
    return (a && !b);
  }, true);
}
