export const createAlbumName=(name)=>{
    const div=document.createElement('div')
    const h3=document.createElement('h3')
    h3.innerHTML=name
    div.append(h3)
    return div
}