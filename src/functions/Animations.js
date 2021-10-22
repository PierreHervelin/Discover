export const writeEffect=(element,text)=>{
    element.innerHTML=''
    let i=0
    const Interval=setInterval(() => {
        if(i>text.length||element.style.display==='none'){
            clearInterval(Interval)
            return
        }
        element.innerHTML=''
        element.innerHTML+=text.substr(0,i)
        i++
    }, 50);
}