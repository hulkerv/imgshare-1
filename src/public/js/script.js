//NAME FILE
document.getElementById('inputGroup').onchange = function () {
  console.log(this.value);
  document.getElementById('file').innerHTML = document.getElementById('inputGroup').files[0].name;
};

//DELETE

