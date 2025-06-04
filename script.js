const dark = document.getElementById("dark");
const body = document.body;
let count = 0;
dark.addEventListener("click", function(){
    if(count == 0){
        body.classList.add("darkactive");
    count = 1;
    }
    
    else{
        body.classList.remove("darkactive");
        count = 0;
}
});
