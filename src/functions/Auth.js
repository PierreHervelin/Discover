const getUrlParameter=(sParam)=>{
    let sPageURL=window.location.search.substring(1),////substring will take everything after the https link and split the #/&
        sURLVariables=sPageURL!=undefined&&sPageURL.length > 0 ? sPageURL.split('#') : [],
        sParameterName,
        i
    let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
    sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
    for (i=0;i<sURLVariables.length;i++) {
        sParameterName=sURLVariables[i].split('=')
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

export const AccessToken = getUrlParameter('access_token')
export const Auth=(force=false)=>{
    let client_id='90f771bb92a4477ab62ef3636f1d6777'
    let redirect_uri=encodeURIComponent(
        'http://127.0.0.1:3000/'
    )
    const redirect=`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`
    if(!AccessToken||force){
        window.location.replace(redirect)
    }
}