
function filterArray(arr, criteria) {
    return arr.filter(item => {  
      return item[criteria.key] > criteria.value;
    });
  }
  